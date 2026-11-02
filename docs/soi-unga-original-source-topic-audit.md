# Original SWP/GESIS UNGA source reattachment and topic audit (2026-11-02)

Both user-supplied original sources are available in the working session and SHA-256 verified against the earlier archived fingerprints:

- Positions ZIP: `04e2a0df74df61ca07e157871578e53effe4f130932d71a3298852b7c5180522`
- Resolutions CSV: `3d31e9835d5561df124772c573563202f64aa5c00ea7b7830b90c680305c40cd`

The 2021–2024 resolutions CSV contains exactly **358 recorded-vote resolutions**, distributed 86/89/88/95. Resolution identifiers are unique within year. Crucially, the source's `main_category` is a **comma-separated multi-label taxonomy**, not a unique topic: **314 of 358** recorded resolutions have more than one category. It would be misleading to select the first code or claim single-topic standardization without an explicit rule.

## Source schema and join

Positions ZIP member `2025-03-09_un_resolutions_positions.csv` (uncompressed ~3.9 GB). Join `unres` + `year` to resolutions CSV, with `adopted_without_vote=0`. Position fields: `iso_alpha3_code`, `position` (`y/n/a/non-voting.a`). Source resolution metadata: `main_category`, `sub_category`, `subjects`, `symbol_resolution`, `vote_date`.

## Multi-label topic approach

Use **fractional multi-label attribution**: each resolution's vote-pair counts are distributed equally among its distinct listed `main_category` codes, so a resolution with K categories contributes 1/K to each category, without double-counting. Pool the 2021–2024 fractional topic distribution to establish fixed weights. For each actor, year and category, calculate fractionally weighted agreements / matched vote pairs. Require observed support in all compared years for all weighted categories; report not estimable otherwise. Compare with dominant-topic and broad-category alternative allocations only when defensible. Document sparse categories and avoid misleading smoothing.

## Source persistence

This PR records checksums, schemas and a reproducible metadata extraction script. **It does not upload the full 261 MB ZIP or 21 MB CSV to GitHub**, so the original sources are not yet permanently hosted. A durable GitHub Release asset or other authenticated object-storage upload is still needed; do not claim uploads are complete until the remote assets are verified.

No influence-score or main needle authorization.
