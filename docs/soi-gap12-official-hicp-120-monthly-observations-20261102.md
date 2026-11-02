# SOI GAP-12 — Official Eurostat national HICP archive (2025-S2 vs 2026-S1)

This PR commits the complete **120 monthly national HICP values for 10 countries** (BE, BG, DE, HR, HU, IE, MT, NL, RO, SE), together with **11 derived real household energy-price comparisons** for electricity or natural gas. It is a data preservation milestone, not an SOI score change.

## Official source and provenance

Eurostat JSON-stat endpoint: `prc_hicp_minr`, `coicop18=TOTAL`, `unit=I25`, months July 2025–June 2026. Official GitHub Actions retrieval: [run 41390176956](https://github.com/epnews/epnews-website/actions/runs/41390176956), [artifact 13116843168](https://github.com/epnews/epnews-website/actions/runs/41390176956/artifacts/13116843168). Verified ZIP SHA-256: `c84eb9bf7cb87b0f004503f9902713e8f1a52dde95bd6efe750337e52e74feaf`. Original retrieval timestamp: `2026-11-02T04:45:13.413Z`.

## Method

Each country's 2025-S2 and 2026-S1 deflator uses the arithmetic mean of the six monthly total-HICP index values in that semester. A 2026-S1 nominal household price in EUR/100kWh is converted to 2025-S2 purchasing-power terms by multiplying by `meanHICP(2025-S2)/meanHICP(2026-S1)`. Percent change compares this deflated endpoint with the 2025-S2 nominal price.

All 11 comparisons retain commodity, consumer, period, unit, and upstream source references from the existing nominal price panel. **The underlying nominal 2026-S1 country price observations have not been independently source-verified**; the file explicitly sets `upstreamNominalPricesIndependentlyVerified=false`. Real changes are arithmetic conditional on those nominal inputs. The HICP index measures general consumer inflation, not energy-specific inflation. This does not establish corporate realized revenue, net benefit, profit, causal influence, or a closed SOI evidence gate.

## Reproducibility and safeguards

The merged importer `scripts/audit_soi_eu_gap12_import_official_hicp_artifact_20261102.cjs` and integration test `scripts/test_soi_eu_gap12_official_hicp_import_roundtrip_20261102.cjs` provide schema, month count, arithmetic, and tamper checks. The data file preserves artifact/run IDs, checksum, and source URL. No meter UI, selectors, needles, or scores changed. Audit remains 20/30 until independent nominal price verification and remaining evidence gates are completed.
