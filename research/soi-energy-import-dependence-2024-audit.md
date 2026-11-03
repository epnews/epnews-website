# SOI energy import dependence: 2024 evidence and comparability audit

Status: **research only**. Do not change active Energy & Resources needles, scores, selectors, comparisons or evidence panels.

## Common candidate

World Bank WDI indicator `EG.IMP.CONS.ZS`, **Energy imports, net (% of energy use)**, calendar 2024, source IEA. World Bank metadata: https://databank.worldbank.org/metadataglossary/world-development-indicators/series/EG.IMP.CONS.ZS ; series https://data.worldbank.org/indicator/EG.IMP.CONS.ZS .

World Bank definition: (gross energy imports − gross energy exports) / primary energy use × 100, with imports and exports in tonnes of oil equivalent. Primary energy use includes domestic production, net imports and stock changes, excluding fuel supplied to international ships and aircraft. **Negative** values denote net exporters; **positive** values denote net importers. This is an energy-system exposure input, **not** a measure of geopolitical influence, national benefit, profitability or a fuel-specific vulnerability.

| SOI | WDI 2024 value (%) | Data URL |
|---|---:|---|
| United States | -9.78127421443322 | https://api.worldbank.org/v2/country/USA/indicator/EG.IMP.CONS.ZS?format=json |
| China | 24.0191966181448 | https://api.worldbank.org/v2/country/CHN/indicator/EG.IMP.CONS.ZS?format=json |
| Russia | -70.7306703064017 | https://api.worldbank.org/v2/country/RUS/indicator/EG.IMP.CONS.ZS?format=json |
| India | 36.0305276064275 | https://api.worldbank.org/v2/country/IND/indicator/EG.IMP.CONS.ZS?format=json |
| EU-27 | **missing** | https://api.worldbank.org/v2/country/EUU/indicator/EG.IMP.CONS.ZS?format=json |

The WDI API reports a null EU aggregate in 2024. Never convert null to zero, average national percentage values, or label a separate-source statistic as WDI.

## EU-27 supporting observation (different series)

Eurostat reports EU-27 2024 **57.3% energy import dependency**: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Energy_statistics_-_an_overview . The Eurostat formula is (imports − exports) / **gross available energy**, with Eurostat energy-balance conventions: https://ec.europa.eu/eurostat/cache/metadata/en/sdg_07_50_esmsip2.htm . Federal Reserve independent methodology discussion: https://www.federalreserve.gov/econres/notes/feds-notes/european-energy-import-dependency-20250416.html .

World Bank/IEA denominator is **primary energy use**, with international transport bunker exclusions. Eurostat denominator is **gross available energy**. Despite conceptual similarity, differences in accounting, product coverage, bunkers and source vintage mean the Eurostat figure is **not** an exact fifth observation in WDI. Display only with separate-source and non-comparability labels.

## Remaining evidence gap and next action

Find a **licensed-for-public-use**, 2024 EU-27 IEA-consistent total of net energy imports and total primary energy use, using fixed EU-27 membership and correct extra-EU trade treatment. Derive the aggregate as **sum of net imports / sum of energy use × 100**, not an arithmetic average of 27 national percentages. Reconcile intra-EU flows, stock changes, international bunkers, missing member values and IEA vs Eurostat methodology before activation.

IEA's full World Energy Balances is a **licensed data product**, with explicit restrictions on shared platforms and derived products: https://www.iea.org/data-and-statistics/data-product/world-energy-balances . Do not ingest restricted paid data into the public site without an appropriate license. The free IEA data browser provides selected charts but does not yet establish the required EU aggregate quantities: https://www.iea.org/data-and-statistics/data-tools/energy-statistics-data-browser .

## Release gate

1. Verify exact data vintage and complete EU-27 numerator/denominator from an openly reusable source or obtain permission.
2. Add a common `metric` and period only for genuinely matched observations, and use percentage-point differences, **not** an influence score.
3. Preserve current Energy & Resources indicators as independently sourced evidence, plus all existing moving needles, selector state, evidence panels, and comparisons.
4. Add missing-data, negative-value, geography, year, metric, source, and denominator regression tests before any meter changes.

No score or UI change is authorized by this research audit.
