# UNGA Phase 3: pooled alignment and annual volatility (2021–2024)

Source: verified SWP-derived `data/soi-swp-country-vote-alignment-2021-2024.json`. Pooled percentage = sum of matching recorded votes / sum of jointly eligible recorded votes, **not** mean annual percentages. Annual range = maximum minus minimum annual agreement in percentage points.

| Comparison | Matched/eligible | Pooled | 2024 vs 2021 (pp) | Annual range (pp) |
|---|---:|---:|---:|---:|
| USA–CHN | 59/353 | 16.71% | +1.81 | 2.37 |
| USA–RUS | 66/356 | 18.54% | -3.09 | 5.27 |
| USA–IND | 79/354 | 22.32% | +5.42 | 5.42 |
| CHN–RUS | 249/355 | 70.14% | -9.72 | 10.08 |
| CHN–IND | 242/353 | 68.56% | -5.92 | 8.17 |
| RUS–IND | 199/356 | 55.90% | -10.90 | 10.90 |
| USA–EU majority | 210/350 | 60.00% | +6.65 | 10.15 |
| CHN–EU majority | 147/350 | 42.00% | -9.68 | 9.68 |
| RUS–EU majority | 146/352 | 41.48% | -11.29 | 13.64 |
| IND–EU majority | 155/350 | 44.29% | -1.70 | 3.25 |

## Validation and interpretation

- All **40 pair-year records** passed count identity (`same + different = both_recorded`) and reported-percentage checks (0.011 pp rounding tolerance).
- Upstream source excludes consensus resolutions and nonvoting entries. Matching abstentions count as agreement. Pairwise denominators differ because only jointly recorded positions count.
- EU is a strict recorded EU27 member-majority proxy, not an EU vote. Member dissent, joint abstention sensitivity, and issue-specific alignment **cannot be calculated from these annual aggregates** and require the original country-position archive.
- Annual range is descriptive, **not** a confidence interval. Different yearly resolution topics and voting populations preclude attributing these changes to influence or diplomatic causation.
- **No geopolitical influence score, Command Meter needle, or production UI change is authorized. Do not merge without approval.**
