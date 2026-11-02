#!/usr/bin/env python3
"""Nontransactional TTF-marked LNG proxy valuation sensitivity; never realized revenue."""
import argparse
import json
from collections import defaultdict
from decimal import Decimal
from pathlib import Path

def money(x):return Decimal(str(x))
def audit(data):
    rows=data["lossingen"]
    marked=[]
    missing=[]
    groups=defaultdict(list)
    for x in rows:
        if any(x.get(k) is None for k in ("estimatedGwh","cargoGwh","ttfEurMwh","valueEur")):
            missing.append(x["key"]);continue
        p=money(x["ttfEurMwh"])*1000
        original=money(x["estimatedGwh"])*p
        current=money(x["cargoGwh"])*p
        marked.append({"key":x["key"],"ship":x["ship"],"imo":x["imo"],
                       "measuredGasDay":x.get("measuredGasDay"),
                       "measuredGwh":x.get("measuredGwh"),
                       "reportedValueEur":money(x["valueEur"]),
                       "originalValueEur":original,"currentValueEur":current,
                       "differenceEur":current-original})
        if x.get("measuredGasDay") and x.get("measuredGwh") is not None:
            groups[(x["measuredGasDay"],money(x["measuredGwh"]))].append(marked[-1])
    collisions=[v for v in groups.values() if len(v)>1]
    # Each removal below is an *alternative*, not an adjudication of which vessel unloaded.
    options=[]
    for group in collisions:
        for keep in group:
            removed=[x for x in group if x["key"]!=keep["key"]]
            options.append({"keep_key":keep["key"],"remove_keys":[x["key"] for x in removed],
                            "removed_proxy_eur":sum((x["currentValueEur"] for x in removed),Decimal(0))})
    total=lambda k:sum((x[k] for x in marked),Decimal(0))
    original=total("originalValueEur")
    current=total("currentValueEur")
    pos=sum((max(Decimal(0),x["differenceEur"]) for x in marked),Decimal(0))
    neg=sum((min(Decimal(0),x["differenceEur"]) for x in marked),Decimal(0))
    def eur(x):return int(x) if x==x.to_integral_value() else str(x)
    return {"arrival_records":len(rows),"priced_records":len(marked),"missing_price_or_volume_keys":missing,
            "reported_indicative_value_eur":eur(total("reportedValueEur")),
            "recomputed_original_estimate_ttf_value_eur":eur(original),
            "best_available_volume_ttf_hypothetical_eur":eur(current),
            "volume_basis_change_eur":eur(current-original),
            "positive_value_differences_eur":eur(pos),
            "negative_value_differences_eur":eur(neg),
            "collision_alternative_scenarios":[{"keep_key":x["keep_key"],"remove_keys":x["remove_keys"],
                "hypothetical_value_eur":eur(current-x["removed_proxy_eur"])} for x in options],
            "warning":"TTF is a market proxy, not contracted price; figures are indicative scenario values, not revenue, cash receipts, profits, net benefit or actual cargo imports."}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--input",required=True)
    p.add_argument("--output")
    a=p.parse_args()
    result=audit(json.loads(Path(a.input).read_text(encoding="utf-8")))
    out=json.dumps(result,indent=2)+"\n"
    if a.output:Path(a.output).write_text(out,encoding="utf-8")
    print(out,end="")
if __name__=="__main__":main()
