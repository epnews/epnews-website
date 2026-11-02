# Rotterdam LNG cargo measurement methodology audit — 2026-11-02

## Key distinction: Gaspeil 'measured' is a **derived tank-stock attribution**

Gaspeil API documentation (updated 2026-11-01) explains three statuses for Gate Rotterdam and EemsEnergy arrival records: `geschat` (estimated based on vessel size or prior measured cargoes), `gemeten` (terminal tank inventory jump from GIE ALSI+ attributed to a ship), and `bevestigd` (later linked to a US DOE export record, when available).

Source: https://www.gaspeil.nl/api-docs

**Do not translate `gemeten` into terminal-certified cargo volume.** It is an attribution algorithm matching a tank-stock increase to an arrival, potentially confounded by concurrent send-out, tank-to-tank transfers, loading and other operations. Gaspeil's `bevestigd` label indicates a *claimed DOE linkage*; inspect the actual DOE record, loading date, terminal, ship IMO and volume before calling it independently confirmed.

Its `origin` field is an inference from AIS traces, export-terminal position, operator history or DOE; `likely: true` is explicitly a suspicion, not an observation. Do not treat the derived `valueEur` (TTF day price × cargo GWh) as realized sales revenue, profit, or net national benefit.

## Source hierarchy and data lineage

1. Gate terminal's own operational explanation: https://www.gateterminal.com/en/ — receives, stores, regasifies and supplies LNG; not a public discharge certificate for individual ship calls.
2. Port of Rotterdam LNG terminal description: https://www.portofrotterdam.com/en/logistics/cargo/lng/lng-terminal — Gate also loads vessels/trucks for onward transport; port presence cannot determine unloading direction.
3. Port authority 2026-10-05 commissioning: https://www.portofrotterdam.com/en/news-and-press-releases/fourth-lng-tank-gate-terminal-ready-and-commissioned — fourth 180,000 m³ storage tank, total annual capacity 20 bcm, **capacity is not delivered volume**.
4. TankerMap port-call feed: https://tankermap.com/port/gate-rotterdam — timestamps are AIS/geofence or port-call observations, not discharge records.
5. Gaspeil LNG API: https://www.gaspeil.nl/api-docs — **derived from port/AIS/GIE ALSI+/DOE**; its use alongside these underlying feeds is not independent corroboration.

## Research gate for the four October vessel leads

For VENTURE GATOR (IMO 9956599), CORAL ENERGY (9617698), HUASHAN (9958652), and RIBERA DEL DUERO KNUTSEN (9477593):

- Verify whether the port call was physically at a Gate discharge berth and whether LNG was unloaded versus reloaded.
- Obtain primary terminal/operator completion record, cargo energy/volume and gas-day convention.
- Trace loading port and transshipment, using source evidence not recycled from the same AIS/ALSI/DOE feed.
- If a Gaspeil record claims DOE confirmation, retrieve the **specific** DOE export row and independently match ship/date/terminal/quantity.
- Preserve mismatched timestamps and ambiguous three-/fifteen-minute port calls as unresolved. No automatic origin verification.

**Result:** no new independently verified vessel discharge or cargo origin in this audit; SOI audit remains 20/30, readiness 53%. No meter code changed.
