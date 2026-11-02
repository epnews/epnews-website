# Standardized UNGA voting agreement — preliminary empirical computation

Computed 2026-11-02 directly from the user-supplied SWP/GESIS 2025-03-09 positions ZIP. Verified SHA-256: `04e2a0df74df61ca07e157871578e53effe4f130932d71a3298852b7c5180522`. The source archive contains 1,996,092 position rows across years; 2021–2024 have 86, 89, 88 and 95 recorded-vote resolutions respectively. No 2025 records exist in this dated archive.

## Frozen external partner universe

The same 160 country ISO3 codes with at least one recorded position in **each** of 2021, 2022, 2023 and 2024, excluding the four sovereign spheres (USA/CHN/RUS/IND) and all EU27 member states. For each recorded-vote resolution, count every observed external partner vote Y/N/A that exactly matches the actor's vote; exclude missing/nonvoting positions from the denominator. The four sovereign states use their actual votes. EU uses the majority Y/N/A vote when at least 20 EU27 members cast a recorded vote and at least 75% of those valid votes agree. The EU does not vote as a state.

| Sphere | 2021 | 2022 | 2023 | 2024 | 2021–24 change (pp) |
|---|---:|---:|---:|---:|---:|
| us | 26.33% | 34.43% | 31.04% | 32.09% | 5.76 |
| china | 71.63% | 64.84% | 65.20% | 66.22% | -5.41 |
| russia | 57.54% | 51.50% | 48.96% | 51.46% | -6.08 |
| india | 67.68% | 65.44% | 65.39% | 66.01% | -1.67 |
| eu | 60.43% | 61.27% | 58.78% | 58.95% | -1.48 |

## Publication and scoring gates

These are **preliminary calculations** pending independent reproduction with the repository's importer, a source-code audit, and issue-category, joint-abstention, missingness, EU-threshold and matched-resolution-cohort sensitivity checks. A frozen country universe does not ensure identical resolution or partner-vote denominators between years. Recorded votes select contested resolutions and can shift in topic mix. This is a descriptive diplomatic behavior indicator, not evidence of influence or persuasion, and is **not authorized to move the main influence needle**. Do not present as verified or wire into the live dashboard before completing the gates.
