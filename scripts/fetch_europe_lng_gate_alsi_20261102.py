#!/usr/bin/env python3
"""Acquire operator-reported GIE ALSI Gate daily data with a user-provided API key.

No credentials are committed. API key is read only from GIE_ALSI_API_KEY.
Use --facility-url from the official /api/about?show=listing response.
This script intentionally does not infer ship discharge or origin.
"""
import argparse
import json
import os
import re
import sys
from datetime import datetime
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
    if set(query) != {"country", "company", "facility"}:
        raise ValueError("Gate facility URL must contain only country, company and facility identifiers")
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

def validate_listed_facility_url(candidate):
    """Ensure GIE's published facility URL agrees with the listed identifiers."""
    url = candidate.get("url")
    if not isinstance(url, str) or not url:
        raise ValueError("Gate facility listing lacks API URL")
    if url.startswith("/api?"):
        url = HOST + url
    parsed = validate_facility_identity(url)
    params = urllib.parse.parse_qs(parsed.query)
    if (params["country"][0].upper() != str(candidate["country"]).upper() or
        params["company"][0] != candidate["operator_eic"] or
        params["facility"][0] != candidate["facility_eic"]):
        raise ValueError("Gate listing URL and facility/company EICs disagree")
    return url

def assert_unique_gate_facility(listing):
    """Refuse a missing or ambiguous Gate LNG discovery rather than guessing an EIC."""
    candidates = find_gate_facilities(listing)
    if not candidates:
        raise ValueError("Authenticated GIE listing contains no verified Gate LNG facility")
    for item in candidates:
        item["verified_facility_url"] = validate_listed_facility_url(item)
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

def select_unique_gate_facility(listing):
    """Auto-select only when authenticated GIE lists exactly one Gate facility."""
    candidates = assert_unique_gate_facility(listing)
    if len(candidates) != 1:
        raise ValueError(f"Found {len(candidates)} distinct Gate facilities; specify an exact facility URL")
    return candidates[0]

def enforce_listed_facility_url(requested_url, facility):
    """Only allow the exact authenticated registry URL, modulo parameter ordering."""
    requested = validate_facility_identity(requested_url)
    listed = validate_facility_identity(facility["verified_facility_url"])
    if urllib.parse.parse_qs(requested.query) != urllib.parse.parse_qs(listed.query):
        raise ValueError("Requested facility URL differs from authenticated GIE listing")
    return facility["verified_facility_url"]

def parse_gas_day_bound(value):
    """Accept only explicit YYYY-MM-DD bounds; Python also accepts ambiguous compact ISO dates."""
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        raise ValueError("Gas-day bound must use YYYY-MM-DD")
    return date.fromisoformat(value)

def validate_reporting_window(facility, from_date, to_date):
    """Do not interpret dates outside the facility's published operating coverage."""
    requested_start = parse_gas_day_bound(from_date)
    requested_end = parse_gas_day_bound(to_date)
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
    pairs = urllib.parse.parse_qsl(parsed.query, keep_blank_values=True)
    params = dict(pairs)
    if len(pairs) != len(params):
        raise ValueError("Paged ALSI query contains duplicate parameters")
    if not {"from", "to"}.issubset(params) or set(params) != {"country", "company", "facility", "from", "to"}:
        raise ValueError("Paged ALSI query must contain only facility identity and gas-day bounds")
    identity_url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, parsed.path,
        urllib.parse.urlencode({k: params[k] for k in ("country", "company", "facility")}), ""))
    validate_facility_identity(identity_url)
    start_date, end_date = parse_gas_day_bound(params["from"]), parse_gas_day_bound(params["to"])
    if start_date > end_date:
        raise ValueError("Paged ALSI date bounds must be in ascending order")
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
        if any(not isinstance(row, dict) for row in rows):
            raise ValueError(f"Non-object GIE observation on page {page}")
        if not rows:
            raise ValueError(f"Empty GIE page {page}; refusing incomplete evidence")
        if len(rows) > 300:
            raise ValueError(f"GIE page {page} exceeds requested 300-row limit")
        if page < expected_pages and len(rows) != 300:
            raise ValueError(f"GIE non-final page {page} is incomplete")
        all_rows.extend(rows)
        if page == expected_pages:
            return all_rows, expected_pages
    raise ValueError("GIE pagination exceeded safety limit")

