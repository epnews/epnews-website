#!/usr/bin/env python3
"""Transparent, conservative *heuristic* confidence assessment for Gate claims.

Confidence points are ordinal policy bands, NOT calibrated probabilities.
Independent evidence requires distinct underlying source families.
"""
import argparse
import json
from pathlib import Path

LEVELS={"primary_document":35,"independent_port_record":25,"independent_ais":15,
        "operator_inventory":15,"aggregated_ship_log":10,"historical_voyage":5}
BANDS=((90,"high"),(75,"reasonably_certain"),(0,"preliminary"))
def evaluate(item):
    claim=item.get("claim","")
    observations=item.get("observations",[])
    if not isinstance(observations,list) or any(not isinstance(x,dict) for x in observations):
        raise ValueError("observations must be objects")
    # Multiple copies of one underlying source family earn credit only once.
    families={}
    for x in observations:
        family=x.get("source_family")
        kind=x.get("kind")
        if not family or kind not in LEVELS:raise ValueError("source_family and known kind required")
        families[family]=max(families.get(family,0),LEVELS[kind])
    points=min(100,sum(families.values()))
    independent=len(families)>=2
    material=bool(item.get("material_conflict",False))
    unexplained=bool(item.get("unexplained_discrepancy",False))
    # Material conflict is a hard veto, not a modest point penalty.
    if material or unexplained or not independent:band="preliminary"
    else:band=next(label for floor,label in BANDS if points>=floor)
    return {"claim":claim,"policy_points":points,"confidence_band":band,
            "independent_source_families":len(families),
            "material_conflict":material,"unexplained_discrepancy":unexplained,
            "estimated_probability":None,"eligible_for_meter":False}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--input",required=True)
    p.add_argument("--output")
    a=p.parse_args()
    data=json.loads(Path(a.input).read_text())
    if not isinstance(data,list):raise ValueError("input must be a list")
    result=[evaluate(x) for x in data]
    output=json.dumps(result,indent=2)+"\n"
    if a.output:Path(a.output).write_text(output)
    print(output,end="")
if __name__=="__main__":main()
