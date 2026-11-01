# EIA Table 24 national Total and 2025 archive correction

PR #293 downloaded the current PDF but found no national rows because it searched for "United States" while the table labels them **Total**. This correction records all Total candidates with page provenance, downloads a candidate October 2025 archive PDF and preserves its checksum and candidate Total rows if available. Archive URL is **unverified until first live run**; a 404 or changed layout is explicitly retained as an error rather than silently replaced with another period.

No percentage is accepted without verifying sector, year, month, national-total row, table headers and publication vintage. Current 2026 percentages cannot be paired with guessed 2025 values. Source coverage ratios, if verified, apply to total deliveries to derive approximate onsystem volumes; combined with monthly onsystem prices these would be estimated gross sales values, not audited revenues or LNG-caused domestic costs.

Regression tests cover Total row recognition and null score safeguards. No Command Meter UI change; readiness remains 53%.
