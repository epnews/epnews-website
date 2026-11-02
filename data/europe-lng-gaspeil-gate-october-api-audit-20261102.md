# Gaspeil Gate LNG October 2026 — live API record audit

Retrieved: 2026-11-02; API: https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31
Documentation: https://www.gaspeil.nl/api-docs (CC BY 4.0; attribute **Gaspeil.nl based on Port of Rotterdam, AIS, GIE ALSI+ and DOE**).

## Actual October record-level response, not extrapolation
- **22** Gate records with October arrival dates.
- **16 `gemeten`** (tank-stock-change-derived association), **6 `geschat`** (estimated), **0 `bevestigd`** (DOE-matched).
- **19** records label US origin, **1** Russia, **2** unknown. **These are API origin labels, not 19 certified US imports.**
- **Two records map to the same `measuredGasDay` 2026-10-01:** `VIVIT AMERICAS LNG` and `BW NIVALIS`, each with `measuredGwh=970`. **Do not sum both as independent tank measurements without deduplication and source reconciliation.**
- **VENTURE GATOR** `gemeten` 943 GWh associates with `measuredGasDay=2026-10-29` even though the record's `arrivedAt` is 2026-10-30T21:07:31Z. The tank-association day precedes the API arrival timestamp; this is an **attribution chronology conflict**, not a verified October 30 discharge.
- **MINERVA LIMNOS** `gemeten` 877 GWh associates with `measuredGasDay=2026-10-11` despite `arrivedAt` 2026-10-12T20:56Z. A second chronology conflict requiring reconciliation.
- `origin.likely=false` does **not** mean origin is officially certified; `origin.basis="begin van het AIS-spoor"` means the observed beginning of an AIS track, not necessarily the loading terminal or a complete voyage.
- `valueEur` is indicative cargo × TTF market price, **not realized company revenue, margin, profit, or national benefit**.

## Record-level examples from the filtered API
| Ship | IMO | Arrival UTC | Status | Cargo GWh | Measured gas day | Origin evidence |
|---|---|---|---|---:|---|---|
| HLS CARTAGENA | 9947691 | Oct 31 21:52 | geschat | 1015 | — | US, AIS-track start |
| VENTURE GATOR | 9956599 | Oct 30 21:07 | gemeten | 943 | Oct 29 | US **likely**, agent inference |
| RIBERA DEL DUERO KNUTSEN | 9477593 | Oct 27 22:03 | geschat | 1034 | — | US, AIS-track start |
| HUASHAN | 9958652 | Oct 27 10:03 | gemeten | 1105 | Oct 28 | US, AIS-track start |
| UMM AL HANAYA | 9980851 | Oct 26 06:59 | gemeten | 1060 | Oct 27 | US **likely**, historical DOE voyages |
| VLADIMIR VIZE | 9750658 | Oct 22 23:07 | gemeten | 1037 | Oct 21 | Russia/Yamal, Arc7 fleet inference |
| OCEAN INSPIRATION | 9979761 | Oct 21 20:07 | gemeten | 1028 | Oct 22 | US **likely**, historical DOE voyages |
| VIVIT AMERICAS LNG | 9864667 | Oct 1 22:02 | gemeten | 970 | Oct 1 | US, AIS-track start |
| BW NIVALIS | 9968932 | Oct 1 01:07 | gemeten | 970 | Oct 1 | US, AIS-track start |

## Operator cross-check limitations
The authenticated Gate ALSI+ operator series covers all 31 gas days (29 confirmed, two estimated). The Gaspeil `gemeten` classification is **Gaspeil's interpretation of operator inventory jumps**, not an operator-certified vessel-level unloading ledger. Multiple vessel records can share one stock-change day; terminal inventory is affected by send-out and other operations. Do not sum `cargoGwh` to claim terminal imports without reconciling duplicates, gas-day boundaries, operator inventory and send-out units, and actual berth events.

## Next primary-source research
1. Obtain certified berth/discharge start/end and unloading volumes for the 22 candidate records; prioritize October 1 duplicate, VENTURE GATOR, MINERVA LIMNOS.
2. Validate the `measuredGasDay` algorithm and UTC vs Dutch gas-day time zone from Gaspeil methodology.
3. Check voyage-specific loading origin and export dates; do not promote historical DOE voyages to October 2026 origin confirmation.
4. Archive full API snapshot through a reproducible fetch step; treat this summary as a dated source audit, not a frozen full-record mirror.

**Influence score unchanged.** This batch strengthens the evidence inventory and reveals attribution conflicts; it does not close the certified US-origin unloading gap.
