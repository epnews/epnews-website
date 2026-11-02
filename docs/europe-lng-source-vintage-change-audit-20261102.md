# LNG official source-vintage change detector

The live Eurostat all-partner extraction and full-partner reconciliation completed successfully in [workflow run 41399918530](https://github.com/epnews/epnews-website/actions/runs/41399918530), artifact 13120778310. All extraction, regression, audit and upload steps passed.

The new comparison script accepts two original `europe-lng-all-partners.json` captures from different runs. It compares H1 2025 and H1 2026 at the reporter × partner × year level for EU27, France, Germany and Poland; reports each changed volume, largest changes, and transitions into/out of missingness. It refuses mismatched dataset, product code or units. This makes it possible to distinguish revised source values from new evidence about actual physical cargo origin.

Example: `node scripts/compare_europe_lng_partner_vintages_20261102.cjs older.json newer.json vintage-diff.json`.

This is a **source revision monitor**, not a causal effect estimate or a US-origin attribution tool. No influence gate or score changes. SOI evidence audit 20/30; readiness 53%.
