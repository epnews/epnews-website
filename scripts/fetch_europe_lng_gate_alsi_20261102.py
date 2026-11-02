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

def validate_facility_url(value):
    parsed = urllib.parse.urlsplit(value)
    if parsed.scheme != "https" or parsed.netloc != "alsi.gie.eu" or not parsed.path.startswith("/api/"):
        raise ValueError("Facility URL must be an https://alsi.gie.eu/api/... endpoint")
    return parsed

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
        print(json.dumps(result, indent=2))
        return
    if not args.facility_url:
        parser.error("--facility-url is required (resolve Gate EIC via --list-facilities first)")
    parsed = validate_facility_url(args.facility_url)
    params = dict(urllib.parse.parse_qsl(parsed.query, keep_blank_values=True))
    params.update({"from": args.from_date, "to": args.to_date})
    url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, parsed.path, urllib.parse.urlencode(params), ""))
    rows, page_count = fetch_all_pages(url, key)
    output = {
        "source": "GIE ALSI+ operator-reported LNG facility daily series",
        "facility_api_url": url,
        "retrieved_date_utc": date.today().isoformat(),
        "data": rows,
        "api_response_metadata": {"pages_retrieved": page_count, "records_retrieved": len(rows)},
        "limitations": [
            "Inventory and sendOut are not vessel-by-vessel unloading volumes",
            "Confirm facility EIC belongs to Gate terminal; never substitute country aggregate",
            "Data status C confirms reporting, not voyage cargo origin",
            "All reported API pages retrieved; inconsistent or empty pages fail closed",
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
