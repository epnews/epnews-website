# Gate October: UTC arrival hours versus stock-derived gas-day labels

**Source:** [Gaspeil October Gate arrivals](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31), 2026-11-02 snapshot; [API methodology](https://www.gaspeil.nl/api-docs). This extends the prior calendar-offset audit by showing whether anomalies cluster at particular UTC arrival hours.

| Gas-day label minus UTC arrival calendar date | Records | Arrival hours (UTC) |
| --- | ---: | --- |
| **−1 day** | **3** | **20, 21, 23** |
| **Same day** | **2** | **01, 22** |
| **+1 day** | **11** | **03, 05, 05, 06, 09, 10, 10, 11, 20, 20, 20** |

The three previous-day assignments correspond to **MINERVA LIMNOS** (Oct12 arrival 20:56 UTC / Oct11 gas day), **VENTURE GATOR** (Oct30 21:07 UTC / Oct29 gas day) and **VLADIMIR VIZE** (Oct22 23:07 UTC / Oct21 gas day). They all occur in the evening UTC, but the **+1** group also includes evening arrivals. The distribution **does not establish** an operational cutoff or causal error.

The two same-day records, BW NIVALIS (Oct1 01:07 UTC) and VIVIT AMERICAS LNG (Oct1 22:02 UTC), are also the **same 970 GWh assignment collision**. Arrival-hour differences alone do not adjudicate that collision.

## Methodological restrictions
- `arrivedAt` is an API arrival event, not necessarily a berth-start or unloading-start timestamp.
- `measuredGasDay` is a date label attached to an inventory-derived cargo association; its precise reporting interval and operator time-zone cutoff have **not** been independently established.
- Calendar offsets are not elapsed physical unloading time, proof of a chronology contradiction or a certified LNG cargo record.
- No adjustments to assigned cargo quantities, origins, financial valuations or SOI influence scores follow from this grouping.

## Automated reproducibility
```sh
python scripts/audit_gate_gasday_offset_hour_patterns_20261102.py --input gaspeil-october-gate.json
python scripts/test_audit_gate_gasday_offset_hour_patterns_20261102.py
```

The audit joins the archived-snapshot Gate workflow as the **tenth** diagnostic with timezone-aware UTC parsing and regression tests. The previous nine-diagnostic run [41432329285](https://github.com/epnews/epnews-website/actions/runs/41432329285) completed successfully and uploaded its research artifact.

**Outstanding evidence:** obtain authoritative terminal gas-day interval definitions and actual berth/unloading events before promoting any vessel-specific confidence classification.
