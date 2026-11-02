# GAP-12 full-semester reconciliation

Previous scripts extracted and checked only 11 **ending** observations (2026-S1). That could not independently establish a **change** from 2025-S2. This batch upgrades the extractor and offline reconciliation to require **22 exact official cells**, one starting and one ending observation for each of 11 country/commodity pairs.

Run with actual original Eurostat JSON-stat inputs containing both periods and with a truthful retrieval timestamp:

```sh
EUROSTAT_RETRIEVED_AT=<actual-ISO-8601-retrieval-time> node scripts/extract_soi_gap12_eurostat_jsonstat_cells_20261102.cjs electricity.json gas.json > exact-cells.json
node scripts/audit_soi_gap12_exact_eurostat_nominal_prices_20261102.cjs exact-cells.json
```

Missing observations, wrong dimensions, duplicates, mismatches or placeholder retrieval timestamps fail closed. The extractor still needs verification against **live official Eurostat JSON-stat schemas**; no official exact price files have been downloaded in this PR. Neither a matched price comparison nor geopolitical influence is independently established until that verification is complete.

No data backfill, no meter changes, no score authorization; audit stays 20/30.
