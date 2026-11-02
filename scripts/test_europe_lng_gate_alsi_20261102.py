#!/usr/bin/env python3
"""Offline safety checks for the GIE ALSI acquisition script."""
import importlib.util
from pathlib import Path
from urllib.parse import urlsplit
p = Path(__file__).with_name("fetch_europe_lng_gate_alsi_20261102.py")
spec = importlib.util.spec_from_file_location("alsi_fetch", p)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
assert mod.validate_facility_url("https://alsi.gie.eu/api/abc").netloc == "alsi.gie.eu"
for bad in ("http://alsi.gie.eu/api/abc", "https://evil.example/api/abc", "https://alsi.gie.eu/other", "https://alsi.gie.eu.evil.example/api/abc"):
    try:
        mod.validate_facility_url(bad)
    except ValueError:
        pass
    else:
        raise AssertionError(f"Unsafe URL accepted: {bad}")
print("ALSI URL safety checks passed")

assert mod.validate_response({"data": [{"gasDayStart": "2026-10-01"}], "last_page": 1})[0]["gasDayStart"] == "2026-10-01"
for invalid in ({"data": [], "last_page": 1}, {"data": [1], "last_page": 2}, {"data": [1], "last_page": "unknown"}, {"error": "invalid key"}):
    try:
        mod.validate_response(invalid)
    except ValueError:
        pass
    else:
        raise AssertionError(f"Incomplete or malformed response accepted: {invalid}")
print("ALSI pagination and completeness checks passed")

from urllib.parse import parse_qs
def mock_fetch(url, key):
    q = parse_qs(urlsplit(url).query)
    assert q["size"] == ["300"]
    assert q["to"] == ["2026-10-31"]
    n = int(q["page"][0])
    return {"last_page": 2, "data": [{"gasDayStart": "2026-10-0" + str(n)}]}
rows, pages = mod.fetch_all_pages("https://alsi.gie.eu/api?facility=example&to=2026-10-31", "dummy", mock_fetch)
assert pages == 2 and len(rows) == 2
def bad_fetch(url, key):
    n = int(parse_qs(urlsplit(url).query)["page"][0])
    return {"last_page": 2 if n == 1 else 3, "data": [1]}
try:
    mod.fetch_all_pages("https://alsi.gie.eu/api?facility=example", "dummy", bad_fetch)
except ValueError:
    pass
else:
    raise AssertionError("Inconsistent page count was accepted")
print("ALSI full-pagination checks passed")

good = "https://alsi.gie.eu/api?country=NL&company=21X-EXAMPLE&facility=21Z-EXAMPLE"
assert mod.validate_facility_identity(good).path == "/api"
for bad in (
    "https://alsi.gie.eu/api?country=NL",
    "https://alsi.gie.eu/api?country=NL&company=21X-EXAMPLE",
    "https://alsi.gie.eu/api?country=BE&company=21X-EXAMPLE&facility=21Z-EXAMPLE",
    "https://alsi.gie.eu/api?country=NL&company=21X-EXAMPLE&facility=",
):
    try:
        mod.validate_facility_identity(bad)
    except ValueError:
        pass
    else:
        raise AssertionError(f"Non-Gate facility/aggregate query accepted: {bad}")
print("ALSI Netherlands facility-level identity checks passed")

listing = [{"name": "Gate Terminal B.V.", "eic": "21X000000001063H", "facilities": [
    {"name": "Gate LNG", "country": "NL", "company": "21X000000001063H", "eic": "21W-TEST", "url": "/api?country=NL&company=21X-TEST&facility=21W-TEST"},
    {"name": "Other terminal", "country": "NL", "eic": "21W-OTHER"}]}]
url = "https://alsi.gie.eu/api?country=NL&company=21X-TEST&facility=21W-TEST"
assert mod.verify_against_listing(url, listing)["facility_name"] == "Gate LNG"
for bad in (
    "https://alsi.gie.eu/api?country=NL&company=21X-TEST&facility=21W-OTHER",
    "https://alsi.gie.eu/api?country=NL&company=21X-OTHER&facility=21W-TEST",
):
    try:
        mod.verify_against_listing(bad, listing)
    except ValueError:
        pass
    else:
        raise AssertionError("Unlisted or mismatched Gate identity accepted")
print("Authenticated GIE listing cross-check tests passed")

spoofed = [{"name": "Gate Terminal B.V.", "eic": "21X000000001063H", "facilities": [
    {"name": "Gate LNG", "country": "NL", "company": "21X-DIFFERENT", "eic": "21W-TEST"}]}]
try:
    mod.verify_against_listing(url, spoofed)
except ValueError:
    pass
else:
    raise AssertionError("Facility/company mismatch in official listing was accepted")
print("GIE facility company cross-reference tests passed")

coverage = {"operational_start_date": "2026-01-01", "operational_end_date": "2026-12-31"}
assert mod.validate_reporting_window(coverage, "2026-10-01", "2026-10-31")
for start, end in (("2025-12-31", "2026-10-31"), ("2026-10-01", "2027-01-01"), ("2026-11-01", "2026-10-01")):
    try:
        mod.validate_reporting_window(coverage, start, end)
    except ValueError:
        pass
    else:
        raise AssertionError("Out-of-coverage ALSI date range accepted")
assert mod.validate_reporting_window({"operational_start_date": None, "operational_end_date": None}, "2026-10-01", "2026-10-31")
print("ALSI facility reporting coverage checks passed")

observations = [
    {"gasDayStart": "2026-10-01", "status": "C"},
    {"gasDayStart": "2026-10-01", "status": "E"},
    {"gasDayStart": "2026-10-03", "status": "N"},
]
audit = mod.audit_observation_coverage(observations, "2026-10-01", "2026-10-03")
assert audit["missing_gas_days"] == ["2026-10-02"]
assert audit["duplicate_gas_days"] == {"2026-10-01": 2}
assert audit["status_counts"] == {"C": 1, "E": 1, "N": 1}
assert not audit["complete_daily_coverage"]
complete = mod.audit_observation_coverage([{"gasDayStart": "2026-10-01", "status": "C"}], "2026-10-01", "2026-10-01")
assert complete["complete_daily_coverage"]
print("ALSI observation coverage audit checks passed")

assert mod.validate_operator_evidence([{"gasDayStart": "2026-10-01"}], "2026-10-01", "2026-10-02")["missing_gas_days"] == ["2026-10-02"]
for bad in ([{"gasDayStart": "2026-09-30"}], [{"status": "C"}], []):
    try:
        mod.validate_operator_evidence(bad, "2026-10-01", "2026-10-31")
    except ValueError:
        pass
    else:
        raise AssertionError("Invalid ALSI observation set was accepted")
print("ALSI gas-day evidence bounds checks passed")

unrelated = [{"name": "Gate Other Operator", "eic": "21X-UNRELATED", "facilities": [
    {"name": "Gate LNG", "country": "NL", "company": "21X-UNRELATED", "eic": "21W-TEST"}]}]
assert mod.find_gate_facilities(unrelated) == []
try:
    mod.verify_against_listing("https://alsi.gie.eu/api?country=NL&company=21X-UNRELATED&facility=21W-TEST", unrelated)
except ValueError:
    pass
else:
    raise AssertionError("Unrelated Gate-named operator accepted")
print("Gate operator primary EIC registry pin tests passed")
