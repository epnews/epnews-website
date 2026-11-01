# Official DOE cargo workbook and Germany EIA series: source recovery

## Source identified
DOE October 22, 2026 release: https://www.energy.gov/hgeo/articles/natural-gas-imports-and-exports-monthly-2026
Official XLSX: https://www.energy.gov/sites/default/files/2026-10/3.%20U.S.%20LNG%20Exports%20and%20Re-Exports%20Details%20%28Jan%202016%20-%20Aug%202026%29.xlsx

This source spans **Jan 2016–Aug 2026** and includes destination-specific LNG export and re-export details. Before aggregation, inspect actual workbook sheet names, header rows, destination columns, date representation, unit conventions, export versus re-export classification, and cargo duplication. Automated schema artifact `doe-lng-detail-schema` will capture first 12 rows of each sheet and workbook dimensions. No numerical reconciliation is claimed before schema review.

## Why Germany returned HTTP 404 in prior EIA extractor
The legacy EIA destination slug is **NGM**, not ISO **DE**:
https://www.eia.gov/dnav/ng/hist/ngm_epg0_eve_nus-ngm_mmcfm.htm

EIA Germany monthly LNG vessel exports (MMcf):
- H1 2025: Jan 9,370; Feb 13,938; Mar 21,377; Apr 28,264; May 29,212; Jun 45,727; sum **147,888 MMcf**.
- H1 2026: Jan 23,984; Feb 35,465; Mar 38,575; Apr 38,782; May 31,880; Jun 21,456; sum **190,142 MMcf**.
- These are matched-month **EIA export-destination** quantities. Germany Eurostat H1 2025 US-coded zero and H1 2026 US-coded zero; G3200 TOTAL 4.020376 bcm and 6.177744 bcm respectively. Source Eurostat artifact #13069403354.
- No assumption that departures exactly equal German arrivals in the same month or that these reconcile the EEA/Eurostat ~15 bcm discrepancy.

## Follow-up
After workbook schema inspection, implement cargo aggregation with explicit unit and destination normalization and a **reconciliation ledger** comparing DOE, EIA and Eurostat for France/Germany/Poland and EU27. Missing rows remain null. Do not double-count re-exports. Readiness **53%**, influence/net benefit scores null; no meter UI changes.
