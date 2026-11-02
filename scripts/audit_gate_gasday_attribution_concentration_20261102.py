#!/usr/bin/env python3
"""Group Gaspeil stock-derived assignments by gas day; detect concentration and collisions."""
import argparse
import json
from collections import defaultdict
from decimal import Decimal
from pathlib import Path

def audit(data):
    rows=data["lossingen"]
    groups=defaultdict(list)
    for x in rows:
        day=x.get("measuredGasDay")
        volume=x.get("measuredGwh")
        if day is None and volume is None:continue
        if day is None or volume is None:raise ValueError("partial measured day/volume")
        groups[day].append(x)
    days=[]
    for day,items in sorted(groups.items()):
        volumes=[Decimal(str(x["measuredGwh"])) for x in items]
        collision=len(items)>1 and len(set(volumes))<len(volumes)
        days.append({"gas_day":day,"assignment_count":len(items),
                     "assigned_volume_sum_gwh":int(sum(volumes,Decimal(0))),
                     "arrival_keys":[x["key"] for x in items],
                     "same_volume_collision":collision})
    measured=sum(x["assignment_count"] for x in days)
    multi=[x for x in days if x["assignment_count"]>1]
    return {"measured_arrival_records":measured,"distinct_measured_gas_days":len(days),
            "multi_assignment_gas_days":len(multi),
            "records_on_multi_assignment_days":sum(x["assignment_count"] for x in multi),
            "multi_assignment_days":multi,
            "days":days,
            "warning":"Gaspeil measuredGwh is attributed from terminal inventory movements. Summing same-day assignments may duplicate one inventory change; no discharge or gas-day operational boundary is certified."}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--input",required=True)
    p.add_argument("--output")
    a=p.parse_args()
    result=audit(json.loads(Path(a.input).read_text(encoding="utf-8")))
    out=json.dumps(result,indent=2)+"\n"
    if a.output:Path(a.output).write_text(out,encoding="utf-8")
    print(out,end="")
if __name__=="__main__":main()
