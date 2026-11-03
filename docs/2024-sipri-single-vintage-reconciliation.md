# 2024 military spending: SIPRI 2026 same-vintage reconciliation

All observations use **2023 and 2024 constant-2024-USD expenditure**, sourced from the **SIPRI 2026 series as processed by Our World in Data**. The real change is `100 × (2024 expenditure / 2023 expenditure − 1)`. Source: https://ourworldindata.org/grapher/military-spending-sipri.csv?v=1&csvType=full&useColumnShortNames=true (retrieved 2026-11-02). Primary producer: https://www.sipri.org/databases/milex.

| SOI | 2023 constant 2024 USD | 2024 constant 2024 USD | Calculated 2024 real change |
| --- | ---: | ---: | ---: |
| United States | 943,032,800,000 | 1,004,901,000,000 | +6.5606% |
| China | 292,220,760,000 | 311,900,340,000 | +6.7345% |
| Russia | 108,959,530,000 | 149,401,880,000 | +37.1169% |
| India | 85,232,530,000 | 85,597,086,000 | +0.4277% |
| EU27 (sum of 27 countries) | 314,277,593,850 | 360,219,122,430 | +14.6181% |

Earlier 2025 SIPRI fact-sheet figures (+5.7%, +7.0%, +38%, +1.6%) are superseded **for this 2024 comparison cohort** by these 2026-vintage calculations; do not silently combine releases. China/Russia are SIPRI estimates; SIPRI revises historical values. These are **military expenditure input changes**, not military effectiveness or influence.

**Validation:** `node scripts/test_2024_sipri_single_vintage.cjs`; `node scripts/test_2024_indicator_cohort.cjs` (the latter must be updated to reflect the resolved vintage limitation). No live meter changes in this PR.
