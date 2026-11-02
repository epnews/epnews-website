# Gate LNG: a confirmed inventory day is not enough to confirm a daily stock change

The previous source-quality audit classified each October Gaspeil `measuredGasDay` against the same day's authenticated GIE operator status **C**, **E** or missing. This is necessary but not sufficient to determine whether a **daily inventory delta** is based on two confirmed observations.

A stock delta is `inventory[day] - inventory[day - 1]`. Therefore **both** the current gas day and its preceding gas day must have a **C** operator status and a numeric stock observation. A vessel associated with a C day immediately after an E day cannot inherit a confirmed C/C stock delta. This is a reporting-quality boundary, not a vessel unloading determination.

Known October 2026 Gate reporting quality: **E on October 1 and October 23**, with other October operator days C. Therefore, subject to authenticated source refresh:
- October 1 assignments are **not C/C eligible** because the current observation is E.
- October 2 associations are **not C/C eligible** because the preceding October 1 observation is E, despite October 2 being C.
- October 23 associations are **not C/C eligible** because the current observation is E.
- October 24 associations are **not C/C eligible** because the preceding October 23 observation is E, despite October 24 being C.
- September 30 is included as a baseline and must independently be C with a valid stock to support any October 1 delta; this does not override October 1 E status.

The new per-vessel audit joins each inventory-attributed Gaspeil record to **two** authenticated GIE daily observations. It records eligibility, both statuses and explicit reasons for withholding. Five offline tests cover C/C acceptance, C-after-E exclusion, missing prior day, missing stock and estimated-only arrival exclusion.

The authenticated workflow archives `gate-october-attribution-stock-delta-eligibility.json`, and the dedicated PR regression workflow tests the new rules **before merge**.

**Limit:** Even C/C eligibility confirms only the quality of a terminal-level inventory *difference*. It does not independently certify any vessel's cargo, discharge, origin, sale price or geopolitical influence.

The previous post-#655 authenticated workflow [run 41435806784](https://github.com/epnews/epnews-website/actions/runs/41435806784) succeeded and uploaded artifact **13136635859**.
