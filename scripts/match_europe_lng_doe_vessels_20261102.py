#!/usr/bin/env python3
"""Inspect DOE LNG export XLSX without inventing cargo evidence.
Requires: python -m pip install openpyxl
Usage: python scripts/match_europe_lng_doe_vessels_20261102.py path/to/doe.xlsx
"""
import json
import re
import sys
from pathlib import Path

TARGETS = {
    "VENTURE GATOR": "9956599",
    "CORAL ENERGY": "9617698",
    "HUASHAN": "9958652",
    "RIBERA DEL DUERO KNUTSEN": "9477593",
}

def normalize(value):
    return re.sub(r"[^A-Z0-9]", "", str(value or "").upper())

def inspect(path):
    from openpyxl import load_workbook
    wb = load_workbook(path, read_only=True, data_only=True)
    result = {"source_file": str(path), "sheets": [], "matches": [], "limitations": [
        "A text match is not proof of U.S. loading or European discharge",
        "IMO identifiers are investigation leads, not DOE-verified identifiers",
        "Workbook ends August 2026 and cannot verify October 2026 calls",
    ]}
    for ws in wb.worksheets:
        sheet = {"name": ws.title, "first_row": None, "matched_rows": 0}
        for row_idx, row in enumerate(ws.iter_rows(values_only=True), start=1):
            if row_idx == 1:
                sheet["first_row"] = [str(x) if x is not None else None for x in row]
            cells = [str(v) if v is not None else "" for v in row]
            joined = [normalize(v) for v in cells]
            for vessel, imo in TARGETS.items():
                key = normalize(vessel)
                if any(key == cell for cell in joined):
                    result["matches"].append({"sheet": ws.title, "row": row_idx,
                        "vessel_name_match": vessel, "imo_reference_only": imo,
                        "raw_values": cells, "verification_status": "name_match_only"})
                    sheet["matched_rows"] += 1
        result["sheets"].append(sheet)
    return result

if __name__ == "__main__":
    if len(sys.argv) != 2 or not Path(sys.argv[1]).is_file():
        raise SystemExit("Usage: python match_europe_lng_doe_vessels_20261102.py <downloaded.xlsx>")
    print(json.dumps(inspect(sys.argv[1]), indent=2, ensure_ascii=False, default=str))
