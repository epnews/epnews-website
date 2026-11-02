# GAP-12 official source provenance hardening

The extractor merged in #514 previously used the source dataset's `updated` field as the retrieval timestamp. Those are **not equivalent**: a source publication/update timestamp does not prove when an analyst actually downloaded a file. It could also emit the placeholder `SOURCE_RETRIEVAL_DATE_REQUIRED` and still pass its extraction stage.

This follow-up requires an explicit analyst-supplied ISO retrieval timestamp in `EUROSTAT_RETRIEVED_AT` and a JSON-stat source field identifying Eurostat. Example: `EUROSTAT_RETRIEVED_AT=2026-11-02T05:30:00Z node scripts/extract_soi_gap12_eurostat_jsonstat_cells_20261102.cjs electricity.json gas.json > verified-cells.json`. The timestamp **must be the actual retrieval time**, not the example.

Source authenticity cannot be proven by a text field alone. Preserve the raw API response, retrieval URL, retrieval time, response status, and SHA-256 in the eventual evidence PR; independently inspect JSON-stat dimension metadata and tax/band/unit selections. Do not synthesize or backfill missing values.

No official 2026-S1 exact nominal price cells are introduced here. Upstream exact-price verification remains incomplete, SOI evidence gates remain 20/30, and no meter or influence scores change.
