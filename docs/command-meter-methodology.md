# Geopolitical command meter — methodology 2.0

Evidence reviewed 31 October 2026. Scope: U.S., China, Russia, EU and India. The evidence grid contains four records per actor. Coverage is not score readiness; observations have different dates and are a selected evidence set, not a complete census of national power. Historical events are explicitly dated and must not be reclassified as 2026 gains. No automatic research or refresh service is implied.

## Evidence and scoring

Each record identifies its metric, original unit, observation period, source date, stage, interpretation, payer/cost exposure and missing evidence. Observed statistics can be revised. Participant statements establish what governments report, not independent verification of claimed success. SIPRI spending is an estimate/input. EDA EU-27 aggregates are not NATO, all Europe or an EU institutional budget. GDP is domestic output; UN majority voting similarity has been removed as a stand-in for diplomatic influence. The prior gas-index calculation used a more precise Russian baseline than the Council prose supports; the active record now says “over 150 bcm” without a derived score.

The gauge has two explicitly distinct modes. For a selected dimension with an approved influence assessment, it displays the reviewed geopolitical influence change (−100 to +100). For a selected dimension with a supported numeric source observation but no influence assessment, it displays **OBSERVED INDICATOR · NOT INFLUENCE** and moves the needle on a fixed ±10 observation reference window, retaining the original units and number. The observation window is only a visual convention, not a normalized influence score; out-of-window values are visually capped. Overall influence remains NOT SCORED until all four dimensions qualify. Missing data are null, never zero-filled. The separate scoring model remains inactive for all published records.

A future dimension assessment requires: fixed dated/geographical baseline; at least two measured outcomes from independent evidence groups; moderate/high confidence; cost accounting; counterfactual; explicit editorial review; documented materiality target fixed before assessing results. The reviewed net change must already incorporate beneficiary/payer accounting in a common unit. A normalization rationale must explain why the unit and target represent changed influence rather than resources spent. A source mirror or two parties repeating one statistic do not establish independent outcome evidence.

Conditional normalization: score = clamp(100 × reviewed net change / predefined materiality target, −100, +100). This is an editorial convention, not a validated scientific scale. **No materiality targets or reviewed national net-change estimates have been calibrated or approved in this release, so all influence scores remain withheld.** The code is a fail-closed calculation contract, not proof that a supplied assessment is factually valid. A future scoring release must publish the worksheet, target rationale, underlying sources, costs and reviewer record alongside the UI before activating any score.

Composite is calculated only if all dimensions pass: economic 30%, strategic 30%, diplomatic 20%, energy/resources 20%. Missing dimensions never cause weight redistribution. Sensitivity checks include equal weights and economic/strategic shifts to 40/20 and 20/40, with diplomacy/energy held at 20%. Publish the range and explain any sign/zone changes before releasing a score. Zone thresholds: strong loss ≤−60; mild loss >−60 to ≤−20; no material change >−20 to <20; mild gain ≥20 to <60; strong gain ≥60. The labels describe the index, not moral merit.

## Comparisons and double counting

Arithmetic comparisons require matching metric identifiers and periods; GDP and SIPRI changes are shown as percentage-point differences only. They do not establish a winner, causation or a comparison of total power. EDA/SIPRI series are not ranked together. Legal events and mismatched energy measures are compared as text. India’s national-account reporting period may differ from calendar-year economies; consult WDI metadata before drawing cycle or causal conclusions.

EU and Russian gas records describe opposite sides of one flow; they are not independent outcomes. Treaty events cannot also be scored as strategic gains without distinct delivered evidence. Earlier Chancay/access case research is preserved in a collapsed archive; it is not audited anew by this update or counted as extra score evidence.

## Country energy research worksheets

All five actors now have visible source-linked energy research worksheets. These are investigation leads, not independently approved outcome assessments or scored national leverage. U.S. LNG share and EU/Russian gas-flow changes must not be counted as independent geopolitical gains without separate delivered, net-of-cost influence outcomes. China and India worksheets explicitly distinguish import exposure from bargaining power. Every worksheet states its baseline limitations, needed independent outcomes, costs, counterfactual and calibration work. All energy influence scores remain withheld.

## Economic and strategic research coverage

All five actors now have economic and strategic candidate worksheets in addition to energy. Economic inputs include WDI output observations; strategic inputs include SIPRI estimates, except the EU worksheet uses EDA's EU-27 spending aggregate. These are **input or output proxies**, not measured external leverage. Every worksheet explicitly withholds a score and names the independent delivered outcomes, net costs, alternative explanations and fixed normalization still needed. GDP growth cannot be scored as a gain in international command, and military spending cannot be scored as improved military effectiveness. EU defence spending must not be equated to NATO or an EU standing army.

