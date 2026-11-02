# Monthly LNG attribution diagnostics — executable evidence milestone

The [official Eurostat capture run #41400289748](https://github.com/epnews/epnews-website/actions/runs/41400289748) passed all tests, extraction, half-year reconciliation and upload. This batch extends the evidence to **each month** for EU27, France, Germany and Poland in Jan–Jun 2025 and Jan–Jun 2026 (up to 48 reporter-month records).

The new audit records total, sum of all reported non-TOTAL partner codes, discrepancy, US-labelled volume, NSP-labelled volume, count of positive and missing partner cells, and top six positive partner labels. It fails when a reporter-month partner sum differs from its total by more than 10 million m³ (0.01 bcm), allowing tiny reporting rounding differences. Missing partner cells are counted separately rather than presumed zero-origin shipments.

This is a **month-level completeness and classification test**. It enables future matched cargo-origin cross-checks and identifies the month of any anomalous source classification; it does **not** infer US origin from NSP, Algeria, Nigeria or any other transit label. Source `nrg_ti_gasm` `G3200`, `MIO_M3`. No causal gate or command-meter changes; SOI audit 20/30, readiness 53%.
