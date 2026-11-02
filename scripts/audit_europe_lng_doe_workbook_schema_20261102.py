#!/usr/bin/env python3
"""Report DOE workbook structure independently of vessel-name matches."""
import json
import sys
from pathlib import Path
from openpyxl import load_workbook

def audit(path):
    wb = load_workbook(path, read_only=True, data_only=True)
    try:
        result = {"source_file": str(path), "sheets": [], "interpretation": "Workbook structure only; zero vessel-name matches does not mean zero cargoes"}
        for ws in wb.worksheets:
            samples = []
            for i, row in enumerate(ws.iter_rows(values_only=True), 1):
                if i > 5:
                    break
                samples.append([str(v)[:160] if v is not None else None for v in row[:25]])
            result["sheets"].append({"name": ws.title, "rows_reported": ws.max_row, "columns_reported": ws.max_column, "first_five_rows_first_25_columns": samples})
        return result
    finally:
        wb.close()

if __name__ == "__main__":
    if len(sys.argv) != 2 or not Path(sys.argv[1]).is_file():
        raise SystemExit("Usage: python audit_europe_lng_doe_workbook_schema_20261102.py <downloaded.xlsx>")
    print(json.dumps(audit(sys.argv[1]), indent=2, ensure_ascii=False))
