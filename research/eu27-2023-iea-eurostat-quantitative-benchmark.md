# EU27 2023 IEA–Eurostat import-dependence benchmark

Research-only quantitative cross-source test. No score or meter changes.

## Primary source observations

World Bank indicator EG.IMP.CONS.ZS, EUU (IEA sourced): https://api.worldbank.org/v2/country/EUU/indicator/EG.IMP.CONS.ZS?format=json&date=2022:2024

- 2022: 66.7360598821812%
- 2023: **62.465661509787%**
- 2024: **null** (unpublished; do not infer a value)

Eurostat `nrg_bal_s`, `geo=EU27_2020`, `freq=A`, `siec=TOTAL`, `unit=KTOE`, `time=2023`: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_bal_s?geo=EU27_2020&freq=A&siec=TOTAL&unit=KTOE&time=2023&nrg_bal=IMP&nrg_bal=EXP&nrg_bal=NRGSUP&nrg_bal=GAE

- Imports IMP: 1215709.545 ktoe
- Exports EXP: 434749.040 ktoe
- Total energy supply NRGSUP: 1260937.298 ktoe
- Gross available energy GAE: 1338591.286 ktoe
- Net imports: 780960.505 ktoe

## Reproduction

- Eurostat net imports / TES = `(1215709.545 - 434749.040) / 1260937.298 * 100` = **61.9349198599%**.
- World Bank/IEA EUU 2023 = **62.4656615098%**.
- Signed difference (Eurostat TES proxy minus IEA/WB) = **−0.5307416499 percentage points**.
- Eurostat net imports / GAE = **58.3419683938%**; difference from IEA/WB = **−4.1236931160 percentage points**.

**Interpretation:** TES-based Eurostat calculation is substantially closer to IEA/WB than Eurostat's official GAE-based dependency rate, but the 0.531pp residual proves they are not identical. Do not treat close agreement in 2023 as evidence that 2024 Eurostat TES ratio 61.03523956% is a verified IEA EU27 value. Investigate differences in trade flow coverage, energy supply, energy product classification, recovered/recycled energy, and methodology revisions.

## Gate

Do not publish a harmonized five-SOI score or change moving needles until comparable EU27 and Russia 2024 observations and matching definitions are established. Keep existing selectors, comparisons and evidence panels unchanged.