## Diplomatic research coverage

All five actors now have diplomatic worksheets, completing the initial 20 actor/dimension research slots. U.S. NATO enlargement, China-backed Saudi–Iran talks, Russia–North Korea treaty ratification, EU–New Zealand FTA implementation and India–EFTA TEPA implementation are dated institutional events, not interchangeable or independently proven net diplomatic influence gains. Official participant accounts must be distinguished from independent delivered outcomes. Treaty forecasts, pledged investment and aspirational jobs are not realized benefits. All five diplomatic scores and all national composite scores remain withheld.

## Remaining research gates

All actors: harmonized outcome baselines, independently measured durable leverage, realized costs/distribution, alternative explanations, normalization targets and editorial worksheet. Russia: ratification record alone does not independently establish treaty implementation. India: energy snapshot lacks a verified newer matched series. Diplomacy: ratification/entry into force must be distinguished from actual economic and security returns. The regional tracker remains a list of research questions outside the five-actor scoring grid.

## Validation

`node scripts/test_chaos_meter.cjs` checks source completeness, null scores, rejection of partial/proxy assessments, independent sources, true zero, bounds, composites, sensitivity and HTML integration. Also run the existing article registry and publishing gate. Browser QA checks selectors, cards, comparisons, archive and accessible pending state. Live deployment must contain the matching data/model/dashboard and pass the same interaction checks.

## Observed indicator needle mode

For a selected country and dimension with a source-backed numeric GDP-growth, real military-spending-change or LNG-export-share-change observation, the gauge displays the observed value and moves the needle. This is an exploratory **indicator mode**, not a scored geopolitical influence assessment. The indicator's original unit is shown, and the fixed −10 to +10 observation reference window maps to the visual −90° to +90° sweep; out-of-window values cap the needle position but retain the exact number in text. This visual window is not a statistical normalization or a cross-metric ranking. Treaty events and records without supported numeric values remain NOT SCORED, and the overall geopolitical influence needle stays withheld until the four reviewed dimensions qualify. No missing numeric data are inferred or zero-filled.

## First case audit: U.S. LNG market share

The U.S. energy evidence audit records EIA's 2024 global LNG export share of 21% and 2025 share of 26%, a descriptive +5 percentage-point change. Both observations trace to the same EIA source, so they **do not** satisfy the two-independent-outcome scoring requirement. This market share shift predates any later 2026 disruption narrative and cannot be assigned to those events. Neither the direction of market share nor the observation needle is an influence assessment. The on-page audit lists missing matched delivered contracts, net revenue and domestic costs, counterfactual expansion, independently measured foreign-policy bargaining outcomes and ex-ante calibration. The audited influence score remains null.

## U.S. LNG destination deliveries: measured follow-up

EIA's Natural Gas Monthly destination analysis reports Europe-bound U.S. LNG exports rising from 6.3 Bcf/d in 2024 to 10.3 Bcf/d in 2025 (+4.0 Bcf/d), while Asia-bound deliveries declined from 4.0 to 2.5 Bcf/d. FERC's 2025 State of the Markets corroborates the broad shift, but uses EIA underlying export series and slightly different regional aggregation/rounding. Therefore, these reports are not independent evidence groups for the influence-scoring gate. Europe includes non-EU destinations. These are annual averages, not contracts or net revenues. The delivery shift adds a measured market outcome to the 2024–2025 export-share observation, but foreign-policy concessions, net-of-cost gains and the counterfactual remain unverified. Influence score stays null.

## LNG benefit/cost incidence ledger

The U.S. LNG case now publishes a qualitative ledger of possible beneficiaries (export sellers, European buyers, U.S. workers and local tax bases) and possible payers (domestic consumers, developers and taxpayers, European importers, and affected communities). Every entry is explicitly unverified pending a dated, attributable measurement. Gross export sales cannot be substituted for net U.S. welfare, incremental profit or foreign leverage; spot-price multiplication is not a reliable accounting method for contracted deliveries. Net benefits require matched volumes, realized prices and costs, domestic pass-through, project capital and financing, public support, and a counterfactual accounting for preexisting capacity and international market conditions. Specific foreign-policy concessions must be verified independently before any leverage inference. Both net dollar benefit and influence score remain null.
