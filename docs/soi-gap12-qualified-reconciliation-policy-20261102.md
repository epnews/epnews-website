# Qualified Eurostat reconciliation policy

Official run 41397435122 extracted 22/22 prices and matched all 22 existing normalized observations exactly, but Eurostat marks Malta electricity 2026-S1 with JSON-stat status `p` (provisional).

The audit distinguishes numerical reconciliation from final certification. A successful workflow is permitted **only** when all 22 cells match and the **only** source flag is exactly Malta electricity 2026-S1 `p`; its report must state `all-exact-cells-match-provisional-qualified`, `sourcePricesReconciled: true`, `finalSourceCertification: false`, `scoreAuthorized: false`. Any new flag, mismatch, missing observation, or changed code fails the workflow. A future unflagged release may produce `all-exact-cells-match` and `finalSourceCertification: true` but does not by itself authorize influence scoring.

The 20/30 audit gate stays unchanged. Preserve moving needles, selectors, evidence panels and all comparisons. This status does **not** mean that the provisional observation is final.
