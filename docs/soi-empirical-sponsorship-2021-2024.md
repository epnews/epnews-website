# Empirical UNGA resolution co-sponsorship, 2021–2024

From the original uploaded SWP resolution CSV's `author_iso` field, counted each actor's appearance among semicolon-delimited resolution sponsors. This is **real country-specific evidence**, but not voting agreement, leadership, influence, or net benefit.

| Calendar year | US | China | Russia | India | ≥1 EU27 | ≥14 EU27 | All EU27 | Missing/NA sponsor data | Total resolutions |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 2021 | 45 | 49 | 45 | 54 | 106 | 57 | 24 | 126 | 334 |
| 2022 | 52 | 56 | 34 | 35 | 118 | 71 | 26 | 122 | 335 |
| 2023 | 42 | 66 | 34 | 45 | 122 | 78 | 20 | 116 | 338 |
| 2024 | 34 | 81 | 36 | 63 | 121 | 60 | 13 | 93 | 342 |

**Interpretation constraints:** A sponsorship listing only establishes listed support for the resolution text; a country may sponsor many resolutions as one member of a very large coalition. EU27 columns are thresholds of member-state sponsorship, not EU votes. Missing/NA authorship must not be interpreted as absence of sponsors, and the missing share changes across years (126/334 in 2021 vs 93/342 in 2024). All resolutions, including those adopted without a vote, are included. Avoid inferring causality or geopolitical influence from these counts.

Recompute with `python scripts/build_swp_sponsorship_counts.py <source.csv> <output.json>`. Next: cross-check select sponsor lists against UN source records and obtain SWP country-position CSV for actual alignment.
