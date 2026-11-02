#!/usr/bin/env python3
"""Apply non-scoring evidence gates to Gate vessel inventory attributions."""
import argparse
import json
from collections import Counter
from pathlib import Path

def audit(operator,snapshot):
    by_day={}
    for row in operator["data"]:
        day=row["gasDayStart"][:10]
        if day in by_day:raise ValueError("duplicate operator gas day")
        status=row.get("status")
        if status not in ("C","E","N"):raise ValueError("unrecognized operator status")
        by_day[day]=status
    arrivals=snapshot.get("data",snapshot)["lossingen"]
    day_counts=Counter(x["measuredGasDay"] for x in arrivals if x.get("measuredGasDay"))
    output=[]
    for x in arrivals:
        day=x.get("measuredGasDay")
        volume=x.get("measuredGwh")
        if (day is None)!=(volume is None):raise ValueError("partial measured attribution")
        operator_status=by_day.get(day,"MISSING") if day else None
        reasons=[]
        if not day:reasons.append("no_inventory_derived_vessel_attribution")
        else:
            if operator_status!="C":reasons.append("operator_inventory_day_not_confirmed")
            if day_counts[day]>1:reasons.append("multiple_vessel_attributions_same_gas_day")
        reasons.append("no_independent_vessel_discharge_certificate")
        output.append({"arrival_key":x["key"],"measured_gas_day":day,
                       "operator_inventory_status":operator_status,
                       "shared_day_attribution_count":day_counts[day] if day else 0,
                       "requires_independent_discharge_evidence":True,
                       "blocked_claim_reasons":reasons})
    counts=Counter(reason for x in output for reason in x["blocked_claim_reasons"])
    return {"arrival_records":len(output),"inventory_attributed_records":sum(x["measured_gas_day"] is not None for x in output),
            "reason_counts":dict(sorted(counts.items())),"records":output,
            "warning":"These are conservative claim gates, not calibrated probabilities. C status is a confirmed operator inventory day, never certified vessel unloading."}
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
