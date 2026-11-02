# GIE ALSI+ primary API field audit — Gate Rotterdam (2026-11-02)

**Primary source:** [GIE API user manual v013, March 6, 2025](https://www.gie.eu/transparency-platform/GIE_API_documentation_v013.pdf), section 2.4 ALSI, alongside [ALSI+](https://alsi.gie.eu/).

## Evidence capability and limitations

GIE states that its ALSI data is reported directly by infrastructure operators under the EU REMIT transparency framework, with facility-level and aggregated historical datasets. The API service is free **but registration and a personal API key are mandatory** for non-data-provider users. No registered key or authenticated October 2026 Gate facility response was available during this research; **no live Gate October measurements were retrieved**.

The documented ALSI `/api` facility report includes:
- `gasDayStart` — start of reporting gas day.
- `inventory.lng` (10³ m³ LNG) and `inventory.gwh` (~GWh) — LNG stock at **end of gas day**.
- `sendOut` (GWh/day) — aggregated gas flow **out** of LNG facility during gas day.
- `dtmi` and `dtrs` — declared maximum inventory and reference send-out capacities.
- `status` — E (estimated), C (confirmed), N (no data).
- `updatedAt` — latest report update.

The `/api/unavailability` feed documents capacity outages, **not cargo discharge**.

**Critical methodological boundary:** Neither the `inventory` nor `sendOut` field is a vessel-by-vessel unloading record. Even a confirmed `status=C` means confirmed **facility reporting status**, not certified origin or volume of a particular ship's cargo. Inventory changes may include send-out and other operational adjustments. No inference of cargo source from inventory jumps alone.

## Corroboration plan

1. Obtain a legitimate GIE API key via registration and store it only in GitHub Actions secrets, not repository code, PR descriptions, or output artifacts.
2. Resolve the **actual Gate facility EIC** from authenticated `/api/about?show=listing` before querying dates. Do not invent the EIC or silently substitute Netherlands country totals.
3. Query October 2026 daily Gate facility inventory/send-out and record `status`, `updatedAt`, units, and missing days.
4. Overlay the four third-party AIS call events from `data/europe-lng-gate-october-ais-port-calls-20261102.json` as **context**, preserving UTC vs gas-day boundary differences.
5. Seek Gate operator discharge logs or cargo documents for each voyage before any certified October unload claim.

## Existing AIS call caution

TankerMap reports Venture Gator a 15-minute October 30 event pair and Ribera Duero Knutsen a 3-minute October 27 pair. These may be geofence events; they **must not** be used as discharge time windows. Coral Energy and Huashan have longer event intervals, but duration alone cannot certify unloading.

**Outcome:** verified the operator-sourced ALSI data definitions and exact API access barrier. No October Gate operator time series, unloading certificates, or origin confirmation. **No meter score change.**
