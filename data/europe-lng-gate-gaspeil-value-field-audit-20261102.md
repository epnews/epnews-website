# Gate October 2026: Gaspeil `valueEur` is an original-estimate valuation, not measured cargo revenue

**New reproducible discovery, verified against [Gaspeil's public October Gate API](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31) on 2026-11-02.** [Gaspeil API documentation](https://www.gaspeil.nl/api-docs) calls `valueEur` indicative cargo value based on arrival-day TTF price and cargo, not a sale or company revenue.

## Numerical audit
All **22** October arrival records expose `estimatedGwh`, `cargoGwh`, `ttfEurMwh` and `valueEur`.

- **22/22** `valueEur` values match **`estimatedGwh × ttfEurMwh × 1,000`** within 0.1% (TTF display rounding).
- Only **6/22** match **`cargoGwh × ttfEurMwh × 1,000`** within 0.1%; these are rows where best-available cargo equals the original estimate.
- Thus, `valueEur` appears **not recalculated** when `cargoGwh` is updated to a GIE stock-derived `measuredGwh`. This is an observed API relationship, not a confirmed statement about Gaspeil's internal code.
- **16** rows have `gemeten` status, **6** `geschat`, **0** DOE-`bevestigd`. The measured designation means attributed GIE tank inventory change, **not** custody-transfer measurement.

**Concrete example — VENTURE GATOR:** original estimate **1,110 GWh**, later attributed **943 GWh**, arrival TTF **€103.90/MWh**. API `valueEur` is **€115,329,000**, which matches **1,110 × 103.9 × 1,000**, not **943 × 103.9 × 1,000 = €97,977,700**. Neither figure is a realized cargo sale, profit, FOB export receipt, or net national economic benefit.

**Important consequence:** Summing `valueEur` would add together indicative valuations of original estimates, **not** current best-available cargo values, and may double-count the two Oct 1 970 GWh vessel assignments. Do not use this field for SOI financial influence scores, national revenue, or company profit.

## Reproducibility
Save the **unchanged public JSON response** locally, then:
```sh
python scripts/audit_gate_gaspeil_indicative_value_20261102.py --input gaspeil-october-gate.json
python scripts/test_audit_gate_gaspeil_indicative_value_20261102.py
```
The script reports estimated-value matches, best-available-value matches, mismatches and examples. Do not treat a matching multiplication as a financial transaction.

**Outstanding:** independent terminal discharge documents, same-voyage origin records, and actual realized revenue/price data. No meter-score change is justified.
