#!/usr/bin/env python3
"""Detect duplicate LNG gas-day attribution without deleting legitimate repeat visits."""
import argparse
import json
from collections import defaultdict
from pathlib import Path

def audit(data):
    rows=data["lossingen"]
    keys=set()
    same_imo=defaultdict(list)
    measured_day=defaultdict(list)
    for x in rows:
        if x["key"] in keys:raise ValueError("duplicate arrival event key")
        keys.add(x["key"])
        same_imo[x["imo"]].append(x)
        if x.get("measuredGasDay") and x.get("measuredGwh") is not None:
            measured_day[x["measuredGasDay"]].append(x)
    collisions=[]
    for day,group in sorted(measured_day.items()):
        if len(group)<2:continue
        byvolume=defaultdict(list)
        for x in group:byvolume[x["measuredGwh"]].append(x)
        for volume,items in byvolume.items():
            if len(items)>1:
                collisions.append({"gas_day":day,"assigned_gwh":volume,
                                   "arrival_keys":[x["key"] for x in items],
                                   "imos":[x["imo"] for x in items],
                                   "potential_duplicate_exposure_gwh":volume*(len(items)-1)})
    repeat_visits=[{"imo":imo,"arrival_keys":[x["key"] for x in v]}
                   for imo,v in sorted(same_imo.items()) if len(v)>1]
    return {"arrival_records":len(rows),"unique_imos":len(same_imo),
            "repeat_imo_visits":repeat_visits,"measured_day_volume_collisions":collisions,
            "potential_duplicate_exposure_gwh":sum(x["potential_duplicate_exposure_gwh"] for x in collisions),
            "raw_best_available_sum_gwh":sum(x["cargoGwh"] for x in rows),
            "noncertified_adjusted_sum_gwh":sum(x["cargoGwh"] for x in rows)-sum(x["potential_duplicate_exposure_gwh"] for x in collisions),
            "warning":"Adjusted sum is an exploratory sensitivity scenario, NOT verified physical unloading or net imports."}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--input",required=True)
    p.add_argument("--output")
    a=p.parse_args()
    result=audit(json.loads(Path(a.input).read_text()))
    output=json.dumps(result,indent=2)+"\n"
    if a.output:Path(a.output).write_text(output)
    print(output,end="")
if __name__=="__main__":main()
