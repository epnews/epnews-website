#!/usr/bin/env python3
"""Classify source basis behind October Gate origin labels, without certifying cargo origin."""
import argparse
import json
from collections import Counter
from pathlib import Path

def classify(x):
    origin=x.get("origin") or {}
    basis=origin.get("basis","")
    if x.get("status")=="bevestigd" and x.get("doe"):
        return "same_voyage_doe_matched"
    if not origin.get("iso"):return "unknown"
    if "DOE-historie" in basis:return "historical_doe_voyages"
    if "AIS" in basis:return "ais_track_start"
    if "rederij" in basis or "agent" in basis:return "operator_or_agent_inference"
    if "Arc7" in basis or "Jamal" in basis:return "vessel_class_route_inference"
    return "other_unverified_inference"
def audit(data):
    rows=[]
    for x in data["lossingen"]:
        o=x.get("origin") or {}
        rows.append({"key":x["key"],"ship":x["ship"],"imo":x["imo"],
                     "origin_label":o.get("iso"),"likely":o.get("likely"),
                     "origin_evidence_basis":classify(x),
                     "doe_same_voyage_confirmed":x.get("status")=="bevestigd" and bool(x.get("doe")),
                     "certified_loading_origin":False})
    return {"arrival_records":len(rows),
            "origin_label_counts":dict(Counter(x["origin_label"] or "unknown" for x in rows)),
            "basis_counts":dict(Counter(x["origin_evidence_basis"] for x in rows)),
            "same_voyage_doe_confirmations":sum(x["doe_same_voyage_confirmed"] for x in rows),
            "rows":rows,
            "warning":"Origin labels and historical DOE voyages are not independently verified loading origin for the current voyage."}
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
