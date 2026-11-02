# DOE August 2026 LNG destination breakdown — source-verified snapshot

**Primary:** U.S. DOE, *U.S. Natural Gas Is Supplying Energy to the World: August 2026 Summary*, published October 29, 2026: https://www.energy.gov/hgeo/articles/us-natural-gas-supplying-energy-world-august-2026-summary

**Underlying DOE monthly report and three XLSX datasets:** https://www.energy.gov/hgeo/articles/natural-gas-imports-and-exports-monthly-2026 (published October 22, 2026). File 3, *U.S. LNG Exports and Re-Exports Details (Jan 2016 – Aug 2026).xlsx*, is the next row-level research target. This PR does not claim to have inspected workbook rows.

## Reported U.S. LNG vessel export volumes — August 2026

| Destination grouping | Volume (Bcf) | Share of total |
| --- | ---: | ---: |
| Europe (DOE definition, includes Türkiye) | 269.3 | 52.3% |
| Asia | 158.7 | 30.8% |
| Africa | 55.9 | 10.9% |
| Latin America and Caribbean | 30.7 | 6.0% |
| **All destinations** | **514.6** | **100%** |

DOE states exports reached **33 countries**. Top individual reported destinations (Bcf): **Egypt 55.9; Netherlands 53.6; Italy 49.1; France 36.5; Germany 35.5**. Top-five combined **230.6 Bcf (44.8% of total)**, using DOE's rounded values. Do not sum Europe and its included country values; do not equate DOE Europe with EU27.

## What this does and does not establish

This is a **reported export-destination breakdown**, not independently verified European receiving-terminal discharges or cargo physical-origin chain evidence. Destination can be changed or cargo transshipped. August statistics cannot confirm October Rotterdam vessel calls. DOE export-point prices are FOB/export-point prices, not company realized revenue, margins or profit. No net economic benefit or influence score is inferred.

## Follow-up evidence collection

1. Retrieve and inspect the DOE file 3 workbook linked on the official 2026 monthly page; record its download URL, reporting vintage, tab names, column schema and revision metadata.
2. Filter exact vessel names and destination country for covered months only; check whether vessel IMO exists as a field. Preserve absent IMO as null.
3. Match a reported U.S. export row to a **separate** terminal-operator discharge completion record and independent voyage history; do not count a derived AIS/ALSI/DOE aggregator as independent of its inputs.
4. Keep comparisons aligned by time, geography and units. No change to SOI evidence audit 20/30 or readiness 53%; command meter unaffected.
