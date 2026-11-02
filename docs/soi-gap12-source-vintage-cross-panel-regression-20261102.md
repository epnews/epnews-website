# GAP-12 official source vintage and regression coverage

PR #525 propagated the three official 2025-S2 price revisions to HICP and household price contrasts. Two existing audit scripts still compared the revised values to older Eurostat news-release snapshots and would incorrectly reject the corrections.

This update audits the current nominal panel against the older source snapshot **only when no official revision exists**. For each corrected baseline it requires the previous number to be preserved as `priorStartEUR100kWh`, verifies the original snapshot matches that prior value, and checks the revised source is the official Eurostat API. Recomputed nominal changes must match revised inputs; Malta 2026-S1 must retain provisional status `p`.

The cross-country contrast auditor uses the revised official panel where available and falls back to historical source observations only for countries not covered by the 22-cell official capture. This preserves original historical news snapshots rather than rewriting them. Both audits run as preflight regression checks in the official capture workflow.

**No audit-gate increment, influence scoring or meter UI change.** Evidence stays 20/30; Malta provisional remains not finally certified.
