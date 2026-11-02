#!/usr/bin/env python3
"""Analyze UTC arrival-hour distribution by Gaspeil attributed gas-day label offset."""
import argparse
import json
from collections import defaultdict
from datetime import datetime,date,timezone
from pathlib import Path

def audit(data):
    groups=defaultdict(list)
    for x in data["lossingen"]:
        day=x.get("measuredGasDay")
        if day is None:continue
        arrival=datetime.fromisoformat(x["arrivedAt"].replace("Z","+00:00"))
        if arrival.tzinfo is None:raise ValueError("timezone-aware arrival required")
        arrival=arrival.astimezone(timezone.utc)
        delta=(date.fromisoformat(day)-arrival.date()).days
        groups[delta].append({"key":x["key"],"ship":x["ship"],
                              "arrival_hour_utc":arrival.hour,"arrival_minute_utc":arrival.minute})
    result={}
    for offset,items in sorted(groups.items()):
        result[str(offset)]={"records":len(items),"utc_arrival_hours":[x["arrival_hour_utc"] for x in items],
                             "earliest_arrival_hour_utc":min(x["arrival_hour_utc"] for x in items),
                             "latest_arrival_hour_utc":max(x["arrival_hour_utc"] for x in items),
                             "arrival_keys":[x["key"] for x in items]}
    return {"measured_arrival_records":sum(x["records"] for x in result.values()),
            "offset_groups":result,
            "warning":"Calendar-day offsets and arrival-hour clustering cannot establish terminal gas-day cutoff, actual unloading order or source timestamp definition."}
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
