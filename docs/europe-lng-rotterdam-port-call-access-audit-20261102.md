# Rotterdam LNG port-call corroboration: verified access constraints (November 2, 2026)

## Primary sources inspected

- [Port of Rotterdam, Arrivals and Departures](https://www.portofrotterdam.com/en/up-to-date-information/arrival-and-departures): official public page describes planned calls, vessels in port, and departures. This is **not** a verified downloadable historical October 2026 vessel-by-vessel cargo discharge dataset; a planned call is not an actual discharge.
- [Portbase, Vessel Visit API](https://www.portbase.com/en/services/vessel-visit-api/): official Rotterdam port-community API documentation lists vessel IMO, berth code/location, actual berth arrival/departure, and **actual cargo-handling start/completion timestamps** among available attributes. Crucially, the table marks cargo-handling fields as **terminal-sourced**, with terminal contributors listed as container terminals (ECT Delta, ECT Euromax, RWG, HPD II, APM MVII); **Gate LNG is not listed**. Therefore, **do not assume** Portbase has Gate LNG cargo-handling records.
- Portbase says the service requires an API connection, MyData/data-owner authorization and €0.76 per port call received; it is **not an unrestricted free historical feed**.

## Specific evidence request to pursue

For October 2026 vessel leads, request from Port of Rotterdam Harbour Coordination Centre or Gate terminal, where available: **IMO, voyage ID, Gate LNG berth, actual berth arrival/departure, actual LNG discharge start/end, actual discharge volume and origin documentation**. Treat the first five as port-call/operation evidence and the last two as cargo evidence. If the source cannot provide terminal-authorized records, record access denial/absence; do not substitute Portbase's container-terminal API for Gate.

Leads (not proven October discharge): VENTURE GATOR 9956599; CORAL ENERGY 9617698; HUASHAN 9958652; RIBERA DEL DUERO KNUTSEN 9477593.

## Source separation

- DOE Jan–Aug 2026: verified **U.S. departure records**, including two selected vessels reporting Netherlands destination.
- Port of Rotterdam: vessel call listings, not certified unloading.
- Portbase: conditional vessel-call API, terminal-specific permissions and coverage, not demonstrated Gate coverage.
- Gate: operator source needed for LNG unloading and volumes.
- GIE ALSI+: terminal-level operational corroboration, not individual voyage certificates.

**Current status:** verified authoritative port-call discovery and data-access restrictions; **no October Rotterdam Gate discharge or U.S. cargo origin verified**. Do not change SOI scores.
