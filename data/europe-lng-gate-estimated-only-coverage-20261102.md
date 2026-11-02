# Gate October 2026: unresolved estimated-only LNG volume exposure

**Source:** [Gaspeil Gate arrivals API](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31), checked 2026-11-02; [Gaspeil API methodology](https://www.gaspeil.nl/api-docs). The API distinguishes `geschat` (estimated cargo) from `gemeten` (volume attributed to a GIE terminal-inventory jump) and `bevestigd` (DOE matched export records, which still do not certify unloading at Gate).

## October coverage by evidence status

| Source status | Arrival records | Proxy cargo GWh | Share of 20,895 GWh raw proxy total | Published indicative value |
| --- | ---: | ---: | ---: | ---: |
| `geschat` estimated-only | **6** | **4,779** | **22.87%** | **€434,676,010** |
| `gemeten` stock-derived attribution | **16** | **16,116** | **77.13%** | **€1,374,052,162** |
| `bevestigd` DOE match | **0** | **0** | **0%** | **€0** |
| **Raw, not certified** | **22** | **20,895** | **100%** | **€1,808,728,172** |

The six estimated-only arrival records are HLS CARTAGENA (1,015 GWh), RIBERA DEL DUERO KNUTSEN (1,034 GWh), K. LOTUS Oct 23 (350 GWh), MARAN GAS ANTIBES (1,015 GWh), OCEAN OASIS (1,015 GWh), and K. LOTUS Oct 9 (350 GWh). Two separate K. LOTUS visits must not be collapsed solely because they share IMO.

**Interpretation:** Almost **23%** of the *raw attributed cargo volume* remains at the **original-estimate-only** level. The other ~77% is inventory-derived attribution, **not** independently certified discharge. The raw 20,895 GWh also includes the unresolved **970 GWh same-day collision**, so it must **not** be presented as verified physical imports or terminal throughput.

The **€434.7m** estimated-only share is an **indicative TTF market-price proxy**, not receipts, profits, or national benefit. Public `valueEur` for measured-attribution records likewise uses original estimated volumes, so the financial proxy must not be mistaken for actual sale price or cargo ownership.

## Workflow integration
`scripts/audit_gate_unmeasured_exposure_20261102.py` classifies all arrivals and calculates per-status record, volume and indicative-value shares, retaining arrival keys. Its offline tests cover status accounting, missing values and zero denominators. The previously verified single-snapshot workflow now archives this as its **eighth** cross-checked diagnostic. After merge, verify the new authenticated run and artifact before claiming the live pipeline is green.

**Next evidence gap:** independently sourced terminal cargo discharge statements, DOE same-voyage records, operator gas-day reconciliation and commercial transaction data. No meter score changes.
