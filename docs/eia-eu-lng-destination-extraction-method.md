# EIA EU27 LNG destination reconciliation: next measurement

After the verified France finding (PR #273), extract EIA `NGM_EPG0_EVE_NUS-Nxx_MMCF` monthly vessel LNG exports to all 27 EU destination codes for Jan–Jun 2025 and Jan–Jun 2026. First priority FR/DE/PL, then full EU. The source is EIA legacy destination-specific XLS, not an inferred proxy.

Workflow `eia-eu-lng-destinations.yml` runs automatically on merge, stores machine-readable artifact `eia-eu-lng-destinations.json`. Missing countries/months remain **null**, never zero. Script must report failures. This milestone is **data acquisition only**: no new numerical totals are claimed until the artifact is verified. A full EU sum is invalid if any destination is absent; even a complete EIA destination sum is not the same as Eurostat EU import partner or Bruegel EEA arrival totals.

Verified reference: France H1 2025 EIA 316,140 MMcf ≈ 8.952 bcm; H1 2026 215,051 MMcf ≈ 6.090 bcm (PR #273). Eurostat FR US-coded zero both H1 periods. Check that extractor reproduces those values before publishing a reconciled report. Different EIA reporting vintages can revise data.

**Do not** interpret EIA export destinations as confirmed terminal discharge, infer actual cargo origin from company contracts, assign unmeasured country totals zero, or claim the ~15 bcm gap is solved. Command Meter readiness 53%; influence/net economic scores null. No dashboard modifications.