def audit_observation_coverage(rows, from_date, to_date):
    """Report missing, repeated and out-of-window gas days; do not invent observations."""
    from datetime import timedelta
    start, end = parse_gas_day_bound(from_date), parse_gas_day_bound(to_date)
    counts = {}
    missing_date_field = 0
    outside = []
    statuses = {}
    confirmed_days = set()
    day_statuses = {}
    estimated_days = set()
    no_data_days = set()
    for row in rows:
        if not isinstance(row, dict) or not row.get("gasDayStart"):
            missing_date_field += 1
            continue
        raw_day = row["gasDayStart"]
        if not isinstance(raw_day, str) or not re.match(r"^\d{4}-\d{2}-\d{2}(?:$|T)", raw_day):
            raise ValueError("ALSI gasDayStart must begin with YYYY-MM-DD or YYYY-MM-DDT")
        try:
            day = date.fromisoformat(raw_day[:10])
            if len(raw_day) > 10:
                datetime.fromisoformat(raw_day.replace("Z", "+00:00"))
        except ValueError:
            raise ValueError(f"Invalid ALSI gasDayStart date or timestamp: {raw_day!r}") from None
        counts[day.isoformat()] = counts.get(day.isoformat(), 0) + 1
        if not start <= day <= end:
            outside.append(day.isoformat())
        status = str(row.get("status", "missing"))
        statuses[status] = statuses.get(status, 0) + 1
        if start <= day <= end:
            day_statuses.setdefault(day.isoformat(), set()).add(status)
            if status == "C":
                confirmed_days.add(day.isoformat())
            elif status == "E":
                estimated_days.add(day.isoformat())
            elif status == "N":
                no_data_days.add(day.isoformat())
    expected = [(start + timedelta(days=n)).isoformat() for n in range((end - start).days + 1)]
    observed_in_window = set(counts).intersection(expected)
    conflicting_days = {day: sorted(values) for day, values in day_statuses.items() if len(values) > 1}
    unambiguous_confirmed = {day for day, values in day_statuses.items() if values == {"C"}}
    usable_days = {day for day, values in day_statuses.items()
                   if len(values) == 1 and values.issubset({"C", "E"})}
    unavailable_days = {day for day, values in day_statuses.items()
                        if values == {"N"}}
    unambiguous_estimated = {day for day, values in day_statuses.items() if values == {"E"}}
    return {"expected_gas_days": len(expected), "observed_unique_gas_days": len(counts),
            "observed_in_window_gas_days": len(observed_in_window),
            "daily_coverage_percent": round(100 * len(observed_in_window) / len(expected), 2) if expected else 0,
            "confirmed_gas_days": len(confirmed_days),
            "unambiguous_confirmed_gas_days": len(unambiguous_confirmed),
            "conflicting_status_gas_days": conflicting_days,
            "estimated_gas_days": len(estimated_days),
            "unambiguous_estimated_gas_days": len(unambiguous_estimated),
            "no_data_gas_days": len(no_data_days),
            "unambiguous_no_data_gas_days": len(unavailable_days),
            "usable_reporting_gas_days": len(usable_days),
            "usable_reporting_coverage_percent": round(100 * len(usable_days) / len(expected), 2) if expected else 0,
            "unavailable_reporting_gas_days": len(unavailable_days),
            "confirmed_coverage_percent": round(100 * len(unambiguous_confirmed) / len(expected), 2) if expected else 0,
            "unambiguous_confirmed_coverage_percent": round(100 * len(unambiguous_confirmed) / len(expected), 2) if expected else 0,
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
    if any(not isinstance(row, dict) for row in rows):
        raise ValueError("Non-object ALSI facility observation")
    invalid_statuses = sorted({str(row.get("status", "missing")) for row in rows
                               if row.get("status") not in ("C", "E", "N")})
    if invalid_statuses:
        raise ValueError(f"ALSI observations contain unsupported reporting statuses: {invalid_statuses}")
    coverage = audit_observation_coverage(rows, from_date, to_date)
    if coverage["rows_missing_gas_day"] or coverage["out_of_window_gas_days"]:
        raise ValueError("ALSI records missing gas day or outside requested period")
    return coverage

def summarize_evidence_quality(coverage):
    """Keep operator evidence classification explicit for downstream consumers."""
    return {
        "date_window_complete": coverage["complete_daily_coverage"],
        "usable_reporting_coverage_percent": coverage["usable_reporting_coverage_percent"],
        "unambiguous_confirmed_coverage_percent": coverage["unambiguous_confirmed_coverage_percent"],
        "conflicting_status_day_count": len(coverage["conflicting_status_gas_days"]),
        "duplicate_gas_day_count": len(coverage["duplicate_gas_days"]),
        "missing_gas_day_count": len(coverage["missing_gas_days"]),
        "has_full_usable_reporting": coverage["usable_reporting_coverage_percent"] == 100.0
            and coverage["complete_daily_coverage"]
            and not coverage["duplicate_gas_days"] and not coverage["conflicting_status_gas_days"],
        "no_data_day_count": coverage["unambiguous_no_data_gas_days"],
        "unambiguous_estimated_day_count": coverage["unambiguous_estimated_gas_days"],
        "certified_vessel_discharge": False,
        "verified_cargo_origin": False,
        "interpretation": "Operator inventory/sendout reporting only; not vessel discharge or cargo origin",
    }

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--facility-url", help="Exact Gate facility URL copied from authenticated /api/about?show=listing")
    parser.add_argument("--from-date", default="2026-10-01")
    parser.add_argument("--to-date", default="2026-10-31")
    parser.add_argument("--output", default="gate-alsi-operator-october-2026.json")
    parser.add_argument("--list-facilities", action="store_true")
    args = parser.parse_args()
    if parse_gas_day_bound(args.from_date) > parse_gas_day_bound(args.to_date):
        parser.error("from-date must not exceed to-date")
    key = os.environ.get("GIE_ALSI_API_KEY")
    if not key:
        parser.error("GIE_ALSI_API_KEY is required; register for the free GIE API and store the key as a secret")
    if args.list_facilities:
        result = request_json(HOST + "/api/about?show=listing", key)
        print(json.dumps({"gate_candidates": assert_unique_gate_facility(result)}, indent=2))
        return
    listing = request_json(HOST + "/api/about?show=listing", key)
    if args.facility_url:
        verified_facility = verify_against_listing(args.facility_url, listing)
        listed_url = enforce_listed_facility_url(args.facility_url, verified_facility)
    else:
        verified_facility = select_unique_gate_facility(listing)
        listed_url = verified_facility["verified_facility_url"]
    validate_reporting_window(verified_facility, args.from_date, args.to_date)
    parsed = validate_facility_identity(listed_url)
    params = dict(urllib.parse.parse_qsl(parsed.query, keep_blank_values=True))
    params.update({"from": args.from_date, "to": args.to_date})
    url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, parsed.path, urllib.parse.urlencode(params), ""))
    rows, page_count = fetch_all_pages(url, key)
    coverage = validate_operator_evidence(rows, args.from_date, args.to_date)
    evidence_quality = summarize_evidence_quality(coverage)
    output = {
        "source": "GIE ALSI+ operator-reported LNG facility daily series",
        "facility_api_url": url,
        "verified_gie_listing_facility": verified_facility,
        "retrieved_date_utc": date.today().isoformat(),
        "data": rows,
        "api_response_metadata": {"pages_retrieved": page_count, "records_retrieved": len(rows)},
        "daily_coverage_audit": coverage,
        "evidence_quality_summary": evidence_quality,
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
