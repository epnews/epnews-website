# Gate LNG: prevent double counting dependent source evidence

**Core research finding:** The [Gaspeil methodology](https://www.gaspeil.nl/api-docs) describes `gemeten` vessel volumes as attributions derived from [GIE ALSI+](https://alsi.gie.eu/) terminal inventory increases. Consequently, the **Gaspeil vessel-level measured quantity** and the **GIE terminal inventory report** are **not two independent confirmations of that vessel's cargo discharge**. They share upstream inventory data.

For the October Gate snapshot, 16 arrivals have inventory-derived volume associations; six remain estimated-only. Even when a GIE operator day is marked **C**, the operator's confirmed inventory observation does not independently establish vessel-specific custody transfer. On October 1, the shared **970 GWh** attributed to both BW NIVALIS and VIVIT AMERICAS LNG rests on an **E** operator day, compounding source-quality and double-association concerns.

## Machine-readable evidence lineage

The new `audit_gate_source_independence_20261102.py` emits a source dependency graph and per-arrival evidence flags:
- **Gaspeil arrival event**: event context from vessel/port tracking; no independent metered cargo volume.
- **GIE operator daily inventory**: facility-level stock observation and reporting status; no individual vessel discharge certificate.
- **Gaspeil `measuredGwh`**: derived attribution using GIE inventory plus vessel event association, not independent of the operator source.
- **Independent certified cargo quantity**: **not available in this evidence set**. The report explicitly records zero independent vessel-discharge volume sources per arrival, meaning *none present in the gathered evidence*, not that no such records exist elsewhere.

This distinction prevents the command-meter research pipeline from treating multiple representations of one inventory observation as separate corroborating measurements. It is a methodological guard, not a numerical influence score or claim of physical non-delivery.

## CI and workflow

Four offline regression tests verify dependency lineage, estimated-only handling, E status handling and malformed records. They run in **both** the pre-merge Gate LNG regression workflow and the authenticated main workflow. The authenticated workflow archives `gate-october-source-independence.json` alongside source snapshots, ten diagnostics, eight consistency gates and vessel-level claim restrictions.

The previous successful authenticated workflow is [run 41434903639](https://github.com/epnews/epnews-website/actions/runs/41434903639). PR #654's new pre-merge regression workflow also passed its own PR checks before merging.

**Next research priority:** independently obtained berth/discharge logs or custody-transfer measurements, ideally linked to exact IMO, terminal berth, gas day and unit definitions, before upgrading any vessel-level volume confidence.
