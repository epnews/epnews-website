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
