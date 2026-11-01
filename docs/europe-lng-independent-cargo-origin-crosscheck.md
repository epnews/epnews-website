# Independent origin cross-check: Eurostat H1 2025 vs LNG arrival sources

## Reproducible Eurostat extraction
GitHub Actions run [41272584603](https://github.com/epnews/epnews-website/actions/runs/41272584603), artifact 13069403354, `europe-lng-all-partners.json`; 166 partner categories per reporter, H1 2025 and H1 2026, G3200, million m³ converted to bcm.

| Reporter | H1 2025 total bcm | H1 2025 US-coded bcm | H1 2025 primary labels | H1 2026 total bcm | H1 2026 US-coded bcm |
|---|---:|---:|---|---:|---:|
| Germany | 4.020376 | 0 | NSP 4.020376 (100%) | 6.177744 | 0 |
| Poland | 4.110640 | 0 | NSP 3.187868; ASI_NME_OTH 0.892709; EUR_OTH 0.030063 | 4.253218 | 0 |
| France | 16.441131 | 0 | DZ 10.907769; NG 5.533362 | 13.028502 | 0 |
| EU27 | 74.763896 | 25.838331 | US 25.838331; NSP 7.209819 | 71.913064 | 29.181938 |

## Independent real-world origin evidence (NOT matched half-year estimates)

**Germany:** Federal network regulator Bundesnetzagentur reports **106 TWh of LNG imported via German terminals in full-year 2025**, and cites BDEW finding **~96% of 2025 German LNG imports originated in the US**. These full-year 2025 physical-origin facts contradict interpreting the H1 2025 Eurostat G3200 US=0 as proof that no American LNG physically arrived in Germany, but do not quantify an H1 correction. Primary source: https://www.bundesnetzagentur.de/DE/Gasversorgung/a_2025/start.html ; English government press https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/EN/2026/20260112_GAS.html (volume only). Do NOT equate 106 TWh with 4.020 bcm without unit/period and conversion alignment.

**Poland:** ORLEN reports **81 deliveries at Świnoujście in full-year 2025**, **62 from US**, **17 from Qatar**, and one each from Trinidad and Tobago and Senegal. Its 2025 annual report gives quarterly shipments and H1 2025 US-linked Cheniere contracted shipments (Q1 4, Q2 6) and Q2 Venture Global 3 (including 1 delivered to Lithuania); shipment-by-contract is not identical to cargo origin or all shipments. Primary sources: https://orlengas.com/orlen-accelerates-its-lng-expansion-more-deliveries-stronger-fleet-and-growing-import-capacity/ and https://raportroczny.orlen.pl/en/management-report/our-performance-in-2025/upstream-and-supply/ . No justified conversion from 62 cargoes to H1 2025 bcm yet.

**France:** Eurostat G3200 H1 2025 assigns entire total 16.441131 bcm to DZ 10.907769 and NG 5.533362, and US=0. A separately published Statistical Review of World Energy 2026 LNG-origin chart (via Statista) identifies the US among major French LNG sources for full-year 2025, with the US largest according to the chart description: https://www.statista.com/statistics/1096327/natural-gas-trade-movement-france/ . Secondary source, annual period, numbers paywalled; source-vintage/methodology unverified. Treat as corroboration to investigate, not a numerical adjustment.

## Editorial conclusion
**Established:** Eurostat G3200 US-coded zero does not reliably mean zero US-origin physical deliveries, as independent German/Polish full-year cargo sources show. Eurostat reporter and supplier classification is not yet harmonized with terminal cargo origin. **Not established:** precise share of the ~15 bcm Eurostat-vs-NUPI discrepancy attributable to France/Germany/Poland, any causal geopolitical leverage, or net economic benefit.

## Next data requirement
Obtain **matched Jan–Jun 2025 and Jan–Jun 2026** country-specific cargo-arrival source (origin, destination, volume, reexports, standardized gas-equivalent units). Reconcile against Eurostat G3200 and NUPI/Bruegel EEA external imports. Keep US attribution correction **null** until matching. Maintain 53% readiness and all Command Meter interactions.
