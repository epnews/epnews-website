"""Validate missing independent evidence without inventing port or discharge confirmations."""
import json
from pathlib import Path
P=Path(__file__).resolve().parents[1]/"data/gate-october-five-vessel-evidence-request-matrix-20261102.json"
def audit(data):
    rows=data["records"]
    assert len(rows)==5 and len({r["imo"] for r in rows})==5
    assert sum(r["issue"]=="duplicate-970" for r in rows)==2
    for r in rows:
        assert r["logbook_source"]=="https://www.gaspeil.nl/radar/schip/"+r["imo"]
        assert r["independent_port_record"]=="not_obtained"
        assert r["terminal_discharge_record"]=="not_obtained"
        assert r["voyage_loading_record"]=="not_obtained"
        assert r["assigned_gas_day"]<=r["logbook_berth_date"]
    return {"vessels":len(rows),"independent_port_records_obtained":0,
            "discharge_records_obtained":0,"loading_records_obtained":0,
            "duplicate_assignment_vessels":2,"pre_berth_assignment_vessels":3}
if __name__=="__main__":
    print(json.dumps(audit(json.loads(P.read_text())),indent=2))
