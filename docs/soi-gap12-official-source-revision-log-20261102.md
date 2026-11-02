# GAP-12 source revision log

Source: [official Eurostat capture run 41396852947](https://github.com/epnews/epnews-website/actions/runs/41396852947), artifact 13119727380. Dataset nrg_pc_204 electricity and nrg_pc_202 gas, household, taxes included, EUR/100 kWh.

| Pair | Previous 2025-S2 | Official 2025-S2 | 2026-S1 | Revised nominal change |
| --- | ---: | ---: | ---: | ---: |
| Malta electricity | 12.82 | 12.96 | 12.68 (provisional, status p) | -2.160% |
| Netherlands gas | 17.19 | 17.14 | 16.22 | -5.368% |
| Hungary gas | 3.40 | 3.35 | 3.30 | -1.493% |

All other 19 official cells matched within 0.005 EUR/100 kWh. The revisions preserve previous figures in `priorStartEUR100kWh`, update the source URLs for the changed baselines, and recalculate nominal changes. Malta's end observation is explicitly marked provisional and is **not** counted as final verification. Neither the evidence gate nor influence scores change: 20/30 (66.7%). No claim of causation or household bill impact.

Follow-up: verify any derived datasets/caches that copied the prior nominal changes; ensure provisional labeling is visible wherever Malta 2026-S1 is presented. Do not silently count this audit as closed.
