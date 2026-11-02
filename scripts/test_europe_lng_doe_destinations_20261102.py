#!/usr/bin/env python3
"""Verify committed DOE destination summary against source records."""
import importlib.util
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
script = Path(__file__).with_name("audit_europe_lng_doe_destinations_20261102.py")
spec = importlib.util.spec_from_file_location("doe_destinations", script)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
source = json.loads((root / "data/europe-lng-doe-four-vessel-2026-jan-aug-20261102.json").read_text())
actual = module.summarize(source)
expected = json.loads((root / "data/europe-lng-doe-four-vessel-destination-audit-20261102.json").read_text())
assert actual == expected, "Destination audit does not match source DOE rows"
assert actual["reported_destinations"]["Netherlands"]["departures"] == 2
assert actual["reported_destinations"]["Netherlands"]["total_reported_volume_mmcf"] == 7240.46
assert actual["total_rows"] == 15
print("DOE reported-destination audit regression passed")
