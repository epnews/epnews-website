# EU-27 2024 energy-import dependency: independently reproduced

**Research milestone only. No meter changes or cross-source comparison activation.**

## Official Eurostat source

Eurostat `nrg_bal_s` (Simplified energy balances), `geo=EU27_2020`, `freq=A`, `siec=TOTAL`, `unit=KTOE`, `time=2024`.

Public JSON-stat API: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_bal_s?geo=EU27_2020

| Balance flow (`nrg_bal`) | 2024 EU-27, ktoe |
| --- | ---: |
| `IMP` (imports) | 1,187,769.816 |
| `EXP` (exports) | 424,430.939 |
| `GAE` (gross available energy) | 1,332,509.965 |

**Calculation:** `(IMP - EXP) / GAE * 100 = 57.285791254851894%`.

Independent published series: Eurostat `nrg_ind_id`, `geo=EU27_2020`, `siec=TOTAL`, `unit=PC`, `time=2024` reports **57.286%** (rounding difference below 0.001 percentage point). API: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_ind_id?geo=EU27_2020 . Eurostat overview rounds to **57.3%**: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Energy_statistics_-_an_overview .

## Reproduction method

Read the JSON-stat `id`, `size`, and each dimension's `category.index`. Compute a flattened array position from the ordered dimension coordinates (row-major). Use `value[position]` for `IMP`, `EXP`, and `GAE`. Verify the published `nrg_ind_id` observation independently rather than using its rounded percentage to derive the numerator.

For the 2024 EU-27 `nrg_bal_s` extraction the dimensions are `freq, nrg_bal, siec, unit, geo, time`. Never confuse `GAE` with `GIC`, or `KTOE` with `TJ`.

## Cross-SOI comparability remains blocked

The four national observations documented in `research/soi-energy-import-dependence-2024-audit.md` are from World Bank `EG.IMP.CONS.ZS` (IEA source), **net energy imports / primary energy use**. Eurostat's EU figure uses **net imports / gross available energy**. Differences in denominator, international transport bunkers, trade geography, source coverage, and data vintage mean **57.286% is not interchangeable with a WDI observation**. The WDI EU aggregate is null for 2024.

Do not calculate a five-actor numeric difference, geopolitical score, or composite needle from these mixed sources. Continue to seek openly reusable IEA-consistent EU-27 quantities or an entirely common-source alternative. Preserve current needles, selectors, evidence panels and comparisons. Any future activation needs geography, unit, denominator, year, source, and missing-data regression tests.

## Source licensing

Eurostat metadata and data access: https://ec.europa.eu/eurostat/cache/metadata/en/sdg_07_50_esmsip2.htm . The full IEA World Energy Balances dataset has separate public-display and derived-data licensing requirements: https://www.iea.org/data-and-statistics/data-product/world-energy-balances . Do not import restricted paid datasets into the public EP News site without permission.
