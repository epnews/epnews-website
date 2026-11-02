#!/usr/bin/env python3
"""Generate a single reproducible Gate October evidence-quality report from raw artifacts.

Never infer certified discharge, cargo origin, company revenue, or geopolitical score.
"""
import argparse
import json
from collections import defaultdict
from datetime import date
from pathlib import Path

def report(operator, snapshot):
    raw=snapshot.get("data",snapshot)
    vessels=raw["lossingen"]
    days={r["gasDayStart"][:10]:r for r in operator["data"]}
    if len(days)!=len(operator["data"]):
        raise ValueError("duplicate operator gas day")
    by_day=defaultdict(list)
    exceptions=[]
    for v in vessels:
        if v.get("terminal")!="gate":
            raise ValueError("non-Gate vessel in filtered snapshot")
        day=v.get("measuredGasDay")
        if not day:
            continue
        by_day[day].append(v)
        if day not in days:
            exceptions.append({"type":"missing_operator_day","imo":v["imo"],"day":day})
        elif days[day].get("status")!="C":
            exceptions.append({"type":"nonconfirmed_operator_day","imo":v["imo"],"day":day,"status":days[day].get("status")})
        arrival=v["arrivedAt"][:10]
        if day < arrival:
            exceptions.append({"type":"measured_before_arrival","imo":v["imo"],"day":day,"arrival":arrival})
    for day,vs in sorted(by_day.items()):
        if len(vs)>1:
            exceptions.append({"type":"shared_measured_day","day":day,"imos":[v["imo"] for v in vs],
                               "measured_gwh":[v.get("measuredGwh") for v in vs]})
    quality={}
    for v in vessels:
        key=v.get("status","unknown")
        quality[key]=quality.get(key,0)+1
    operator_quality={}
    for v in days.values():
        key=v.get("status","unknown")
        operator_quality[key]=operator_quality.get(key,0)+1
    return {"source_operator":operator.get("facility_api_url"),"source_gaspeil":"https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31",
            "operator_days":len(days),"operator_quality":operator_quality,"vessel_arrivals":len(vessels),
            "vessel_quality":quality,"distinct_measured_days":len(by_day),"exceptions":exceptions,
            "missing_september_30_baseline":"2026-09-30" not in days,
            "independent_cargo_certifications":0 if quality.get("bevestigd",0)==0 else None,
            "caveat":"Gaspeil measured assignments derive from GIE ALSI+ stock changes and are not independent unloading evidence. Origin labels and TTF values are not verified cargo origin or realized profit."}

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--operator",required=True)
    p.add_argument("--gaspeil",required=True)
    p.add_argument("--output",default="gate-october-integrated-evidence-audit.json")
    a=p.parse_args()
    result=report(json.loads(Path(a.operator).read_text()),json.loads(Path(a.gaspeil).read_text()))
    Path(a.output).write_text(json.dumps(result,indent=2,ensure_ascii=False)+"\n")
    print(json.dumps(result,indent=2,ensure_ascii=False))
if __name__=="__main__":main()
