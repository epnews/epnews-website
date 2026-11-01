# Unified external diplomatic alignment — consolidated bundle

## What this resolves

Earlier proposals compared **EU-27 internal cohesion** against **sovereign-to-world alignment**, which are different quantities. This bundle instead computes the **share of votes cast by the same frozen external partner set that match each sphere's position**. US, China, Russia and India use their own recorded UNGA votes; EU uses an explicitly derived position when at least 20 of 27 EU member states vote and at least 75% of valid EU votes agree. The EU proxy is **not** a UNGA vote, nor necessarily a formally adopted EU common position. Exclude EU-27 members and the four compared sovereign states from the external partner denominator. Compare annual 2021–2025 readings and 2021 deltas. This is an observational diplomatic alignment metric, **not a causal influence index**.

## Ten bundled steps

1. Freeze the same external-country partner universe for all five spheres.
2. Exclude EU member states from the external comparator pool.
3. Exclude four scored sovereign states from the external comparator pool.
4. Build annual 2021–2025 common UNGA resolution cohorts.
5. Construct EU-27 supermajority position with minimum participation.
6. Measure agreement with external states for all five spheres using identical denominator logic.
7. Record abstentions, absent partner votes and reference-vote coverage.
8. Calculate percentage-point change against 2021 for each sphere.
9. Recalculate with strict EU thresholds (90% agreement, 24 valid EU member votes) to assess sensitivity.
10. Enforce no-score/no-needle gate until verified source data, licensing, topic composition, matched-vote robustness and independent attribution review are complete.

### Commands

`node scripts/test_soi_external_alignment.cjs`

`node scripts/test_soi_external_alignment_report.cjs`

Once real UN data is obtained, its license is cleared, and its column mapping is verified:

`node scripts/build_soi_external_alignment_report.cjs source.csv mapping.json annual-report.json`

**Current limitation:** No real UN bulk voting dataset has been acquired or verified. The implementation provides a uniform mathematical definition but not empirical scores. Vote agreement cannot prove a country persuaded other countries, and resolution mix changes over time. The original Command Meter must remain uncalibrated.
