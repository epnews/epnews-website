# Five-family matched-pair diagnostic

The 2021–2024 source voting archive has 69,094 country-position rows, 358 recorded resolutions, and a reproduced frozen 160-country external partner cohort. This script counts per actor/year/numeric-family: fractional eligible resolution weight, matched partner-vote pairs and agreements. Family assignment uses unique first-digit prefixes of each resolution's source `main_category` codes and fractional allocation.

The observed five-family coverage includes **extremely sparse family 3**: only approximately 0.33–1.0 fractional eligible resolutions per year for the sovereign actors, despite 52–150 fractional matched partner pairs. EU family-3 resolution weight ranges approximately 0.33–0.67. Do **not** interpret these pairs as independent resolutions; cross-country votes on the same resolution are correlated.

This is a **diagnostic**, not an approved topic-standardized score. Numeric prefixes require authoritative semantic validation. A defensible minimum resolution-support rule and sensitivity analysis must be set before adjusted series can be published. Keep original influence needle and all existing dashboard interactions unchanged.

Run locally after obtaining verified original-source vote extract:
`node scripts/audit_soi_unga_family_matched_pairs.cjs source-votes.json data/soi-unga-source-topics-2021-2024.json data/soi-unga-cohort-topic-coverage-audit-2021-2024.json family-coverage.json`
