#!/usr/bin/env python3
"""Run independent evidence diagnostics against the SAME archived Gaspeil snapshot."""
import argparse
import importlib.util
import json
from pathlib import Path

AUDITS={
    "indicative_valuation":"audit_gate_gaspeil_indicative_value_20261102.py",
    "arrival_collisions":"audit_gate_arrival_collision_exposure_20261102.py",
    "origin_basis":"audit_gate_origin_evidence_basis_20261102.py",
    "gasday_utc_offsets":"audit_gate_gasday_utc_offsets_20261102.py",
    "estimate_stock_variance":"audit_gate_estimate_stock_variance_20261102.py",
    "proxy_cancellation":"audit_gate_proxy_variance_cancellation_20261102.py",
    "ttf_value_sensitivity":"audit_gate_ttf_proxy_value_sensitivity_20261102.py",
    "unmeasured_exposure":"audit_gate_unmeasured_exposure_20261102.py",
    "gasday_concentration":"audit_gate_gasday_attribution_concentration_20261102.py",
    "gasday_offset_hours":"audit_gate_gasday_offset_hour_patterns_20261102.py",
}
def run(snapshot):
    if not isinstance(snapshot,dict) or not isinstance(snapshot.get("data"),dict):
        raise ValueError("Expected archived Gaspeil snapshot with data wrapper")
    data=snapshot["data"]
    if data.get("ok") is not True or not isinstance(data.get("lossingen"),list):
        raise ValueError("Invalid Gaspeil data payload")
    if data.get("count")!=len(data["lossingen"]):
        raise ValueError("Gaspeil API count mismatch")
    results={}
    for name,filename in AUDITS.items():
        spec=importlib.util.spec_from_file_location("gate_"+name,Path(__file__).with_name(filename))
        mod=importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        results[name]=mod.audit(data)
    n=len(data["lossingen"])
    if any(results[name].get("arrival_records",n)!=n for name in ("arrival_collisions","origin_basis")):
        raise ValueError("Inconsistent arrival record counts")
    if results["indicative_valuation"]["counts"]["records"]!=n:
        raise ValueError("Valuation count mismatch")
    measured=sum(x.get("measuredGwh") is not None for x in data["lossingen"])
    for name,field in (("gasday_utc_offsets","measured_arrival_records"),
                       ("estimate_stock_variance","measured_records"),
                       ("proxy_cancellation","measured_records"),
                       ("gasday_concentration","measured_arrival_records"),
                       ("gasday_offset_hours","measured_arrival_records")):
        if results[name][field]!=measured:
            raise ValueError(f"{name} measured record count mismatch")
    return {"source_snapshot_retrieved_at_utc":snapshot.get("retrievedAtUtc"),
            "source":"Gaspeil.nl public October 2026 Gate arrivals API; GIE inventory-derived attributions",
            "arrival_records":n,"measured_records":measured,
            "diagnostics":results,
            "no_certification":"No individual discharge, origin, realized revenue, profit, or SOI score certified."}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--snapshot",required=True)
    p.add_argument("--output",required=True)
    a=p.parse_args()
    result=run(json.loads(Path(a.snapshot).read_text(encoding="utf-8")))
    Path(a.output).write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({"arrival_records":result["arrival_records"],"measured_records":result["measured_records"],
                      "diagnostics":list(result["diagnostics"]),"output":a.output}))
if __name__=="__main__":main()
