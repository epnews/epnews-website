# SWP UNGA-RES actual dataset schema — verified against March 2025 codebook

Primary source: SWP https://www.swp-berlin.org/en/publication/united-nations-general-assembly-resolutions-voting-data-and-issue-categories-2025 (CC BY 4.0); dataset DOI https://doi.org/10.7802/2855 ; direct codebook https://access.gesis.org/sharing/2855/6622 .

**Critical correction:** The earlier generic importer expects `A/RES/` identifiers, whereas the SWP dataset's documented `unres` IDs are `R/76/1` style. SWP vote codes are `y`, `n`, `a`, `non-voting.a`, `non-voting.b`. The codebook describes two files: `unga-res.csv` (resolution-level, 10,462 resolutions) and `unga-res_positions.csv` (country-resolution, 1,996,092 rows; distributed zipped). It explicitly warns that **adopted-without-vote** records may have imputed yes positions; those must not count as actual recorded country votes. This adapter excludes them and both types of non-voting, retaining only actual yes/no/abstain positions.

**Ten combined checks:** actual column names; country ISO3; `R/` identifiers; calendar dates; vote codes; consensus exclusion; absent-vote exclusion; topic tags; 2021–2024 complete years; checksum and deduplication. These checks are implemented in `scripts/import_swp_unga_res.cjs` with synthetic tests in `scripts/test_import_swp_unga_res.cjs`.

**Data retrieval remains outstanding.** SWP/GESIS public landing page and codebook were read, but the 1.99-million-row archive was not downloaded or validated in this PR. The codebook is not itself the dataset. To complete ingestion, obtain `unga-res_positions.csv` from the GESIS record, verify file-level CC BY attribution, checksum the archive, run this adapter, and reconcile row counts with the codebook before calculating observed voting trends.

**Important:** `main_category` may contain multiple comma-separated categories. The current adapter treats the whole field as a single categorical label; split and normalize categories only after examining real data distribution. No diplomatic influence score is authorized by this work.
