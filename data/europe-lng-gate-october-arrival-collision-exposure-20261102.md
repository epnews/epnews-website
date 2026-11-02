# Gate October LNG: distinct arrivals, repeated vessel visits and shared gas-day assignments

**Source:** [Gaspeil Gate October 2026 public arrivals API](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31), inspected 2026-11-02; [methodology](https://www.gaspeil.nl/api-docs). Gaspeil `gemeten` means terminal stock-jump attribution from GIE, **not certified vessel discharge**.

## Reconciled event structure
- **22 arrival records** are distinct arrival keys; **20 unique vessel IMOs**. These counts are different and must not be substituted.
- **Two legitimate repeat-IMO patterns:** K. LOTUS (IMO 9901362) has separate Oct 9 and Oct 23 arrival entries, both estimated 350 GWh. OCEAN INSPIRATION (IMO 9979761) has separate Oct 6 and Oct 21 arrival entries with best-available attributed quantities of 850 and 1,028 GWh. Same vessel in a month **does not imply a duplicate arrival**.
- **One shared measured gas-day/quantity collision:** BW NIVALIS (IMO 9968932) and VIVIT AMERICAS LNG (IMO 9864667) each assigned **970 GWh on Oct 1**. This is an attribution collision, **not proof that one ship did not discharge**.
- **Raw sum of `cargoGwh`: 20,895 GWh** across 22 API entries; **sum of original `estimatedGwh`: 21,081 GWh**. Both are aggregates of mixed estimates and stock-derived attributions, **not verified physical LNG imports**.
- **Collision sensitivity:** subtracting one repeated 970 GWh yields **19,925 GWh**. This is **only a what-if de-duplication scenario**; not an established import total. More attribution errors may exist and separate real discharges may also occur on one gas day.
- The sum of all API `valueEur` fields is **€1,808,728,172**. Per the preceding value audit, this is **a sum of original-estimate × arrival-day TTF indicative valuations**, **not revenue, receipts, profits or net benefit**, and may contain duplicated volume exposure. Do not publish it as economic gains.

## Reproduce
Save the unchanged public API JSON to `gaspeil-october-gate.json` and run:
```sh
python scripts/audit_gate_arrival_collision_exposure_20261102.py --input gaspeil-october-gate.json
python scripts/test_audit_gate_arrival_collision_exposure_20261102.py
```

**Outstanding:** independent berth records, terminal discharge certificates, same-voyage loading documentation, GIE Oct 1/23 E-status explanation. No meter needle, origin, cargo certification or financial influence score changes.
