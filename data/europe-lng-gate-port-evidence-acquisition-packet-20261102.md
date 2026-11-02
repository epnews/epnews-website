# Gate Rotterdam: five-IMO independent source acquisition packet

## Verified public access paths
The [Port of Rotterdam arrivals/departures page](https://www.portofrotterdam.com/en/up-to-date-information/arrival-and-departures) describes a **planned-calls** service (expected, in-port, departing vessels), not an accessible October historical event export. The official [Harbour Coordination Centre](https://www.portofrotterdam.com/en/contact-harbourmaster) lists **+31 (0)10 252 1000**. A direct [Port of Rotterdam arrival/departure inquiry form](https://www.portofrotterdam.com/en/form/standard-contact?nid=855&title=arrival-and-departures) is available. **No historical October port records have been obtained or requested through these channels in this research batch.**

[Gaspeil API documentation](https://www.gaspeil.nl/api-docs) offers an unauthenticated arrival archive, but that is an aggregator, not an independent historical port log. Its separate current ship-by-port API requires a free key and does not establish access to October history.

## Exact record request
For each of the five IMOs in `data/gate-october-five-vessel-evidence-request-matrix-20261102.json`, request: (a) actual UTC arrival at port; (b) actual UTC first-all-fast and last-line berth events; (c) berth/jetty identity STG 1 or STG 2 and changes; (d) UTC departure; (e) source system and event revision history. Specify **September 30–November 2, 2026** to include boundaries.

Next request Gate terminal for separate certified vessel cargo discharge start/end, volume in original physical units, conversion factor, ship/shore custody-transfer source and any simultaneous inventory flows. Request Gaspeil algorithm details for Oct 1 shared 970 GWh assignment and GIE E-day handling.

## Source acceptance
A response is only a lead until a dated document/export with issuer, IMO, timezone, event type and source provenance is saved. Do not fill `not_obtained` values with inferred times or claimed certifications. The audit script intentionally fails if someone marks these as acquired without a new reviewed evidence process.

```sh
python scripts/audit_gate_independent_evidence_requests_20261102.py
python scripts/test_audit_gate_independent_evidence_requests_20261102.py
```

The machine-readable matrix has **five** vessels, **two** sharing the 970 GWh assignment, **three** other pre-berth gas-day assignments, and **zero** independent port/discharge/loading documents currently obtained. This is an acquisition backlog, **not** evidence of cargo origin, economic value or geopolitical influence.
