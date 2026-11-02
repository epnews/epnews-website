# GAP-12 official Eurostat 22-cell reconciliation — 2026-11-02

Official workflow run: https://github.com/epnews/epnews-website/actions/runs/41396852947

Raw official Eurostat datasets, extracted 22 cells, SHA256 manifests, retrieval timestamps and reconciliation report are preserved in the workflow artifact: https://github.com/epnews/epnews-website/actions/runs/41396852947/artifacts/13119727380

## Verified outcome

- Both datasets downloaded successfully; syntax preflight passed.
- Extractor produced all **22 of 22** required cells.
- **19 of 22** matched existing nominal-price inputs within 0.005 EUR/100 kWh.
- Three mismatches (EUR/100 kWh):

| Observation | Existing | Official extracted | Delta |
| --- | ---: | ---: | ---: |
| Malta electricity 2025-S2 | 12.82 | 12.96 | +0.14 |
| Netherlands gas 2025-S2 | 17.19 | 17.14 | -0.05 |
| Hungary gas 2025-S2 | 3.40 | 3.35 | -0.05 |

- One observation carries Eurostat JSON-stat status `p`: Malta electricity 2026-S1. Treat as provisional pending explicit documented policy and/or a revised official release.

## Decision and open questions

Do **not** silently round away or overwrite mismatches, treat provisional data as unqualified, increase the evidence gate, or adjust geopolitical influence scores.

Investigate whether the three differences reflect source revisions, definition differences, or earlier transcription, then explicitly reconcile the original nominal-price inputs and any downstream derived metrics. Independently document the official meaning of status `p` and whether provisional observations can be shown with an explicit caveat, without counting as fully verified.

Current evidence gate remains **20/30 (66.7%)**; the meter needle, selectors and comparison tools remain unchanged.
