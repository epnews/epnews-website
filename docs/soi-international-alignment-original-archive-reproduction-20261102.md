# Original-source reproduction: five-sphere International Alignment

Fresh scan of the uploaded **original SWP UNGA positions ZIP** (not the previously aggregated JSON): **2,203,461 physical lines**, **62,967 recorded-vote rows**, **358 recorded resolutions**, and **20 independently recomputed actor-year readings**.

## Denominator finding

The union of non-EU/non-reference country codes across 2021–2024 contains **162** codes, while the established frozen series uses the **160 codes with recorded positions in 2024**. Recomputing all four years against the same 2024-defined 160-code partner universe exactly reproduces every published full-cohort percentage to four decimals. The 162-code alternative does **not** reproduce all earlier-year readings. This resolves the denominator discrepancy, but the reference-year selection must remain explicit and sensitivity-tested.

| Sphere | 2021 | 2022 | 2023 | 2024 |
|---|---:|---:|---:|---:|
| US | 26.33% | 34.43% | 31.04% | 32.09% |
| CHINA | 71.63% | 64.84% | 65.20% | 66.22% |
| RUSSIA | 57.54% | 51.50% | 48.96% | 51.46% |
| INDIA | 67.68% | 65.44% | 65.39% | 66.01% |
| EU | 60.43% | 61.27% | 58.78% | 58.95% |

The 2024 reference-year denominator is **not** the same as the 2021–2024 union; treating the latter as the original frozen universe causes small differences. The EU series uses a 20-member minimum and 75% agreement proxy. Recorded abstentions are treated as a distinct voting position, and nonvoting/consensus resolutions are excluded.

## Validation and remaining gates

- The source ZIP SHA-256 matches the frozen series metadata.
- Numerators and denominators were freshly computed from the original source archive. A regression test checks the stored counts against the existing frozen series and verifies all 20 percentages.
- Source licensing, topic-cohort selection, EU threshold sensitivity, and production-scale needle semantics remain open.
- No change to the existing dashboard, weighted model, selectors, moving needles or evidence drawers. No public International Alignment needle authorized yet.
