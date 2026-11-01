# EIA H1 matched gas production, domestic deliveries and LNG export volumes

**Status: acquisition workflow awaiting first live run.** This PR does not claim retrieved or verified H1 volumes. It adds a source-attributed downloader for EIA monthly U.S. dry gas production, residential deliveries, industrial deliveries and LNG exports for Jan–Jun 2025 and Jan–Jun 2026. The workflow emits an artifact even on partial failure; exit code 2 signals missing series or months. Confirm source series definitions, monthly units, completeness and any source revision before using values in published comparisons.

Sources: [EIA dry production](https://www.eia.gov/dnav/ng/hist/n9070us2m.htm), [residential deliveries](https://www.eia.gov/dnav/ng/hist/n3010us2m.htm), [industrial deliveries](https://www.eia.gov/dnav/ng/hist/n3035us2m.htm), [LNG exports](https://www.eia.gov/dnav/ng/hist/n9133us2m.htm).

The EIA monthly retail prices in PR #287 are national average onsystem sales; domestic deliveries include other commercial arrangements. Multiplying price by total delivered volume may therefore misstate actual spending; reconcile coverage before any expenditure calculation. Do not conflate LNG exports with LNG feedgas demand (liquefaction losses). Gas supply-demand accounting also requires imports, pipeline exports, storage changes, power-sector and commercial demand.

**Next:** inspect first artifact, fix any legacy series ID or format mismatches, validate against EIA pages, then match the data to H1 sector prices. No LNG-caused domestic cost, net national benefit or geopolitical influence is calculated. Readiness 53%; Command Meter UI unchanged.
