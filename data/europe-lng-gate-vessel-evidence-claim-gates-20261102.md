# Gate LNG: vessel claim restrictions tied to operator source quality

The prior Gate October analysis established **22** arrival records, **16** inventory-derived vessel attributions and **six** estimated-only vessel records. The 16 attributions span **15** measured gas days; on **October 1**, two vessel associations share the same 970 GWh estimate and the underlying GIE operator observation is **E**, not **C**.

This research milestone makes those evidence limits **machine-readable for each vessel** rather than relying on narrative cautions scattered across ten diagnostics. It combines the authenticated [GIE ALSI+](https://alsi.gie.eu/) operator series with the [Gaspeil October Gate arrival snapshot](https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31).

For each arrival, the audit emits conservative reasons that block a **certified-vessel-discharge claim**:

- `no_inventory_derived_vessel_attribution`: no stock-derived vessel-specific attribution exists (the six estimated-only records).
- `operator_inventory_day_not_confirmed`: the attributed gas day is E, N or absent rather than a C operator inventory report.
- `multiple_vessel_attributions_same_gas_day`: two or more arrivals share one attributed inventory day, even if their quantities differ.
- `no_independent_vessel_discharge_certificate`: applies to **every record** because a stock-derived association or operator C inventory report is **not** an independently verified custody-transfer/discharge certificate.

These flags are not probabilities, country-of-origin confirmations, or claims that a vessel did not unload. They distinguish **missing proof** from **proof of absence**. They do not change published source numbers or SOI influence scores.

The authenticated workflow archives `gate-october-vessel-claim-evidence-gates.json` alongside the operator quality segmentation and ten existing diagnostics. Five offline tests cover estimated days, shared days, confirmed-but-not-certified days, missing observations and incomplete attribution data.

The previous post-#652 workflow [run 41433736692](https://github.com/epnews/epnews-website/actions/runs/41433736692) completed successfully and uploaded its research artifact.

**Remaining independent evidence:** vessel discharge/custody-transfer documentation, independently verified berth event records and source-level revisions resolving the October 1 double association.
