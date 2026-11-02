#!/usr/bin/env python3
"""Explicit source-dependence map for Gate vessel attribution and operator inventory."""
import argparse
import json
from collections import Counter
from pathlib import Path

SOURCES={
    "gaspeil_vessel_arrival":{"type":"aggregator","supports":["vessel_arrival_event"],"independent_of":["gie_operator_inventory"]},
    "gaspeil_measured_gwh":{"type":"derived_attribution","depends_on":["gie_operator_inventory","gaspeil_vessel_arrival"],"supports":["inventory_associated_vessel_proxy"]},
    "gie_operator_inventory":{"type":"operator_daily_inventory","supports":["facility_inventory_status","facility_inventory_stock"],"independent_of":[]},
}
def audit(operator,snapshot):
    day_status={}
    for x in operator["data"]:
        day=x["gasDayStart"][:10]
        if day in day_status:raise ValueError("duplicate operator day")
        day_status[day]=x["status"]
    rows=[]
    for x in snapshot.get("data",snapshot)["lossingen"]:
        measured=x.get("measuredGwh") is not None
        if measured!=(x.get("measuredGasDay") is not None):raise ValueError("partial measured attribution")
        day=x.get("measuredGasDay")
        status=day_status.get(day,"MISSING") if day else None
        rows.append({"arrival_key":x["key"],"inventory_derived_attribution":measured,
                     "operator_inventory_status":status,
                     "independent_cargo_volume_sources":0,
                     "operator_and_gaspeil_count_as_two_independent_discharge_confirmations":False,
                     "basis":["gaspeil_vessel_arrival","gaspeil_measured_gwh","gie_operator_inventory"] if measured else ["gaspeil_vessel_arrival"],
                     "discharge_certification_status":"not_independently_verified"})
    counts=Counter(x["operator_inventory_status"] or "NO_MEASUREMENT" for x in rows)
    return {"arrival_records":len(rows),"source_dependency_graph":SOURCES,
            "operator_status_counts":dict(sorted(counts.items())),"rows":rows,
            "warning":"Gaspeil measuredGwh is derived from GIE inventory observations, so these are dependent evidence streams for cargo quantity. Arrival tracking may supply separate event context, not certified cargo discharge."}
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
