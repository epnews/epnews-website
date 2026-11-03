# IEA–Eurostat 2024 TES definition crosswalk (research only)

## Primary-source definitions

IEA glossary: https://www.iea.org/glossary

IEA **energy statistics** total energy supply (TES) is production + imports − exports − international marine bunkers − international aviation bunkers ± stock changes. Its glossary separately presents a **World Energy Outlook (WEO)** demand-based formulation and mentions exclusions for electricity trade and ambient heat. **Do not transfer WEO exclusions to the energy-statistics balance without evidence.**

Eurostat new energy-balance methodology: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Energy_balance_-_new_methodology

Eurostat gross available energy = primary production + recovered/recycled products + imports − exports + stock changes. Eurostat TES = gross available energy − international maritime bunkers − international aviation.

Thus the published energy-statistics and Eurostat TES identities are structurally aligned, but Eurostat explicitly includes recovered/recycled products. The accounting scope and treatment of electricity trade, energy carriers, bunkers, stock changes, and regional aggregation require quantitative validation; identical-looking formulas alone do not prove equal numerical series.

## Reproduced EU27_2020 2024 Eurostat values

From `nrg_bal_s`, `siec=TOTAL`, `unit=KTOE`, `time=2024`:

- Primary production PPRD: 549408.019 ktoe
- Recovered/recycled RCV_RCY: 1442.246 ktoe
- Imports IMP: 1187769.816 ktoe
- Exports EXP: 424430.939 ktoe
- Stock changes STK_CHG: 18320.820 ktoe
- Gross available energy GAE: 1332509.965 ktoe
- International maritime bunkers INTMARB: 40690.559 ktoe
- International aviation INTAVI: 41166.705 ktoe
- Total energy supply NRGSUP: 1250652.709 ktoe
- Net imports: 763338.877 ktoe

Direct net imports / Eurostat TES = 61.03523956%; Eurostat's official net imports / GAE = 57.28579125%. **Neither is currently verified as the 2024 IEA EU27/WDI indicator. Do not average or publish a comparable five-actor meter score.**

The calculated GAE − INTMARB − INTAVI is 1250652.701 ktoe, 0.008 ktoe below published NRGSUP (rounding/accounting residual). Explicitly report rather than silently correct.

## Remaining acceptance criteria before comparability

1. Obtain a same-year IEA energy-statistics EU27 balance, or a reproducible IEA-consistent member aggregation, to compare flows and TES directly.
2. Quantify the effect of recovered/recycled products and any differences in carrier coverage and energy content.
3. Verify electricity trade and intra-EU flows in both series, plus regional boundary treatment.
4. Obtain IEA-consistent Russia observation; document India's fiscal-year caveat.
5. Keep all existing needles, selectors, comparisons, and evidence panels unchanged until evidence supports a harmonized metric.
