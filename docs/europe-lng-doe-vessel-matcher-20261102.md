# DOE vessel-row matching utility

Run `python scripts/match_europe_lng_doe_vessels_20261102.py /path/to/downloaded-doe.xlsx > doe-vessel-candidates.json` after obtaining the official DOE workbook. Requires `openpyxl` in the execution environment.

The utility inventories sheet names and first rows, scans all cells for normalized exact vessel-name strings, and emits raw candidate rows with sheet/row provenance for VENTURE GATOR (IMO 9956599), CORAL ENERGY (9617698), HUASHAN (9958652), and RIBERA DEL DUERO KNUTSEN (9477593). It does **not** infer DOE columns, port-of-discharge, cargo volume, physical origin, or confirmed IMO. It intentionally labels results `name_match_only` and retains original cell values for human schema validation.

**Status:** workbook was not accessible from this environment; no candidate rows or vessel matches have been produced. DOE reporting vintage ends August 2026 and does not verify October Rotterdam calls. The next milestone is actual XLSX acquisition, review of output and independent terminal confirmation. SOI evidence audit remains 20/30, readiness 53%; meter untouched.
