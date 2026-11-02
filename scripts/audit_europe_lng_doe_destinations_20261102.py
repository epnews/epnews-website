#!/usr/bin/env python3
"""Audit the 15 DOE-reported vessel departures without treating destinations as discharges."""
import collections
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data/europe-lng-doe-four-vessel-2026-jan-aug-20261102.json"
OUTPUT = ROOT / "data/europe-lng-doe-four-vessel-destination-audit-20261102.json"

def summarize(doc):
    rows = doc["records_2026_jan_aug"]
    assert len(rows) == 15, "Expected exactly 15 manually reviewed DOE rows"
    assert len({(r["vessel"], r["departure_date"], r["export_terminal"], r["reported_destination"]) for r in rows}) == 15, "Duplicate vessel departure keys"
    assert all(r["departure_date"].startswith("2026-") and "2026-01-01" <= r["departure_date"] <= "2026-08-31" for r in rows)
    assert all(isinstance(r["volume_mmcf"], (int, float)) and 0 < r["volume_mmcf"] < 10000 for r in rows)
    by_destination = collections.defaultdict(list)
    by_vessel = collections.Counter()
    for row in rows:
        by_destination[row["reported_destination"]].append(row)
        by_vessel[row["vessel"]] += 1
    return {
        "source_sha256": doc["source_sha256"],
        "period": "2026-01 through 2026-08",
        "total_rows": len(rows),
        "vessel_counts": dict(sorted(by_vessel.items())),
        "reported_destinations": {
            k: {"departures": len(v), "total_reported_volume_mmcf": round(sum(x["volume_mmcf"] for x in v), 2)}
            for k, v in sorted(by_destination.items())
        },
        "netherlands_records": [
            {k: row[k] for k in ("vessel", "departure_date", "export_terminal", "reported_destination", "volume_mmcf")}
            for row in rows if row["reported_destination"] == "Netherlands"
        ],
        "measurement_boundary": "DOE reported destination on U.S. export departure; not certified discharge or October Rotterdam delivery",
        "scope_warning": "Four selected vessel leads only; not a country-level DOE export total or a representative sample",
    }

if __name__ == "__main__":
    summary = summarize(json.loads(SOURCE.read_text()))
    OUTPUT.write_text(json.dumps(summary, indent=2) + "\n")
    print(f"Wrote {OUTPUT} ({summary['total_rows']} departures)")
