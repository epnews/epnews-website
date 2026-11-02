# Gate October LNG: independent documentary evidence acquisition register

After reviewing the October Gate arrivals, operator daily inventory quality, C/C stock-delta boundaries, duplicated gas-day attribution and Gaspeil/GIE source dependence, the central remaining blocker is **primary vessel-specific evidence**. Repeating arithmetic on the same stock-derived estimates cannot establish physical cargo delivered or its loading origin.

This milestone converts that gap into an explicit **22-arrival evidence acquisition register**, not another confidence score. For each arrival the authenticated workflow emits a stable arrival key, available IMO, Gaspeil status and four independent document families with minimum required fields.

| Document family | Target custodian | Essential verification |
| --- | --- | --- |
| Terminal discharge logs | Gate terminal operator | IMO, berth, discharge start/end UTC, quantity, unit, measurement method |
| Berth and port movement record | Port of Rotterdam / harbor master | IMO, berth, arrival/all-fast/departure timestamps |
| Custody-transfer measurement | Terminal operator / commercial cargo parties | IMO, transfer period, certified metered quantity, unit, certificate identifier |
| Loading/export documentation | Loading terminal / export authority | IMO, loading port and dates, cargo quantity, unit, voyage identifier |

**Cross-source match rules:** match IMO and voyage, distinguish port arrival from berth arrival and discharge events, convert units only with documented energy/volume conventions, and compare timestamp zones explicitly. A loading record may support cargo origin but does not independently prove Rotterdam discharge. A port berth record may establish presence but not discharged quantity. A facility inventory delta is not a vessel certificate.

**Priority evidence gaps:** BW NIVALIS and VIVIT AMERICAS LNG share the same Oct 1 stock-derived 970 GWh attribution on an operator **E** day; VENTURE GATOR, VLADIMIR VIZE and MINERVA LIMNOS have measured gas-day labels preceding their UTC arrival dates. These five cases warrant direct berth and cargo documentation before their attributed volumes can be upgraded.

The register intentionally labels all requests `not_requested_or_not_recorded` and `document_received=false`. **No request has been sent and no primary documents have been obtained through this PR.** It is an evidence acquisition plan, not proof of a negative.

Five offline tests cover the four document families, estimated-only records, duplicate/missing arrival identity and empty snapshots. The register is archived in the authenticated Gate research workflow, with pre-merge tests in the specialized Gate LNG CI.

The post-#656 authenticated workflow [run 41436532074](https://github.com/epnews/epnews-website/actions/runs/41436532074) **succeeded** and uploaded research artifact **13135849610**. No meter scores, net economic benefits or certified physical unloading quantities are assigned.
