# Matched-month LNG classification shifts, 2025 to 2026

[Official Eurostat all-partner workflow #41400506179](https://github.com/epnews/epnews-website/actions/runs/41400506179) succeeded with the 48 reporter-month reconciliation audit (artifact 13121560102). This milestone adds **24 paired reporter-month comparisons**: January to June 2025 versus the corresponding months of 2026 for EU27, France, Germany and Poland.

For each matched month, the executable audit records the change in total LNG, US-labelled LNG, NSP-labelled LNG and the residual of other reported partner labels. Missing US or NSP values remain null, never automatically zero. The comparison is useful for prioritizing cargo-origin investigations around abrupt changes in official partner coding. It is **not** evidence that the underlying physical cargo origin changed, nor that US exports caused political concessions.

Reproduce using the official monthly audit artifact: `node scripts/audit_europe_lng_monthly_yoy_classification_20261102.cjs europe-lng-monthly-partner-reconciliation.json output.json`. CI now generates the comparison alongside official extraction and half-year/monthly reconciliation. No influence scoring or command-meter changes; SOI audit 20/30 and readiness 53%.
