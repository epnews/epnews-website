# Gate October operator-to-vessel reconciliation procedure

The previous research acquired two independent **data products**, but Gaspeil's tank-derived cargo estimates reuse GIE ALSI+ inventory. This is a **cross-dataset attribution audit**, not independent cargo verification.

## Inputs
1. Download authenticated October operator acquisition artifact from [GIE ALSI+ run 41418617064](https://github.com/epnews/epnews-website/actions/runs/41418617064), unzip `gate-alsi-operator-october-2026.json`.
2. Run the [Gate Gaspeil public October snapshot workflow](https://github.com/epnews/epnews-website/actions/workflows/gate-gaspeil-october-snapshot.yml) on main, download artifact and unzip `gate-gaspeil-october-2026-snapshot.json`.
3. Run `python scripts/reconcile_gate_alsi_gaspeil_20261102.py --alsi gate-alsi-operator-october-2026.json --gaspeil gate-gaspeil-october-2026-snapshot.json`.
4. Review `gate-october-alsi-gaspeil-reconciliation.json`: daily operator inventory and status, vessel assignments, shared gas days, estimated-day assignments, and assignment dates before arrivals.

## Interpreting exceptions
- A shared gas day means two or more Gaspeil vessel records refer to the same operator daily observation; it **does not** prove duplicate cargoes, nor that only one ship unloaded.
- A measurement dated before arrival indicates an apparent chronology conflict at date granularity. Check UTC vs Dutch gas-day boundaries, reporting lag and AIS timestamp quality before alleging an error.
- Operator `E` means the underlying observation is estimated, not confirmed.
- Do **not** sum assigned vessel GWh to establish imports. Operator inventory changes are net of other operations and can reflect fourth-tank commissioning.
- Origin labels based on AIS-track starts, ship operator, or historical DOE exports are not same-voyage certificates.

## Outcome
This script makes the outstanding contradictions **reproducible with the raw source artifacts** and keeps the 31 operator days separate from 22 Gaspeil arrivals. The script does not make a geopolitical score adjustment, compute profit, or claim certified October US LNG discharges.
