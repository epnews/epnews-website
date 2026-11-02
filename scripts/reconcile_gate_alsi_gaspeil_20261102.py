#!/usr/bin/env python3
"""Reconcile Gaspeil vessel assignments to Gate ALSI+ operator gas days.

Inputs are separate research artifacts. A matching gas-day does NOT establish
a certified vessel discharge or independent corroboration.
"""
import argparse
import json
from collections import defaultdict
from decimal import Decimal
from pathlib import Path

def reconcile(alsi, gaspeil):
    rows = alsi["data"]
    days = {}
    for row in rows:
        day = row["gasDayStart"]
        if day in days:
            raise ValueError("Duplicate operator gas day: " + day)
        days[day] = row
    payload = gaspeil.get("data", gaspeil)
    vessels = payload["lossingen"]
    matches = defaultdict(list)
    flags = []
    for vessel in vessels:
        arrival = vessel["arrivedAt"][:10]
        day = vessel.get("measuredGasDay")
        status = vessel["status"]
        if day:
            matches[day].append(vessel)
            if day < arrival:
                flags.append({"type": "measurement_before_arrival", "key": vessel["key"], "gas_day": day, "arrival_day": arrival})
            if day not in days:
                flags.append({"type": "operator_day_unavailable", "key": vessel["key"], "gas_day": day})
            elif days[day].get("status") != "C":
                flags.append({"type": "operator_day_not_confirmed", "key": vessel["key"], "gas_day": day, "operator_status": days[day].get("status")})
        if status == "gemeten" and (not day or vessel.get("measuredGwh") is None):
            flags.append({"type": "incomplete_measured_record", "key": vessel["key"]})
        if status == "geschat" and day:
            flags.append({"type": "estimated_record_has_measured_day", "key": vessel["key"]})
    for day, records in matches.items():
        if len(records) > 1:
            flags.append({"type": "shared_operator_gas_day", "gas_day": day, "keys": [v["key"] for v in records],
                          "reported_measured_gwh": [v.get("measuredGwh") for v in records]})
    daily = []
    for day in sorted(days):
        row = days[day]
        daily.append({"gas_day": day, "operator_status": row["status"],
                      "operator_inventory_gwh": str(Decimal(row["inventory"]["gwh"])),
                      "operator_sendout_raw": row.get("sendOut"),
                      "assigned_vessels": [{"key": v["key"], "imo": v["imo"], "measured_gwh": v.get("measuredGwh")} for v in matches.get(day, [])]})
    return {"operator_days": len(days), "gaspeil_records": len(vessels), "exceptions": flags,
            "daily_comparison": daily, "caveat": "Gaspeil gemeten derives from ALSI+ inventory: same-source comparison is not independent discharge verification. Do not sum vessel estimates into certified imports."}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--alsi", required=True, help="GIE artifact gate-alsi-operator-october-2026.json")
    ap.add_argument("--gaspeil", required=True, help="Gaspeil snapshot wrapper or API JSON")
    ap.add_argument("--output", default="gate-october-alsi-gaspeil-reconciliation.json")
    args = ap.parse_args()
    result = reconcile(json.loads(Path(args.alsi).read_text()), json.loads(Path(args.gaspeil).read_text()))
    Path(args.output).write_text(json.dumps(result, indent=2, ensure_ascii=False)+"\n")
    print(json.dumps({"operator_days":result["operator_days"],"gaspeil_records":result["gaspeil_records"],"exceptions":result["exceptions"]},indent=2))

if __name__ == "__main__":
    main()
