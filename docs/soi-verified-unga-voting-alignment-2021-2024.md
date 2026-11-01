# Verified UN General Assembly voting alignment, 2021–2024

**Status:** Empirical, audited country-vote results. **Not** an influence or Command Meter score.

## 2024: first verified five-sphere comparison

The source contains **342 resolutions** in 2024: **95 recorded-vote resolutions** and **247 adopted without a vote**. All 342 have exactly **193 country-position rows**. The 95 recorded-vote resolutions contain 1,462 non-voting entries, excluded from agreement denominators.

| Comparison | Identical recorded positions | Compared resolutions | Agreement |
|---|---:|---:|---:|
| US–China | 17 | 93 | **18.28%** |
| US–Russia | 17 | 94 | **18.09%** |
| US–India | 23 | 94 | **24.47%** |
| China–Russia | 63 | 94 | **67.02%** |
| China–India | 63 | 94 | **67.02%** |
| Russia–India | 50 | 95 | **52.63%** |
| US–EU27 member-majority proxy | 56 | 92 | **60.87%** |
| China–EU27 member-majority proxy | 36 | 92 | **39.13%** |
| Russia–EU27 member-majority proxy | 36 | 93 | **38.71%** |
| India–EU27 member-majority proxy | 41 | 93 | **44.09%** |

The EU proxy had a strict recorded-vote majority of at least 14 EU27 members on **93** of the 95 recorded-vote resolutions. Mean member cohesion within those eligible resolutions was **92.38%**. The EU itself does not cast a single UNGA vote.

## Annual comparison: key pairs

| Year | Recorded-vote resolutions | US–China | China–Russia | US–EU majority | EU cohesion |
|---|---:|---:|---:|---:|---:|
| 2021 | 86 | 14/85 = 16.47% | 66/86 = 76.74% | 45/83 = 54.22% | 94.18% |
| 2022 | 89 | 14/88 = 15.91% | 62/88 = 70.45% | 56/87 = 64.37% | 95.10% |
| 2023 | 88 | 14/87 = 16.09% | 58/87 = 66.67% | 53/88 = 60.23% | 94.09% |
| 2024 | 95 | 17/93 = 18.28% | 63/94 = 67.02% | 56/92 = 60.87% | 92.38% |

Across all four years, pooled agreement (sum of matching votes divided by sum of eligible paired votes) was **59/353 = 16.71%** for US–China, **249/355 = 70.14%** for China–Russia, and **210/350 = 60.00%** for US–EU majority.

## Source and validation

- SWP UNGA-RES country-position archive: `2025-03-09_unga-res_un_resolutions_positions.zip` (SHA-256 `04e2a0df74df61ca07e157871578e53effe4f130932d71a3298852b7c5180522`).
- Companion resolution metadata: `2025-03-09_unga-res-un_resolutions.csv` (SHA-256 `3d31e9835d5561df124772c573563202f64aa5c00ea7b7830b90c680305c40cd`).
- Source archive CSV has 290 columns, with embedded newlines in later text columns. The optimized parser extracts the first 15 fields of each record while streaming the ZIP and checks completeness against the companion resolution metadata.
- **Zero source row-count mismatches:** every resolution in 2021–2024 has exactly 193 country rows.
- **Zero vote-tally mismatches:** for every recorded-vote resolution, sums of country `y`, `n`, and `a` match the companion resolution's yes/no/abstention totals.
- A synthetic test verifies that consensus votes, nonvoting entries, and embedded newlines are handled correctly.

## Interpretation and limitations

Agreement is **the fraction of recorded-vote resolutions on which both actors cast exactly the same `y`, `n`, or `a`**. Two abstentions count as agreement. Missing and `non-voting.a` entries are excluded, not treated as disagreements. Denominators therefore differ by pair. The dataset includes only resolutions with a recorded vote, which may disproportionately represent contested issues. Issue mix, sponsorship, regional blocs, and resolution significance are not controlled for. EU majority is an analytical proxy, not an EU vote. **No geopolitical influence score, causal inference, or Command Meter needle change is authorized by these findings.**

Next analytical steps: issue-specific voting agreement, sensitivity tests that exclude joint abstentions, and transparent baseline comparisons before considering any weighted diplomatic indicator.
