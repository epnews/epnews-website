# October 2026 Gate LNG: provenance behind country-of-origin labels

**Verified from** [Gaspeil's 22-record October Gate API](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31), checked 2026-11-02, and [Gaspeil's own methodology](https://www.gaspeil.nl/api-docs). Gaspeil explains that `origin.basis` is an inference from AIS track, export-terminal location, operator or historical DOE voyages; `likely=true` explicitly means suspicion rather than observation. Its `bevestigd` requires a matched DOE export list entry for the voyage.

## Source basis decomposition
- **22 arrival records:** **19 US-labeled**, **1 Russia-labeled**, **2 without country label**. These are **record labels**, not certified national import volumes or counts of unique vessels.
- Of **19 US-labeled entries**, **11** derive from the **beginning of an AIS track**, **7** from **historical DOE export voyages** (which are not the current October voyage), and **1** from an **operator/agent inference**. None is `bevestigd` with a current-voyage DOE record.
- **8/19 US-labeled** entries explicitly carry `origin.likely=true`; the other 11 have `likely=false`, which **does not turn them into certified origin**.
- The **one Russia label** is inferred from vessel classification / Arc7 Yamal/Sabetta route, not a current-voyage loading document.
- **0/22** entries have DOE-`bevestigd` status or a matched `doe` object.

**Practical conclusion:** Even though the raw API looks overwhelmingly US-labeled, the data cannot yet establish the precise US share of October Gate LNG cargo, let alone US realized revenue, profit or influence. Do not multiply US-labeled `cargoGwh` by a market price and call it economic benefit.

## Reproduce
Save the unchanged API JSON and run:
```sh
python scripts/audit_gate_origin_evidence_basis_20261102.py --input gaspeil-october-gate.json
python scripts/test_audit_gate_origin_evidence_basis_20261102.py
```

**Next evidence gap:** same-voyage DOE export matching when October records become available, voyage-specific bills of lading/loading documentation, and independent Gate discharge records. This audit does not change the command-meter needle or confidence classification of vessel-specific cargo origin.
