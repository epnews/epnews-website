# Gate LNG October 2026 — commissioning and Portbase source-qualification gates

**Research only. No new vessel records obtained, external requests sent, or meter scoring changes.**

## Chronology: distinguish announcement date from effective date

- **1 October 2026:** Gate joint-venture shareholder Gasunie stated the fourth 180,000 m³ LNG tank **would be commissioned as of October 1**. Source: https://www.gasunie.nl/en/news/fourth-lng-tank-at-gate-terminal-ready-strengthening-energy-supply-for-the-netherlands-and-northwest-europe
- **5 October 2026:** Port of Rotterdam reported that construction was complete and the tank **had been commissioned**. This is a later publication, **not evidence that commissioning first occurred October 5**. Source: https://www.portofrotterdam.com/en/news-and-press-releases/fourth-lng-tank-gate-terminal-ready-and-commissioned
- The tank expansion adds 4 bcm/year regasification capacity and brings total nameplate capacity to 20 bcm/year; **neither nameplate figure is a measured October vessel discharge**.
- The announced fourth jetty is a **separate project**, projected to begin small-scale loading/bunkering in 2028; do not conflate tank commissioning with a new jetty's operation.
- The exact commissioning hour, initial tank inventory, first physical filling event and operational inventory reporting treatment remain **unverified**. Therefore do not causally attribute October 1 Gaspeil stock movements to the new tank without a primary inventory/meter record.

## Portbase evidence gates

Official Vessel Visit API: https://www.portbase.com/en/services/vessel-visit-api/

- Data owners authorize access via MyData; the service has a per-port-call fee. **No authorized access has been obtained.**
- The published terminal-provider footnote names ECT Delta, ECT Euromax, RWG, HPD II and APM MVII, **not Gate**. Therefore do not assume Gate supplies terminal berth or cargo timestamps through this product.
- The API lists harbour-master berth ATA/ATD, and some terminal cargo-handling start/end event fields. A timestamp is **not** a metered unloaded quantity.
- The API's bunker-operator `Product > Quantity` field is **not** evidence of LNG import cargo discharged at Gate.
- A `previousPorts` value is **not** an independently verified LNG loading origin.
- The API reference at https://portvisit.pcs.portbase.com/api-documentation/index.html documents schemas, credentials and timestamps, **not an accessible October 2026 historical vessel record**.

## Five-vessel evidence resolution matrix

| Priority | Unresolved issue | Primary evidence needed | Insufficient substitute |
| --- | --- | --- | --- |
| BW NIVALIS | Oct 1 E-day 970 GWh attribution shared with VIVIT AMERICAS LNG | IMO/voyage-linked berth ATA, discharge interval, certified metered unloading | Facility inventory delta |
| VIVIT AMERICAS LNG | Same shared Oct 1 attribution | Same independent vessel-specific evidence | Shared Gaspeil value |
| VENTURE GATOR | Measured gas-day label precedes UTC arrival | Timezone-qualified berth ATA and discharge start/end | AIS arrival alone |
| VLADIMIR VIZE | Measured gas-day label precedes UTC arrival | Timezone-qualified berth ATA and discharge start/end | Third-party departure alone |
| MINERVA LIMNOS | Measured gas-day label precedes UTC arrival | Timezone-qualified berth ATA and discharge start/end | Third-party departure alone |

## Rules for subsequent evidence ingestion

1. Store **publication date**, **effective date**, **event UTC timestamp** and **reporting gas-day** separately.
2. Require IMO + voyage/call reference before joining port events to operator gas-day measurements.
3. Treat port/berth events, loading-origin records and certified transfer quantities as separate claims.
4. Only upgrade physical unloading quantities with vessel-specific certified transfer evidence, explicit unit and measurement basis.
5. Track Gate terminal data-owner authorization separately from general Portbase API availability.
6. Do not modify SOI meter needles, confidence scores, cargo totals, financial impact or origin classifications from this research packet alone.
