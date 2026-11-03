# EU27 2024 energy trade: published aggregate vs 27 member states

Research-only reproducibility finding. **Do not activate a five-SOI import-dependence score.**

Source: Eurostat `nrg_bal_s`, `siec=TOTAL`, `unit=KTOE`, `time=2024`, flows `IMP` and `EXP`. Live query: https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_bal_s?freq=A&siec=TOTAL&unit=KTOE&time=2024&nrg_bal=IMP&nrg_bal=EXP

| Flow (ktoe) | EU27_2020 | Sum of all 27 EU member geos | Difference |
|---|---:|---:|---:|
| Imports | 1187769.816 | 1187769.816 | 0.000 |
| Exports | 424430.939 | 424430.939 | 0.000 |
| Net imports | 763338.877 | 763338.877 | 0.000 |

Member codes: BE BG CZ DK DE EE IE EL ES FR HR IT CY LV LT LU HU MT NL AT PL PT RO SI SK FI SE.

**Interpretation:** Eurostat's published EU27 imports and exports are numerically the sums of national imports and exports, respectively, rather than a separately de-duplicated extra-EU trade series. This does **not** prove that all intra-EU bilateral flows cancel perfectly at the product level, nor that IEA's EU27 balance or TES denominator matches Eurostat. Net flows do cancel in the aggregate to the precision shown, but the source data cannot distinguish true bilateral cancellation from national accounting differences without origin/destination detail.

Prior published values: 2024 Eurostat EU27 net imports / gross available energy = 57.286%; alternative net imports / Eurostat total energy supply = 61.035%. **The alternative is not an IEA-equivalent score.**

## Reproduction

Fetch the JSON-stat endpoint above. Its dimensions are `[freq,nrg_bal,siec,unit,geo,time]` with sizes `[1,2,1,1,41,1]`. `geo` order begins EU27_2020, then 27 member states. For a flow offset 0 (IMP) or 1 (EXP), flat value index is `flow_offset * 41 + geo_index`. Sum all 27 member values and compare to index 0 (IMP EU) or 41 (EXP EU). The Eurostat endpoint may emit malformed escaped underscores in metadata; parse numeric `value` and `geo.category.index` independently when necessary.

## Remaining comparability blockers

1. Verify IEA vs Eurostat definitions and primary energy accounting, including bunkers, stock changes, non-combustible renewables and international transport.
2. Obtain 2024 IEA-consistent Russia and EU27 data from authorized sources, or validate a documented mapping and quantify residuals.
3. Address India fiscal-year vs EU calendar-year interpretation.
4. Do not merge incompatible denominator ratios, average them, or activate the Energy & Resources meter on this evidence alone.
