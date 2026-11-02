#!/usr/bin/env python3
"""Audit consecutive operator inventory changes, never per-vessel cargo discharge."""
import argparse
import json
from datetime import date, timedelta
from decimal import Decimal, InvalidOperation
from pathlib import Path

def audit(payload):
    rows=payload["data"]
    by_day={}
    for row in rows:
        day=row["gasDayStart"][:10]
        if day in by_day:
            raise ValueError("Duplicate operator gas day: "+day)
        if row.get("status") not in ("C","E","N"):
            raise ValueError("Unknown operator status")
        by_day[day]=row
    out=[]
    for day in sorted(by_day):
        if not day.startswith("2026-10-"):
            continue
        current=by_day[day]
        previous=(date.fromisoformat(day)-timedelta(days=1)).isoformat()
        prev=by_day.get(previous)
        def stock(row):
            if not row or not isinstance(row.get("inventory"),dict):
                return None
            v=row["inventory"].get("gwh")
            if v is None: return None
            try: return Decimal(str(v))
            except InvalidOperation: raise ValueError("Invalid inventory GWh")
        a, z=stock(current),stock(prev)
        both=bool(prev and current.get("status")=="C" and prev.get("status")=="C" and a is not None and z is not None)
        out.append({"gas_day":day,"status":current.get("status"),"prior_gas_day":previous,
                    "prior_status":prev.get("status") if prev else None,
                    "stock_gwh":str(a) if a is not None else None,
                    "prior_stock_gwh":str(z) if z is not None else None,
                    "inventory_delta_gwh":str(a-z) if both else None,
                    "delta_withheld_reason":None if both else ("missing_prior_day" if not prev else "estimated_or_missing_stock_or_status"),
                    "interpretation":"Consecutive reported stock difference only, NOT vessel cargo discharge"})
    return {"days":out,"valid_confirmed_day_deltas":sum(x["inventory_delta_gwh"] is not None for x in out),
            "missing_september_30_baseline":not ("2026-09-30" in by_day),
            "source":payload.get("source"),"warning":"Do not infer vessel unloading, country of origin, gross revenue, or geopolitical benefit from stock changes."}

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--operator",required=True)
    ap.add_argument("--output",default="gate-october-inventory-delta-audit.json")
    args=ap.parse_args()
    result=audit(json.loads(Path(args.operator).read_text(encoding="utf-8")))
    Path(args.output).write_text(json.dumps(result,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({"days":len(result["days"]),"valid_confirmed_day_deltas":result["valid_confirmed_day_deltas"],
                      "missing_september_30_baseline":result["missing_september_30_baseline"]},indent=2))
if __name__=="__main__": main()
