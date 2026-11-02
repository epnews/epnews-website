# Gate Rotterdam October 2026: AIS/operator evidence bridge

## Purpose
This research bridge compares already acquired **operator daily gas-day reporting** with third-party **AIS geofence port calls** without inventing an unloading event or cargo origin.

## Source chain
- GIE ALSI+ Gate Rotterdam operator observations: [authenticated acquisition run](https://github.com/epnews/epnews-website/actions/runs/41418617064), 31/31 October days, 29 confirmed, 2 estimated (Oct 1, 23), zero missing.
- [TankerMap Gate Rotterdam AIS-derived port calls](https://tankermap.com/analytics/ports/gate-rotterdam), retrieved 2026-11-02; local archive: `data/europe-lng-gate-october-ais-port-calls-20261102.json`.
- [Gate operator methodology](./europe-lng-gate-operator-october-2026-evidence.md).

## Vessel leads and observation quality
| Vessel | IMO | AIS geofence window (UTC) | Duration | Interpretation |
| --- | --- | --- | --- | --- |
| HUASHAN | 9958652 | Oct 27 09:10–Oct 28 13:28 | 28h18m | Substantial geofence stay; berth/unloading unverified |
| CORAL ENERGY | 9617698 | Oct 29 04:09–Oct 30 00:55 | 20h46m | Substantial geofence stay; berth/unloading unverified |
| VENTURE GATOR | 9956599 | Oct 30 18:42–18:57 | 15m | Brief geofence crossing; no unloading inference |
| RIBERA DUERO KNUTSEN | 9477593 | Oct 27 20:24–20:27 | 3m | Brief geofence crossing; no unloading inference |

**Critical time-base limitation:** Operator observations are **gas-day totals/stocks**; AIS events are UTC timestamps. The series cannot be aligned to a ship discharge by matching calendar dates. Operator inventory changes are also influenced by send-out, reloads, transfers, and reporting revisions. Correlation is not attribution.

## What is established
1. The October Gate facility series exists and reports 31 gas days with explicit quality statuses.
2. Third-party AIS records identify four candidate geofence events, two of which span roughly a day.
3. The two short events cannot credibly be counted as unloading without berth and cargo-handling records.
4. None of these observations alone establishes an October LNG cargo's origin, unloading quantity, US share, revenue, or geopolitical score.

## Priority primary evidence still needed
1. **Operator berth/discharge records** with vessel IMO, start/end of unloading, LNG unloaded in a defined unit, and terminal identifier.
2. **Voyage-specific origin** (loading terminal, loading date, IMO) verified against the same voyage and independently matched to the discharge.
3. **Volume reconciliation** (unloaded LNG vs inventory change and send-out) using gas-day boundaries, unit definitions, and treatment of reloads.
4. **Destination-level trade statistics** for the matching reporting month and definition, explicitly separating US DOE exports from European imports.

## Decision gate
Only after an IMO-matched discharge record and loading origin exist may the evidence panel describe a specific October shipment as US-origin unloaded at Gate. Do not infer this from vessel historical DOE exports or AIS visits. Preserve the current influence score.

## Evidence status
**Operator data: acquired.** **AIS leads: acquired, third party.** **Certified discharge: missing.** **Voyage-specific origin: missing.** **US-origin October unloaded volume: not established.**
