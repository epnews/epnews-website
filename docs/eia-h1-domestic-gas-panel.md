# EIA H1 2025/2026 domestic natural gas panel — reproducible acquisition gate

This milestone builds a **monthly-data acquisition and completeness validator**, not a completed cost estimate. It does **not** contain verified H1 2026 monthly sector figures yet. The workflow runs tests on merge; actual acquisition requires verified EIA API v2 series identifiers supplied via the workflow_dispatch `series_json` input.

Required series: residential delivered price, industrial delivered price, residential deliveries, industrial deliveries, dry gas production and LNG exports. Each requires January–June 2025 and January–June 2026 (12 months). Missing series or observations are errors, **never zeros**. Unit consistency and price×quantity calculations must be reviewed separately before publication; prices may be USD/Mcf while volumes may be MMcf or Bcf.

## Why this matters
The July EIA price comparison in PR #284 is one month, outside H1. It cannot represent H1 and has no causal export interpretation. The two-company LNG earnings data in PR #283 are consolidated issuer financials, not national benefit. Do not net EBITDA against raw domestic bills.

## Next evidence milestone
1. Validate official EIA series IDs and returned units, run acquisition and inspect artifact.
2. Publish H1 monthly price and consumption panel only after all required months are present; verify against EIA tables.
3. Add Henry Hub, storage, weather, regional basis, electricity generation and feedgas demand.
4. Construct an explicit export-demand counterfactual with sensitivity intervals and separate transfers from real resource costs.

Until then export-attributable domestic cost, net national benefit and geopolitical influence remain null. Editorial readiness 53%; preserve all existing Command Meter UI.
