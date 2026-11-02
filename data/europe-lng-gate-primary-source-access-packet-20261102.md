# Gate October 2026 — primary-document access and verification packet

Status: **source routes researched; no external requests sent; no records received.** This packet supplements the 22-arrival acquisition register and does not certify any cargo quantity or origin.

## Verified source routes

| Route | Published evidence / access | Limitation |
| --- | --- | --- |
| Gate terminal B.V. | Official contact: info@gateterminal.com; +31 (0)181 799 000; Maasvlakteweg 991, 3199 LZ Rotterdam. https://www.gateterminal.com/en/contact/ | Inquiry route only; no assurance that commercial custody-transfer certificates will be disclosed. |
| Portbase Vessel Visit API | Vessel-level information from agents, harbour master and participating terminals; IMO, port-call reference, berth code, berth actual arrival/departure and certain cargo-handling timestamps. https://www.portbase.com/en/services/vessel-visit-api/ | Access is conditional on MyData owner authorization and paid use; the published terminal coverage list does **not** establish Gate participation. |
| Portbase Port Visit API documentation | Documented vessel/terminal visit identifiers, IMO, berth and time fields, and authentication headers. https://portvisit.pcs.portbase.com/api-documentation/index.html | Documentation is not historical October 2026 vessel data; no API credentials or access obtained. |
| Port of Rotterdam | Official Gate terminal overview and port context. https://www.portofrotterdam.com/en/logistics/cargo/lng/lng-terminal | Port information cannot certify LNG discharged by an individual ship. |
| Royal Vopak Gate terminal | Terminal operator listing and contact details. https://www.vopak.com/terminals/gate-terminal-lng-rotterdam?language_content_entity=en | Operator description is not a discharge or custody-transfer record. |

## Priority retrieval plan

1. **BW NIVALIS and VIVIT AMERICAS LNG** — request independently timestamped berth arrivals/departures and discharge start/end for October 1, with vessel IMO and voyage/call reference; ask whether the same estimated 970 GWh inventory-derived attribution was duplicated.
2. **VENTURE GATOR, VLADIMIR VIZE and MINERVA LIMNOS** — request UTC berth arrival and discharge event timestamps to reconcile measured gas-day labels preceding AIS UTC arrival dates.
3. **All 22 arrivals** — request vessel-specific discharge meter certificates, units, gas composition/energy conversion basis, measurement method, voyage identifiers and loading terminal/export records where releasable.

## Evidence promotion rules

- A confirmed port visit establishes presence, **not** LNG discharge.
- Berth ATA/ATD establishes berth occupancy, **not** transferred quantity.
- Cargo-handling timestamps establish event timing, **not** a certified quantity.
- Loading-port records may establish origin, **not** the quantity delivered at Gate.
- Only vessel-specific discharge/custody-transfer evidence with matching IMO/voyage, time window, units and measurement basis can upgrade quantity claims.
- Never treat Gaspeil/GIE inventory changes as independent proof of an individual vessel's cargo.
- Keep source statuses as `identified_not_contacted`, `request_sent`, `response_received`, `document_verified` or `unavailable` based on actual evidence; presently all routes remain **identified_not_contacted**.
- No command-meter scores, needles, financial returns or national benefit estimates change from this packet.

## Request template (NOT SENT)

Subject: October 2026 Gate terminal LNG vessel-event verification

We are reviewing publicly reportable October 2026 LNG vessel activity at Gate terminal. Can you advise whether vessel-specific berth ATA/ATD, discharge start/end timestamps, certified unloaded quantity (with units and measurement method), and loading-origin documentation are publicly available or obtainable? We can provide the 22-vessel IMO/voyage register, prioritizing BW NIVALIS, VIVIT AMERICAS LNG, VENTURE GATOR, VLADIMIR VIZE and MINERVA LIMNOS. Please identify any applicable access conditions, fees or confidentiality restrictions. This is an inquiry draft only and has not been transmitted.
