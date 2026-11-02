# Gate October 2026 — expanded AIS and Gaspeil cross-check

Research date: 2026-11-02. **Secondary-source evidence, not certified vessel discharge data.**

## New public research sources
- [TankerMap Gate Rotterdam port timeline](https://tankermap.com/port/gate-rotterdam): displays many more October arrivals/departures than the prior last-four-call archive; this changes the completeness assessment of the AIS candidate list.
- [Gaspeil LNG Radar](https://www.gaspeil.nl/radar): independently published vessel-level *estimated* or *tank-change-derived measured* LNG volumes and inferred origins.
- [Gaspeil public API documentation](https://www.gaspeil.nl/api-docs): `GET https://www.gaspeil.nl/api/v1/lng/lossingen` (JSON/CSV, filter `terminal=gate`, CC BY 4.0); `geschat` estimated; `gemeten` tank-derived measured; `bevestigd` DOE-linked confirmed when available. API docs explain origin basis and `likely` flag.
- [Port of Rotterdam October 5 expansion announcement](https://www.portofrotterdam.com/en/news-and-press-releases/fourth-lng-tank-gate-terminal-ready-and-commissioned): fourth 180,000 m³ tank commissioned; Gate total stated capacity 20 bcm/year. **Capacity is not October throughput or unloading.**
- [Gate operator website](https://www.gateterminal.com/en/): confirms fourth tank operational October 1, 2026.

## Newly identified October AIS candidates (TankerMap)
| Vessel | Reported departure (UTC) | Research status |
|---|---|---|
| WOODSIDECHARLESALLEN | Oct 5 11:42 | AIS lead only |
| CELSIUS GRANADA | Oct 6 05:43 | AIS lead only |
| OCEAN INSPIRATION | Oct 7 11:33; Oct 22 19:14 | Multiple events; verify voyage separately |
| KONGTONG | Oct 9 15:42 | AIS lead only |
| OCEAN OASIS | Oct 11 07:28 | AIS lead only |
| AL NAAMAH | Oct 12 14:47 | AIS lead only |
| MINERVA LIMNOS | Oct 13 20:59 | AIS lead only |
| MALAGA KNUTSEN | Oct 14 20:25 | AIS lead only |
| CORAL ENERGY | Oct 14 22:08; Oct 30 00:55 | Multiple events; verify voyage separately |
| NIKOLAY YEVGENOV | Oct 17 00:59 | AIS lead only |
| UMM HEESH | Oct 18 07:39 | AIS lead only |
| NANTES KNUTSEN | Oct 20 11:12 | AIS lead only |
| MARAN GAS ANTIBES | Oct 21 04:02 | Multiple geofence events |
| OCEAN INSPIRATION | Oct 22 19:14 | Repeated vessel; not necessarily a new cargo |
| VLADIMIR VIZE | Oct 24 12:32 | AIS lead only |
| UMM AL HANAYA | Oct 27 08:18 | AIS lead only |
| HUASHAN | Oct 28 13:28 | Prior archive |
| RIBERA DUERO KNUTSEN | Oct 27 20:27 | Three-minute event; prior archive |
| CORAL ENERGY | Oct 30 00:55 | Prior archive |
| VENTURE GATOR | Oct 30 18:57 | Fifteen-minute event; prior archive |

TankerMap additionally lists HLS CARTAGENA arriving Oct 31 21:08 UTC, potentially departing in November. Do not count October unloading based on October arrival alone.

## Gaspeil secondary discharge indications
The November 1 radar snapshot reports: HUASHAN 1105 GWh (`gemeten`), UMM AL HANAYA 1060 GWh (`gemeten`), VLADIMIR VIZE 1037 GWh (`gemeten`), OCEAN INSPIRATION 1028 GWh (`gemeten`), VENTURE GATOR 943 GWh (`gemeten`), while RIBERA DEL DUERO KNUTSEN ~1034 GWh (`geschat`) and HLS CARTAGENA ~1015 GWh (`geschat`). **These are Gaspeil's modeled/tank-change-derived vessel associations, not operator-certified per-vessel discharge documents.** Gaspeil lists VLADIMIR VIZE as Russia/Yamal origin, HUASHAN as US origin, and some other US origins as `likely` inferred. These labels are leads to investigate, not verified cargo-origin certificates.

**Contradiction to resolve:** TankerMap's VENTURE GATOR 15-minute geofence event and RIBERA DEL DUERO KNUTSEN 3-minute event are too brief to establish discharge, yet Gaspeil associates sizable measured/estimated cargoes. This may reflect distinct port-geofence vs berth timestamps, attribution/model error, or other data limitations. Do not discard either source or upgrade either to certified evidence without independent verification.

## New acquisition strategy
1. Fetch and archive Gaspeil's open `/api/v1/lng/lossingen?terminal=gate` records with `status`, `measuredGasDay`, `origin.basis`, `origin.likely`, `doe` and attribution notes. Avoid treating `cargoGwh` as uniformly measured: it mixes measured and estimated.
2. Compare vessel IMO and exact voyage chronology against official Rotterdam berth records and Gate terminal records; preserve discrepancies.
3. Confirm gas-day boundary, stock/send-out definitions, fourth-tank commissioning effects, and whether tank-derived increments can be uniquely assigned to a ship.
4. Seek voyage-matched US DOE export records when October 2026 DOE data become available; historical Jan–Aug matches do not verify October discharge.
5. Only then consider updating geopolitical influence scoring; **no score change now**.

## Interpretation controls
- AIS port calls ≠ verified unloading; Gaspeil `gemeten` ≠ certified ship discharge; `bevestigd` DOE association requires reviewing the matched DOE voyage.
- LNG terminal capacity (20 bcm/year) ≠ utilization or actual October imports.
- Gaspeil indicative TTF price × cargo energy ≠ realized revenue, profit, or national net benefit.
- Explicitly separate estimated, inferred, tank-derived, and certified observations.
