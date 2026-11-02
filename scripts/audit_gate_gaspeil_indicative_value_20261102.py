#!/usr/bin/env python3
"""Audit Gaspeil's indicative valueEur against estimated vs measured cargo GWh.

No valueEur should be treated as company receipts, realized cargo price or profit.
"""
import argparse
import json
from pathlib import Path

def audit(data):
    rows=data["lossingen"]
    counts={"records":len(rows),"value_matches_estimated":0,"value_matches_best_available":0,
            "value_mismatch_estimated":0,"measured_cargo_differs_from_estimated":0,
            "doe_confirmed":0}
    examples=[]
    for x in rows:
        if x.get("status")=="bevestigd":counts["doe_confirmed"]+=1
        v=x.get("valueEur")
        p=x.get("ttfEurMwh")
        e=x.get("estimatedGwh")
        c=x.get("cargoGwh")
        if any(y is None for y in (v,p,e,c)):continue
        expected=e*p*1000
        best=c*p*1000
        # TTF is rounded in published API; allow a 0.1% display-rounding tolerance.
        matches_e=abs(v-expected)<=max(1,abs(v)*.001)
        matches_c=abs(v-best)<=max(1,abs(v)*.001)
        counts["value_matches_estimated"]+=int(matches_e)
        counts["value_matches_best_available"]+=int(matches_c)
        counts["value_mismatch_estimated"]+=int(not matches_e)
        if x.get("measuredGwh") is not None and x["measuredGwh"]!=e:
            counts["measured_cargo_differs_from_estimated"]+=1
        if matches_e and not matches_c:
            examples.append({"ship":x["ship"],"imo":x["imo"],"estimated_gwh":e,
                             "cargo_gwh":c,"value_eur":v,
                             "value_is_not_based_on_best_available_gwh":True})
    return {"counts":counts,"examples":examples,
            "interpretation":"Indicative arrival-day TTF valuation of originally estimated cargo; NOT revenue, profit, or realized sales"}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--input",required=True)
    p.add_argument("--output")
    args=p.parse_args()
    result=audit(json.loads(Path(args.input).read_text()))
    output=json.dumps(result,indent=2)+"\n"
    if args.output:Path(args.output).write_text(output)
    print(output,end="")
if __name__=="__main__":main()
