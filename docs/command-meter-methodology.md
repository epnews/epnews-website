# Geopolitical command meter — methodology 2.0

Evidence reviewed 31 October 2026. Scope: U.S., China, Russia, EU and India. The evidence grid contains four records per actor. Coverage is not score readiness; observations have different dates and are a selected evidence set, not a complete census of national power. Historical events are explicitly dated and must not be reclassified as 2026 gains. No automatic research or refresh service is implied.

## Evidence and scoring

Each record identifies its metric, original unit, observation period, source date, stage, interpretation, payer/cost exposure and missing evidence. Observed statistics can be revised. Participant statements establish what governments report, not independent verification of claimed success. SIPRI spending is an estimate/input. EDA EU-27 aggregates are not NATO, all Europe or an EU institutional budget. GDP is domestic output; UN majority voting similarity has been removed as a stand-in for diplomatic influence. The prior gas-index calculation used a more precise Russian baseline than the Council prose supports; the active record now says “over 150 bcm” without a derived score.

The primary gauge is reserved for reviewed geopolitical influence change (−100 to +100). Until the composite qualifies, its needle is hidden and it explicitly reads NOT SCORED. Evidence coverage (0–4 cited categories) is reported separately in text and the evidence chips. Selecting a dimension exposes the corresponding scoring-readiness status; original-unit indicator direction never moves the influence needle. The separate scoring model accepts only reviewed influence assessments and remains inactive for all published records. Missing records and rejected assessments return null, not zero. Zero is reserved for an eligible measured assessment of no net change.

A future dimension assessment requires: fixed dated/geographical baseline; at least two measured outcomes from independent evidence groups; moderate/high confidence; cost accounting; counterfactual; explicit editorial review; documented materiality target fixed before assessing results. The reviewed net change must already incorporate beneficiary/payer accounting in a common unit. A normalization rationale must explain why the unit and target represent changed influence rather than resources spent. A source mirror or two parties repeating one statistic do not establish independent outcome evidence.

Conditional normalization: score = clamp(100 × reviewed net change / predefined materiality target, −100, +100). This is an editorial convention, not a validated scientific scale. **No materiality targets or reviewed national net-change estimates have been calibrated or approved in this release, so all influence scores remain withheld.** The code is a fail-closed calculation contract, not proof that a supplied assessment is factually valid. A future scoring release must publish the worksheet, target rationale, underlying sources, costs and reviewer record alongside the UI before activating any score.

Composite is calculated only if all dimensions pass: economic 30%, strategic 30%, diplomatic 20%, energy/resources 20%. Missing dimensions never cause weight redistribution. Sensitivity checks include equal weights and economic/strategic shifts to 40/20 and 20/40, with diplomacy/energy held at 20%. Publish the range and explain any sign/zone changes before releasing a score. Zone thresholds: strong loss ≤−60; mild loss >−60 to ≤−20; no material change >−20 to <20; mild gain ≥20 to <60; strong gain ≥60. The labels describe the index, not moral merit.

## Comparisons and double counting

Arithmetic comparisons require matching metric identifiers and periods; GDP and SIPRI changes are shown as percentage-point differences only. They do not establish a winner, causation or a comparison of total power. EDA/SIPRI series are not ranked together. Legal events and mismatched energy measures are compared as text. India’s national-account reporting period may differ from calendar-year economies; consult WDI metadata before drawing cycle or causal conclusions.

EU and Russian gas records describe opposite sides of one flow; they are not independent outcomes. Treaty events cannot also be scored as strategic gains without distinct delivered evidence. Earlier Chancay/access case research is preserved in a collapsed archive; it is not audited anew by this update or counted as extra score evidence.

## Remaining research gates

All actors: harmonized outcome baselines, independently measured durable leverage, realized costs/distribution, alternative explanations, normalization targets and editorial worksheet. Russia: ratification record alone does not independently establish treaty implementation. India: energy snapshot lacks a verified newer matched series. Diplomacy: ratification/entry into force must be distinguished from actual economic and security returns. The regional tracker remains a list of research questions outside the five-actor scoring grid.

## Validation

`node scripts/test_chaos_meter.cjs` checks source completeness, null scores, rejection of partial/proxy assessments, independent sources, true zero, bounds, composites, sensitivity and HTML integration. Also run the existing article registry and publishing gate. Browser QA checks selectors, cards, comparisons, archive and accessible pending state. Live deployment must contain the matching data/model/dashboard and pass the same interaction checks.
