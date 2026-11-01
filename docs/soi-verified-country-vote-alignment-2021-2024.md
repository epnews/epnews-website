# Verified SWP UN General Assembly voting alignment (2021–2024)

The uploaded `2025-03-09_unga-res_un_resolutions_positions(1).zip` was processed locally with Python/pandas `read_csv(usecols=['unres','iso_alpha3_code','year','position','adopted_without_vote'],chunksize=50000,dtype=str)`. All **1,996,092** rows scanned; **260,357** rows have year 2021–2024 before vote/actor filters. Full scan took approximately 23 seconds. Only y/n/a on actual recorded-vote resolutions retained; consensus (adopted_without_vote=1), nonvoting and countries outside the five-sphere comparison excluded.

| Year | Recorded resolutions | USA–CHN | USA–RUS | USA–IND | CHN–RUS | CHN–IND | RUS–IND | EU majority cohesion |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 2021 | 86 | 16.47% | 21.18% | 19.05% | 76.74% | 72.94% | 63.53% | 94.18% |
| 2022 | 89 | 15.91% | 19.10% | 22.47% | 70.45% | 64.77% | 53.93% | 95.10% |
| 2023 | 88 | 16.09% | 15.91% | 22.99% | 66.67% | 69.77% | 54.02% | 94.09% |
| 2024 | 95 | 18.28% | 18.09% | 24.47% | 67.02% | 67.02% | 52.63% | 92.38% |

**Methodological limits:** Percentages are exact matching y/n/a positions on resolutions where both actors have a recorded vote. Abstentions count as a position, not absence. This is an **unweighted issue mix** of UNGA recorded votes, not a causal measure of diplomatic influence or global alignment. EU proxy: strict majority of at least 14 EU27 member recorded votes; EU itself does not vote as a bloc at UNGA. EU cohesion is mean share of recorded EU members agreeing with the modal position on eligible resolutions. Voting agreement denominators vary by pair/year. The original 2025-03-09 SWP dataset ends in early 2025, so the study uses 2021–2024 only.

**2024 actual EU proxy comparisons:** USA 60.87%; China 39.13%; Russia 38.71%; India 44.09%. The meter's diplomatic influence scores remain uncalibrated. The data does **not** justify changing any influence needle.

Source: SWP / GESIS UNGA-RES dataset, DOI 10.7802/2855. The full ZIP is not committed to GitHub; only derived aggregates and code are included. Re-run with the ZIP and validate the result against the included aggregation and annual resolution totals before UI deployment.
