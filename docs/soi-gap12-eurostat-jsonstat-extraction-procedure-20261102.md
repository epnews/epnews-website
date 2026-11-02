# SOI GAP-12 — Official JSON-stat exact-cell extraction batch

This batch bridges the gap between official machine-readable Eurostat API downloads and the exact-value reconciliation tool merged in #513. It does not fabricate prices or claim a source fetch succeeded.

1. Download original JSON-stat datasets for Eurostat `nrg_pc_204` and `nrg_pc_202` with 2026-S1 household band, tax-inclusive, EUR/kWh dimensions. Keep raw files and retrieval provenance.
2. Run `node scripts/extract_soi_gap12_eurostat_jsonstat_cells_20261102.cjs electricity.json gas.json > verified-cells.json`.
3. Review exact selected dimensions and values, including whether Eurostat returns `currency` as a separate dimension, and whether gas uses `GJ20-199`; fail rather than assume on mismatched schemas.
4. Run `node scripts/audit_soi_gap12_exact_eurostat_nominal_prices_20261102.cjs verified-cells.json` and record missing or differing values.

**Caution:** Eurostat APIs can expose currency through `currency` or through other dimension combinations; this extractor deliberately refuses ambiguous schemas and must be adapted to verified actual metadata, not bypassed. Retrieval dates in raw JSON-stat may be update timestamps rather than the download time: replace the placeholder with an independently recorded actual retrieval date before accepting cells as fully sourced.

The Eurostat endpoint could not be fetched during this milestone, so no official exact 2026-S1 values are claimed. The audit stays 20/30, and the meter, scoring, selectors, and evidence panels remain untouched.
