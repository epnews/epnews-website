# Gate October LNG: TTF-marked valuation sensitivity, not realized economic value

**Source:** [Gaspeil October Gate arrivals API](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31), retrieved 2026-11-02, and [Gaspeil API methodology](https://www.gaspeil.nl/api-docs). Gaspeil calls `valueEur` indicative, using a TTF market price. This is **not** a contracted LNG sale price, invoice, company receipt, profit or net economic benefit.

## Three distinct and non-equivalent valuation bases

| Basis | October 22 arrival records |
| --- | ---: |
| Sum of public `valueEur` fields (original-estimate × TTF, with API rounding) | **€1,808,728,172** |
| Recomputed original `estimatedGwh × ttfEurMwh × 1,000` | **€1,808,729,600** |
| Hypothetical current `cargoGwh × ttfEurMwh × 1,000` | **€1,794,931,600** |

The **€1,428** original-basis rounding difference arises because the published TTF field may be rounded relative to the underlying valuation calculation. Replacing original estimated quantities with current best-available quantities reduces the *hypothetical market-price-marked value* by **€13,798,000**, but that does **not** measure lost revenue, cargo price revisions, or real economic effects.

Across 16 records with stock-derived quantities, volume-basis revisions produce approximately **+€59,945,690** in positive proxy-value adjustments and **−€73,743,690** in negative adjustments. The **net −€13,798,000** masks these offsetting nontransactional changes.

## October 1 collision alternatives — neither is verified

Two ships share a 970 GWh Oct 1 inventory-derived assignment: VIVIT AMERICAS LNG (arrival-day TTF **€73.32/MWh**) and BW NIVALIS (**€72.13/MWh**). The unadjusted current-volume TTF proxy total is **€1,794,931,600**.

| Hypothetical removal | Resulting market-price-marked sum |
| --- | ---: |
| Remove VIVIT AMERICAS LNG's 970 GWh attribution | **€1,723,811,200** |
| Remove BW NIVALIS's 970 GWh attribution | **€1,724,965,500** |

**Do not choose one of these scenarios as the true volume or true value.** Both vessels may have visited and the shared stock-derived number may reflect an attribution error, incomplete flow reconciliation or other operational conditions. Removing an attribution is only a sensitivity exercise. Different per-arrival TTF prices mean equal 970 GWh volumes yield different market proxy values.

## Reproduction and workflow
```sh
python scripts/audit_gate_ttf_proxy_value_sensitivity_20261102.py --input gaspeil-october-gate.json
python scripts/test_audit_gate_ttf_proxy_value_sensitivity_20261102.py
```

The existing Gate integrated workflow now runs this as a **seventh** diagnostic against the same archived October Gaspeil snapshot and adds its offline test. Its JSON output is stored alongside the prior six diagnostics, with no new dependency on an external pricing API.

**Evidence gate:** Independent vessel unloading certificates, actual contract/invoice pricing, title and counterparty data, transport and infrastructure costs, and domestic economic incidence remain unavailable. Therefore **no realized company revenue, profit, national benefit or SOI influence score** is assigned.
