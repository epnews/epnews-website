#!/usr/bin/env python3
"""Check independent arithmetic invariants across Gate diagnostics from one snapshot."""
import argparse
import json
from decimal import Decimal
from pathlib import Path

def check(report):
    n=report["arrival_records"]
    measured=report["measured_records"]
    d=report["diagnostics"]
    status=d["unmeasured_exposure"]["by_status"]
    estimated=status["geschat"]["records"]
    stock=status["gemeten"]["records"]
    confirmed=status["bevestigd"]["records"]
    if estimated+stock+confirmed!=n:raise ValueError("Status counts do not sum to arrivals")
    if stock+confirmed!=measured:raise ValueError("Measured status count differs from measured records")
    if d["gasday_concentration"]["measured_arrival_records"]!=measured:
        raise ValueError("Gas-day attribution count differs")
    days=d["gasday_concentration"]["distinct_measured_gas_days"]
    offsets=d["gasday_utc_offsets"]["utc_day_offset_counts"]
    if sum(int(x) for x in offsets.values())!=measured:
        raise ValueError("UTC offset histogram count differs")
    offset_hours=d["gasday_offset_hours"]["offset_groups"]
    for offset,count in offsets.items():
        if offset_hours.get(str(offset),{}).get("records")!=count:
            raise ValueError("UTC offset hour grouping mismatch")
    raw=Decimal(str(d["unmeasured_exposure"]["raw_proxy_volume_gwh"]))
    bystatus=sum((Decimal(str(x["proxy_gwh"])) for x in status.values()),Decimal(0))
    if raw!=bystatus:raise ValueError("Volume status buckets do not reconcile")
    if Decimal(str(d["unmeasured_exposure"]["indicative_value_eur"]))!=Decimal(str(d["ttf_value_sensitivity"]["reported_indicative_value_eur"])):
        raise ValueError("Published indicative valuations disagree")
    if d["gasday_concentration"]["multi_assignment_gas_days"]>days:
        raise ValueError("Invalid gas-day collision count")
    return {"arrival_records":n,"measured_records":measured,"estimated_only_records":estimated,
            "distinct_measured_gas_days":days,"status_volume_gwh":int(raw),
            "checks_passed":["status_partition","measured_count","gasday_count","offset_histogram",
                             "offset_hour_histogram","volume_partition","indicative_value_reconciliation",
                             "collision_day_bound"],
            "warning":"Internal consistency does not prove independent vessel discharge, commercial price, cargo origin or net economic benefit."}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--report",required=True)
    p.add_argument("--output")
    a=p.parse_args()
    result=check(json.loads(Path(a.report).read_text(encoding="utf-8")))
    out=json.dumps(result,indent=2)+"\n"
    if a.output:Path(a.output).write_text(out,encoding="utf-8")
    print(out,end="")
if __name__=="__main__":main()
