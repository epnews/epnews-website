# DOE vessel candidate matcher — false-positive control

**Finding:** the previous implementation used normalized substring matching, which could falsely identify a vessel in a longer ship name or incidental text. This change requires the normalized **entire cell** to match the target vessel name, while still tolerating capitalization, spaces and punctuation.

A synthetic XLSX regression test covers three positive matches and two deliberately misleading negative rows. Run: `python scripts/test_europe_lng_doe_vessel_matcher_20261102.py` (requires openpyxl).

**Limitations:** Exact-cell matching can miss real records that append suffixes or aliases. Such cases should be reviewed separately rather than auto-confirmed. The tests use synthetic rows only; **no DOE workbook was retrieved or analyzed**. The official workbook remains the primary data acquisition blocker. No SOI scoring or meter changes.
