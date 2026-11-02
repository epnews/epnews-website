# SOI evidence intake gate

The research backlog now has a separate **provenance intake gate**. The initial manifest is deliberately empty: no external source has been newly obtained or independently verified in this PR.

For each acquired source add a record to `data/soi-research-evidence-intake.json` with: unique ID, valid `taskId` from the generated backlog, status (`candidate`, `retrieved`, `independently-verified`, `rejected`), HTTPS source URL, source organization, source publication date, claim, methodology, period, unit, and `scoreAuthorized: false`. For independently verified entries also include a second verifier, `sha256:<64 lowercase hex>` fingerprint of the retained source document, counterfactual limitations, and costs/incidence description. A source URL alone does not prove retrieval or verification.

Run `node scripts/validate_soi_evidence_intake.cjs` for a structural check. It rejects duplicate IDs, missing fields, unknown backlog tasks and attempts to authorize scores. **It cannot confirm that a source was actually read or that an independent verifier exists.** Those require an auditable human-reviewed source record. This workflow never activates a meter or changes scores. The original meter and publishing regressions remain in force.

Use a batch of retrieved and independently checked evidence to update the relevant existing evidence dataset in one consolidated PR. Do not treat intake records as observed outcomes until the existing causal and normalization requirements are met.
