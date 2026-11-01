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

## Domestic benchmark price context

EIA reported a 2024 Henry Hub annual spot average of $2.21/MMBtu; FERC reported a 2025 annual average of $3.54/MMBtu from S&P Global/Platts. These are distinct underlying provider series; no single-series year-over-year percentage or exact price-difference estimate is published from these two figures. Benchmark prices are not retail bills, and neither price observation measures the causal contribution of incremental LNG exports. Weather, supply, storage, domestic demand and infrastructure constraints must be controlled before allocating costs to households or businesses. No export-attributable cost or net national benefit estimate has been approved; both remain null.


## U.S. LNG financial milestone: matched audited company accounts

The existing U.S. energy audit now includes Cheniere's matched calendar-year 2024 and 2025 accounts. These are one consolidated worldwide operator, not national export receipts or Europe-only contract returns. The figures come from the FY2025 Form 10-K (SEC accession 0000003570-26-000005), published February 26, 2026, with KPMG's audit report dated February 25. Its component tables and earnings release share a single reporting family; the audit does not turn them into multiple independent geopolitical outcomes.

The on-page table cites recognized LNG customer revenue excluding net derivative gains/losses, consolidated revenue, cost of sales, O&M, total operating costs, GAAP operating income, operating cash flow, net PP&E cash outflow, total debt, total interest incurred (including capitalized interest), cash interest net of capitalized amounts, and cash income taxes net of refunds. Each uses a 2024 baseline, 2025 outcome, original unit, source and limitation. Debt is a year-end stock; the other monetary records are annual flows. Expenses/outflows are positive magnitudes except net tax refunds, which are negative. Total operating costs already contain their displayed components.

The only derived measurement is the descriptive GAAP operating margin: income from operations divided by consolidated total revenue, multiplied by 100 and rounded to one decimal (39.0% in 2024 and 45.6% in 2025). It is not a realized cargo margin: fair-value derivative effects affect accounting results. Recognized revenue is not necessarily cash collected. No company accounting ratio is connected to the indicator needle or influence model. No realized Europe-only margin is invented.

Operating cash flow must not have its cash operating payments, relevant interest or taxes subtracted a second time. PP&E cash spending is investment, not another operating expense; the 2025 reported outflow is net of commissioning LNG sale proceeds. Debt balances, financing flows and public guarantees are distinct. Do not sum Cheniere Partners separately into its parent consolidation.

The tax note documents a December 2025 refund of previously paid corporate alternative minimum tax and deferred cash taxes from accelerated depreciation. A refund is not automatically an LNG-specific grant or permanent subsidy. The refund is already reflected in annual cash/tax accounts and is not added again. Complete project subsidies, lifetime capital recovery, national export receipts, Europe-specific realized margins, causal domestic consumer costs and foreign-policy concessions remain unresolved. Net national benefit, net taxpayer cost and influence scores stay null. This is evidence added under methodology 2.0, not a scoring-methodology change.


## DOE destination FOB export-price evidence (2024–2025)

