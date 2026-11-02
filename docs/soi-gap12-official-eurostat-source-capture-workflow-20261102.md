# Official Eurostat evidence acquisition

This manual GitHub Actions workflow downloads original official JSON-stat responses for household electricity (`nrg_pc_204`) and gas (`nrg_pc_202`) with both 2025-S2 and 2026-S1, preserves the exact raw JSON, URLs, retrieval time, SHA256 checksums, and runs the 22-cell extractor and reconciler.

**Run:** GitHub Actions → **SOI GAP-12 official Eurostat source capture** → Run workflow. Review the resulting artifact `soi-gap12-eurostat-official-raw-and-audit` and the job logs. Failure is an evidence result, not permission to fill missing values.

Eurostat's current official data browser lists 2026-S1 coverage for electricity `nrg_pc_204` and dimension codes including `freq`, `siec`, `unit`, `nrg_cons`, `tax`, `currency`, `geo`, `time`: https://ec.europa.eu/eurostat/databrowser/product/view/nrg_pc_204 . The live JSON-stat API response still needs checking for extraction compatibility. If its schema differs, revise parser with evidence before accepting observations.

The workflow is **manual only**; it does not run on ordinary PRs and does not publish any numbers automatically. The existing price comparison values are **not** independently verified by this PR. No geopolitical scoring or audit gate increment; 20/30 remains.
