# Gate October 2026 — actual two-artifact reconciliation results

**Research date:** 2026-11-02. This is the first documented comparison using both downloaded GitHub Actions artifacts, not a hypothetical or API-only comparison.

## Authenticated source artifacts
- GIE ALSI+ Gate operator acquisition: [run 41418617064](https://github.com/epnews/epnews-website/actions/runs/41418617064), artifact `gate-alsi-acquire-research`, ID `13128372919`, file `gate-alsi-operator-october-2026.json`.
- Gaspeil public October acquisition: [run 41420849109](https://github.com/epnews/epnews-website/actions/runs/41420849109), artifact `gate-gaspeil-october-2026-snapshot`, ID `13130001495`, files `gate-gaspeil-october-2026-snapshot.json` and `gate-gaspeil-october-2026-summary.json`.
- Source documentation: [GIE ALSI+](https://alsi.gie.eu/), [Gaspeil API](https://www.gaspeil.nl/api-docs). Gaspeil.nl based on Port of Rotterdam, AIS, GIE ALSI+ and DOE; CC BY 4.0.

## Observed reconciliation
- GIE operator: **31 distinct October gas days**; **29 confirmed (C), two estimated (E)** on October 1 and 23.
- Gaspeil: **22 October-arrival records**, **16 `gemeten` tank-derived assignments**, **6 `geschat` estimates**, **zero `bevestigd` DOE-matched records**.
- **16 measured vessel assignments occupy 15 distinct gas days**, because **BW NIVALIS** and **VIVIT AMERICAS LNG** both reference **2026-10-01** and both show **970 GWh**. That operator day is itself status **E (estimated)**. This is the highest-priority duplicate/source-quality issue.
- **Three Gaspeil measurements precede their API arrival dates**: VENTURE GATOR (`measuredGasDay=2026-10-29`, arrival Oct 30), VLADIMIR VIZE (Oct 21 vs arrival Oct 22), MINERVA LIMNOS (Oct 11 vs arrival Oct 12). The earlier exception queue missed VLADIMIR VIZE; this real-artifact run adds it.
- The other **14 measured assignments** (excluding the two Oct 1 records) reference operator days marked **C**. A `C` operator observation does not certify the ship's discharge.
- No `measuredGasDay` references a day missing from the operator's 31-day series.
- Inventory values are **GIE terminal stock GWh**, not per-vessel discharge. Example: Oct 28 stock **3422.12 GWh**, Oct 29 stock **3760.61 GWh**. The Oct 29 change is **+338.49 GWh**, while Gaspeil attributes **943 GWh** to VENTURE GATOR for Oct 29. These numbers are **not directly comparable as cargo and stock change**, because send-out, reloads, reporting windows, and the attribution algorithm are not independently reconciled.
- Another example: Oct 1 operator stock **2874.56 GWh** is marked **E** and two vessels are assigned 970 GWh each. There is no September 30 baseline in the October-only operator artifact to independently compute the Oct 1 inventory change.

## Evidence conclusion
The real artifacts substantiate an attribution problem rather than resolve vessel-specific imports. **No October vessel has a DOE-confirmed same-voyage origin in the Gaspeil snapshot**, and no certified operator berth/discharge record was obtained. The 19 US origin labels are not 19 verified US unloads. Neither estimated nor stock-derived vessel GWh may be summed into a certified import total. Gaspeil's GIE-derived assignments and the GIE source are not independent discharge evidence.

## Next data acquisition
1. Obtain Gate berth/unloading event log and ask Gaspeil to explain the Oct 1 shared event and the three prearrival assignments.
2. Expand authenticated GIE acquisition back to Sep 30 to establish an Oct 1 stock baseline, without treating stock delta as cargo.
3. Review send-out unit definitions, Dutch gas-day boundaries, tank commissioning, reloads and algorithmic pairing.
4. Obtain same-voyage loading-port and DOE export evidence when October records are available.

**No geopolitical score, revenue, profit, or net-benefit claim is warranted.** No command-meter interaction changes.
