#!/usr/bin/env python3
"""Acquire operator-reported GIE ALSI Gate daily data with a user-provided API key.

No credentials are committed. API key is read only from GIE_ALSI_API_KEY.
Use --facility-url from the official /api/about?show=listing response.
This script intentionally does not infer ship discharge or origin.
"""
import argparse
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import date

HOST = "https://alsi.gie.eu"
GATE_OPERATOR_EIC = "21X000000001063H"  # ENTSOG EIC registry: Gate Terminal B.V.

def validate_facility_url(value):
    parsed = urllib.parse.urlsplit(value)
    if parsed.scheme != "https" or parsed.netloc != "alsi.gie.eu" or not (parsed.path == "/api" or parsed.path.startswith("/api/")):
        raise ValueError("Facility URL must be an https://alsi.gie.eu/api/... endpoint")
    return parsed

def validate_facility_identity(value):
    """Reject country/company aggregate endpoints masquerading as Gate facility data."""
    parsed = validate_facility_url(value)
    query = urllib.parse.parse_qs(parsed.query)
    if parsed.path != "/api" or any(len(query.get(k, [])) != 1 or not query[k][0] for k in ("country", "company", "facility")):
        raise ValueError("ALSI facility data requires /api?country=...&company=...&facility=... from official listing")
    if query["country"][0].upper() != "NL":
        raise ValueError("Gate terminal facility must be in Netherlands (country=NL)")
    return parsed

def find_gate_facilities(listing):
    """Return candidate Gate entries without guessing a facility EIC."""
    if not isinstance(listing, list):
        raise ValueError("Expected GIE about listing array")
    found = []
    for operator in listing:
        if not isinstance(operator, dict):
            continue
        if operator.get("eic") != GATE_OPERATOR_EIC:
            continue
        facilities = operator.get("facilities", [])
        if not isinstance(facilities, list):
            raise ValueError("Malformed Gate operator facility listing")
        for facility in facilities:
            if not isinstance(facility, dict):
                continue
            if str(facility.get("country", "")).upper() != "NL":
                continue
            label = " ".join(str(x) for x in (operator.get("name", ""), facility.get("name", ""))).lower()
            if "gate" not in label:
                continue
            if facility.get("company") != operator.get("eic"):
                continue
            facility_eic = facility.get("eic")
            if not isinstance(facility_eic, str) or not facility_eic.strip():
                continue
            found.append({"operator_name": operator.get("name"), "operator_eic": operator.get("eic"),
                          "facility_name": facility.get("name"), "facility_eic": facility.get("eic"),
                          "country": facility.get("country"), "url": facility.get("url"),
                          "operational_start_date": facility.get("operational_start_date"),
                          "operational_end_date": facility.get("operational_end_date")})
    return found

def assert_unique_gate_facility(listing):
    """Refuse a missing or ambiguous Gate LNG discovery rather than guessing an EIC."""
    candidates = find_gate_facilities(listing)
    if not candidates:
        raise ValueError("Authenticated GIE listing contains no verified Gate LNG facility")
    unique = {(item["operator_eic"], item["facility_eic"]) for item in candidates}
    if len(unique) != len(candidates):
        raise ValueError("Authenticated GIE listing contains duplicate Gate facility identifiers")
    return candidates

def verify_against_listing(facility_url, listing):
    """Require exact facility URL parameters to match one GIE operator listing entry."""
    parsed = validate_facility_identity(facility_url)
    query = urllib.parse.parse_qs(parsed.query)
    for item in assert_unique_gate_facility(listing):
        if (item["operator_eic"] == query["company"][0] and
            item["facility_eic"] == query["facility"][0] and
            item["country"].upper() == query["country"][0].upper()):
            return item
    raise ValueError("Facility EIC and company do not match a Gate entry in the authenticated GIE listing")

def validate_reporting_window(facility, from_date, to_date):
    """Do not interpret dates outside the facility's published operating coverage."""
    requested_start = date.fromisoformat(from_date)
    requested_end = date.fromisoformat(to_date)
    if requested_start > requested_end:
        raise ValueError("Invalid reporting date range")
    start = facility.get("operational_start_date")
    end = facility.get("operational_end_date")
    if start and requested_start < date.fromisoformat(start[:10]):
        raise ValueError("Requested range begins before facility reporting start")
    if end and requested_end > date.fromisoformat(end[:10]):
        raise ValueError("Requested range ends after facility reporting end")
    return True

def request_json(url, key):
    req = urllib.request.Request(url, headers={"x-key": key, "Accept": "application/json", "User-Agent": "EPNews-ALSI-research/1.0"})
    with urllib.request.urlopen(req, timeout=35) as response:
        return json.load(response)

def validate_response(result):
    """Fail closed on incomplete pagination and malformed facility observations."""
    if not isinstance(result, dict) or not isinstance(result.get("data"), list):
        raise ValueError("Unexpected GIE response: expected data array")
    last_page = result.get("last_page")
    if last_page is not None:
        try:
            pages = int(last_page)
        except (ValueError, TypeError):
            raise ValueError("Invalid GIE pagination metadata") from None
        if pages != 1:
            raise ValueError(f"GIE response spans {pages} pages; refusing incomplete one-page export")
    if not result["data"]:
        raise ValueError("GIE returned no facility observations; refusing empty evidence export")
    return result["data"]

