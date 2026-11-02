# Independent reproduction of the frozen 160-country UNGA voting cohort

Reproduced on 2026-11-02 by independently streaming the original 2025-03-09 SWP/GESIS positions ZIP (uncompressed CSV approximately 3.9 GB), using its first 15 source columns. Archive SHA-256: `04e2a0df74df61ca07e157871578e53effe4f130932d71a3298852b7c5180522`.

Method: restrict to 2021–2024 recorded-vote resolutions (`adopted_without_vote=0`), include only exact positions `y/n/a`, exclude `non-voting.a`; intersect countries with at least one recorded vote in every year, then remove USA, CHN, RUS, IND and all EU27 members. Result: **160 external countries**. Per resolution, each actor's exact recorded vote is compared to every observed external-country vote. EU proxy requires at least 20 recorded EU member votes and a unique majority comprising at least 75% of recorded EU members. Identical abstentions count as agreement. The denominator is the number of matched actor-partner votes, not 160 times the number of resolutions.

The independent run reproduced all 20 existing preliminary percentages to four decimals. Annual recorded resolutions: 2021=86, 2022=89, 2023=88, 2024=95.

| Sphere | 2021 matched votes | 2022 | 2023 | 2024 |
|---|---:|---:|---:|---:|
| United States | 12,216 | 12,688 | 12,652 | 13,795 |
| China | 12,350 | 12,544 | 12,517 | 13,777 |
| Russia | 12,350 | 12,688 | 12,652 | 13,933 |
| India | 12,245 | 12,688 | 12,562 | 13,933 |
| EU proxy | 11,008 | 11,380 | 11,301 | 11,873 |

This independent reproduction verifies the *arithmetic*, not a causal geopolitical influence claim. Remaining review: topic mix, joint abstentions, missingness, EU threshold, and changing resolution cohorts. Do not activate the main influence needle.
