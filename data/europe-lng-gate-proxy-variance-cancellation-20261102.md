# Gate October 2026: quantify cancellation in estimated-versus-attributed LNG volumes

**Data:** [Gaspeil October Gate public arrivals API](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31), checked 2026-11-02; [methodology](https://www.gaspeil.nl/api-docs). `gemeten` means GIE inventory-jump attribution, **not** custody-transfer measurement.

Across the **16** arrivals with both original estimates and later GIE-stock-derived assignments:

| Diagnostic | GWh |
| --- | ---: |
| Original estimate sum | **16,302** |
| Positive differences | **+714** |
| Negative differences | **−900** |
| Net signed difference | **−186** |
| Sum of absolute differences | **1,614** |

The signed gap is only **−1.14%** of the original estimate sum. But the sum of absolute disagreements is **9.90%** of original estimate volume; the mean of individual absolute percentage differences is **10.06%**. About **88.48%** of gross signed discrepancy magnitude cancels in the aggregate (1 − 186/1,614).

**Interpretation:** These numbers describe disagreement **between two proxy methods**. They are **not** error bars, confidence intervals, certified unloaded quantities or accuracy estimates against a ground truth. A small net discrepancy is insufficient to promote vessel-level quantities to high or reasonably certain confidence.

**Operational use:** Display both signed and absolute proxy variance in analyst-facing evidence reports. Keep 2% individual-variance flags as **review triggers**, not proof of false cargo quantities. The duplicate Oct 1 970 GWh attribution remains unresolved.

## Reproduce
Save the unchanged API JSON locally and run:
```sh
python scripts/audit_gate_proxy_variance_cancellation_20261102.py --input gaspeil-october-gate.json
python scripts/test_audit_gate_proxy_variance_cancellation_20261102.py
```

No geopolitical influence scores, financial benefit estimates or command-meter changes.
