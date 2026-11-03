# EU27 2024 provisional IEA-style net energy imports: four-year calibration audit

**Research-only.** Do not insert the modeled value into a verified five-SOI comparison, change any command-meter needle, or replace the directly observed Eurostat data. This document extends the 2022–2023 validation to 2020–2023.

## Primary sources

- Eurostat simplified energy balances, `nrg_bal_s`, EU27_2020, TOTAL, KTOE, annual 2020–2023: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_bal_s?geo=EU27_2020&freq=A&siec=TOTAL&unit=KTOE&time=2020&time=2021&time=2022&time=2023&nrg_bal=IMP&nrg_bal=EXP&nrg_bal=NRGSUP
- World Bank `EG.IMP.CONS.ZS`, EUU, sourced to IEA: https://api.worldbank.org/v2/country/EUU/indicator/EG.IMP.CONS.ZS?format=json&date=2020:2024
- 2024 Eurostat direct TES proxy previously reproduced in `research/eu27-2024-energy-supply-denominator-reproduction.md`.

## Backtest: percentage of energy use

| Year | Eurostat imports ktoe | Exports ktoe | TES ktoe | Eurostat (IMP−EXP)/TES % | World Bank/IEA % | WB minus Eurostat (pp) |
|---|---:|---:|---:|---:|---:|---:|
| 2020 | 1171649.611 | 379152.743 | 1322366.848 | 59.930182702 | 60.286205057 | +0.356022355 |
| 2021 | 1224402.832 | 412620.033 | 1400159.190 | 57.977893142 | 58.433149572 | +0.455256430 |
| 2022 | 1300897.672 | 427949.843 | 1319656.860 | 66.149607179 | 66.736059882 | +0.586452703 |
| 2023 | 1215709.545 | 434749.040 | 1260937.298 | 61.934919860 | 62.465661510 | +0.530741650 |

Arithmetic mean additive adjustment = **+0.4821182845 percentage points**. This is an empirical correction, **not** a source-published methodology conversion, and four years do not establish a stable future adjustment.

2024 directly observed Eurostat EU27 ratio = (1187769.816 − 424430.939) / 1250652.709 × 100 = **61.0352395599%**. Adding the four-year historical mean gives a **provisional modeled 2024 IEA-style estimate of 61.5173578444%, rounded 61.52%**. World Bank EUU 2024 is null. **Never attribute 61.52% to IEA or World Bank.**

The historical observed adjustment range (+0.3560 to +0.5865 pp) would translate to an illustrative 2024 range of **61.3913% to 61.6217%**. This is a *historical sensitivity range*, not a statistically calibrated prediction interval or confidence interval.

## Limitations and next gate

- No direct 2024 IEA EU27 observation. Source accounting differences remain unexplained, so a constant offset is a heuristic.
- A small absolute percentage-point discrepancy is not proof of equivalent country/region boundary, trade definitions, or energy balance scope.
- The IEA Highlights free workbook lacks Russia and EU27 aggregate. India has an IEA fiscal-year reporting caveat.
- Keep 61.52% in research notes only, with observed source values and transparent calculation. Do not alter active command-meter dimensions, moving needles, side-by-side comparison or evidence panels based on this estimate.
- Before promotion to a displayed estimate, require explicit provenance, uncertainty label, tests and user approval; before scoring, require harmonized actor coverage and defined treatment of modeled versus observed values.
