# Gate October: independent-evidence acquisition and promotion rules

## Why the evidence ceiling remains
- [Port of Rotterdam Port Call Optimisation](https://www.portofrotterdam.com/en/sea-shipping/port-call-optimisation) explicitly distinguishes berth planning and arrival/departure events. A berth event is a movement record, **not a terminal discharge quantity**.
- [Gate terminal](https://www.gateterminal.com/en/gate-terminal/) explains that the facility receives, stores, regasifies, and supplies gas and also loads LNG for bunkering. Daily inventory is affected by multiple flows; net stock change is not a vessel unload.
- [Gaspeil BW NIVALIS](https://www.gaspeil.nl/radar/schip/9968932) and [Gaspeil VIVIT AMERICAS LNG](https://www.gaspeil.nl/radar/schip/9864667) show different reported berth dates/jetty slots but identical 970 GWh tank-derived values. Two Gaspeil presentations plus GIE inventory are not three independent cargo certificates.

## Claim-specific proof requirements
| Proposed claim | Minimum supporting records | What is insufficient |
| --- | --- | --- |
| Vessel berthed at Gate on a date | Port of Rotterdam actual port call/berth timestamps + terminal jetty identity | ETA, AIS geofence alone, Gaspeil estimated arrival |
| Vessel discharged a specific GWh | Gate/ship-certified cargo discharge quantity + independent port berth record | GIE daily stock delta, Gaspeil `gemeten`, port call |
| Cargo came from named loading country | Same-voyage loading documentation tied to IMO and discharge certificate | Vessel operator, vessel type, AIS loading-port visit, past DOE voyages |
| Realized seller revenue or profit | Matched sales invoices/receipts and cost data | DOE FOB average, indicative TTF-marked energy |
| SOI meter score change | Predeclared comparable geopolitical measurement with independent causal evidence | Any single cargo arrival or assumed gross value |

## Prioritized external record requests
1. **Port of Rotterdam**: for IMO 9968932, 9864667, 9854375, 9750658, 9956599, request actual Gate STG 1/STG 2 berth arrival/departure in UTC and any berth changes (Sep 28–Nov 1).
2. **Gate terminal**: per-vessel discharge quantity, start/end timestamps, ship/shore custody transfer records and whether a single 970 GWh tank-derived estimate could map to two distinct vessels.
3. **Gaspeil data publisher**: definition and timezone of `measuredGasDay`, Oct 1 duplicate assignment rule, treatment of GIE E-status gas days, and source of API/ship-page Oct 22/23 discrepancy for VLADIMIR VIZE.
4. **Loading terminals / US DOE / voyage operator**: matched loading events and documents for the same voyage, not historical ship totals.

## Script usage
```sh
python scripts/test_gate_vessel_evidence_decision_gates_20261102.py
python scripts/gate_vessel_evidence_decision_gates_20261102.py --input vessel-evidence.json
```

Input is a list of records with `imo` and `evidence` entries `{"kind":"gaspeil_api","source_id":"gaspeil"}`. Only independent port berth + terminal discharge documentation with distinct sources promotes discharge; only voyage-specific loading plus discharge documentation promotes origin. This is a conservative **research triage rule**, not a legal certification determination. No automated score or revenue promotion.