def fetch_all_pages(base_url, key, fetch=request_json):
    """Fetch every GIE page and reject inconsistent or incomplete responses."""
    parsed = validate_facility_url(base_url)
    params = dict(urllib.parse.parse_qsl(parsed.query, keep_blank_values=True))
    params["size"] = "300"
    all_rows = []
    expected_pages = None
    for page in range(1, 1001):
        params["page"] = str(page)
        url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, parsed.path, urllib.parse.urlencode(params), ""))
        response = fetch(url, key)
        if not isinstance(response, dict) or not isinstance(response.get("data"), list):
            raise ValueError(f"Invalid GIE response on page {page}")
        try:
            last_page = int(response["last_page"])
        except (KeyError, TypeError, ValueError):
            raise ValueError("Missing or invalid GIE last_page metadata") from None
        if last_page < 1 or last_page > 1000 or (expected_pages is not None and last_page != expected_pages):
            raise ValueError("Inconsistent or unsafe GIE pagination")
        expected_pages = last_page
        rows = response["data"]
        if not rows:
            raise ValueError(f"Empty GIE page {page}; refusing incomplete evidence")
        all_rows.extend(rows)
        if page == expected_pages:
            return all_rows, expected_pages
    raise ValueError("GIE pagination exceeded safety limit")

def audit_observation_coverage(rows, from_date, to_date):
    """Report missing, repeated and out-of-window gas days; do not invent observations."""
    from datetime import timedelta
    start, end = date.fromisoformat(from_date), date.fromisoformat(to_date)
    counts = {}
    missing_date_field = 0
    outside = []
    statuses = {}
    for row in rows:
        if not isinstance(row, dict) or not row.get("gasDayStart"):
            missing_date_field += 1
            continue
        day = date.fromisoformat(str(row["gasDayStart"])[:10])
        counts[day.isoformat()] = counts.get(day.isoformat(), 0) + 1
        if not start <= day <= end:
            outside.append(day.isoformat())
        status = str(row.get("status", "missing"))
        statuses[status] = statuses.get(status, 0) + 1
    expected = [(start + timedelta(days=n)).isoformat() for n in range((end - start).days + 1)]
    return {"expected_gas_days": len(expected), "observed_unique_gas_days": len(counts),
            "missing_gas_days": [day for day in expected if day not in counts],
            "duplicate_gas_days": {day: n for day, n in counts.items() if n > 1},
            "out_of_window_gas_days": sorted(set(outside)),
            "rows_missing_gas_day": missing_date_field,
            "status_counts": statuses,
            "complete_daily_coverage": (not missing_date_field and not outside and
                not any(n > 1 for n in counts.values()) and set(counts) == set(expected))}

def validate_operator_evidence(rows, from_date, to_date):
    """Reject non-facility or mixed-facility records; flag data quality separately."""
    if not rows:
        raise ValueError("No ALSI facility observations")
    coverage = audit_observation_coverage(rows, from_date, to_date)
    if coverage["rows_missing_gas_day"] or coverage["out_of_window_gas_days"]:
        raise ValueError("ALSI records missing gas day or outside requested period")
    return coverage

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--facility-url", help="Exact Gate facility URL copied from authenticated /api/about?show=listing")
    parser.add_argument("--from-date", default="2026-10-01")
    parser.add_argument("--to-date", default="2026-10-31")
    parser.add_argument("--output", default="gate-alsi-operator-october-2026.json")
    parser.add_argument("--list-facilities", action="store_true")
    args = parser.parse_args()
    if date.fromisoformat(args.from_date) > date.fromisoformat(args.to_date):
        parser.error("from-date must not exceed to-date")
    key = os.environ.get("GIE_ALSI_API_KEY")
    if not key:
        parser.error("GIE_ALSI_API_KEY is required; register for the free GIE API and store the key as a secret")
    if args.list_facilities:
        result = request_json(HOST + "/api/about?show=listing", key)
        print(json.dumps({"gate_candidates": assert_unique_gate_facility(result)}, indent=2))
        return
    if not args.facility_url:
        parser.error("--facility-url is required (resolve Gate EIC via --list-facilities first)")
    listing = request_json(HOST + "/api/about?show=listing", key)
    verified_facility = verify_against_listing(args.facility_url, listing)
    validate_reporting_window(verified_facility, args.from_date, args.to_date)
    parsed = validate_facility_identity(args.facility_url)
    params = dict(urllib.parse.parse_qsl(parsed.query, keep_blank_values=True))
    params.update({"from": args.from_date, "to": args.to_date})
    url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, parsed.path, urllib.parse.urlencode(params), ""))
    rows, page_count = fetch_all_pages(url, key)
    coverage = validate_operator_evidence(rows, args.from_date, args.to_date)
    output = {
        "source": "GIE ALSI+ operator-reported LNG facility daily series",
        "facility_api_url": url,
        "verified_gie_listing_facility": verified_facility,
        "retrieved_date_utc": date.today().isoformat(),
        "data": rows,
        "api_response_metadata": {"pages_retrieved": page_count, "records_retrieved": len(rows)},
        "daily_coverage_audit": coverage,
        "limitations": [
            "Inventory and sendOut are not vessel-by-vessel unloading volumes",
            "Confirm facility EIC belongs to Gate terminal; never substitute country aggregate",
            "Data status C confirms reporting, not voyage cargo origin",
            "All reported API pages retrieved; inconsistent or empty pages fail closed",
            "Missing, duplicate, out-of-window, and estimated gas days are disclosed in daily_coverage_audit",
            "Complete daily coverage does not certify LNG vessel unloading or cargo origin",
        ],
    }
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)
        f.write("\n")
    print(f"Wrote {len(rows)} records to {args.output}; verify facility identity")

if __name__ == "__main__":
    try:
        main()
    except (urllib.error.URLError, ValueError) as exc:
        print(f"ALSI acquisition failed: {exc}", file=sys.stderr)
        sys.exit(1)
