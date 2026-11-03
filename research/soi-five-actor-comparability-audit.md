# SOI five-actor comparability audit

Status: evidence inventory only; **no new influence scores or synthetic conversions**.

| Dimension | United States | China | Russia | EU | India | Comparability |
| --- | --- | --- | --- | --- | --- | --- |
| Economic | 2025 real GDP growth 2.2% | 5.0% | 1.0% | 1.5% | 7.6% | All five share `gdp-growth-2025`, period `2025 versus 2024`, and source ID `wb`. Direct differences in percentage points; not geopolitical benefits. |
| Strategic | 2025 real military-spending change −7.5% | +7.4% | +5.9% | EU defense expenditure +20% | +8.9% | Four countries share `sipri-real-change-2025`, `2024 → 2025`, and `sipri`; EU uses `defence-spending-change-pct` and must remain separate. |
| Energy & resources | LNG export share +5 percentage points | Crude imports −32% Q1–Q2 2026 | Estimated fossil export sales €625m/day | Russian gas import share −33 percentage points, 2021–2025 | Crude import dependence +0.5 percentage points | Five different concepts, units and time windows. **No cross-SOI numeric difference.** |

## Evidence gaps to research next

1. **Strategic:** Determine whether an appropriately defined EU-27 SIPRI aggregate is available with matching 2024 and 2025 coverage, real-price treatment, geographic scope, and no double-counting. Do not substitute a different EU institution's defense-spending percentage without reconciliation.
2. **Energy and resources:** Choose a shared observable construct, such as energy import dependence or energy net-trade exposure, with an authoritative consistent source and year for each SOI. Define treatment of the EU aggregate, re-exports, oil/gas/electricity, and energy-unit conversion before comparing.
3. **Economic:** Validate that World Bank 2025 GDP figures are final or provisional and that EU aggregate coverage matches the source definition. Preserve the original series, caveats and revisions.
4. **All dimensions:** Keep source ID, original units, geography, period, directionality, baseline and methodology attached to every comparison. Do not infer causal influence, national net benefit or a composite score from matched descriptive statistics.

## Release safeguards

- Preserve all current moving **dimension-specific** needles, selectors, evidence links, and expanded comparison panels.
- Do not enable an overall needle based solely on these observations.
- Existing `chaos-comparability.js` is intentionally limited to reviewed matched observations.
- Any newly approved metric requires a documented common source/definition and matching-period unit tests before activation.

Source of inventory: existing `chaos-meter-data.js` actor records on `main`; no new external measurements are asserted here.
