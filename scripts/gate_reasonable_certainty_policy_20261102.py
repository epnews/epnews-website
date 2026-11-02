#!/usr/bin/env python3
"""Heuristic Gate LNG confidence: claim-specific admissibility and independent families.

Policy points are NOT calibrated probabilities or permission to change SOI scores.
"""
import argparse
import json
from pathlib import Path

LEVELS={"primary_document":35,"independent_port_record":25,"independent_ais":15,
        "operator_inventory":15,"aggregated_ship_log":10,"historical_voyage":5}
BANDS=((90,"high"),(75,"reasonably_certain"),(0,"preliminary"))
# A source must be probative for the claim, not merely an impressive document.
ADMISSIBLE={
    "port_call":{"independent_port_record","independent_ais","aggregated_ship_log"},
    "berth":{"primary_document","independent_port_record","independent_ais","aggregated_ship_log"},
    "discharge_volume":{"primary_document"},
    "voyage_origin":{"primary_document"},
    "realized_revenue":{"primary_document"},
    "geopolitical_effect":{"primary_document"},
}
REQUIRED_PRIMARY={"discharge_volume","voyage_origin","realized_revenue","geopolitical_effect"}
def evaluate(item):
    claim=item.get("claim","")
    claim_type=item.get("claim_type")
    if claim_type not in ADMISSIBLE:raise ValueError("known claim_type required")
    observations=item.get("observations",[])
    if not isinstance(observations,list) or any(not isinstance(x,dict) for x in observations):
        raise ValueError("observations must be objects")
    families={}
    excluded=[]
    for x in observations:
        family=x.get("source_family")
        kind=x.get("kind")
        if not isinstance(family,str) or not family.strip() or kind not in LEVELS:
            raise ValueError("source_family and known kind required")
        if kind not in ADMISSIBLE[claim_type]:
            excluded.append({"source_family":family,"kind":kind,"reason":"not_probative_for_claim"})
            continue
        families[family]=max(families.get(family,0),LEVELS[kind])
    points=min(100,sum(families.values()))
    independent=len(families)>=2
    material=item.get("material_conflict",False)
    unexplained=item.get("unexplained_discrepancy",False)
    if not isinstance(material,bool) or not isinstance(unexplained,bool):
        raise ValueError("conflict flags must be boolean")
    has_primary=any(x.get("kind")=="primary_document" and x.get("source_family") in families for x in observations)
    veto=material or unexplained or not independent or (claim_type in REQUIRED_PRIMARY and not has_primary)
    band="preliminary" if veto else next(label for floor,label in BANDS if points>=floor)
    return {"claim":claim,"claim_type":claim_type,"policy_points":points,"confidence_band":band,
            "independent_source_families":len(families),"excluded_nonprobative":excluded,
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
