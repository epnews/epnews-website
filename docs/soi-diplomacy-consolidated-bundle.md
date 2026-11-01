# Diplomatic index — consolidated research bundle

This bundle combines **ten related steps** in one reproducible workstream instead of ten separate pull requests:

1. Acquire the original UN General Assembly recorded-vote CSV from https://digitallibrary.un.org/record/4060887.
2. Record dataset version, acquisition timestamp, byte count and SHA-256.
3. Inspect actual source column headers and explicitly map resolution/date/country/vote codes.
4. Validate duplicate rows, unknown codes, adoption dates and resolution identifiers.
5. Freeze the common UN member partner set and final adopted resolution cohort.
6. Calculate 2021 baseline agreement for US, China, Russia and India.
7. Calculate annual 2022–2025 agreement and percentage-point changes.
8. Calculate EU-27 pairwise cohesion as a separate proxy, **not an EU vote**.
9. Produce source coverage, missing-data warnings and sensitivity-review checklist.
10. Gate meter activation pending matched-topic adjustment, attribution, rights review, and comparable EU methodology.

### Reproducible commands

`node scripts/test_soi_un_vote_import.cjs`

`node scripts/test_soi_un_vote_alignment.cjs`

`node scripts/test_soi_un_vote_report.cjs`

After independently acquiring the real dataset and building an explicit mapping file:

`node scripts/build_soi_un_vote_report.cjs un-votes.csv mapping.json annual-report.json`

**Current status:** The report generator and tests are implemented, but the UN bulk dataset is not present in this repository. No actual 2021–2025 trends are asserted. The generated report intentionally sets `eligibleForScoring: false`. No composite diplomatic index or needle activation is authorized by this milestone. The EU proxy measures cohesion, not influence over other UN members.
