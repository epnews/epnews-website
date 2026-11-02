# Gate October: primary Gaspeil methodology and source-access audit

**Checked 2026-11-02.** New primary methodological source: [Gaspeil API documentation](https://www.gaspeil.nl/api-docs). Cross-reference: [Port of Rotterdam arrival/departures](https://www.portofrotterdam.com/en/up-to-date-information/arrival-and-departures) and [Harbour Coordination Centre](https://www.portofrotterdam.com/en/contact-harbourmaster).

## Exact status semantics (translated/paraphrased)
- `geschat`: arrival inferred from Port of Rotterdam vessel list or AIS; volume estimated from vessel length or its previous measured loads.
- `gemeten`: **a change in terminal tank inventory from GIE ALSI+ has been assigned to that vessel**, and `measuredGwh`/`measuredGasDay` are filled. This is **not an independently measured custody-transfer volume**.
- `bevestigd`: the US Department of Energy export list matches **that cargo** with departure date, loading terminal and loaded volume. The documentation says these matches can lag departure by about two months and apply only to US LNG.

The documentation confirms that the `lossingen` endpoint is **free, no API key**, with JSON/CSV and terminal/date filters; it states the public response is cached for five minutes. A **separate current ship-by-port API requires a free key**, so the no-key October arrival archive does not establish access to full independent port event data.

## Consequences for the October source artifacts
- 16 `gemeten` and 6 `geschat` Gate arrivals, **zero `bevestigd`**. Thus the October archive contains **zero DOE-matched voyage-specific loading confirmations**.
- GIE 29 confirmed October operator gas days do not elevate Gaspeil's vessel-specific `gemeten` assignments to custody-transfer measurements. The shared Oct 1 970 GWh assignment to BW NIVALIS and VIVIT AMERICAS LNG remains unresolved; GIE Oct 1 is E.
- Gaspeil documentation's phrasing that `gemeten` appears after arrival is a **general workflow description**, not a guarantee that the `measuredGasDay` field equals the berth date. The five-vessel logbook audit demonstrates why that distinction matters.
- A DOE `bevestigd` label would document a US loading event, but does not alone prove delivered quantity, realized revenue, or profit at Gate.

## Concrete independent access route
- Port of Rotterdam's official arrivals/departures page directs users to planned vessel calls and identifies the **Harbour Coordination Centre**, +31 (0)10 252 1000. It does not itself expose the historical Gate jetty events for our five IMOs.
- [Port of Rotterdam contact form](https://www.portofrotterdam.com/en/contact) can request UTC berth arrival/departure and terminal berth identity for the five IMOs.
- Gate terminal's own custody-transfer/discharge records would be a separate and stronger source than the public Gaspeil API.

## Priority questions for the data publisher
1. Does `measuredGasDay` represent the GIE gas day assigned by the matching algorithm, rather than physical unloading date?
2. Can two arrivals be assigned **the same** 970 GWh stock change, and what deduplication or collision rule exists?
3. How are GIE `E` days handled when assigning `gemeten`?
4. Why do API `arrivedAt` timestamps and ship-page logbook arrival labels differ for VLADIMIR VIZE? Specify timezone and data revision history.
5. Is the vessel/port key API an independent port event source or an aggregation of the same Rotterdam/AIS data?

**No score change.** These findings improve source interpretation and identify an acquisition path; they do not establish cargo quantities, certified origins, or revenues.
