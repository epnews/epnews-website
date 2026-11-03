# EU27 2024 real military expenditure growth — aggregation protocol

Status: **not calculated / not cleared for publication**. Research milestone, no changes to live meter.

## Source and revision control
Use the **latest complete SIPRI Military Expenditure Database workbook**, not 2025 press-release country changes mixed with 2026 workbook country values. SIPRI says its current downloadable database runs through 2025, revises historical data, and expresses constant-dollar figures in **2024 US dollars**. Record workbook URL, publication/revision date, sheet, units, and checksum before calculation.

Primary source: https://www.sipri.org/databases/milex
Background source: https://www.sipri.org/publications/2025/sipri-fact-sheets/trends-world-military-expenditure-2024

## Fixed 27-country membership
Austria, Belgium, Bulgaria, Croatia, Cyprus, Czechia, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden.

Do **not** include UK, Norway, Switzerland, Russia, Ukraine, Türkiye or other non-EU countries. SIPRI's 2024 **Europe +17%** and Central/Western Europe **+14%** are not EU27 observations.

## Reproducible calculation
1. For every member, extract **calendar-year 2023 and 2024 military expenditure, constant (2024) US dollars**, from the *same* workbook and same series. Do not mix nominal dollars, national-currency totals or percent-of-GDP data.
2. Reject/flag absent or suppressed values; do not silently treat them as zero. List any imputation separately and withhold the headline until coverage is verified.
3. Calculate `EU27_2023 = sum(country_constant_2024_USD_2023)` and `EU27_2024 = sum(country_constant_2024_USD_2024)`.
4. Compute `growth_pct = 100 * (EU27_2024 / EU27_2023 - 1)`. Round only the final percentage, and retain all 27 country values plus intermediate sums for audit.
5. Cross-check against European Defence Agency totals as a directional plausibility check only: EDA's definition and reporting currency differ and cannot substitute for SIPRI.
6. Run source-revision and membership tests, and only then update the Global Power Indicators 2024 panel.

## Why the existing 2024 source is insufficient
The SIPRI 2024 fact sheet reports a **17% increase for Europe including Russia**, not for EU27. It cannot supply the missing number without country-level aggregation. Its 2024 real-growth figures are calculated using constant 2023 US dollars, whereas the latest workbook expresses constant-dollar data in 2024 US dollars. A single consistent source vintage is required.

## Next acquisition
Download the source workbook directly from SIPRI and store a reproducible extraction with all 27 rows and checks. No EU27 value should be invented or inferred from the Europe regional percentage.
