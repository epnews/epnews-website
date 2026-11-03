# Five-SOI 2024 net energy import dependence — provenance and comparison gate

**Research only: no live meter or scoring changes.**

## Official series

World Bank WDI `EG.IMP.CONS.ZS`, sourced to IEA: https://api.worldbank.org/v2/country/RUS;USA;CHN;IND;EUU/indicator/EG.IMP.CONS.ZS?format=json&date=2023:2024&per_page=100

| SOI | WDI code | 2023 official IEA-sourced % | 2024 official IEA-sourced % | Status |
|---|---|---:|---:|---|
| United States | USA | -8.6972890701991 | -9.78127421443322 | observed |
| China | CHN | 23.3457009965093 | 24.0191966181448 | observed |
| Russia | RUS | -72.3740833470371 | -70.7306703064017 | observed (not independently reproduced from free IEA workbook) |
| India | IND | 36.9585579039788 | 36.0305276064275 | observed; check fiscal-year reporting context |
| EU27 | EUU | 62.465661509787 | null | no official 2024 observation |

World Bank definition: https://databank.worldbank.org/metadataglossary/world-development-indicators/series/EG.IMP.CONS.ZS . Positive = net importer; negative = net exporter. This is a *dependence/trade balance* metric, not a direct measure of economic benefit, security, or geopolitical influence.

## EU27 provisional modeled value

Eurostat EU27_2020 2024 observed net imports / total energy supply: **61.0352395598577%**. Four-year (2020–2023) mean WDI-minus-Eurostat difference: **+0.4821182845046 percentage points**. Therefore provisional adjusted **61.5173578444%**, display **61.52%**. Historical offset sensitivity range gives **61.39%–61.62%**; this is *not* a statistical confidence interval. See `research/eu27-2024-four-year-calibrated-estimate.md`. Never label EU27 2024 as official IEA/WDI.

## Decision and safeguards

1. Treat four WDI observations as same-indicator data. The EU27 estimate is *not* a fifth official observation and must be flagged modeled whenever shown.
2. Do not apply a universal 'higher is better' or 'lower is better' score to these signed net-import percentages. Net exports may increase export exposure; net imports may reflect diversified supply. The metric alone does not establish SOI power.
3. A prospective UI may present raw signed percentages and provenance, but should not replace current Energy & Resources scoring or move the composite needle without explicit design approval and tests.
4. Preserve selectors, comparison panels, moving needles, source links, and existing functionality. Do not average the five numbers or use the EU estimate as verified evidence.
5. Russia 2024 WDI is verified as a published value, **not** independently reproducible from the free IEA Highlights workbook. Document this limitation instead of substituting an unverified Russian flow.
