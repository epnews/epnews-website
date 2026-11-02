# Gate LNG October — acquisition execution gap closure

The public [Gaspeil snapshot workflow](https://github.com/epnews/epnews-website/actions/workflows/gate-gaspeil-october-snapshot.yml) had **zero runs** when checked on 2026-11-02. This prevented artifact-based reconciliation despite the existing acquisition and reconciliation scripts.

## New behavior
- When this PR merges into `main`, changes to the acquisition/reconciliation scripts or the workflow file trigger a GitHub Actions snapshot run automatically.
- Manual `workflow_dispatch` remains available for later refreshes.
- Both the Gaspeil snapshot and operator-to-vessel reconciliation offline tests run before acquisition.
- The workflow downloads the public October Gaspeil records and retains raw snapshot and audit summary as a 30-day artifact.

## Important limit
This does **not** automatically fetch authenticated GIE ALSI+ data or perform the final two-artifact reconciliation. The GIE dataset remains in the separate authenticated acquisition artifact. After the public snapshot run succeeds, retrieve both artifacts and execute `scripts/reconcile_gate_alsi_gaspeil_20261102.py`.

No operator-certified discharge, voyage-specific US origin, or economic profit can be inferred from Gaspeil's inferred origin labels or stock-derived cargo values. The geopolitical score remains unchanged.
