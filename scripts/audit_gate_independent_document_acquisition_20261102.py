#!/usr/bin/env python3
"""Prepare evidence acquisition requests without pretending to have obtained records."""
import argparse
import json
from collections import Counter
from pathlib import Path

DOCUMENTS=[
    {"code":"terminal_discharge_log","owner":"Gate terminal operator","minimum_fields":["vessel_imo","berth","start_utc","end_utc","discharged_quantity","quantity_unit","measurement_method"]},
    {"code":"port_berth_movement","owner":"Port of Rotterdam / harbor master","minimum_fields":["vessel_imo","berth","arrival_utc","all_fast_utc","departure_utc"]},
    {"code":"custody_transfer_measurement","owner":"Terminal operator / cargo parties","minimum_fields":["vessel_imo","transfer_period","metered_quantity","unit","certificate_id","measurement_basis"]},
    {"code":"loading_terminal_export_record","owner":"Loading terminal / export authority","minimum_fields":["vessel_imo","loading_port","loading_dates","cargo_quantity","unit","voyage_identifier"]},
]
def audit(snapshot):
    arrivals=snapshot.get("data",snapshot)["lossingen"]
    seen=set()
    rows=[]
    for x in arrivals:
        key=x.get("key")
        if not key or key in seen:raise ValueError("missing or duplicate arrival key")
        seen.add(key)
        day=x.get("measuredGasDay")
        status=x.get("status")
        rows.append({"arrival_key":key,"vessel_imo":x.get("imo"),
                     "measured_gas_day":day,"source_status":status,
                     "required_document_codes":[d["code"] for d in DOCUMENTS],
                     "document_received":False,
                     "evidence_acquisition_state":"not_requested_or_not_recorded",
                     "evidence_limit":"No independent cargo discharge document was obtained in this audit."})
    return {"arrival_records":len(rows),"document_request_templates":DOCUMENTS,
            "arrival_requests":rows,
            "status_counts":dict(sorted(Counter(str(x["source_status"]) for x in rows).items())),
            "warning":"Request plan only. No external request was sent; no source records, operator replies or certified vessel volumes were obtained."}
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--snapshot",required=True)
    p.add_argument("--output")
    a=p.parse_args()
    result=audit(json.loads(Path(a.snapshot).read_text(encoding="utf-8")))
    out=json.dumps(result,indent=2)+"\n"
    if a.output:Path(a.output).write_text(out,encoding="utf-8")
    print(out,end="")
if __name__=="__main__":main()
