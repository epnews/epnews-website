#!/usr/bin/env python3
"""Compare Gaspeil original cargo estimates with later GIE stock-derived attributions."""
import argparse
import json
from pathlib import Path

def audit(data):
    rows=[]
    for x in data["lossingen"]:
        measured=x.get("measuredGwh")
        estimated=x.get("estimatedGwh")
        if measured is None or estimated is None:continue
        if estimated<=0:raise ValueError("estimatedGwh must be positive")
        delta=measured-estimated
        rows.append({"key":x["key"],"ship":x["ship"],"imo":x["imo"],
                     "estimated_gwh":estimated,"stock_attributed_gwh":measured,
                     "delta_gwh":delta,"delta_pct":round(100*delta/estimated,3),
                     "exceeds_2pct_review_threshold":abs(delta)/estimated>.02,
                     "certified_unloading":False})
    up=sum(x["delta_gwh"]>0 for x in rows)
    down=sum(x["delta_gwh"]<0 for x in rows)
    estimated_sum=sum(x["estimated_gwh"] for x in rows)
    measured_sum=sum(x["stock_attributed_gwh"] for x in rows)
    return {"measured_records":len(rows),"increased":up,"decreased":down,
            "unchanged":len(rows)-up-down,
            "above_2pct_review_threshold":sum(x["exceeds_2pct_review_threshold"] for x in rows),
            "estimated_gwh_sum":estimated_sum,"stock_attributed_gwh_sum":measured_sum,
            "net_change_gwh":measured_sum-estimated_sum,
            "rows":rows,
            "warning":"Differences compare two proxy methods, not errors against independent custody-transfer truth; 2% is a review trigger, not accuracy certification."}
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
