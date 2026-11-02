# October Gate evidence: reproducible single-snapshot diagnostic pipeline

## Why this integration matters
Previous evidence audits were individually reproducible but **not yet wired into the authenticated operator/Gaspeil acquisition workflow**. Comparing separate ad-hoc downloads risks silently mixing snapshots as the public API changes. This change runs **six independent diagnostic scripts against one archived Gaspeil JSON snapshot** in the existing Gate integrated workflow, then archives their outputs in one additional artifact.

## Workflow execution
`.github/workflows/gate-operator-baseline-integrated.yml` already acquires GIE ALSI+ operator data (requires `GIE_ALSI_API_KEY`) and the public Gaspeil October snapshot. It now:
1. Runs the **seven** added offline test files (six individual audit tests and one integration test) alongside existing acquisition/reconciliation tests.
2. Runs `scripts/run_gate_snapshot_evidence_diagnostics_20261102.py` on **`gate-gaspeil-october-2026-snapshot.json`** after source acquisition. The runner explicitly unwraps `{retrievedAtUtc, data}` — individual audit scripts expect the inner API `data`, not the archive envelope.
3. Checks API `count` against actual arrival records, cross-checks 22-record class counts across diagnostics, and verifies that all measured-data audits use the same measured record count.
4. Archives **`gate-october-crosschecked-evidence-diagnostics.json`** with the original six existing operator and reconciliation JSON files, using the existing 14-day retention period.

## Six reports included
- Indicative `valueEur` versus original estimates and best-available cargo volume; no realized revenue claim.
- Repeated IMO arrivals versus shared same-gas-day quantity collisions.
- Country-of-origin label provenance and same-voyage DOE status.
- UTC arrival calendar-date versus attributed gas-day offsets.
- Original volume estimate versus stock-derived volume variance.
- Signed-versus-absolute proxy variance and cancellation.

**Source attribution:** [Gaspeil API documentation](https://www.gaspeil.nl/api-docs); [October Gate arrivals endpoint](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31); [GIE ALSI+](https://alsi.gie.eu/). Gaspeil permits reuse under CC BY 4.0 with attribution.

## Limitations and review gate
These diagnostics operate on third-party modeled vessel associations and GIE inventory-derived movements. They do **not** establish physical vessel discharge, certified loading origins, company receipts, realized margins or net national benefit. No SOI meter score or needle change. A PR's existing publishing/smoke checks do not by themselves prove the authenticated workflow ran successfully; verify the separate integrated workflow after merge before claiming live pipeline success.