This intermediate evidence addition leaves methodology 2.0, all actor records and the needle unchanged. Source: [DOE August 2026 report](https://www.energy.gov/sites/default/files/2026-10/Natural%20Gas%20Imports%20and%20Exports%20Monthly%20August%202026.pdf#page=38), published October 22, retrieved October 31, 2026; Table 15b, printed page 32 / PDF page 38. Transcribe the annual 2024 and 2025 vessel columns, not adjacent January–August columns. The 15 European destinations with numeric values in both years are included, with Türkiye following DOE’s classification. This is not an EU aggregate. ISO-container observations are excluded even when the country name matches.

All entries are FOB USD/MMBtu. The displayed change subtracts the rounded 2024 value from the rounded 2025 value, rounding to two decimals. No destination averages, volume multiplication, gross-value estimate, profit or national-benefit calculation is performed. Missing or withheld observations must remain null, never zero. A future incomplete pair cannot produce a change. Tests freeze the source-column transcription and arithmetic to catch column swaps or destination mismatches.

These are government-published reported price outcomes, not audited receipts. Country-level changes can reflect cargo, seller, timing and contract composition; they are not a constant-contract index or proof of bargaining power. DOE and EIA versions of the same reporting data must not be counted as independent outcomes. The energy unit MMBtu cannot be substituted for volumetric Bcf. The export-point price excludes subsequent ocean transport and regasification; its level cannot be interpreted as the final consumer price.

The continuing revenue investigation checked [Cheniere’s geographic attribution note](https://lngir.cheniere.com/sec-filings/all-sec-filings/xbrl_doc_only/4763): country revenue follows the contractual buyer’s principal business location, not delivery destination. Consequently, that revenue cannot be joined to DOE destination volumes to estimate cargo profit. Audited company operating costs, capital outlays and financing remain available in the preceding financial table, but destination allocation, asset-life capital recovery and public exposure need additional evidence.

An independently verifiable domestic component is now cited alongside the export prices: the [EIA annual Henry Hub spot series](https://www.eia.gov/dnav/ng/hist/rngwhhda.htm), release October 28, 2026, reports 2.19 for 2024 and 3.52 for 2025 in USD/MMBtu. This same-series follow-up supplements rather than overwrites the historical EIA/FERC context. Differences among providers, averaging conventions and release vintages remain explicitly unreconciled. It is not a household bill or export-attributable cost estimate. Realized receipts, realized cargo margins, net national benefit and geopolitical influence remain null. Further research must match contract cash flows and cost allocations, then identify a defensible domestic-price counterfactual; this milestone does not bypass those requirements.


## LNG capacity timing and causal-attribution checkpoint (October 31, 2026)

[EIA March 11, 2025](https://www.eia.gov/todayinenergy/detail.php?id=64704) records first Corpus Christi Stage 3 LNG production in December 2024 and first cargo in February 2025. [EIA September 15, 2026](https://www.eia.gov/todayinenergy/detail.php?id=68144) records the seventh and final train's custody/control milestone on August 28, 2026. Stage 3 adds 1.3 Bcf/day nominal (1.5 peak); the terminal reaches 3.1 nominal (3.9 peak). Capacity ratings are not delivered volume or realized receipts. Startup predates later 2026 disruptions, so these cannot be credited with initiating the project. Both EIA publications belong to one government reporting family, not independent geopolitical outcomes. Project capital, financing, cash receipts, domestic incidence and counterfactual remain unresolved; all scores stay null.


## Corpus Christi Stage 3 project capital checkpoint (October 31, 2026)

[Cheniere Corpus Christi Holdings FY2025 SEC Form 10-K](https://www.sec.gov/Archives/edgar/data/1693317/000169331726000003/cch-20251231.htm) reports Stage 3 construction costs paid of approximately $1.5 billion during 2024 and $1.3 billion during 2025. The Stage 3 EPC contract price including change orders was approximately $6.0 billion, with approximately $0.7 billion of remaining contractual obligations at December 31, 2025. The latter is a subset of contractual commitments, not an increment to add to $6.0 billion. These categories overlap; never sum annual construction cash spending, contract face value and outstanding commitments into a fictitious total. The separate Trains 8 & 9 EPC contract (~$2.9 billion) is excluded. Figures belong to one CCH reporting family, not independent geopolitical outcome evidence. The contract amount is not full lifetime capital invested or realized net economic benefit. No project ROI, net U.S. benefit or influence score is assigned. Financing, remaining costs, realized cash receipts, operating margins, public exposure and domestic price counterfactual remain unresolved.


## CCH consolidated cash flows and member financing (October 31, 2026)

[Cheniere Corpus Christi Holdings FY2025 SEC Form 10-K](https://www.sec.gov/Archives/edgar/data/1693317/000169331726000003/cch-20251231.htm), consolidated cash flow statement and financing activities: 2024→2025 operating cash flows $1,771m→$1,995m (+$224m), net investing cash outflows $1,830m→$2,306m (+$476m in outflow magnitude), distributions to member $400m→$515m, contributions from member $415m→$375m, and borrowing proceeds $0m→$550m. All figures are CCH-wide, not Stage 3 incremental amounts, Europe-only returns, or U.S. national economic benefits. Investing outflows include Stage 3 and separately approved Trains 8 & 9; financing flows are not operating profit. Cash distributions are intra-ownership transfers, not public receipts. Operating cash flow is already net of its cash components; never subtract those components twice. The filing attributes the $224m increase primarily to LNG-sales cash inflows, partly offset by working-capital timing; it does not identify a causal Stage 3-only increment. The source is one audited reporting family. Stage 3 return, public cost, national net benefit and influence score remain null.


## Consolidated three-component LNG audit (October 31, 2026)

**1. Revenue/receipts:** [CCH FY2025 Form 10-K](https://www.sec.gov/Archives/edgar/data/1693317/000169331726000003/cch-20251231.htm), consolidated statements of operations, reports third-party LNG revenue of $3,599m (2024) and $4,448m (2025), affiliate LNG revenue $1,281m/$2,053m, and total reported revenue $4,880m/$6,501m. These are accrual revenues, not collected cash or Stage 3 incremental margins. Affiliate revenue must not be double-counted as external national export sales. CCH attributes revenue growth primarily to Henry Hub-linked pricing and additional production.

**2. Financing and public exposure:** The same filing reports total interest cost $239m/$221m, capitalized interest $174m/$190m, and interest expense net of capitalization $65m/$31m in 2024/2025. Supplemental cash interest paid net of amounts capitalized was $140m/$23m. These measures overlap, and cash interest net of capitalization does not measure all borrowing costs. No comprehensive, attributable taxpayer support or guarantee figure was verified; public exposure remains unknown, not zero.

**3. Domestic incidence:** [DOE Energy, Economic, and Environmental Assessment of U.S. LNG Exports](https://www.energy.gov/sites/default/files/2025-10/ENERGY%2C%20ECONOMIC%2C%20AND%20ENVIRONMENTAL%20ASSESSMENT%20OF%20U.S.%20LNG%20EXPORTS_0.pdf) compares 2050 scenarios under Defined Policies/reference supply. Henry Hub rises from $3.53 to $4.62/MMBtu (2022 dollars), a modeled 31% increase, and residential gas prices are modeled 4% higher when exports expand above existing/FID levels. These are conditional 2050 projections, not measured 2025 or 2026 costs. No realized domestic consumer cost, national benefit or influence score is assigned. Do not sum corporate revenue, interest and modeled household impacts into an invented net value.


## Three audited accounting reconciliations (October 31, 2026)

The CCH FY2025 10-K figures already recorded above support three transparent, **descriptive** checks: (1) third-party + affiliate LNG revenue reconciles to total revenue: 2024 $3,599m + $1,281m = $4,880m, 2025 $4,448m + $2,053m = $6,501m; third-party revenue shares are approximately 73.8% and 68.4% respectively. (2) Total interest less capitalized interest reconciles to recognized interest expense: $239m − $174m = $65m (2024), $221m − $190m = $31m (2025). Cash interest is a separate measure. (3) Operating cash flow divided by magnitude of net investing cash outflow is 96.8% (1771/1830) in 2024 and 86.5% (1995/2306) in 2025; this is a coverage comparison only, **not free cash flow, return on investment or incremental Stage 3 profitability**. Cash outflows include other projects. All three checks share one audited reporting family and do not create independent outcome evidence. Neither net national benefit nor influence is scored.


## Eight-point evidence integrity batch (October 31, 2026)

This release adds eight individually labeled, source-backed **descriptive** checks using existing audited and government-published observations: (1) third-party LNG revenue share of total CCH revenue, (2) CCH recognized total revenue change, (3) CCH operating cash-flow change, (4) CCH investing cash outflow change, (5) interest expense after capitalization, (6) Stage 3 approximate annual construction cash spending, (7) DOE vessel FOB price for Belgium, and (8) EIA same-series Henry Hub spot price. Source definitions and accounting limitations are displayed per check. Revenue, cash flow, construction investment and spot/export prices are not additive and cannot be treated as realized Stage 3 return, national benefit or influence. The eight checks are **not** eight independent outcomes; several derive from the same audited CCH reporting family. The command-meter scoring gate and its needle remain unchanged. All unresolved return, public-exposure, export-attributable domestic cost, national benefit and influence fields remain null.


## Eight causal research gates (October 31, 2026)

The dashboard now makes eight **open questions**, not eight claimed verified outcomes, visible: (1) realized third-party export receipts, (2) project-specific incremental margin, (3) public subsidies and contingent taxpayer exposure, (4) export-attributable household gas costs, (5) manufacturing competitiveness effects, (6) European buyer dependence and delivered costs, (7) investment timing versus later disruption, and (8) non-duplicative net U.S. economic benefit. Each gate specifies what is established, what remains missing and what evidence could resolve it. Sources cited for each gate support only the stated baseline, not the missing outcome. Research gates remain OPEN and resolvedCount remains zero until specific findings pass independent verification. This is an evidence-gap and causation methodology milestone; **it does not represent eight completed empirical investigations**. The meter's score and national net benefit remain null.


## Eight LNG evidence-quality publication gates (October 31, 2026)

Eight mandatory checks for future conclusions: source independence; entity/project accounting boundaries; accrual versus cash; export price versus margin; credible no-disruption counterfactual; domestic household/manufacturing cost incidence; 2050 modeled scenario versus observed 2026 outcome; and nonduplicative national welfare accounting with uncertainty. The evidence panel labels each gate as a safeguard, with its risk, required evidence and baseline source. These are **zero new empirical findings** and do not close the eight open causal research questions. They prevent unsupported conclusions and leave national benefit and influence unscored.


## Eight measured LNG trade indicators, 2024–2025 (October 31, 2026)

Two [EIA](https://www.eia.gov/todayinenergy/detail.php?id=67864) [reports](https://www.eia.gov/todayinenergy/detail.php?id=67484), citing Natural Gas Monthly and GIIGNL, support eight **observed trade measures**: U.S. exports 11.9→15.1 Bcf/day; U.S. global LNG share 21→26%; U.S. shipments to Europe 6.3→10.3 Bcf/day; Europe's share of U.S. shipments 53→68%; U.S. shipments to Asia 4.0→2.5 Bcf/day; U.S. shipments to China 0.6→0 Bcf/day; U.S. shipments to Egypt 0.3→1.2 Bcf/day; and Europe-wide LNG imports from all suppliers grew 29% in 2025 (no comparable 2024 growth baseline provided). Europe includes Türkiye in EIA destination statistics. Percentages are rounded and must not be confused with volumes or European total energy dependence. These measures come from overlapping underlying data and do not constitute eight independent causal studies. They establish changes in trade flows, **not export receipts, profits, national net welfare or geopolitical influence**. The comparisons are pre-2026 and cannot be attributed to the 2026 Strait of Hormuz disruptions.


## Eight H1 2026 observed LNG market indicators (October 31, 2026)

[EIA, September 1, 2026](https://www.eia.gov/todayinenergy/detail.php?id=68064) reports first-half 2026 U.S. LNG exports of 17.4 Bcf/d (+23% versus first-half 2025), TTF benchmark $14.74/MMBtu versus $13.10 in first-half 2025, JKM $15.56/MMBtu (+$2.38), U.S. LNG to Europe +0.1 Bcf/d (+1%), to Asia +2.3 Bcf/d (+108%), to combined Latin America/Caribbean and Middle East/North Africa +0.8 Bcf/d (+46%), and destination volumes of 1.7 Bcf/d each for Egypt and the Netherlands. These are eight distinct observations from **one EIA article**, not eight independent sources. EIA describes the Hormuz disruption as contributing to Asia-bound redirection and global benchmark price increases, while explicitly attributing total export growth to new capacity. These observations are neither company cash receipts nor net national welfare, and do not isolate a causal dollar impact of the disruption. Prices are regional benchmark futures, not U.S. cargo FOB realized revenues. No influence score assigned.


## Eight trade/financial arithmetic cross-checks (October 31, 2026)

From previously published EIA 2024–2025 LNG flow figures and audited CCH accounts: national exports +3.2 Bcf/d (+26.9% rounded); Europe-bound exports +4.0 Bcf/d; Asia-bound exports −1.5 Bcf/d; CCH third-party recognized LNG revenue +$849m; affiliate recognized LNG revenue +$772m; consolidated operating cash flow +$224m; and magnitude of investing outflows +$476m. These are **eight arithmetic transformations of existing observations**, not eight new independent research studies. Regional trade and company accounts cover different populations; prices, volumes, accrual revenue and cash flow cannot be combined without matching shipment/contract ownership and cost data. No export-volume-times-FOB-price profit estimate, net national benefit or geopolitical influence score is inferred.


## Editorial Command Meter Readiness tracker (baseline after PR #192)

A separate readiness tracker displays an editorial **45% estimated readiness** baseline after PR #192. Technical interactions 90%; verified economic evidence 55%; costs versus benefits 35%; causation/counterfactuals 25%; defensible influence scoring 20%. These are subjective project-planning estimates, **not observed statistical probabilities, weighted influence scores or claims of completed research**. Do not automatically increment on merges. Report old percentage, new percentage and a concrete reason when a meaningful gap closes; otherwise retain the prior percentage. The readiness indicator is separate from the null geopolitical influence meter and does not activate the needle or establish national net benefit.


## Cheniere Q3 2026: eight newly reported company measures (October 31, 2026)

[Cheniere's October 28 Q3 earnings release](https://lngir.cheniere.com/news-events/press-releases/detail/349/cheniere-reports-third-quarter-2026-results-raises-full) reports Q3 2026 versus Q3 2025 recognized revenue $6,173m versus $4,441m, adjusted EBITDA $1,900m versus $1,608m, and LNG cargoes 188 versus 163. Nine months ended September 2026 versus 2025: recognized revenue $17,773m versus $14,526m, adjusted EBITDA $6,037m versus $4,896m, and LNG export volume 2,044 TBtu versus 1,745 TBtu. Q3 and nine-month 2026 distributable cash flow were $1,230m and $4,070m; these rows intentionally omit 2025 comparators. Adjusted EBITDA and distributable cash flow are company-defined non-GAAP measures, not net national benefits. All eight observations are from **one corporate issuer's release** and should not be presented as eight independent studies. The [October EIA STEO](https://www.eia.gov/outlooks/steo/marketreview/natgas.php) forecasts Henry Hub 2026 $3.48/MMBtu versus observed 2025 $3.53 and U.S. LNG exports 17.6 versus 15.1 Bcf/day; forecasts are not measured consumer bills. No causal portion of company financial results is attributed to the 2026 Hormuz disruption. The editorial readiness baseline remains 45% pending review of evidence quality and any justified adjustment after merge.


## PR #194 readiness update: 45% → 47% (October 31, 2026)

The editor's readiness estimate increases two percentage points after new Q3 2026 Cheniere company financial and cargo outcomes. The verified-economic-evidence component estimate increases from 55% to 60%; other components remain unchanged. These are editorial estimates, **not a weighted formula or objective readiness statistic**. The corporate report is one issuer source and does not independently establish a geopolitical causal effect, project-specific profit, household costs or net U.S. benefit. This readiness adjustment does not change any null influence score or needle position.


## SEC nine-month 2026 cash and cost milestone

[Cheniere SEC Q3 2026 Form 10-Q](https://www.sec.gov/Archives/edgar/data/3570/000000357026000038/lng-20260930.htm), nine months ended September 30 (USD millions, 2026 vs 2025): operating cash flow 5,124 vs 3,484; net investing cash used 2,685 vs 2,263; net financing cash used 1,967 vs 3,010; Corpus Christi Stage 3 project cash costs approximately 1,100 vs 1,100; Midscale Trains 8–9 project costs 709 vs 750; Gregory Power Plant project costs 245 vs 82; cash interest net of capitalized amounts 664 vs 640; cash income taxes paid net of refunds 36 vs 415. SEC reports 2025 tax paid included $380m corporate alternative minimum tax later refunded in December 2025. Critically, SEC attributes most operating cash increase to timing of working-capital settlements and only a lesser part to higher LNG receipts from price and volume. Consolidated cash flow is not national profit. Project cash costs are already represented within investing activity and cannot be added to it. The issuer's 2026 cash measures do not identify the disruption-attributable component. Keep readiness at 47% until merged and assessed; no influence score.


## PR #196 readiness update: 47% → 49%

After SEC-reported 2026 operating, investing, financing, capital-project, cash-interest and cash-tax measures were merged, the editorial readiness estimate increases by 2 percentage points to 49%. The subjective costs-versus-benefits component estimate rises from 35% to 40%; all other components remain unchanged. **This is not a computed weighted percentage or statistical probability.** The new measures strengthen observed issuer-level cash accounting, but do not prove that cash growth was caused by geopolitical disruption or that corporate cash generation is net U.S. economic benefit. Working-capital settlement timing remains a major explanation. National net benefit and geopolitical influence remain null. Next priority: compare actual domestic gas costs, producer cash outcomes and disruption-specific counterfactuals without double counting.


## Domestic electricity costs, Jan–Aug 2026 versus Jan–Aug 2025

[EIA Electric Power Monthly Table ES1.B](https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=table_es1b) reports U.S. retail average electricity prices (cents/kWh, 2025 → 2026): residential 17.03 → 18.19 (+6.8%), commercial 13.29 → 14.04 (+5.6%), industrial 8.50 → 9.09 (+6.9%), transportation 13.73 → 15.64 (+13.9%), all sectors 13.50 → 14.37 (+6.4%). Retail revenues (USD million, same periods): residential 179,270 → 192,801 (+7.5%), industrial 59,626 → 64,014 (+7.4%), all sectors 373,483 → 403,750 (+8.1%). These eight measures are from **one primary EIA table**, not independent studies. Residential and industrial revenue are already included in the all-sector total; never sum these rows. Utility revenue is not an incremental consumer welfare loss; electricity prices also reflect weather, generation fuel, regulation, transmission, distribution and load mix. These observations **do not prove LNG exports caused higher U.S. electricity prices**. Readiness remains 49% pending merge assessment; no national benefit or influence score.


## PR #198 readiness update: 49% → 51%

The editorial readiness estimate rises 2 percentage points after adding observed Jan–Aug 2026 vs 2025 EIA retail electricity price and revenue measures. The subjective costs-versus-benefits component rises 40% → 45%; all other components remain unchanged. These are planning judgments, not a weighted index or statistical probability. Retail prices are observed, but **LNG exports are not established as their cause**. The meter's influence score and net national benefit remain null. Next priority: domestic natural-gas prices, household and industrial cost exposure, and an actual disruption-specific counterfactual.


## August 2026 observed natural gas end-use prices

[EIA Natural Gas Monthly U.S. Natural Gas Prices, released October 30, 2026](https://www.eia.gov/dnav/ng/ng_pri_sum_dcu_nus_m.htm) reports August 2026 nominal USD/thousand cubic feet: citygate $5.03; residential $27.05; commercial $12.87; industrial $4.34; electric power $3.22; LNG export $7.92. EIA reports price survey coverage of 97.1% of residential deliveries and only 13.1% of industrial deliveries. These eight figures are from **one EIA monthly table** and the two coverage observations are not prices. The EIA LNG export price is not issuer net realized receipts or profit. Retail and wholesale sector prices differ in distribution, contract and service costs; do not subtract them to infer LNG margins. These are August-only levels; no year-on-year changes or export-caused household burden are claimed. National net benefit and influence remain unscored. Readiness remains 51% until the milestone is merged and assessed.


## Matched domestic gas price comparison: January and August 2025–2026

Four primary EIA history series, nominal dollars/thousand cubic feet, paired by calendar month. August 2025 → August 2026: residential 26.26 → 27.05; commercial 12.55 → 12.87; industrial 4.47 → 4.34; LNG export 7.51 → 7.92. January 2025 → January 2026: residential 12.44 → 13.96; commercial 9.88 → 11.26; industrial 6.03 → 7.20; LNG export 8.51 → 8.69. Sources: [residential](https://www.eia.gov/dnav/ng/hist/n3010us3m.htm), [commercial](https://www.eia.gov/dnav/ng/hist/n3020us3m.htm), [industrial](https://www.eia.gov/dnav/ng/hist/n3035us3m.htm), [LNG export](https://www.eia.gov/dnav/ng/hist/n9133us3m.htm), all released Oct 30 2026. Eight **comparisons**, not eight independent studies. Same-month pairing removes a crude seasonal mismatch, but weather, storage, pipeline constraints, preexisting capacity and contracts are still uncontrolled. EIA industrial coverage August 2026 13.1%; export price is not profit. Neither 2026 geopolitical causation nor national net benefit can be derived. Readiness remains 51% pending merge and review.


## PR #201 readiness update: 51% → 53%

The subjective editorial readiness estimate rises two points because four EIA gas price series now have January and August same-month 2025–2026 comparisons, improving the domestic cost side of the ledger. The costs-versus-benefits component increases 45% → 50%; other components are unchanged. The same-month pairing does not control weather, production, storage, utility tariffs, export contract structure or preexisting liquefaction capacity, and **does not prove LNG-caused price changes**. No national net economic benefit or geopolitical influence score is assigned. Next milestone: source-grounded causal identification and confounder testing, not more arithmetic repackaging.


## LNG price causality: observed buffers versus conditional counterfactuals

EIA [September 25, 2026](https://www.eia.gov/todayinenergy/detail.php?id=68204) finds summer Henry Hub spot prices averaged $2.93/MMBtu, **6% below** June–August 2025, even with exceptionally hot weather. EIA estimated dry gas production +2.7 Bcf/day (+2%) versus the prior summer, July Lower 48 temperature 77°F (record), and April start-of-injection storage 1,906 Bcf (4% above the five-year average). LNG terminal maintenance also moderated feedgas demand. EIA [October 2026 STEO](https://www.eia.gov/outlooks/steo/marketreview/natgas.php) **forecasts** 2026 dry production 112.20 vs 107.64 Bcf/day 2025, LNG exports 17.6 vs 15.1, and annual Henry Hub $3.48 vs $3.53/MMBtu; forecasts must not be presented as measured full-year 2026 results. DOE [LNG export assessment Appendix B, Table 6](https://www.energy.gov/sites/default/files/2026-02/Ex.%202%20%20LNGUpdate_AppendixB_Dec2024.pdf) estimates **conditional 2050** residential delivered price increases of $0.36/$0.50/$1.13 per MMBtu for high/reference/low U.S. gas supply assumptions under increased LNG export scenarios. These are **not** realized 2026 or Hormuz-specific effects. [NBER Stock/Zaragoza-Watkins](https://www.nber.org/papers/w32228) finds long-run recoupling to world gas markets; [RFF Prest](https://www.rff.org/publications/working-papers/where-does-the-marginal-methane-molecule-come-from-implications-of-lng-exports-for-us-natural-gas-supply-and-methane-emissions/) emphasizes supply elasticity. The sources can coexist: upward pressure *all else equal* need not imply rising observed prices when production, storage and maintenance change. The eight audit entries are mixed observations, EIA estimates/forecasts and DOE modeled scenarios, **not eight independent causal estimates**. No national net benefit or 2026 disruption-specific causal effect is identified; readiness stays 53% until post-merge assessment.


## August 2026 observed U.S. gas supply-demand balance

[EIA October Natural Gas Monthly, August 2026 highlights](https://www.eia.gov/naturalgas/monthly/) reports: dry gas production 108.65 → 115.84 Bcf/day (+6.6%); gross withdrawals 131.16 → 139.03 (+6.0%); consumption 85.39 → 90.65 (+6.2%); total imports 7.68 → 7.55 (−1.7%); total exports 24.58 → 27.13 (+10.4%). For August 2026 only: net exports 19.58 Bcf/day; LNG exports 16.61 Bcf/day (+14.2% reported year-on-year); LNG delivered to 34 countries. These are eight measures from **one EIA publication**, not eight independent causal studies. The EIA highlights do not give exact August 2025 net exports, LNG daily volume, or destination count, so those comparator fields are null. Do not add gross withdrawals to dry production, LNG exports to total exports, or net exports to total exports; these series overlap. Changes in production, consumption and exports coexist, but this is not a closed material-balance identity and does not establish that exports caused production growth or domestic price changes. Storage, balancing items, weather, export maintenance and precommitted liquefaction projects remain confounders. Editorial readiness remains 53% pending post-merge assessment; influence score and national net benefit remain null.


## Ten observed gas demand and destination measurements, August 2026

[EIA Natural Gas Monthly](https://www.eia.gov/naturalgas/monthly/): August 2025 → August 2026 domestic daily deliveries (Bcf/day): residential 3.35 → 3.32, commercial 4.87 → 4.84, industrial 22.35 → 22.65, electric power 45.68 → 50.19. [DOE August 2026 trade summary](https://www.energy.gov/hgeo/articles/us-natural-gas-supplying-energy-world-august-2026-summary): August 2026 LNG destinations (Bcf/month): Egypt 55.9, Netherlands 53.6, Italy 49.1, France 36.5, Germany 35.5; Mexico pipeline/truck gas exports 239.0 Bcf/month (not LNG). These are **ten distinct reported measurements from two federal publications**, not ten independent causal estimates. Daily and monthly units are intentionally kept distinct. No 2025 comparator is asserted for the five LNG destinations or Mexico monthly total. DOE and EIA destination counts and net-trade totals use different reporting conventions. End-use sector deliveries overlap total domestic consumption; do not add them to it. Physical destination is not a verified ultimate buyer, realized margin, or influence outcome. Causal effect on U.S. prices and national benefit remains unidentified. Readiness stays 53% pending review.


## Ten EIA gas storage and supply accounting observations

[EIA August 2026 monthly supply/disposition balance](https://www.eia.gov/dnav/ng/ng_sum_sndm_s1_m.htm) reports marketed production 3,950 Bcf/month, natural-gas-plant liquids gaseous equivalent 360 Bcf/month, supplemental gaseous fuels 9 Bcf/month, net storage withdrawals −123 Bcf/month (net injections), and statistical balancing item −59 Bcf/month. [EIA weekly underground storage](https://www.eia.gov/dnav/ng/ng_stor_wkly_s1_w.htm), week ending **October 2, 2026**, reports regional working gas stocks: East 862 Bcf, Midwest 1,010 Bcf, Mountain 253 Bcf, Pacific 299 Bcf, South Central 1,076 Bcf. These are ten distinct observed fields from two EIA datasets, **not ten independent causal studies**. Regional stocks are a dated historical snapshot, not current October 31 levels. Monthly flows and storage stocks are not interchangeable; marketed and dry production overlap, and balancing item is not an economic benefit. The five regions collectively cover Lower 48 stocks, but no extra total is presented as an independent measurement. This evidence documents possible storage/supply price buffers, not LNG-specific price causation. Readiness stays 53% until post-merge review; no national net benefit or geopolitical influence score is assigned.


## Ten Cheniere Q3 2026 financial cost and capital allocation observations

[Cheniere Q3 2026 earnings release](https://lngir.cheniere.com/news-events/press-releases/detail/349/cheniere-reports-third-quarter-2026-results-raises-full) reports (USD millions; 2025 → 2026): Q3 LNG revenue 4,302 → 6,099; nine-month LNG revenue 14,122 → 17,461; Q3 cost of sales 1,750 → 3,207; nine-month cost of sales 6,438 → 11,964; Q3 O&M expense 447 → 540; nine-month O&M 1,479 → 1,598; Q3 attributable net income 1,049 → 1,170; nine-month attributable net income 3,028 → 736. Also reported for Q3 2026: $731 million common share repurchases and ~$740 million growth capital investment. **Ten distinct financial disclosures from one issuer**, not ten independent causal estimates. Nine-month amounts contain the Q3 amounts, and revenue/cost/net income lines are linked accounting categories. Cost of sales excludes separately reported O&M and depreciation. No Q3 2025 capital-allocation comparators are asserted for the last two measures. Net income includes noncash fair-value effects and cannot stand in for cash margin or incremental U.S. welfare. The 2026 geopolitical disruption effect is not identified. Editorial readiness remains 53% until post-merge assessment; influence and national net benefit remain null.


## Ten Sabine Pass partnership cost and beneficiary measures

[Cheniere Energy Partners Q3 2026 GAAP statement](https://cqpir.cheniere.com/sec-filings/all-sec-filings/content/0001383650-26-000040/cqp20263rdqtrerex991.htm), nine months ended September 30, USD millions, 2025 → 2026: nonaffiliate LNG revenues 5,961 → 6,561; affiliate LNG revenues 1,738 → 2,044; nonaffiliate cost of sales 4,177 → 4,757; affiliate cost of sales 0 → 46 (2025 dash); O&M 683 → 692; affiliate O&M 126 → 136; depreciation/amortization 515 → 522; net interest expense 567 → 546; operating income 2,237 → 2,516; net income 1,700 → 1,986. **Critical consolidation guard:** Cheniere Energy, Inc. consolidates Cheniere Energy Partners; partnership revenues, expenses, income and assets are **not independent additional national or parent-level totals**. Affiliate transactions may be eliminated. Operating and net income reflect the preceding categories, not additive gains. These ten distinct reported line items are from a single issuer statement, not ten independent causal estimates. No causal conflict-related uplift or net national benefit is established. Editorial readiness remains 53% pending review.


## Ten Sabine Pass cash flow observations (2026 vs 2025)

[SEC Cheniere Energy Partners September 2026 Form 10-Q](https://www.sec.gov/Archives/edgar/data/1383650/000138365026000038/cqp-20260930.htm), nine months ended September 30, USD millions, 2025 → 2026: operating cash 1,881 → 2,550; cash PP&E spending −176 → −526; investing cash −180 → −531; debt proceeds 1,262 → 1,903; debt repayments −1,617 → −1,967; distributions −1,539 → −1,521; financing cash −1,916 → −1,616; net cash change −215 → +403; derivative cash settlements +6 → −22; cash interest paid 575 → 527. Negative signs represent cash outflows. **These are overlapping cash-flow components and aggregates, not ten independent welfare or causal estimates.** PP&E is included in investing cash; debt and distributions are included in financing cash; the three cash flow categories roll into net cash change. Cash interest paid is generally included in operating cash under U.S. GAAP. Parent Cheniere consolidates the partnership: never add subsidiary and parent cash flows. Increased operating cash partly reflects LNG price and working-capital timing, not an identified conflict effect. Recipient residence, taxes, wages, external costs and counterfactual remain unresolved. Readiness stays 53%; national net benefit and geopolitical influence remain unscored.


## Ten DOE cross-border natural-gas trade price comparisons

[DOE Natural Gas Imports and Exports Monthly, August 2026, Table 19a](https://www.energy.gov/sites/default/files/2026-10/Natural%20Gas%20Imports%20and%20Exports%20Monthly%20August%202026.pdf) reports prices in **USD/MMBtu**, including transportation to the U.S. border. Jan–Aug 2025 → Jan–Aug 2026: Mexico pipeline exports 2.95 → 2.15; Mexico pipeline imports 2.13 → 8.76; Canada pipeline exports 3.63 → 3.82; Canada truck exports 6.21 → 8.59; Canada pipeline imports 2.80 → 2.96; Canada truck imports 4.49 → 6.19. Separately, **annual 2024 → annual 2025**: Mexico pipeline exports 1.81 → 2.75; Canada pipeline exports 2.23 → 3.60; Canada truck exports 6.03 → 6.25; Canada pipeline imports 1.96 → 2.79. The ten observations comprise **six year-to-date and four prior-year annual comparisons** and include repeated flow categories in different periods. They are not ten independent causal studies. Truck trade includes CNG and LNG; these border prices are **not LNG FOB export prices**, company cash receipts, corporate margins or domestic consumer prices. Mexico import price is potentially volatile due to small volumes. No export price times volume calculation or net welfare score is attempted. Command Meter readiness stays 53% pending assessment.


## Ten Gulf-region electricity retail prices: consumer-side burden

[EIA Electric Power Monthly Table 5.6.A](https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a), August 2025 → August 2026, **US cents/kWh**: Texas residential 15.40 → 15.91, commercial 8.76 → 8.96, industrial 6.42 → 7.21, all sectors 10.42 → 11.23; Louisiana residential 12.55 → 12.87, commercial 10.90 → 11.09, industrial 6.29 → 6.10; Oklahoma residential 14.42 → 14.82, commercial 10.00 → 10.90, industrial 6.64 → 8.16. These are ten distinct state-sector price comparisons from one federal dataset, **not ten independent causal studies**. The Texas all-sector aggregate overlaps its sector prices; do not add these prices or use the aggregate as an additional cost. Average price is sector electricity sales revenue divided by kilowatthours, not a household tariff or monthly bill. 2025 data final, 2026 preliminary; nominal dollars. Weather, demand, generation mix, utility rates, transmission, fuel prices and policies are confounders. The observed changes do not identify the effect of LNG exports or the Middle East conflict on bills. Editorial readiness remains 53%; no national net benefit or geopolitical influence score.


## Fifteen Southern-state electricity prices (August 2025 versus August 2026)

[EIA Electric Power Monthly Table 5.6.A](https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a), August 2025 → August 2026, US cents/kWh: Arkansas residential 13.33 → 14.37, commercial 10.75 → 11.73, industrial 7.32 → 7.85; Mississippi residential 13.61 → 14.43, commercial 12.88 → 13.45, industrial 7.38 → 7.57; Alabama residential 16.26 → 16.33, commercial 14.53 → 14.98, industrial 7.76 → 8.11; Tennessee residential 13.09 → 13.42, commercial 12.86 → 13.13, industrial 6.85 → 6.92; Kentucky residential 13.10 → 13.80, commercial 11.81 → 12.09, industrial 7.01 → 7.37. Fifteen **new distinct state-sector pairs** extend the previous Texas/Louisiana/Oklahoma coverage. All fifteen originate from one EIA source and are not independent causal studies. Sector average is revenue divided by kWh sold, not a customer's actual bill; 2026 preliminary, nominal cents. Price shifts can reflect fuel, generation, regulation, weather and demand. Do not infer an LNG export or conflict effect, multiply by unrelated volumes or add state-sector rates together. Readiness stays 53%; national net benefit and geopolitical influence remain null.


## Reusable evidence table registry (PR #214)

`chaos-meter-data.js` now contains `evidenceTableRegistry`, a declarative list of existing audit keys, stable DOM IDs and column definitions. `chaos-dashboard.js` renders registered evidence tables with one shared loop instead of bespoke JavaScript for each dataset. The first migration covers the existing 15 Southern-state and 10 Gulf-state electricity observations; **no figures or source claims are changed**. Future batches may register a verified dataset without adding another custom rendering block. Each registry entry must point to an existing `evidenceAudits.us['Energy and resources']` record with an `items` array, valid source ID, defined column keys, methodology and causal limitations. Regression tests verify references and required fields. Do not register unverified measurements or remove legacy bespoke panels until parity is tested. Preserve the moving needle, selectors, comparison tools, readiness estimate and null geopolitical scores. This infrastructure migration does **not** increase readiness (53%).


## Shared renderer expansion: 38 existing records

Four further existing source-backed datasets now use the common registry renderer: ten U.S.–Canada/Mexico border gas price comparisons, ten Sabine Pass partnership cash-flow observations, ten partnership income/cost observations, and eight nationwide retail electricity indicators. The former bespoke renderer blocks were removed to avoid duplicate tables. These **38 records are not new research measurements**; this is an infrastructure migration that reduces repetitive code for future evidence batches. Their original source, accounting caveats and causal limits remain attached to each dataset. No change to 53% readiness or the null national-benefit/influence scores. Future new evidence still requires independent source checking, not merely passing static regression tests.


## Shared evidence renderer batch #216

Three further existing datasets (30 records) migrate to the shared registry: Cheniere Q3 capital and costs, gas storage/supply accounting, and August gas demand/destination observations. These are existing records, not new findings. The renderer now retains each record's explanatory notes and aggregates record-level sources as well as dataset-level sources. Readiness remains 53%; influence and national net benefit remain unscored.


## Shared renderer batch #217

Four existing source-backed datasets (32 records) migrate to the shared evidence registry: August gas supply/demand, domestic gas prices, SEC cash and costs, and first-half market observations. This is not new research and does not change 53% readiness or assign national benefit/influence scores. Original evidence remains in the source dataset; legacy rendering blocks are replaced by the shared table. Regression tests assert registry membership and removal of the old renderers.


## Shared renderer hardening #218

The shared renderer now retains per-item note, caution, caveat, limit and meaning fields where supplied, and recognizes both individual source IDs and arrays of source IDs. Regression checks reject duplicate dataset registrations and column keys. This is infrastructure quality work only: no new observations, no changes to source measurements, no readiness increase and no influence score.


## Shared renderer batch #219

Four additional existing eight-record datasets (32 observations) migrate to the common registry: Q3 company outcomes, trade financial cross-checks, observed LNG trade indicators and the eight-point LNG evidence audit. No new source claims or readiness increase. The shared renderer retains caveats and links sources, but this migration does not itself establish national net benefit or geopolitical influence. Baseline and outcome fields are displayed without implying causal attribution.


## New issuer evidence batch #220

Five additional September 30, 2026 Cheniere issuer observations: consolidated cash $1,663 million; restricted cash $393 million; available credit commitments $6,023 million; $569 million of consolidated cash held by Cheniere Partners; and 48.6% limited-partner ownership. Cheniere owns the general-partner interest. Subsidiary cash is included in consolidated cash, and credit capacity is not cash. Source: https://lngir.cheniere.com/news-events/press-releases/detail/349/cheniere-reports-third-quarter-2026-results-raises-full . These are financial-boundary measures, not export profit or national net benefit. No readiness or influence score change.


## Earnings reconciliation #221

Cheniere issuer-reported nine-month 2026 consolidated revenues ($17,773 million versus $14,526 million), GAAP attributable income ($736 million versus $3,028 million), and rounded non-GAAP adjusted attributable income (approximately $2,390 million versus $1,880 million). The adjusted figures are approximate and not GAAP cash receipts. Derivative fair-value changes materially complicate GAAP year-over-year interpretation. Source: https://lngir.cheniere.com/news-events/press-releases/detail/349/cheniere-reports-third-quarter-2026-results-raises-full . Do not add overlapping earnings measures or infer national net benefit. No readiness score change.


## Cash-flow arithmetic bridge #222

Using Cheniere SEC nine-month 2026 and 2025 cash flow totals: 2026 operating $5,124m minus investing $2,685m = $2,439m; minus financing $1,967m = $472m. 2025 operating $3,484m minus investing $2,263m = $1,221m; minus financing $3,010m = -$1,789m. Difference in three-activity net movement is $2,261m. These are derived arithmetic, not new independently measured observations, realized destination-specific margins, free cash flow, or national welfare. Working-capital timing and financing activity prevent causal interpretation. Source: https://www.sec.gov/Archives/edgar/data/3570/000000357026000038/lng-20260930.htm . Readiness unchanged.


## Verified cash-flow drivers #223

SEC Form 10-Q, consolidated statement of cash flows for the nine months ended September 30, 2026 and 2025: derivative settlement cash flow -$659m versus +$286m; trade and other receivables adjustment -$50m versus -$587m; inventory adjustment -$219m versus +$42m; accounts payable/accrued liabilities adjustment +$279m versus -$672m. All are components already embedded in operating cash flow, not separate export earnings. Management states working-capital timing primarily explains the operating cash increase, while additional LNG receipts contributed to a lesser extent. Do not infer geopolitical causation, realized destination-specific profits or national net benefit. Source: https://www.sec.gov/Archives/edgar/data/3570/000000357026000038/lng-20260930.htm . No readiness change.


## Targeted causal gate #224: precommitted capacity and modeled trade-offs

IEA Q4 2025 FID timeline dates Corpus Christi Stage 3 final investment decision to 2022 (https://iea.blob.core.windows.net/assets/db3d568d-b985-4cc2-bb1a-119517f118ac/Gas2025.pdf). EIA reports first-half 2026 LNG exports averaging 17.4 Bcf/day, up 23% from first-half 2025, and identifies new capacity as the principal driver (https://www.eia.gov/Todayinenergy/detail.php?id=68064). These establish preexisting investment and observed export trends, NOT a numerical estimate of what geopolitical disruption caused. DOE's December 2024 LNG export study models cumulative $410 billion additional U.S. GDP in 2020–2050 and 4% higher residential gas prices in 2050 for reference-supply model-resolved versus existing/FID export scenarios (https://www.energy.gov/sites/default/files/2024-12/LNGUpdate_SummaryReport_Dec2024_12pm.pdf). These conditional modeled gains and costs do not measure 2026 outcomes and cannot be netted as dollars. National net benefit and geopolitical influence scores remain null. No automatic readiness increase.


## Foreign dependence gate #225: observed EU LNG shares, volumes and values

Eurostat Q1 2026: United States 57.4% of EU LNG imports (https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/46126.pdf?v=9990183307277013). Eurostat Q2 2026: U.S. share 63.2%, Russia 17.3%; EU total LNG import volume -5.6% and value +4.1% against the 2025 monthly average (https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260922-2). ACER separately estimates the 2025 U.S. share at about 58% (https://www.acer.europa.eu/monitoring/MMR/LNG_market_developments_2026); methodological differences prohibit direct splicing. Q1-to-Q2 U.S. share change = +5.8 percentage points, not +5.8% of physical U.S. shipments. Concentration is not proven coercive influence, geopolitical causation, company profit or national net benefit. No readiness or influence score assigned.


## EU trade agreement implementation gate #226

U.S.–EU August 2025 framework includes an **expected** $750bn U.S. energy offtake through 2028 covering LNG, oil and nuclear; not signed invoices, government purchases, or verified deliveries (https://www.commerce.gov/news/press-releases/2025/08/joint-statement-united-states-european-union-framework-agreement). European Commission clarifies actual energy purchases are private commercial decisions (https://energy.ec.europa.eu/topics/international-cooperation/key-partner-countries-and-regions/united-states-america_en). Council approved EU tariff-related commitments June 25 2026 (https://www.consilium.europa.eu/en/press/press-releases/2026/06/25/eu-us-trade-council-gives-final-approval-for-the-tariff-commitments-under-joint-statement/). EU eliminated tariffs on U.S. industrial imports effective July 1 2026 under reciprocal trade framework (https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/united-states_en). Policy implementation is verified; LNG dependence as its cause is NOT identified. Preserve null influence and national benefit scores; no readiness change.


## Domestic consumer-cost attribution gate #227

EIA October Natural Gas Monthly, August 2026 observed: dry production 115.84 Bcf/day (+6.6% y/y); domestic consumption 90.65 Bcf/day (+6.2%); LNG exports 16.61 Bcf/day (+14.2%); power-sector gas deliveries +9.9%, industrial +1.3%; total net gas exports 19.58 Bcf/day (includes pipeline and LNG). Source: https://www.eia.gov/naturalgas/monthly/ . These flow observations have different bases and are NOT a causal decomposition or estimate of household bills, producer profits or U.S. national net benefit. In particular, simultaneous production growth and changing power demand confound naive LNG export-price attribution. No score or readiness change.


## Command meter completion sprint #228: separate delivery from evidence sufficiency

The command meter has two explicitly distinct states: **technical implementation readiness** (currently an editorial estimate of 90%) and **overall investigation readiness** (53%, editorial estimate). Neither is an economic impact or geopolitical influence score. A publishable functional meter can show unresolved conclusions as **NOT SCORED** or **NOT ESTABLISHED**.

Four research gates are now visible in the dashboard: causal attribution; non-duplicative U.S. costs and benefits; EU dependence versus demonstrated concessions; and defensible influence scoring. Each requirement is classified as **Verified**, **Partially verified**, or **Insufficient evidence**. The pure `chaos-completion-model.js` computes gate status deterministically: all verified => Verified; any supported requirement but not all => Partially verified; no supported requirement => Insufficient evidence. Requirements cite existing source identifiers; each gate displays the next needed evidence and an explicit caveat. Status classification is not a numerical influence assessment and must never fill a null score.

**Definition of technical done:** all existing selectors, moving needle, comparisons, evidence tables, expansion behavior and mobile rendering work; the site has no JavaScript or syntax errors; tests exercise score-withholding, registry integrity, completion classifications and script load order; CI passes and live deployment interactions are manually confirmed. This PR implements classification, dashboard and tests; it **does not claim** the remaining browser/device checks are complete or upgrade technical readiness to 100%.

**Research backlog, in priority order:** (1) export-driven U.S. residential/industrial price counterfactual; (2) reconciled incremental LNG project and taxpayer costs; (3) matched destination-specific realized receipts and delivery volumes; (4) shock-attributable capacity utilization; (5) independently identified LNG-linked foreign concessions. Each investigation should update a gate only if it closes a material requirement; no PR-per-observation workflow. Do not double-count corporate flows, assume announced offtake is revenue, or calculate net national benefit without comparable costs.


## Weather and storage confounder in domestic gas-price attribution (#231)

EIA October 2026 STEO (https://www.eia.gov/outlooks/steo/report/natgas.php) reports observed January 2026 Henry Hub $7.72/MMBtu during winter storm Fern and describes heating-demand and gas-supply disruptions. Its forecast 2027 annual average $3.16/MMBtu is $0.32 (9%) below the 2026 forecast, while February–December averages are forecast to be $3.09/MMBtu in both years. This matching-month contrast isolates a calendar-month comparison, **not** the marginal causal effect of LNG exports; it is not a weather-normalized econometric estimate. EIA also notes inventory buffers and production growth. These facts disqualify attribution of annual-price movements to export growth without controlling for weather, storage, production and domestic demand. The 2026 annual $3.48 is arithmetic from the EIA stated 2027 average and difference; rounding applies. No national cost, net benefit or influence score is assigned.


## DOE prospective household cost counterfactual (#232)

DOE 2024 LNG Export Study, Appendix B, Figure 22 (https://www.energy.gov/sites/default/files/2024-12/LNGUpdate_AppendixB_Dec2024.pdf), estimates **2050 annual natural-gas expenditures per natural-gas-using household** relative to matching Existing/FID Exports scenarios. Under Defined Policies standard supply, the lowest income group's census-division range is $5–$34 and the highest income group's $6–$47. Under Defined Policies Low US Supply, the ranges are $15–$75 and $20–$90 respectively. These are spatial and income-group ranges, not a national mean or confidence interval. Study monetary basis is 2022 dollars; no extrapolation to 2026. The scenario delta is modeled and prospective, not an observed consumer bill change or a 2026 geopolitical-shock attribution. Electricity expenditures and household incomes are not included in these natural-gas-only figures. The 2026 observed causal-cost gate stays open; no national net-benefit score.


## Matched DOE macroeconomic and household cost scenario (#233)

DOE Appendix B (https://www.energy.gov/sites/default/files/2024-12/LNGUpdate_AppendixB_Dec2024.pdf), executive summary B-3: Under Defined Policies with reference U.S. supply, Model Resolved versus Existing/FID LNG exports yields modeled GDP +0.2% / +$80 billion in 2050 and +$410 billion cumulative 2020–2050 (2022 dollars, 3% discount). These are alternative presentations of related modeled GDP effects and must NOT be added. Domestic energy-related CO2 rises 23 million metric tons in 2050, not monetized here. Under the same scenario the **maximum regional/income-group average** annual natural gas spending increase is $46.52 among gas-using households, electricity $118.37 among all households, and combined $122.54 among all households. Maxima arise in different subgroups and **must not be summed**. GDP is not national net welfare or corporate profit. This is a modeled future export scenario, not observed 2026 economic gains or geopolitical disruption causation. No influence or net benefit score.


## Actual exports versus extraction employment (#234)

EIA Natural Gas Monthly (https://www.eia.gov/naturalgas/monthly/) reports August 2026 LNG exports 16.61 Bcf/day to 34 countries, +14.2% versus August 2025. BLS Oil and Gas Extraction (NAICS 211, https://www.bls.gov/iag/tgs/iag211.htm) reports seasonally adjusted June 115.1k, July 114.6k, August preliminary 114.7k, September preliminary 114.1k extraction jobs. June-to-September change -1.0k jobs (derived). These are **different time comparisons and scopes**: NAICS 211 includes oil extraction and excludes LNG terminals, shipping, construction and many suppliers. The data demonstrate that a higher August LNG export rate cannot alone establish net LNG-driven employment gains. They do **not** establish that LNG exports caused job losses. The proper causal employment estimate remains null pending LNG-specific matched jobs, displacement and precommitted capacity baseline. Do not turn either number into a geopolitical influence score.


## EU energy supplier-share indicator (#238)

European Commission DG Energy (https://energy.ec.europa.eu/topics/energy-security/security-gas-supply_en) reports Russia supplied 45% of EU gas imports in 2021 and 12% in 2025; the observed change is -33 percentage points (not -33%). Both are annual supplier shares with the same denominator (all EU gas imports). This measures diversification away from a supplier, NOT reduced overall import dependence, net savings, energy security or diplomatic influence. EU gas demand reductions and replacement supplies also contributed. EU and India diplomatic dials remain pending until numeric outcomes from implemented agreements are verified. India oil import reliance requires fiscal-year aligned primary PPAC confirmation before a new needle is activated.


## India crude oil import dependence (PPAC, #239)

Primary source: [India Petroleum Planning & Analysis Cell, FY 2025–26 Ready Reckoner](https://ppac.gov.in/download.php?file=whatsnew/1784899305_The_PPAC_Ready_Reckoner_FY_2025%E2%80%9326_Final.pdf), Oil section, 'Import dependency (based on consumption)' row. Fiscal-year annual series: 2024–25 88.2%, 2025–26 88.7% (provisional), a +0.5 percentage-point change, not +0.5% relative growth. The same definition and source apply to both periods. Earlier secondary references to 88.3% in 2024–25 were not supported by the final PPAC table and are superseded. This is a crude-oil consumption import-reliance statistic, not evidence of diplomatic influence or net economic gain. Reference scale ±5 percentage points is display-only and not a policy target or influence score. India's Diplomatic and EU Diplomatic dials remain pending independently measurable outcomes.


## EU diplomatic observed post-FTA bilateral trade (#240)

[European Commission / New Zealand first Trade Committee joint statement (25 October 2025)](https://policy.trade.ec.europa.eu/news/joint-press-statement-following-first-trade-committee-under-eu-new-zealand-fta-2025-10-25_en) reports Stats NZ goods-and-services bilateral trade of NZ$19.913 billion in the year ending June 2024 and NZ$21.582 billion in the year ending June 2025, reported as an 8% increase. Both are matched 12-month windows in NZD nominal value; the May 2024 FTA start means the baseline includes two post-entry months and the later period covers the first year. The +8% observed trade change is NOT an estimate of treaty-attributable effects, diplomatic leverage, geopolitical influence, real volume growth or net benefit. Price, exchange-rate and underlying demand effects are not isolated. Indicator reference range ±25% is purely visual. India's Diplomatic dial remains pending independently verified realized TEPA trade, investment or employment outcomes; the US$100B / one million jobs are future targets.


## Three diplomatic implementation indicators (#241)

China: [China MFA December 2023 trilateral committee](https://www.mfa.gov.cn/eng/wjb/zygy/hd/202406/t20240603_11375395.html) confirms Saudi and Iranian embassies in Tehran and Riyadh reopened after the 2023 China-hosted talks; count=2 embassies. Iraq and Oman previously facilitated dialogue. This is a historical institutional outcome, not 2026 influence growth or durable peace.

Russia: [Yonhap reporting KCNA's exchange of ratification instruments](https://en.yna.co.kr/view/AEN20241205000900315) verifies one Russia–DPRK comprehensive strategic partnership treaty entered into force on 4 December 2024; count=1 treaty. Legal status is not proof of influence, effectiveness, or net benefit.

India: [Indian Ministry of Commerce, October 2026](https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2320142) confirms TEPA in force and 92.2% of EFTA tariff lines covered by market-access commitments, which represent 99.6% of India's exports. 92.2% is covered tariff lines, not duty-free utilization or delivered trade/investment/jobs; some reductions are phased.

All three are explicitly **implementation or coverage indicators** with independent units and display ranges. They must never be compared as influence scores or summed. All `score` fields remain null. No readiness percentage increase: the costs, counterfactual, realized benefits and influence gaps remain unresolved.


## China crude import matched-quarter correction (#243)

[U.S. EIA July 31, 2026](https://www.eia.gov/todayinenergy/detail.php?id=67905) reports China GACC monthly crude imports averaged **8.1 million b/d in Q2 2026**, **32% below Q1 2026**, equivalent to approximately **3.9 million b/d lower imports**. The indicator now plots −32% quarter-over-quarter, with reference range ±50% for visualization only. This replaces the former misleading annual-2025-to-Q2-2026 −3.5 million b/d context gap. This is **not Q2 2025 vs Q2 2026** and cannot isolate seasonal effects. EIA estimates Q2 refinery runs fell 2.2 million b/d while imports fell 3.9 million b/d, implying inventory drawdowns; imports are not consumption. No geopolitical influence or net benefit is inferred. Further matched-year-quarter comparisons and costs remain research priorities.


## Russia energy revenue upgrade (#244)

[CREA September 2026 monthly analysis](https://energyandcleanair.org/september-2026-monthly-analysis-of-russian-fossil-fuel-exports-and-sanctions/) estimates Russia's worldwide fossil fuel export revenues at **€625 million/day** in September 2026; its [August 2026 analysis](https://energyandcleanair.org/august-2026-monthly-analysis-of-russian-fossil-fuel-exports-and-sanctions/) estimates **€604 million/day** in August. These are modeled gross export-sales estimates, **not audited receipts, cash collections, net profits, fiscal revenue or national economic benefit**. Export volumes fell 6% in September even while modeled revenue remained broadly unchanged; prices and destination mix matter. The needle displays September daily estimated gross export sales with a ±€1,000m/day reference range, not influence. Do not annualize into profits. Historical EU gas-volume declines remain a separate contextual fact. Further gates: realized receipts, contractual pricing, freight/insurance, production costs, sanctions discounts, taxes, and counterfactual prices.
