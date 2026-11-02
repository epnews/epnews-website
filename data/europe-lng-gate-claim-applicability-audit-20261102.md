# Claim applicability audit: why two independent sources are not always enough

The provisional [reasonable-certainty framework](europe-lng-gate-reasonable-certainty-policy-20261102.md) previously counted every independent source as supporting every claim. That could award 75+ points to a vessel's **discharge volume** from a primary port berth record, AIS and GIE inventory even though none directly measures ship-to-shore cargo transfer.

## Corrected evidentiary question
**What precise proposition does this observation establish?** The confidence script now requires `claim_type` and ignores source kinds that do not directly establish it.

| Claim | Potentially probative sources | Excluded from volume/origin proof |
| --- | --- | --- |
| Port call | Independent port movements, AIS, ship log | GIE tank inventory |
| Specific berth | Terminal/port document, independent port movements, AIS, ship log | GIE stock change |
| Vessel discharge volume | **Voyage-specific primary measurement or custody-transfer documents** | AIS, port call, Gaspeil stock assignment, facility GIE delta |
| Same-voyage origin | **Voyage-specific primary loading documentation** | Historical vessel journeys, vessel flag, destination |
| Realized revenue | **Transaction-level primary economic documentation** | DOE FOB price averages, cargo estimates |
| Geopolitical effect | Direct primary evidence, plus separate substantive causal assessment | Vessel location alone |

## October disputed cases
- **BW NIVALIS and VIVIT AMERICAS LNG:** Gaspeil assigned the same 970 GWh on Oct 1. The material duplicate attribution remains vetoed for **each vessel's exact discharge volume**.
- **VENTURE GATOR, VLADIMIR VIZE, MINERVA LIMNOS:** Gaspeil ship-page berth chronology and GIE-derived gas-day assignments may inform berth hypotheses, but **not certify unloaded GWh**.
- **Gate fourth-tank commissioning:** primary operator evidence establishes an Oct 1 commissioning claim, but not the effect on individual cargoes or the cause of Oct 1 estimated GIE data.

## Limits of the revised implementation
The `primary_document` source kind must still be curated by a reviewer: a *port* document is not a *cargo* document merely because both are primary. The script's `source_family` strings are caller-supplied, so this is an auditable triage safeguard, **not independent source authentication**. Even a high band does **not** authorize command-meter changes.

```sh
python scripts/test_gate_reasonable_certainty_policy_20261102.py
python scripts/test_gate_confidence_claim_applicability_20261102.py
```

Sources: [Gaspeil API documentation](https://www.gaspeil.nl/api-docs), [Gate terminal operational data](https://www.gateterminal.com/en/commercial/operational-data/), [Port of Rotterdam arrivals/departures](https://www.portofrotterdam.com/en/up-to-date-information/arrival-and-departures).
