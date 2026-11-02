# Gate October: distinguish stock-attributed vessels from operator-confirmed inventory days

**Research question:** For Gaspeil's 16 October `gemeten` (inventory-derived) vessel associations, which underlying GIE ALSI+ operator gas days are **C** (confirmed daily inventory reports), **E** (estimated daily inventory reports), or absent?

Sources: [GIE ALSI+](https://alsi.gie.eu/) authenticated Gate operator observations and [Gaspeil Gate October arrivals](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31), acquired independently in the integrated workflow. The public operator series has **29 C and 2 E** days for October 2026; the **October 1** inventory observation is **E**, not C. The earlier operator audit already excludes adjacent E/C boundary changes from confirmed inventory-delta analysis.

**Material source-quality issue:** Both **BW NIVALIS** and **VIVIT AMERICAS LNG** have the same **970 GWh** stock-derived assignment on **October 1**, which is **operator-estimated (E)**. Their combined naive **1,940 GWh** should not be promoted to confirmed vessel unloading or independent throughput. The fact that the underlying operator gas-day inventory is E adds a separate reporting-quality caveat to the already identified double-attribution risk.

The other **14 measured vessel associations** are mapped to operator gas days in the C-reported portion of the October series, subject to live authenticated source reconciliation. Even a **C** day confirms *operator daily inventory reporting*, **not** independently metered unloading by a particular ship. The six remaining October arrival records have no measured gas-day assignment and remain estimated-only.

## Implementation

The new audit `scripts/audit_gate_measured_operator_quality_segments_20261102.py` joins each vessel's `measuredGasDay` to the authenticated operator observation date and segments into C, E, and MISSING. It reports assignment counts, attributed GWh, distinct gas days, and arrival keys, without treating daily stock reports as vessel cargo certification. Four offline tests cover E/C/missing segments, duplicate operator days, estimated-only exclusions and incomplete measured records.

The authenticated Gate workflow runs the audit **after** ten existing snapshot diagnostics and eight cross-diagnostic integrity checks, then archives its output with the source snapshots. The previous run [41433211175](https://github.com/epnews/epnews-website/actions/runs/41433211175) completed successfully and uploaded its research artifact.

**No SOI score or revenue conclusion.** To upgrade the two Oct1 vessels, obtain actual berth-level discharge logs and authoritative operator inventory quality revision, rather than inferring from a single estimated daily stock observation.
