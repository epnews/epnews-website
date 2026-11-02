# GAP-12 downstream price propagation and consistency audit

Official successful Eurostat capture: https://github.com/epnews/epnews-website/actions/runs/41397739756

The primary nominal-price panel was corrected in PR #523. This PR propagates the corrected Malta electricity, Netherlands gas and Hungary gas 2025-S2 baselines to the 11 national HICP-adjusted comparisons, recalculating nominal and real percentage changes using the existing official monthly HICP indices and unchanged deflator method. Corrected comparisons: MT electricity, NL natural gas, HU natural gas.

The 2025-S2 cross-country contrast panel also previously retained old Hungary gas €3.40 and Netherlands gas €17.19. These are now €3.35 and €17.14, respectively; affected ratios and differences have been recalculated. Other comparisons are unchanged.

**Data qualification:** 22/22 official price observations match, but Malta electricity 2026-S1 remains Eurostat provisional status `p`. The HICP panel carries this flag and explicitly states that the source is not finally certified. This does not close the GAP-12 causal/economic evidence gate, authorize influence scoring, or alter the command-meter interface. Audit stays 20/30.

**Residual scope:** older historical/secondary descriptive panels may quote earlier news-release snapshots and require provenance-specific treatment; no silent retroactive replacement of original source quotations. The cross-country contrasts are descriptive, not affordability or geopolitical causation.
