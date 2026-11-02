# SOI GAP-12 — Exact nominal Eurostat price-cell reconciliation protocol

The existing 11 household energy-price comparisons use 2026-S1 nominal endpoint values cited from Eurostat October 2026 reporting. The news releases round to cents per kWh; they do **not** independently establish the exact hundredth of EUR/100kWh. The audit in PR #511 therefore left `upstreamNominalPricesIndependentlyVerified=false`.

This batch adds a **fail-closed offline reconciliation tool**, not a claim that exact values have been independently verified. Independently export 2026-S1 official cells from Eurostat `nrg_pc_204` (electricity, household DC band 2500–4999 kWh) and `nrg_pc_202` (natural gas, household D2 band 20–199 GJ), with taxes and levies included, and normalized EUR/100kWh. Provide one cell per geo/commodity with the dataset ID, exact normalized value, source URL, retrieval date, unit, band and tax treatment. Confirm actual Eurostat dataset code values and unit conversion against metadata; never assume unit labels without checking metadata.

Run `node scripts/audit_soi_gap12_exact_eurostat_nominal_prices_20261102.cjs path/to/verified-cells.json`. The tool rejects duplicates, unexpected country/commodity/period combinations, wrong band/tax metadata, missing sources, and mismatches exceeding 0.005 EUR/100kWh. It reports missing cells and discrepancies, returning nonzero until all 11 match. It does not modify the original price panel or SOI meter.

**No exact cells have been supplied in this PR.** The remaining evidence gap is unchanged. If the official dataset differs, record the source discrepancy, re-evaluate derived real changes, and do not quietly overwrite historical values. Do not increase the SOI evidence gate count or authorize influence scoring.
