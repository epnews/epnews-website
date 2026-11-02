#!/usr/bin/env python3
"""Validate observed AIS-derived Gate call event durations; never infer cargo discharge."""
import json
from datetime import datetime
from pathlib import Path
p = Path(__file__).resolve().parents[1] / "data/europe-lng-gate-october-ais-port-calls-20261102.json"
data = json.loads(p.read_text())
assert len(data["records"]) == 4
assert len({r["imo"] for r in data["records"]}) == 4
for r in data["records"]:
    start = datetime.fromisoformat(r["arrival_utc"].replace("Z", "+00:00"))
    end = datetime.fromisoformat(r["departure_utc"].replace("Z", "+00:00"))
    assert (end - start).total_seconds() / 60 == r["duration_minutes"]
    assert r["duration_minutes"] > 0
assert sorted(r["duration_minutes"] for r in data["records"]) == [3, 15, 1246, 1698]
assert data["classification"] == "third_party_ais_port_call_not_certified_unloading"
print("Gate October AIS call validation passed; no discharge inferred")
