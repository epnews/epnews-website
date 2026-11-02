#!/usr/bin/env python3
"""Audit whether attributed inventory gas days have two confirmed adjacent stocks."""
import argparse
import json
from collections import Counter
from datetime import date,timedelta
from pathlib import Path

def audit(operator,snapshot):
    days={}
    for x in operator["data"]:
        d=x["gasDayStart"][:10]
        if d in days:raise ValueError("duplicate operator day")
        if x.get("status") not in ("C","E","N"):raise ValueError("invalid operator status")
        days[d]=x
    out=[]
    for x in snapshot.get("data",snapshot)["lossingen"]:
        d=x.get("measuredGasDay")
        if d is None:
            if x.get("measuredGwh") is not None:raise ValueError("volume without gas day")
            continue
        if x.get("measuredGwh") is None:raise ValueError("gas day without volume")
        prev=(date.fromisoformat(d)-timedelta(days=1)).isoformat()
        now,prior=days.get(d),days.get(prev)
        def valid(row):
            return bool(row and row.get("status")=="C" and isinstance(row.get("inventory"),dict) and row["inventory"].get("gwh") is not None)
        eligible=valid(now) and valid(prior)
        reasons=[]
        if not valid(now):reasons.append("current_inventory_not_confirmed_or_missing")
        if not valid(prior):reasons.append("prior_inventory_not_confirmed_or_missing")
        out.append({"arrival_key":x["key"],"measured_gas_day":d,
                    "current_operator_status":now.get("status") if now else "MISSING",
                    "prior_operator_status":prior.get("status") if prior else "MISSING",
                    "eligible_for_confirmed_adjacent_stock_delta":eligible,
                    "ineligible_reasons":reasons,
                    "warning":"Even two C inventory observations only establish a facility stock delta, not individual vessel discharge."})
    counts=Counter("eligible" if x["eligible_for_confirmed_adjacent_stock_delta"] else "withheld" for x in out)
    return {"measured_arrival_records":len(out),"confirmed_adjacent_stock_eligible":counts["eligible"],
            "confirmed_adjacent_stock_withheld":counts["withheld"],
            "rows":out,"warning":"An E or missing prior day invalidates a C/C stock delta even when the vessel-assigned current day is C. Eligibility never certifies cargo unloading."}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--operator",required=True)
    p.add_argument("--snapshot",required=True)
    p.add_argument("--output")
    a=p.parse_args()
    result=audit(json.loads(Path(a.operator).read_text(encoding="utf-8")),
                 json.loads(Path(a.snapshot).read_text(encoding="utf-8")))
    out=json.dumps(result,indent=2)+"\n"
    if a.output:Path(a.output).write_text(out,encoding="utf-8")
    print(out,end="")
if __name__=="__main__":main()
