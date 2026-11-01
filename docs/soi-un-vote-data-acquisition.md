# UN General Assembly voting data: acquisition and validation

**Status: SOURCE NOT IMPORTED. No measured diplomatic index values.**

Official source: https://digitallibrary.un.org/record/4060887 . UN Dag Hammarskjöld Library confirms a regularly updated downloadable CSV of recorded votes on adopted General Assembly resolutions. It does not cover consensus resolutions, failed drafts, or paragraph votes. Source is © United Nations; noncommercial use with attribution. Do not commit the raw file or publish derivative source-level rows without reviewing licensing for a monetized news website.

1. Download the current CSV and source metadata directly from the UN Digital Library, noting dataset version, retrieval time, byte count, and published update date.
2. Inspect its actual header and country/vote representations. Create a local mapping.json with explicit columns for resolution symbol, adoption date, member name/code, vote and a source URL. **Do not guess the mapping.** The importer rejects unmapped values and ambiguous fields.
3. Run `node scripts/import_soi_un_votes.cjs input.csv mapping.json validated-votes.json` locally. Preserve its SHA-256 digest and counts; do not commit the raw or validated row-level data without a licensing review.
4. Independently check random vote rows against UN resolution records and reconcile counts. Verify years 2021–2025, unique resolution/country pairs, member codes and vote codes. A 2026 partial year must not be compared to full years.
5. Only then calculate baseline/follow-up vote alignment, country-specific coverage and EU-27 cohesion. The EU is not a UNGA voting member; its cohesion proxy is not directly comparable with state-to-world agreement. Investigate a genuinely common fifth-sphere diplomatic metric before activating a single comparative index.
6. Require topic-mix adjustment, matched-resolution sensitivity, evidence gaps and baseline change reporting. Similarity alone is not geopolitical influence.

Automated synthetic tests: `node scripts/test_soi_un_vote_import.cjs` and `node scripts/test_soi_un_vote_alignment.cjs`. These verify code behavior, **not real-world source data**.
