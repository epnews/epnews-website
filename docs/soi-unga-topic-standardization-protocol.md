# UNGA resolution-topic standardization: reproducible research protocol

## Why

The current 2021–2024 standardized 160-external-partner voting-agreement gauge uses a frozen country universe but **not** a frozen issue mix. Its annual raw percentages must not be interpreted as changes in diplomatic influence.

## Data preparation

Join the original SWP/GESIS resolutions CSV to the positions ZIP by the **actual source resolution key** and year. Do not assume the generic importer accepts the source's `R/` identifiers, or treat a missing topic field as a substantive category. Check one-to-one resolution metadata, recorded-vote flags, duplicate identifiers, missing topics and yearly topic counts. Record metadata provenance and SHA-256 hashes. If no authoritative topic taxonomy is available, keep the indicator preliminary rather than inventing classifications.

## Proposed pre-registered computation

1. Use the identical 160-country external partner cohort and the same five actor vote rules as the merged baseline; preserve all baseline percentages.
2. Assign each recorded resolution to a single **documented, reproducible primary topic** from source metadata, with explicit `unknown` handling and an audit of multi-topic records.
3. For each year, actor and topic, calculate matched agreement count / observed actor-partner vote count. Track resolution counts, valid pairs and missing pairs separately.
4. Choose fixed topic weights from the **pooled 2021–2024 recorded-resolution topic distribution**, independent of the year being scored. Document the weights and freeze them before comparison.
5. Require every topic with positive pooled weight to have sufficient valid actor-partner votes in every compared year; otherwise report `not estimable` rather than silently renormalizing over surviving topics.
6. Report raw vs topic-standardized annual series, difference in percentage points, and sensitivity to an equal-topic weighting and exclusion of jointly abstaining pairs.
7. Check whether source topic classification includes changing, overlapping or country-specific categories. If categories cannot be harmonized, do not assert issue-adjusted trends.
8. Publish the same methodology for all five spheres, noting EU proxy resolution eligibility can differ from sovereign-state eligibility.

## Publication gate

Topic-standardized numbers remain **uncomputed** until the source resolutions metadata and reproducible source join are available and verified. No placeholder percentages, inferred topic allocations, or influence scores. The original moving influence needle, observed-vote gauge, standardized preliminary gauge, selectors and evidence panels must remain unchanged.
