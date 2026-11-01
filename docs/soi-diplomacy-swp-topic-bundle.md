# Consolidated source and topic-comparison research bundle

## Newly identified source

Stiftung Wissenschaft und Politik (SWP) UNGA-RES dataset: https://www.swp-berlin.org/en/publication/united-nations-general-assembly-resolutions-voting-data-and-issue-categories-2025 . DOI: 10.7802/2855. The publication advertises **CC BY 4.0**, includes resolution issue categories, and covers **1 November 1995 through 31 January 2025**. Check license on exact distributed files and credit SWP and the original UN sources. This is a **candidate** source: data files have not been fetched or validated in this PR.

## Ten steps in one bundle

1. Identify source with potentially commercial-compatible reuse terms.
2. Record publisher, DOI, author credit, version and license for verification.
3. Preserve January 2025 cutoff; do not pretend it covers calendar 2025.
4. Use complete 2021–2024 years for initial annual comparisons.
5. Require country vote and resolution topic metadata.
6. Reject resolutions missing issue-category tags.
7. Apply common external-country comparator pool for all five spheres.
8. Use EU-27 supermajority proxy, labeled as derived, not a formal UN vote.
9. Compute per-topic agreement and equal-topic-weighted annual trends; withhold incomplete-topic annual scores.
10. Test the 2021–2024 reporting logic and keep geopolitical influence scoring disabled pending empirical ingestion, rights validation, sensitivity and attribution.

Run `node scripts/test_soi_topic_balanced_alignment.cjs` to test synthetic fixtures. **This is not a completed data import** and provides no verified empirical readings. The original meter stays intact. Before merging into a live diplomatic needle, obtain SWP dataset files, validate real column/vote mappings and source checksums, and independently compare sample votes with UN records.
