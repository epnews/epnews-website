#!/usr/bin/env python3
"""Audit five Gate vessel claims using existing conservative claim-specific policy.

This report evaluates *available evidence*, not the probability a ship unloaded.
"""
import argparse
import json
from pathlib import Path
from gate_reasonable_certainty_policy_20261102 import evaluate

ROOT=Path(__file__).resolve().parents[1]
MATRIX=ROOT/"data/gate-october-five-vessel-evidence-request-matrix-20261102.json"
def audit(matrix):
    results=[]
    for r in matrix["records"]:
        imo=r["imo"]
        base={"imo":imo,"ship":r["ship"],"assigned_gas_day":r["assigned_gas_day"],
              "logbook_berth_date":r["logbook_berth_date"],"reported_gwh":r["reported_gwh"]}
        # Gaspeil ship-page and arrival API share one aggregator provenance.
        ship_obs=[{"kind":"aggregated_ship_log","source_family":"gaspeil"}]
        for claim_type,extra in (
            ("berth",{"observations":ship_obs,"unexplained_discrepancy":r["assigned_gas_day"]<r["logbook_berth_date"]}),
            ("discharge_volume",{"observations":ship_obs+[{"kind":"operator_inventory","source_family":"gie"}],
                                  "material_conflict":r["issue"]=="duplicate-970"}),
            ("voyage_origin",{"observations":ship_obs}),
        ):
            result=evaluate({"claim":f"{r['ship']} {claim_type}","claim_type":claim_type,**extra})
            results.append({**base,**result,"independent_port_record":r["independent_port_record"],
                            "terminal_discharge_record":r["terminal_discharge_record"],
                            "voyage_loading_record":r["voyage_loading_record"]})
    return {"as_of":matrix["as_of"],"method":"claim-specific conservative evidence triage",
            "claims":results,"summary":{"vessels":len(matrix["records"]),"claims":len(results),
            "reasonably_certain":sum(x["confidence_band"]=="reasonably_certain" for x in results),
            "high":sum(x["confidence_band"]=="high" for x in results),
            "preliminary":sum(x["confidence_band"]=="preliminary" for x in results)}}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--input",default=str(MATRIX))
    p.add_argument("--output")
    args=p.parse_args()
    result=audit(json.loads(Path(args.input).read_text()))
    output=json.dumps(result,indent=2)+"\n"
    if args.output:Path(args.output).write_text(output)
    print(output,end="")
if __name__=="__main__":main()
