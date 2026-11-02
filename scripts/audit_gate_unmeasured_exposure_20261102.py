#!/usr/bin/env python3
"""Audit estimated-only exposure in Gaspeil LNG arrival ledger, not verified cargo."""
import argparse
import json
from collections import defaultdict
from decimal import Decimal
from pathlib import Path

def audit(data):
    records=data["lossingen"]
    buckets=defaultdict(list)
    for x in records:
        if x.get("status") not in ("geschat","gemeten","bevestigd"):
            raise ValueError("unknown Gaspeil cargo status")
        if x.get("cargoGwh") is None:raise ValueError("missing cargoGwh")
        buckets[x["status"]].append(x)
    total_gwh=sum((Decimal(str(x["cargoGwh"])) for x in records),Decimal(0))
    total_eur=sum((Decimal(str(x["valueEur"])) for x in records if x.get("valueEur") is not None),Decimal(0))
    def show(v):return int(v) if v==v.to_integral_value() else str(v)
    def percent(a,b):return round(100*float(a/b),3) if b else None
    status={}
    for name in ("geschat","gemeten","bevestigd"):
        rows=buckets[name]
        gwh=sum((Decimal(str(x["cargoGwh"])) for x in rows),Decimal(0))
        value=sum((Decimal(str(x["valueEur"])) for x in rows if x.get("valueEur") is not None),Decimal(0))
        status[name]={"records":len(rows),"proxy_gwh":show(gwh),"proxy_gwh_share_pct":percent(gwh,total_gwh),
                      "indicative_value_eur":show(value),"indicative_value_share_pct":percent(value,total_eur),
                      "arrival_keys":[x["key"] for x in rows]}
    return {"arrival_records":len(records),"raw_proxy_volume_gwh":show(total_gwh),
            "indicative_value_eur":show(total_eur),"by_status":status,
            "warning":"geschat=original estimated cargo; gemeten=GIE inventory-derived association; bevestigd=DOE matched export list, not custody-transfer at Gate. None independently certifies imports, realized revenue or economic benefit. Raw sums may include duplicate attribution."}
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
