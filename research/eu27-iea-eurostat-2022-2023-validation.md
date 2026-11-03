# EU27 IEA–Eurostat TES import-dependence two-year benchmark

Research-only extension of `research/eu27-2023-iea-eurostat-quantitative-benchmark.md`. No meter scoring or live UI changes.

Sources:
- Eurostat `nrg_bal_s` EU27_2020, `siec=TOTAL`, `unit=KTOE`, years 2022 and 2023: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_bal_s?geo=EU27_2020&freq=A&siec=TOTAL&unit=KTOE&time=2022&time=2023&nrg_bal=IMP&nrg_bal=EXP&nrg_bal=NRGSUP&nrg_bal=GAE
- World Bank `EG.IMP.CONS.ZS` EUU (IEA-sourced): https://api.worldbank.org/v2/country/EUU/indicator/EG.IMP.CONS.ZS?format=json&date=2022:2024

| Year | Eurostat imports ktoe | Exports ktoe | TES ktoe | Eurostat net imports/TES | IEA-sourced WB ratio | Eurostat minus WB (pp) |
|---|---:|---:|---:|---:|---:|---:|
| 2022 | 1300897.672 | 427949.843 | 1319656.860 | 66.149607179% | 66.736059882% | -0.586452703 |
| 2023 | 1215709.545 | 434749.040 | 1260937.298 | 61.934919860% | 62.465661510% | -0.530741650 |

Formula: `(IMP - EXP) / NRGSUP * 100`. 2024 World Bank EUU indicator is null. 2024 Eurostat TES proxy 61.03523956% is **not** an observed IEA figure.

Two years show a similar, nonzero residual. This supports the hypothesis of a recurring accounting difference but does not establish its cause, a correction factor, or a defensible 2024 IEA-equivalent EU value. Do not extrapolate a 2024 WB/IEA percentage by adding or averaging the observed gaps.

Further validation: retrieve IEA EU27 2022/23 production, trade, stock changes, bunkers, and TES, then compare flow by flow. Check recovered/recycled products and EU geography. Validate 2024 Russia from a matching source. Keep all live meter functionality and current evidence thresholds intact.
