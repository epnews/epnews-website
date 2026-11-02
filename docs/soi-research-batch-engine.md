# SOI Research Batch Engine

Run `node scripts/soi_research_batch_engine.cjs soi-research-batch-report.json` to create the **single deduplicated, prioritized research backlog**. Run `node scripts/test_soi_research_batch_engine.cjs` for validation. GitHub Actions runs both on relevant PRs and manual dispatch and uploads a JSON artifact.

## Coverage and prioritization

The engine audits all 20 country × dimension meter slots, places **inactive slots first**, then incorporates the existing cross-country research gaps, 12-case research register, and five-sphere implementation work. It sorts deterministically and selects the first 40 tasks for a batch. Existing source evidence is reused; no network requests, scraping, vessel-document requests or new source verification are implied. Duplicated IDs fail validation.

## Publishing and safety boundary

This is a **planning and validation engine**, not an automatic research agent, evidence-ingestion pipeline, PR creator or automatic merge workflow. The JSON output identifies what to research; it cannot infer causality, independently verify external evidence, activate needles, or alter meter readiness. Existing command-meter tests and publishing gates remain authoritative. Batch size and research-order priorities are configurable in `config/soi-research-batch-policy.json`; priority numbers are **not influence scores**.

For each batch, investigators acquire primary evidence separately, attach source provenance, reconcile time period/units and counterfactual, update existing evidence datasets, and open one consolidated PR. Merge only after required checks pass. Restricted records remain unresolved; advance to other tasks rather than recycling missing-evidence memos.
