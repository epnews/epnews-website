#!/usr/bin/env python3
"""Deterministic evidence promotion rules for Gate October vessel claims.

A source is independent only when it is not a second presentation of GIE/Gaspeil.
No automatic vessel, origin, revenue or SOI-score promotion from modeled data.
"""
import argparse
import json
from pathlib import Path

def classify(item):
    evidence=item.get("evidence",[])
    if not isinstance(evidence,list): raise ValueError("evidence must be a list")
    if any(not isinstance(x,dict) for x in evidence): raise ValueError("invalid evidence item")
    kinds={x.get("kind") for x in evidence}
    ids={x.get("source_id") for x in evidence if x.get("source_id")}
    if "terminal_discharge_certificate" in kinds and "independent_port_berth_record" in kinds and len(ids)>=2:
        discharge="certified_vessel_discharge"
    elif "independent_port_berth_record" in kinds:
        discharge="berth_corrob_only"
    elif "gaspeil_ship_page" in kinds or "gaspeil_api" in kinds:
        discharge="modeled_or_reported_only"
    else:
        discharge="unverified"
    if "voyage_specific_loading_certificate" in kinds and "terminal_discharge_certificate" in kinds and len(ids)>=2:
        origin="voyage_documented"
    elif "ais_loading_port_visit" in kinds:
        origin="voyage_lead_only"
    else:
        origin="unverified"
    return {"imo":item.get("imo"),"discharge_status":discharge,"origin_status":origin,
            "revenue_status":"not_established","soi_score_eligible":False,
            "source_ids":sorted(ids)}

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--input",required=True)
    p.add_argument("--output",default="gate-vessel-evidence-decision-audit.json")
    a=p.parse_args()
    items=json.loads(Path(a.input).read_text())
    if not isinstance(items,list): raise ValueError("expected list of vessel records")
    results=[classify(x) for x in items]
    Path(a.output).write_text(json.dumps(results,indent=2)+"\n")
    print(json.dumps(results,indent=2))
if __name__=="__main__":main()
