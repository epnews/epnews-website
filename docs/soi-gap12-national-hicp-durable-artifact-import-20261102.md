# SOI GAP-12: complete national HICP artifact import

The successful official Eurostat workflow run is [41390176956](https://github.com/epnews/epnews-website/actions/runs/41390176956); artifact [13116843168](https://github.com/epnews/epnews-website/actions/runs/41390176956/artifacts/13116843168), expires **2026-12-02**.

**Important:** The artifact has been downloaded and inspected. It contains 10 national monthly HICP series (12 months each), and 11 national inflation-adjusted household electricity/gas comparisons. This PR adds the durable importer; it does **not** claim that the 120 values are already committed to the repository.

## Import the original artifact

1. Download artifact ZIP from the link above.
2. Extract `soi-eu-gap12-national-real-energy-price-changes-20261102.json`.
3. Run:
   ```sh
   node scripts/audit_soi_eu_gap12_import_official_hicp_artifact_20261102.cjs /path/to/soi-eu-gap12-national-real-energy-price-changes-20261102.json
   ```
4. Review and commit the generated `data/soi-eu-gap12-national-hicp-120-monthly-values-11-real-comparisons-20261102.json` in a **separate PR**, retaining provenance.
5. Cross-check nominal country energy-price inputs against official Eurostat source publications before upgrading their source-verification status.

## Hard controls

- Exactly 10 countries, 120 positive monthly HICP observations in calendar order, 11 matched price pairs.
- Recompute each six-month mean, national deflator and real price change; reject missing or inconsistent data.
- Preserve source URL, retrieval time, artifact ID, run ID, SHA-256 provenance and source verification caveat.
- No inferred geopolitical causality, economic benefit or influence scores; independent audit stays 20/30.
