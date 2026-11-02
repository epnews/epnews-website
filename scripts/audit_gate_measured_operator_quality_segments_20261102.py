#!/usr/bin/env python3
"""Segment measured Gaspeil vessel associations by operator daily reporting quality."""
import argparse
import json
from collections import defaultdict
from decimal import Decimal
from pathlib import Path

def audit(operator,snapshot):
    rows=operator["data"]
    days={}
    for x in rows:
        key=x["gasDayStart"][:10]
        if key in days:raise ValueError("duplicate operator gas day")
        days[key]=x["status"]
    data=snapshot.get("data",snapshot)
    grouped=defaultdict(list)
    for x in data["lossingen"]:
        day=x.get("measuredGasDay")
        if day is None:continue
        if x.get("measuredGwh") is None:raise ValueError("measured gas day missing volume")
        label=days.get(day,"MISSING")
        grouped[label].append(x)
    statuses={}
    for label in sorted(set(grouped)|{"C","E","MISSING"}):
        v=grouped[label]
        total=sum((Decimal(str(x["measuredGwh"])) for x in v),Decimal(0))
        statuses[label]={"arrival_assignments":len(v),"attributed_gwh":int(total),
                         "distinct_gas_days":len(set(x["measuredGasDay"] for x in v)),
                         "arrival_keys":[x["key"] for x in v]}
    return {"measured_arrival_records":sum(x["arrival_assignments"] for x in statuses.values()),
            "operator_status_segments":statuses,
            "warning":"Operator daily C confirms inventory reporting status, NOT certified vessel discharge. E is estimated operator inventory; missing is unavailable. Same-day attributed volumes may be duplicated."}
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
