# IEA 2026 energy balance: 2025 import-dependence evidence

Source: uploaded `World Energy Balances Highlights 2026.xlsx`, `TimeSeries_1971-2025` worksheet, `Product=Total`, 2024 column BH and 2025 Provisional column BI. The IEA encodes exports as negative. Calculate net energy import dependence as `100 * (imports + exports) / total energy supply` using PJ throughout.

| SOI | 2024 reconstructed | 2025 provisional | Coverage |
|---|---:|---:|---|
| US | -9.7812739264% | -11.1362251893% | IEA 2025 complete |
| China | +24.0191963794% | unavailable | IEA 2025 Total balances missing |
| India | +36.0305270264% | unavailable | IEA 2025 Total balances missing |
| Russia | unavailable in this workbook | unavailable | no country series |
| EU27 | unavailable in this workbook | unavailable | no EU27 series |

**Validation:** The 2024 IEA-derived US, China and India values reproduce the World Bank `EG.IMP.CONS.ZS` 2024 observations within 0.000001 percentage point, giving strong evidence that the calculation and units align for these countries. The US 2025 estimate is provisional IEA source-derived data, not a published 2025 World Bank value. Russia's 2024 WDI and the EU aggregate must be verified from other sources.

This PR stages auditable inputs and tests without changing needles, meter selectors, evidence panels or existing comparison displays. A later UI PR may surface the US 2025 provisional estimate with a prominent source/provisional label after approval.
