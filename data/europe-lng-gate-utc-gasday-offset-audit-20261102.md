# Gate October 2026: UTC arrival vs attributed gas-day timing

**Source:** [Gaspeil October Gate LNG API](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31), checked 2026-11-02, and [Gaspeil methodology](https://www.gaspeil.nl/api-docs). This audit compares **calendar-day labels only**; it does not assume a GIE gas-day boundary, UTC event definition, actual unloading start, or a causal link between a tanker and tank-stock change.

## Actual 16 measured-attribution records

| Assigned gas-day minus UTC arrival date | Records | Interpretation |
| --- | ---: | --- |
| **−1 day** | **3** | Assigned label precedes arrival's UTC calendar date; needs review |
| **0 days** | **2** | Same UTC calendar date, including the shared Oct 1 970 GWh assignments |
| **+1 day** | **11** | Assigned label follows arrival's UTC calendar date |

**Three −1 records:** VENTURE GATOR (Oct 30 UTC arrival, Oct 29 attributed gas day), VLADIMIR VIZE (Oct 22 UTC arrival, Oct 21 gas day), and MINERVA LIMNOS (Oct 12 UTC arrival, Oct 11 gas day). These are **not proven pre-arrival physical discharges**. Calendar-day offsets alone cannot distinguish reporting revisions, gas-day definitions, source errors, or stock movements from other flows.

**Other distinct timing issue:** VIVIT AMERICAS LNG's API arrival is **Oct 1 22:02 UTC**, whereas its Gaspeil ship-page **berth start** is logged **Oct 2 00:07**. That is **not an automatic contradiction**: arrival and berth-start are different events and can straddle midnight. The same vessel's Oct 1 stock-derived assignment still needs independent vessel-level verification.

**Status:** 16 `gemeten` records, 6 `geschat`, 0 DOE-`bevestigd`; the audit does not certify physical unload volumes or origins.

## Reproduce
Save the original API JSON and run:
```sh
python scripts/audit_gate_gasday_utc_offsets_20261102.py --input gaspeil-october-gate.json
python scripts/test_audit_gate_gasday_utc_offsets_20261102.py
```

**Follow-up evidence:** obtain precise operator gas-day definition, source event semantics, revision history, and independently timestamped port/terminal events by IMO. No command-meter score changes.
