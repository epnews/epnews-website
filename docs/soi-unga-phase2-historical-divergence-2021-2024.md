# UNGA diplomatic alignment — Phase 2 historical trends (2021–2024)

**Source:** `data/soi-swp-country-vote-alignment-2021-2024.json`, verified against SWP country-position and resolution metadata in PR #349. This is a secondary calculation from audited annual aggregates, **not** a fresh source-archive reprocessing. Percentages are rounded to two decimals; percentage-point (pp) changes subtract unrounded fractions. This document does not alter Command Meter scores.

## Annual comparison and four-year change

| Pair | 2021 | 2022 | 2023 | 2024 | 2024 minus 2021 (pp) |
|---|---:|---:|---:|---:|---:|
| US–China | 14/85 (16.47%) | 14/88 (15.91%) | 14/87 (16.09%) | 17/93 (18.28%) | +1.81 |
| US–Russia | 18/85 (21.18%) | 17/89 (19.10%) | 14/88 (15.91%) | 17/94 (18.09%) | -3.09 |
| US–India | 16/84 (19.05%) | 20/89 (22.47%) | 20/87 (22.99%) | 23/94 (24.47%) | +5.42 |
| China–Russia | 66/86 (76.74%) | 62/88 (70.45%) | 58/87 (66.67%) | 63/94 (67.02%) | -9.72 |
| China–India | 62/85 (72.94%) | 57/88 (64.77%) | 60/86 (69.77%) | 63/94 (67.02%) | -5.92 |
| Russia–India | 54/85 (63.53%) | 48/89 (53.93%) | 47/87 (54.02%) | 50/95 (52.63%) | -10.90 |
| US–EU majority | 45/83 (54.22%) | 56/87 (64.37%) | 53/88 (60.23%) | 56/92 (60.87%) | +6.65 |
| China–EU majority | 41/84 (48.81%) | 35/87 (40.23%) | 35/87 (40.23%) | 36/92 (39.13%) | -9.68 |
| Russia–EU majority | 42/84 (50.00%) | 36/87 (41.38%) | 32/88 (36.36%) | 36/93 (38.71%) | -11.29 |
| India–EU majority | 38/83 (45.78%) | 37/87 (42.53%) | 39/87 (44.83%) | 41/93 (44.09%) | -1.69 |

**EU cohesion (mean among eligible EU-majority resolutions):** 94.18%, 95.10%, 94.09%, 92.38% in 2021–2024 respectively; 2024 vs 2021 = **-1.80 pp**. This is not the proportion of all EU member votes agreeing across all resolutions. The EU-majority proxy requires at least 14 recorded EU27 members; ties and insufficiently recorded votes do not yield a proxy position.

## Interpretation

The largest endpoint declines among these ten comparisons are Russia–EU (-11.29 pp), Russia–India (-10.90 pp), China–Russia (-9.72 pp) and China–EU (-9.68 pp). The largest increases are US–EU (+6.65 pp) and US–India (+5.42 pp). **Endpoint differences are descriptive, not statistically established diplomatic realignments.** The mix of resolutions differs across years and voting agreement does not establish causal influence, alliance commitments, or policy impact.

## Audit and denominator rules

- Compare identical recorded `y`, `n`, `a` votes on the same resolution; two abstentions count as a match.
- Exclude consensus resolutions and all `non-voting.a` entries. Only resolutions where both sides have eligible recorded positions enter a pair's denominator.
- EU is the strict majority of recorded EU27 positions, not a UNGA vote by the EU. The member-level disagreement distribution cannot be reconstructed from the annual aggregate file; it requires the original country-position archive.
- Different pair denominators and yearly issue mixes prevent treating percentage-point changes as adjusted measures of geopolitical alignment.
- Further research should separate issue categories, count joint-abstention matches separately, and calculate per-resolution EU disagreement before using the trends as a diplomatic signal.
- No influence score or Command Meter needle change is authorized. No merge without explicit approval.
