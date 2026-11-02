#!/usr/bin/env python3
"""Fetch and preserve a reproducible Gaspeil October Gate snapshot.

Public API: https://www.gaspeil.nl/api-docs (CC BY 4.0).
This is third-party modeled/attributed vessel data, not certified unloading.
"""
import argparse
import json
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen

URL = "https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31"

def analyze(data):
    if data.get("ok") is not True or not isinstance(data.get("lossingen"), list):
        raise ValueError("Unexpected Gaspeil API payload")
    records = data["lossingen"]
    if data.get("count") != len(records):
        raise ValueError("API count differs from records length")
    status = Counter()
    origins = Counter()
    by_day = defaultdict(list)
    conflicts = []
    keys = set()
    for v in records:
        if v.get("terminal") != "gate" or not ("2026-10-01" <= v.get("arrivedAt", "")[:10] <= "2026-10-31"):
            raise ValueError("Record outside requested terminal or arrival window")
        if v.get("status") not in {"geschat", "gemeten", "bevestigd"}:
            raise ValueError("Unknown quality status")
        if not v.get("imo") or not v.get("key") or v["key"] in keys:
            raise ValueError("Missing IMO/key or duplicate record key")
        keys.add(v["key"])
        status[v["status"]] += 1
        origins[(v.get("origin") or {}).get("iso") or "unknown"] += 1
        day = v.get("measuredGasDay")
        if day:
            by_day[day].append({"imo": v["imo"], "ship": v.get("ship"), "measuredGwh": v.get("measuredGwh")})
            if day < v["arrivedAt"][:10]:
                conflicts.append({"imo": v["imo"], "ship": v.get("ship"), "arrivedAt": v["arrivedAt"], "measuredGasDay": day})
    return {
        "record_count": len(records),
        "status_counts": dict(status),
        "origin_label_counts_not_certified": dict(origins),
        "duplicate_measured_gas_days": {k: vs for k,vs in by_day.items() if len(vs)>1},
        "measured_day_precedes_arrival_date": conflicts,
        "interpretation": "Gaspeil tank-stock-derived associations and inferred origin labels; not certified vessel discharge or cargo-origin records",
        "source": URL,
        "attribution": "Gaspeil.nl based on Port of Rotterdam, AIS, GIE ALSI+ and DOE"
    }

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", help="Optional local JSON fixture; avoids network for tests")
    ap.add_argument("--output", default="gate-gaspeil-october-2026-snapshot.json")
    ap.add_argument("--summary", default="gate-gaspeil-october-2026-summary.json")
    args = ap.parse_args()
    if args.input:
        data = json.loads(Path(args.input).read_text(encoding="utf-8"))
    else:
        request = Request(URL, headers={"User-Agent": "EPNewsResearch/1.0 (public Gaspeil API; source attribution)"})
        with urlopen(request, timeout=30) as response:
            data = json.load(response)
    summary = analyze(data)
    Path(args.output).write_text(json.dumps({"retrievedAtUtc": datetime.now(timezone.utc).isoformat(), "data": data}, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    Path(args.summary).write_text(json.dumps(summary, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    print(json.dumps(summary, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
