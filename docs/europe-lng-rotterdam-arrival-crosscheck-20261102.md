# Gate Rotterdam LNG calls: October 2026 arrival cross-check

**Source observation date: 2026-11-02.** These are candidate port-call records, not authenticated cargo-discharge certificates.

TankerMap's Gate Rotterdam port-call table reports the following arrivals, complementing departures documented in earlier PRs:
https://tankermap.com/port/gate-rotterdam

| Vessel | Arrival reported (UTC) | Departure reported (UTC) | Interpretation |
| --- | --- | --- | --- |
| VENTURE GATOR | 2026-10-30 18:42 | 2026-10-30 18:57 | 15-minute AIS port-call interval; inconsistent with a normal full LNG discharge; check geofence classification and terminal berth |
| CORAL ENERGY | 2026-10-29 04:09 | 2026-10-30 00:55 | 20h46m interval; small LNG vessel, may be distribution/reloading |
| HUASHAN | 2026-10-27 09:10 | 2026-10-28 13:28 | 28h18m interval; candidate unloading |
| RIBERA DUERO KNUTSEN | 2026-10-27 20:24 | 2026-10-27 20:27 | 3-minute AIS port-call interval; inconsistent with a full discharge; independently confirm actual terminal berth |

These intervals are arithmetic from the **same TankerMap feed**, not independent corroboration or evidence of unloaded quantities. TankerMap may use geofences, estimates and fallbacks; reported port calls do not guarantee terminal-level physical transfer.

### Independent research lead: derived LNG radar

The Netherlands LNG Radar (https://www.gaspeil.nl/radar?ship=9948736), dated 2026-11-01, describes:
- HUASHAN at Gate on 2026-10-27: **1105 GWh described as measured**, attributed to United States.
- VENTURE GATOR at Gate on 2026-10-30: **943 GWh described as measured**, origin **probably** United States.
- RIBERA DEL DUERO KNUTSEN at Gate on 2026-10-27: approximately **1034 GWh estimated**, attributed to United States.
- CORAL ENERGY: origin **unknown**, approximately 87 GWh in a separate departure listing.

**These are claims made by a derived third-party service**, not independently authenticated terminal discharge volumes or proven loading origins. “Measured” is the publisher's label; trace its measurement algorithm and underlying operator data. Note the **VENTURE GATOR 15-minute** and **RIBERA 3-minute** port-call discrepancies against radar claims; these should be explicitly reconciled, not silently accepted.

### Primary operator context

Port of Rotterdam's 2026-10-05 commissioning release confirms Gate's fourth LNG tank and its storage/send-out function: https://www.portofrotterdam.com/en/news-and-press-releases/fourth-lng-tank-gate-terminal-ready-and-commissioned

**Required before verified-cargo status:** terminal operator unloading completion, actual cargo direction (import versus reload), dated berth/IMO linkage, physical loading-port history, independent upstream source, and validated units/quantity. Until then, no change to SOI audit 20/30 or readiness 53%; no score or influence attribution.
