# Energy Institute 2026: five-SOI energy scale and publication-rights audit

Status: **research only — not an activated meter metric or influence score**. Prepared 2026-11-02.

## Same-source, same-year comparison

Source: *Energy Institute Statistical Review of World Energy 2026*, **Total Energy Supply** (TES), 2025, p. 23, and EU region profile p. 21. Units: exajoules (EJ). Source file supplied for review in the EP News project; public landing page: https://energyinst.org/statistical-review/resources-and-data-downloads

| SOI | 2025 TES (EJ) |
| --- | ---: |
| China | 162.19 |
| United States | 93.83 |
| European Union | 52.19 |
| India | 39.10 |
| Russia | 31.19 |

**Interpretation:** This is energy-system scale (energy supplied to meet domestic demand), not energy production, export capacity, independence, energy wealth, influence, leverage, resilience, profit, or net economic benefit. Do not interpret a larger TES as a higher geopolitical influence score.

**Method:** The EI changed its TES accounting to the *Physical Energy Content* method in its 2025 edition; its prior primary-energy-consumption figures used a fossil-fuel-equivalent method. Compare the 2025 figures within the 2026 edition only; do not silently mix earlier methodological series. EI methodology: https://www.energyinst.org/statistical-review/about . Confirm EU-27 rather than the broader 'Europe' geography when implementing any dataset join. The EI report's EU region profile explicitly reports 2025 TES of approximately 52.2 EJ (p. 21), corroborating the 52.19 EJ table figure.

## Dependence is a separate construct

The report's p. 7 chart displays **2025 net fossil-fuel imports as a share of consumption** for coal, gas and oil, but the chart covers Europe, India, China and the United States, not Russia, and 'Europe' is not necessarily EU-27. It therefore cannot provide an all-five-SOI, EU-27-matched energy independence score. The 2024 World Bank EG.IMP.CONS.ZS four-actor dataset and the Eurostat EU27 57.286% measure have different denominators and cannot be combined as five comparable values. See the previous audits in this directory.

## Publication and reuse constraints

The 2026 EI report p. 84 explicitly welcomes attributed quotation, requires permission before **extensive reproduction of tables and/or charts**, and forbids reproduction or redistribution of data sourced from **S&P Global Energy or S&P Global Inc** without prior authorization. EI website terms additionally reserve intellectual property rights: https://energyinst.org/terms . Download access is not a blanket open-data license.

For the present audit, reproduce only these five individually cited values and an original small comparison; **do not commit the full EI XLSX/CSV/PDF, bulk copy tables, or expose an EI-derived downloadable dataset**. Before live commercial/publication use beyond limited attributed quotation, review the specific source-data provenance and secure permission if necessary. EI permissions contact listed on p. 84: statisticalreview@energyinst.org .

## Safe staged implementation plan

1. Keep all existing SOI command-meter dimensions, needles, selectors, evidence panels and comparison guards untouched.
2. If cleared for publication, add a distinct **2025 Energy Scale (TES, EJ)** evidence comparison, explicitly labeled *not an influence score*. Do not replace Energy & Resources dimension scores with TES.
3. Implement a dedicated metric key, common period and EJ unit, actor-identity validation for EU-27, provenance and missing-value handling.
4. Extend comparison unit guards and automated regression tests for five values, year mismatch, unit mismatch, absent Russia dependence data, and zero impact on existing Economic/Strategic metrics.
5. Independently research an all-five, same-year, same-denominator **Energy Independence** measure; do not combine EI Europe with Eurostat EU-27 or World Bank national observations without reconciliation.

No website functionality or scoring is changed in this research milestone.
