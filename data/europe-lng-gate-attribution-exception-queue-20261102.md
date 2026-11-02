# Gate Rotterdam October 2026: attribution exception queue and corroboration

**Evidence snapshot:** 2026-11-02. This is a research triage artifact, **not** an LNG discharge ledger.

## Independently checked sources
- [Gaspeil public API schema and status semantics](https://www.gaspeil.nl/api-docs): `gemeten` denotes Gaspeil matching an ALSI+ tank-stock jump to a vessel, **not an independently certified vessel unloading measurement**; `geschat` is estimated; `bevestigd` requires a US DOE export-list match. `origin.likely` indicates an inference, and `valueEur` is an indicative TTF-marked gross value, not realized revenue.
- [Gaspeil methodology](https://www.gaspeil.nl/methodologie): GIE ALSI+ is terminal-level inventory/send-out; ENTSOG describes network flow, which cannot independently identify a ship.
- [TankerMap Gate Rotterdam arrivals/departures](https://tankermap.com/analytics/ports/gate-rotterdam): geofence call chronology; independent of Gaspeil's cargo attribution but **not** proof of berth discharge.
- [Gate terminal](https://www.gateterminal.com/en/) and [Port of Rotterdam, 5 Oct 2026](https://www.portofrotterdam.com/en/news-and-press-releases/fourth-lng-tank-gate-terminal-ready-and-commissioned): fourth 180,000 m³ tank operational 1 October; terminal capacity 20 bcm/year. **Do not infer October throughput from nameplate capacity.**
- [October filtered Gaspeil arrivals](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31): 22 arrivals, 16 tank-derived assignments, six estimates, zero DOE-confirmed as of 2 November.

## Priority exception queue
| Priority | Record(s) | Problem | Required resolution |
|---|---|---|---|
| P0 | BW NIVALIS (IMO 9968932) + VIVIT AMERICAS LNG (IMO 9864667) | Both `gemeten` 970 GWh and `measuredGasDay=2026-10-01`; potential reuse of one stock jump | Obtain underlying tank-change event identifier and operator berth/discharge chronology; never count as two distinct measured jumps |
| P0 | VENTURE GATOR (IMO 9956599) | Gaspeil `arrivedAt` 2026-10-30 21:07 UTC but `measuredGasDay=2026-10-29`; TankerMap 15-minute geofence visit on Oct 30 | Reconcile timestamps, gas-day boundary, berth event and whether the stock jump belongs to another vessel |
| P0 | MINERVA LIMNOS (IMO 9854375) | Gaspeil `arrivedAt` 2026-10-12 20:56 UTC but `measuredGasDay=2026-10-11`; TankerMap lists Oct 13 departure | Check time conversion and Gaspeil attribution algorithm; do not attribute Oct 11 stock increase to an Oct 12 arrival without evidence |
| P1 | RIBERA DEL DUERO KNUTSEN (IMO 9477593) | Gaspeil estimated 1,034 GWh; TankerMap 3-minute geofence call | Verify berth stay and actual unloading; retain estimated status |
| P1 | HLS CARTAGENA (IMO 9947691) | Oct 31 arrival with estimated 1,015 GWh; may still have been alongside on Nov 1 | Do not count an October discharge solely from arrival month |
| P1 | HUASHAN (IMO 9958652) | Gaspeil 1,105 GWh `gemeten` Oct 28; third-party AIS stay Oct 27–28 | Stronger candidate for chronology review, but still lacks operator-certified unloading and voyage-specific origin |
| P1 | VLADIMIR VIZE (IMO 9750658) | Gaspeil labels Russian/Yamal origin from vessel class/operating history | Seek voyage-specific loading terminal and independent records; ship class is not a cargo certificate |

## Non-independent evidence warning
Gaspeil's `gemeten` is derived from GIE ALSI+; **comparing Gaspeil against the same GIE stock series is a consistency test, not independent verification of a discharge**. TankerMap geofence events provide separate vessel-presence leads, not cargo quantities. A complete proof chain requires berth-level operator documentation, exact voyage loading origin, and cargo quantity/units.

## Acquisition priorities
1. Request Gate/Port of Rotterdam October berth event log with IMO, jetty, actual berth-on/off timestamps, operation (unload/reload), and volume.
2. Ask Gaspeil for the matching algorithm, stock-jump event IDs, gas-day time-zone handling, and reason two ships share October 1's 970 GWh.
3. Obtain voyage-specific loading-port departures from port authorities or verified manifests; reconcile with the October arrivals.
4. Re-run Gaspeil API after DOE October export publication and verify each `bevestigd` link to an actual same-voyage DOE row.
5. Keep the influence score unchanged until origin and unloading evidence become independently defensible.

## Publication guardrails
No sum of Gaspeil `cargoGwh` may be published as certified Gate imports; no US-origin fraction inferred from 19 origin labels; no TTF-marked `valueEur` published as realized revenue or profit. Preserve status classifications and conflicts verbatim.
