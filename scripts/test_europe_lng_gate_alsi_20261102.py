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
rows, pages = mod.fetch_all_pages("https://alsi.gie.eu/api?country=NL&company=21X000000001063H&facility=21W-TEST&from=2026-10-01&to=2026-10-31", "dummy", mock_fetch)
assert pages == 2 and len(rows) == 2
def bad_fetch(url, key):
    n = int(parse_qs(urlsplit(url).query)["page"][0])
    return {"last_page": 2 if n == 1 else 3, "data": [1]}
try:
    mod.fetch_all_pages("https://alsi.gie.eu/api?country=NL&company=21X000000001063H&facility=21W-TEST&from=2026-10-01&to=2026-10-31", "dummy", bad_fetch)
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
    {"name": "Gate LNG", "country": "NL", "company": "21X000000001063H", "eic": "21W-TEST", "url": "/api?country=NL&company=21X000000001063H&facility=21W-TEST"},
    {"name": "Other terminal", "country": "NL", "eic": "21W-OTHER"}]}]
url = "https://alsi.gie.eu/api?country=NL&company=21X000000001063H&facility=21W-TEST"
assert mod.verify_against_listing(url, listing)["facility_name"] == "Gate LNG"
for bad in (
    "https://alsi.gie.eu/api?country=NL&company=21X000000001063H&facility=21W-OTHER",
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

assert len(mod.assert_unique_gate_facility(listing)) == 1
for invalid_listing in ([], [listing[0], listing[0]]):
    try:
        mod.assert_unique_gate_facility(invalid_listing)
    except ValueError:
        pass
    else:
        raise AssertionError("Missing or duplicate Gate facility identity accepted")
print("Gate authenticated discovery ambiguity checks passed")

malformed = [{"name": "Gate Terminal B.V.", "eic": mod.GATE_OPERATOR_EIC, "facilities": {"bad": "shape"}}]
try:
    mod.assert_unique_gate_facility(malformed)
except ValueError:
    pass
else:
    raise AssertionError("Malformed GIE facility collection accepted")
missing_eic = [{"name": "Gate Terminal B.V.", "eic": mod.GATE_OPERATOR_EIC, "facilities": [
    {"name": "Gate LNG", "country": "NL", "company": mod.GATE_OPERATOR_EIC, "eic": None}]}]
try:
    mod.assert_unique_gate_facility(missing_eic)
except ValueError:
    pass
else:
    raise AssertionError("Gate candidate without EIC accepted")
print("GIE listing schema completeness checks passed")

assert mod.assert_unique_gate_facility(listing)[0]["verified_facility_url"].startswith("https://alsi.gie.eu/api?")
tampered = [{"name": "Gate Terminal B.V.", "eic": mod.GATE_OPERATOR_EIC, "facilities": [
    {"name": "Gate LNG", "country": "NL", "company": mod.GATE_OPERATOR_EIC, "eic": "21W-TEST",
     "url": "/api?country=NL&company=21X-UNRELATED&facility=21W-TEST"}]}]
try:
    mod.assert_unique_gate_facility(tampered)
except ValueError:
    pass
else:
    raise AssertionError("Inconsistent GIE facility URL was accepted")
print("GIE listed URL identity consistency checks passed")

for injected in ("&page=2", "&size=1", "&from=2025-01-01", "&to=2027-01-01", "&show=listing", "&facility=21W-OTHER"):
    try:
        mod.validate_facility_identity(url + injected)
    except ValueError:
        pass
    else:
        raise AssertionError("Unapproved facility query parameter accepted: " + injected)
for injected in ("&page=2", "&size=1", "&show=listing"):
    try:
        mod.fetch_all_pages(url + "&from=2026-10-01&to=2026-10-31" + injected, "dummy", mock_fetch)
    except ValueError:
        pass
    else:
        raise AssertionError("Unexpected paged ALSI query parameter accepted: " + injected)
print("ALSI query parameter injection tests passed")

verified = mod.verify_against_listing(url, listing)
assert mod.enforce_listed_facility_url(url, verified) == verified["verified_facility_url"]
reordered = "https://alsi.gie.eu/api?facility=21W-TEST&company=21X000000001063H&country=NL"
assert mod.enforce_listed_facility_url(reordered, verified) == verified["verified_facility_url"]
try:
    mod.enforce_listed_facility_url("https://alsi.gie.eu/api?country=NL&company=21X000000001063H&facility=21W-OTHER", verified)
except ValueError:
    pass
else:
    raise AssertionError("Non-listed facility URL accepted")
print("GIE authenticated facility URL source-of-truth tests passed")
