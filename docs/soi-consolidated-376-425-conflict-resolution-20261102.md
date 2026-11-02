# Consolidated replacement for conflicted PRs #376 and #425

This replacement applies **only missing regression safeguards** against the latest `main` files; it does not overwrite newer research.

## #376: diplomatic source-to-claim integrity

The current `data/soi-diplomatic-source-candidates.json` already has the five corrected official source anchors. This regression test checks the source hosts and identifying paths for US, China, Russia, EU, and India; rejects an unrelated US-GCC URL substituted for China's Saudi-Iran case; and rejects premature promotion to independently verified status. It **does not claim** that URLs alone establish source contents, causality, or influence. The older PR's additional claim-scope fields are not carried forward because the current candidate records do not contain a structured `claimScope`; those should be introduced only in a separate independently reviewed evidence pass.

## #425: materiality thresholds already merged elsewhere

The current `data/soi-diplomatic-audit-worklist.json` already contains `crossSphereFinancialReconciliationPolicy` with 2% broadly-consistent, 2–5% flag-and-proceed, and >5% investigate-if-material bands, plus prerequisite checks for matched definitions and exclusions for attribution, actual expenditures, and net benefits. This PR tests those **existing** policy constraints instead of duplicating them under a competing key.

Run: `node scripts/test_soi_consolidated_source_materiality_20261102.cjs`.

No new evidence, score, completion percentage, or meter UI changes. After required CI checks pass and this PR is approved/merged, #376 and #425 can be closed as superseded. Do not merge the conflicted old branches.
