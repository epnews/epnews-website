#!/usr/bin/env python3
"""Audit arrival timestamps vs Gaspeil assigned measurement gas-day labels.

Do NOT infer the GIE gas-day timezone or measurement interval from a date label.
"""
import argparse
import json
from collections import Counter
from datetime import date,datetime,timezone
from pathlib import Path

def audit(data):
    rows=[]
    for x in data["lossingen"]:
        day=x.get("measuredGasDay")
        if not day:continue
        arrived=datetime.fromisoformat(x["arrivedAt"].replace("Z","+00:00"))
        if arrived.tzinfo is None:raise ValueError("arrivedAt must be timezone aware")
        offset=(date.fromisoformat(day)-arrived.astimezone(timezone.utc).date()).days
        rows.append({"ship":x["ship"],"imo":x["imo"],"arrival_key":x["key"],
                     "arrived_at_utc":x["arrivedAt"],"measured_gas_day":day,
                     "utc_calendar_day_offset":offset,
                     "requires_event_definition_review":offset<0,
                     "proven_causality":False})
    return {"measured_arrival_records":len(rows),
            "utc_day_offset_counts":dict(sorted(Counter(str(x["utc_calendar_day_offset"]) for x in rows).items())),
            "prearrival_utc_day_labels":sum(x["utc_calendar_day_offset"]<0 for x in rows),
            "rows":rows,
            "warning":"A UTC calendar-day offset is not a physical unload chronology; gas-day boundaries, reporting revisions and event definitions remain unverified."}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--input",required=True)
    p.add_argument("--output")
    a=p.parse_args()
    result=audit(json.loads(Path(a.input).read_text()))
    out=json.dumps(result,indent=2)+"\n"
    if a.output:Path(a.output).write_text(out)
    print(out,end="")
if __name__=="__main__":main()
