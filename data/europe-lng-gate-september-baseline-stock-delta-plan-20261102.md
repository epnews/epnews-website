# Gate October inventory baseline and quality-gated deltas

The October operator acquisition has 31 gas days; October 1 is `E` (estimated), and the existing October-only artifact lacks September 30. Thus **the October 1 stock change is not independently calculable from that artifact**, and even obtaining the previous day does not make an estimated October 1 observation confirmed.

## Reacquisition (existing authenticated workflow)
Run [Gate ALSI authenticated operator acquisition](https://github.com/epnews/epnews-website/actions/workflows/europe-lng-alsi-acquisition.yml) with `mode=acquire`, `from_date=2026-09-30`, `to_date=2026-10-31`, and the same authenticated Gate facility. The existing workflow already accepts custom date bounds; **no new credential or secret is needed if its previous acquisition worked**. Retrieve the 32-day artifact and verify the source, facility identity and statuses.

## Calculation
`python scripts/audit_gate_inventory_deltas_20261102.py --operator gate-alsi-operator-october-2026.json`

The new audit computes `inventory(today) - inventory(yesterday)` **only if both consecutive operator days are C and both have numeric GWh stocks**. It records a withheld reason for missing prior day, estimated status, or missing values. It does not infer an unload quantity from the difference. The Oct 1 delta stays withheld if Oct 1 remains E even after September 30 is acquired.

## Source independence and decision gate
The public [Gaspeil snapshot run](https://github.com/epnews/epnews-website/actions/runs/41420849109) and [authenticated GIE run](https://github.com/epnews/epnews-website/actions/runs/41418617064) are traceable. Gaspeil tank-derived cargo assignments reuse GIE inventory and cannot independently confirm a ship. The two Oct 1 Gaspeil assignments of 970 GWh each still require berth-event and matching algorithm documentation.

**No US origin count, certified discharge volume, TTF-marked revenue, or geopolitical influence score may be calculated from inventory differences.**
