#!/usr/bin/env python3
"""Measure cancellation between signed vessel-level proxy volume differences."""
import argparse
import json
from pathlib import Path

def audit(data):
    rows=[x for x in data["lossingen"] if x.get("measuredGwh") is not None and x.get("estimatedGwh") is not None]
    if any(x["estimatedGwh"]<=0 for x in rows):raise ValueError("estimatedGwh must be positive")
    changes=[x["measuredGwh"]-x["estimatedGwh"] for x in rows]
    estimate_sum=sum(x["estimatedGwh"] for x in rows)
    gross=sum(abs(x) for x in changes)
    signed=sum(changes)
    return {"measured_records":len(rows),"original_estimate_gwh":estimate_sum,
            "positive_differences_gwh":sum(max(0,x) for x in changes),
            "negative_differences_gwh":sum(min(0,x) for x in changes),
            "net_difference_gwh":signed,"absolute_differences_gwh":gross,
            "net_difference_pct_of_estimates":round(100*signed/estimate_sum,3) if estimate_sum else None,
            "absolute_difference_pct_of_estimates":round(100*gross/estimate_sum,3) if estimate_sum else None,
            "mean_absolute_pct_difference":round(sum(100*abs(x["measuredGwh"]-x["estimatedGwh"])/x["estimatedGwh"] for x in rows)/len(rows),3) if rows else None,
            "cancellation_share_pct":round(100*(1-abs(signed)/gross),3) if gross else None,
            "warning":"Absolute proxy disagreements and cancellation are NOT statistically calibrated error or uncertainty; no custody-transfer ground truth."}
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
