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
