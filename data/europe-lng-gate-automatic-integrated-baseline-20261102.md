# Gate October: automatic baseline + actual reconciliation workflow

The earlier Gate October research had source artifacts and separate scripts, but **the September 30 baseline and final combined reports had not yet been acquired/executed together**.

This workflow performs the full sequence on merge to `main` and supports manual reruns:
1. Runs all four acquisition and integrated-audit offline regression suites.
2. Authenticates to the official GIE ALSI+ Gate facility using the existing `GIE_ALSI_API_KEY` repository secret.
3. Acquires operator gas days **September 30–October 31**, verifying facility identity via the official authenticated listing.
4. Fetches the complete October Gaspeil vessel snapshot (public API).
5. Executes the operator inventory delta audit, the integrated evidence-quality audit, and the vessel-to-gas-day reconciliation.
6. Archives all six inputs/outputs as a restricted GitHub Actions artifact for 14 days.

[Run/status](https://github.com/epnews/epnews-website/actions/workflows/gate-operator-baseline-integrated.yml)

## Evidence limitations
- October 1 GIE status E remains estimated, even if September 30 is available.
- Gaspeil `gemeten` is tank-derived and not independently certified cargo discharge.
- Daily stock change is **net inventory change**, not ship discharge volume; Gaspeil origin labels are not voyage certificates.
- The resulting files are reproducible source-data audits, not profit or SOI score inputs.

**Post-merge acceptance:** Verify workflow success, confirm operator record count and Sep 30 presence, review the generated JSON exception lists, and open the next research PR only if there is a substantive new result or actual error to fix.
