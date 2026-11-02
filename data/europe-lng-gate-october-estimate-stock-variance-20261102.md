# Gate October 2026: original cargo estimates vs GIE-stock-derived assignments

**Source:** [Gaspeil Gate October public API](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31), checked 2026-11-02, with [Gaspeil methodology](https://www.gaspeil.nl/api-docs). Gaspeil `gemeten` means a GIE inventory-jump attribution, **not** an independent custody-transfer unloading certificate.

## Quantified variance for all 16 `gemeten` arrival records

| Metric | Result |
| --- | ---: |
| Original estimates, 16 records | **16,302 GWh** |
| Later GIE-stock-derived assignments, same records | **16,116 GWh** |
| Aggregate difference | **−186 GWh** (−1.14% of estimates) |
| Individual assignments higher than estimate | **7** |
| Individual assignments lower than estimate | **9** |
| Exceeding 2% absolute review threshold | **14 of 16** |
| Within 2% | **2 of 16** |

The small **aggregate** difference **masks substantial individual disagreements**. The 2% threshold is a triage trigger, **not** a statistically calibrated uncertainty or a requirement that all cargo estimates match exactly.

Largest increases: KONGTONG **973 → 1,181 GWh** (**+208 GWh, +21.38%**); OCEAN INSPIRATION's Oct 21 arrival **850 → 1,028 GWh** (**+178 GWh, +20.94%**). Largest decreases: OCEAN INSPIRATION's Oct 6 arrival **1,015 → 850 GWh** (**−165 GWh, −16.26%**); VENTURE GATOR **1,110 → 943 GWh** (**−167 GWh, −15.05%**). Two near-matches are HUASHAN (+1.38%) and UMM HEESH (−0.20%).

These discrepancies **do not prove that either estimate or inventory attribution is wrong**. Both are proxies, and inventory changes can reflect send-out, other vessel movements, operational flows and gas-day reporting. The Oct 1 shared 970 GWh attribution remains an unresolved material issue.

**Why it matters:** A total near 1% difference cannot justify upgrading all 16 ship-level quantities to reasonably certain. Independent terminal discharge tickets are needed before treating a vessel-specific GWh as physically verified. Gaspeil `valueEur` also continues to follow the **original estimates**, not the later stock-derived quantities.

## Reproduce
Save the unchanged public API JSON and run:
```sh
python scripts/audit_gate_estimate_stock_variance_20261102.py --input gaspeil-october-gate.json
python scripts/test_audit_gate_estimate_stock_variance_20261102.py
```

No company revenue, national net benefit or command-meter scores are assigned.
