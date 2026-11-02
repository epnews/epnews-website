# EP News Gate LNG: reasonably certain evidence policy (provisional)

**Purpose:** Make useful, explicitly qualified assessments when records do not match exactly, without laundering uncertainty into false precision. This policy is **not a statistically calibrated confidence model**. Its 0–100 **policy points are not probability percentages**. Human review remains mandatory.

## Claim-level evidence bands

| Band | Heuristic points | Mandatory conditions | Permitted language |
| --- | --- | --- | --- |
| High | 90–100 | At least two independent underlying source families; no unresolved material contradiction | Strongly supported, cite underlying evidence |
| Reasonably certain | 75–89 | At least two independent underlying source families; no unresolved material contradiction or unexplained discrepancy | Likely / reasonably certain; describe residual uncertainty |
| Preliminary | 0–74, or vetoed | Missing sources, unaccounted discrepancies or material conflicts | Lead or estimate only; not a factual cargo claim |

**No meter needle movement is authorized by these bands alone.** The scoring model must separately define comparable geopolitical measurements, causal relevance, and audit/review. A high confidence *port call* does not imply high confidence *cargo volume*, *country of origin*, or *profit*.

## Exact-match tolerance: which discrepancies are material?

- **Timestamps:** compare actual UTC timestamps first, not local calendar dates. If both source timestamps are reliable and their difference is at most **6 hours**, record as a potentially minor timing discrepancy *only when event definitions match* (arrival vs arrival, not ETA vs all-fast). Six hours is a triage threshold, **not an assertion of actual data accuracy**. For differences beyond six hours, obtain event revisions/definitions before promotion.
- **Quantities:** compare the **same vessel, voyage, physical quantity, measurement basis and units**. A difference up to **2%** can be flagged as minor for *broad estimates* if quality/measurement uncertainty plausibly explains it; **2% is a review threshold, not a certified metering tolerance**. Never use it to claim exact discharged GWh or custody-transfer certification.
- **Origins:** US vessel operator, US historical voyages, AIS departure port, or a country label do not independently prove the same cargo's loading country. A same-voyage loading document or equivalent primary record is required for a definitive origin claim.
- **Source independence:** Gaspeil API, Gaspeil ship page, and Gaspeil's reused GIE stock-derived quantity are **not three independent vessel measurements**. Distinct websites repeating one data supplier count as one underlying source family.
- **Duplicate assignment:** BW NIVALIS and VIVIT AMERICAS LNG both assigned **970 GWh** from Oct 1 is a **material conflict for vessel-specific volume attribution**, even though the amount is identical. Do not count 1,940 GWh as two certified discharges.
- **Operator configuration:** Gate's Oct 1 fourth-tank commissioning vs three-tank legacy specs is material to capacity/utilization claims, but not automatically a contradiction for a berth event.

## Practical workflow

1. Define the **specific claim** (berth, discharged amount, loading origin, realized revenue or geopolitical effect).
2. Capture source, original event timestamp/timezone, unit, provenance and underlying data family.
3. Normalize timestamps and quantities without overwriting original values.
4. Mark conflicts **material**, **explained**, or **unexplained** with rationale. Unexplained discrepancy blocks promotion.
5. Apply `scripts/gate_reasonable_certainty_policy_20261102.py` to derive a conservative triage band. Its point weights are provisional policy settings and must not be quoted as actual statistical confidence.
6. Human reviewer confirms claim language and source independence; keep conflicting records visible.
7. Keep all existing command-meter dials and scores unchanged pending a separate scoring methodology approval.

### Example input
```json
[
  {
    "claim": "BW NIVALIS October 1 Gate berth",
    "observations": [
      {"kind": "aggregated_ship_log", "source_family": "gaspeil"},
      {"kind": "independent_ais", "source_family": "gfw"}
    ],
    "material_conflict": false,
    "unexplained_discrepancy": false
  }
]
```
This example yields **preliminary** because two relatively weak sources do not reach the policy point threshold; it is **not a new verified port call**.

```sh
python scripts/test_gate_reasonable_certainty_policy_20261102.py
python scripts/gate_reasonable_certainty_policy_20261102.py --input input.json
```

## Primary source context
[Gaspeil API methodology](https://www.gaspeil.nl/api-docs); [Port of Rotterdam planned vessel calls](https://www.portofrotterdam.com/en/up-to-date-information/arrival-and-departures); [Gate terminal operational data](https://www.gateterminal.com/en/commercial/operational-data/); [Gate homepage fourth-tank update](https://www.gateterminal.com/en/).

**Open evidence gap:** five disputed vessels still lack independently obtained historical port event exports, vessel discharge certificates and same-voyage loading documents.
