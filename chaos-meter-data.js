/* Reviewed evidence records. Null scores are intentional, never zero-filled. */
window.EP_CHAOS_DATA = {
  "reviewed": "2026-10-31",
  "methodologyVersion": "2.0",
  "dimensions": [
    "Economic",
    "Strategic",
    "Diplomatic",
    "Energy and resources"
  ],
  "weights": {
    "Economic": 0.3,
    "Strategic": 0.3,
    "Diplomatic": 0.2,
    "Energy and resources": 0.2
  },
  "evidenceAudits": {
    "us": {
      "Energy and resources": {
            "caseId": "us-lng-share-2024-2025",
            "actor": "us",
            "dimension": "Energy and resources",
            "status": "One observed market-share change; geopolitical influence not established",
            "observations": [
                  {
                        "period": "2024",
                        "measure": "Share of global LNG exports",
                        "value": 21,
                        "unit": "percent",
                        "source": "lng"
                  },
                  {
                        "period": "2025",
                        "measure": "Share of global LNG exports",
                        "value": 26,
                        "unit": "percent",
                        "source": "lng"
                  }
            ],
            "derived": {
                  "value": 5,
                  "unit": "percentage points",
                  "formula": "26 − 21",
                  "note": "Descriptive change only; not a causal effect, revenue gain, or influence score."
            },
            "evidenceIndependence": "Both observations come from the same EIA article; they are one source family, not two independent outcome validations.",
            "chronology": "The observed 2024–2025 shift predates any later 2026 conflict narrative. Do not attribute this increase to 2026 disruptions.",
            "unresolved": [
                  "Independently validated country-by-country delivered LNG volumes and contract prices for matched periods.",
                  "Europe-specific realized receipts and margins, industry-wide capital recovery, public support and causal domestic consumer costs; audited Cheniere accounts provide only partial company evidence.",
                  "Documented foreign policy concessions or bargaining changes plausibly attributable to incremental U.S. LNG supply.",
                  "Predeclared influence unit, baseline, materiality threshold and independent editorial approval."
            ],
            "financialEvidence": {
              "caseId": "cheniere-financials-2024-2025",
              "title": "LNG financial evidence · Cheniere 2024–2025",
              "status": "Audited company outcomes; Europe-only realized margin and net U.S. benefit not established",
              "scope": "Cheniere Energy, Inc. and consolidated subsidiaries, worldwide operations. Calendar-year 2024 baseline versus calendar-year 2025; not the whole U.S. LNG industry or Europe-only deliveries. Later interim filings are not substituted for this matched annual comparison.",
              "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
              "independence": "KPMG audited the financial statements. The filing, its XBRL tables and the earnings release share one company reporting family; they are not separate independent geopolitical outcomes.",
              "assuranceSource": "cheniere2025Audit",
              "observations": [
                {
                  "id": "lngCustomerRevenue",
                  "label": "LNG customer revenue, excluding net derivative gains/losses",
                  "baselineYear": 2024,
                  "baseline": 14972,
                  "outcomeYear": 2025,
                  "outcome": 19091,
                  "unit": "USD millions",
                  "basis": "Annual flow",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025Revenue",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Recognized contract revenue; not cash collections or Europe-only export receipts."
                },
                {
                  "id": "totalRevenue",
                  "label": "Consolidated total revenue",
                  "baselineYear": 2024,
                  "baseline": 15703,
                  "outcomeYear": 2025,
                  "outcome": 19976,
                  "unit": "USD millions",
                  "basis": "Annual flow",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025Operations",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Includes LNG, regasification, other revenue and derivative effects."
                },
                {
                  "id": "costOfSales",
                  "label": "Cost of sales",
                  "baselineYear": 2024,
                  "baseline": 6021,
                  "outcomeYear": 2025,
                  "outcome": 7150,
                  "unit": "USD millions",
                  "basis": "Annual flow",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025Operations",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Excludes separately reported O&M and depreciation; includes derivative valuation effects."
                },
                {
                  "id": "operationsMaintenance",
                  "label": "Operating and maintenance expense",
                  "baselineYear": 2024,
                  "baseline": 1857,
                  "outcomeYear": 2025,
                  "outcome": 1966,
                  "unit": "USD millions",
                  "basis": "Annual flow",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025Operations",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Reported expense, not a cash-only Europe cost allocation."
                },
                {
                  "id": "totalOperatingCosts",
                  "label": "Total operating costs and expenses",
                  "baselineYear": 2024,
                  "baseline": 9575,
                  "outcomeYear": 2025,
                  "outcome": 10864,
                  "unit": "USD millions",
                  "basis": "Annual flow",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025Operations",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Includes cost of sales, O&M, SG&A, depreciation and other costs; do not sum again with its components."
                },
                {
                  "id": "operatingIncome",
                  "label": "GAAP income from operations",
                  "baselineYear": 2024,
                  "baseline": 6128,
                  "outcomeYear": 2025,
                  "outcome": 9112,
                  "unit": "USD millions",
                  "basis": "Annual flow",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025Operations",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Includes noncash derivative effects; not realized cargo margin."
                },
                {
                  "id": "operatingCashFlow",
                  "label": "Net cash provided by operating activities",
                  "baselineYear": 2024,
                  "baseline": 5394,
                  "outcomeYear": 2025,
                  "outcome": 5539,
                  "unit": "USD millions",
                  "basis": "Annual flow",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025CashFlow",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Company-wide cash flow after working-capital effects; not national value added."
                },
                {
                  "id": "ppeCashOutflow",
                  "label": "PP&E cash outflow, net of commissioning sales",
                  "baselineYear": 2024,
                  "baseline": 2238,
                  "outcomeYear": 2025,
                  "outcome": 3078,
                  "unit": "USD millions",
                  "basis": "Annual flow",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025CashFlow",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Positive amounts show cash spent; 2025 is net of $174M commissioning-sale proceeds, versus zero in 2024. Not total lifetime project cost."
                },
                {
                  "id": "totalDebt",
                  "label": "Total debt before unamortized discount/issuance costs",
                  "baselineYear": 2024,
                  "baseline": 23097,
                  "outcomeYear": 2025,
                  "outcome": 22995,
                  "unit": "USD millions",
                  "basis": "Stock at 31 December",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025Debt",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Year-end stock; includes multiple corporate/project capital structures, not public debt."
                },
                {
                  "id": "totalInterestCost",
                  "label": "Total interest cost incurred",
                  "baselineYear": 2024,
                  "baseline": 1226,
                  "outcomeYear": 2025,
                  "outcome": 1197,
                  "unit": "USD millions",
                  "basis": "Annual accrual cost",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025Debt",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Includes capitalized interest of $216M in 2024 and $249M in 2025. Accrual cost is not an additional cash payment or another deduction from operating cash flow."
                },
                {
                  "id": "interestPaid",
                  "label": "Cash interest paid, net of capitalized amounts",
                  "baselineYear": 2024,
                  "baseline": 1075,
                  "outcomeYear": 2025,
                  "outcome": 844,
                  "unit": "USD millions",
                  "basis": "Annual flow",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025CashSupplement",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Excludes capitalized interest; not total financing cost or an additional deduction from operating cash flow."
                },
                {
                  "id": "incomeTaxesPaid",
                  "label": "Cash income taxes paid, net of refunds",
                  "baselineYear": 2024,
                  "baseline": -92,
                  "outcomeYear": 2025,
                  "outcome": 32,
                  "unit": "USD millions",
                  "basis": "Annual flow",
                  "stage": "Independently measured outcome",
                  "source": "cheniere2025Taxes",
                  "sourceFamily": "Cheniere FY2025 Form 10-K, SEC accession 0000003570-26-000005",
                  "limitation": "Negative 2024 means net refund. Worldwide income taxes, not all taxes, public costs or a subsidy estimate."
                }
              ],
              "derived": [
                {
                  "id": "gaapOperatingMargin",
                  "label": "Derived GAAP operating margin",
                  "baselineYear": 2024,
                  "outcomeYear": 2025,
                  "baseline": 39.0,
                  "outcome": 45.6,
                  "unit": "percent",
                  "stage": "Independently measured outcome",
                  "formula": "100 × consolidated income from operations ÷ consolidated total revenue; rounded to one decimal",
                  "inputIds": [
                    "operatingIncome",
                    "totalRevenue"
                  ],
                  "source": "cheniere2025Operations",
                  "limitation": "Descriptive accounting ratio; includes noncash effects, is not a realized LNG margin, and cannot move the needle or unlock a score."
                }
              ],
              "marginCaution": "Revenue is recognized under accounting rules, not necessarily cash collected. Cost of sales includes approximately $3.5B of pre-delivery derivative fair-value gains in 2025 versus $1.4B in 2024. The GAAP operating margin shown here is not a realized LNG cargo netback. The company reports lower total margins per MMBtu despite higher delivered volumes; its adjusted EBITDA is non-GAAP and is not used as cash profit.",
              "marginSources": [
                "cheniere2025Results"
              ],
              "taxContext": "The tax note records a $380M refund of previously paid corporate alternative minimum tax received in December 2025. It also reports deferred cash tax obligations from accelerated depreciation on qualifying Corpus Christi Stage 3 assets. This is documented tax treatment, not a measured LNG-specific grant, lifetime subsidy or net taxpayer cost. The refund is already reflected in annual cash/tax accounts; do not add it again as a separate cash benefit.",
              "taxSources": [
                "cheniere2025Taxes"
              ],
              "accountingRules": "Operating cash flow already reflects operating payments and relevant cash interest/taxes; do not subtract those again. PP&E cash outflow is capital investment, not another operating expense. Debt balance is a stock, borrowing/repayment are financing flows, and neither is a taxpayer guarantee. Never add Cheniere Partners accounts to this parent consolidation without eliminating overlap.",
              "remaining": "National export receipts, Europe-specific realized sales and margins by contract, capital recovery over asset lives, quantified public support across projects, causal domestic price costs and independently verified foreign-policy concessions.",
              "realizedEuropeMarginUsd": null,
              "netNationalBenefitUsd": null,
              "taxpayerNetCostUsd": null,
              "influenceScore": null
            },
            "domesticPriceEvidence": {"status":"Observed domestic benchmark price context; causal export cost not established","observations":[{"year":2024,"hub":"Henry Hub","valueUsdPerMMBtu":2.21,"source":"eiaHenry2024","method":"EIA published annual spot average"},{"year":2025,"hub":"Henry Hub","valueUsdPerMMBtu":3.54,"source":"fercGas2025","method":"FERC reported annual spot average using S&P Global Platts data"}],"sourceComparability":"These values come from different price data providers and averaging conventions; do not present their arithmetic difference as a verified homogeneous series without reconciliation.","causality":"Gas benchmark prices respond to weather, production, storage, pipeline constraints, industrial and power demand, and LNG exports. Observed price movement alone does not quantify costs attributable to incremental LNG exports.","costEstimateUsd":null,"consumerIncidenceEstimateUsd":null,"verificationNeeded":"Obtain same-series 2024–2025 Henry Hub observations, regional retail/electricity price pass-through, and an export/no-export counterfactual before estimating attributable household costs."},
            "costIncidenceLedger": {
                  "status": "Cost-incidence accounting incomplete; no net national benefit estimated",
                  "scope": "Incremental U.S. LNG deliveries to Europe, 2024–2025; avoid treating gross export receipts as net U.S. gains",
                  "beneficiaries": [
                        {
                              "party": "U.S. LNG sellers and associated service firms",
                              "measure": "Realized export sales margin after feedgas, liquefaction, shipping and financing",
                              "state": "Partially documented — company accounts only",
                              "sourceGap": "Cheniere annual accounts documented in financial evidence; matched Europe contract prices and cash margins remain unverified"
                        },
                        {
                              "party": "European buyers and consumers",
                              "measure": "Supply reliability, gas prices, avoided curtailment and distributional effects",
                              "state": "Unverified",
                              "sourceGap": "Observed wholesale and retail prices versus a credible no-incremental-supply counterfactual"
                        },
                        {
                              "party": "U.S. workers and local tax bases",
                              "measure": "Incremental employment, wages and public revenues net of displacement",
                              "state": "Unverified",
                              "sourceGap": "Facility-specific jobs and receipts, distinguishing existing from new capacity"
                        }
                  ],
                  "payers": [
                        {
                              "party": "U.S. gas and electricity customers",
                              "measure": "Domestic price impacts attributable to incremental exports",
                              "state": "Unverified",
                              "sourceGap": "Regional price pass-through and modeled no-export counterfactual"
                        },
                        {
                              "party": "U.S. developers, lenders and taxpayers",
                              "measure": "Terminal capital, operating costs, debt service and any public subsidies",
                              "state": "Partially documented — company accounts only",
                              "sourceGap": "Cheniere capital outflow, debt, cash interest and tax treatment documented in financial evidence; complete project capital recovery, subsidies and public exposure remain unverified"
                        },
                        {
                              "party": "European importers and households",
                              "measure": "Delivered LNG premiums, infrastructure, regasification and distribution costs",
                              "state": "Unverified",
                              "sourceGap": "Landed prices, regasification fees, public support and consumer incidence"
                        },
                        {
                              "party": "Communities and environment",
                              "measure": "Local infrastructure and emissions externalities",
                              "state": "Unverified",
                              "sourceGap": "Measured local impacts and defensible cost valuation"
                        }
                  ],
                  "accountingRule": "Net gain cannot be computed by multiplying volume by a spot price. Separate contracted and spot volumes, value added versus transfers, domestic price effects, and capital already sunk before the study period.",
                  "counterfactual": "Compare with pre-2024 capacity plans, demand and weather, Russian pipeline supply losses, Asian prices, and other LNG suppliers. Do not assign all destination shifts to 2026 conflicts.",
                  "foreignPolicyTest": "Identify specific, dated and independently verified foreign-government concessions plausibly linked to U.S. LNG deliveries; increased purchases alone do not qualify.",
                  "netBenefitUsd": null,
                  "netInfluenceScore": null
            },
            "deliveryEvidence": {"region":"Europe, including non-EU destinations","period":"2024–2025 annual average","baselineBcfPerDay":6.3,"outcomeBcfPerDay":10.3,"changeBcfPerDay":4,"sourceIds":["lngDest","fercLNG"],"independenceCaution":"FERC corroborates the destination shift but cites EIA underlying export statistics, so this is not two independent underlying outcome datasets.","interpretation":"Europe-bound deliveries rose while Asia-bound deliveries declined from 4.0 to 2.5 Bcf/d. This is a measured destination shift, not proof of political leverage.","remaining":"Independent foreign-policy outcomes, net revenue and domestic costs, plus an ex-ante counterfactual are still required."},
            "score": null
      }
    }
  },
  "researchWorksheets": {
    "china": {
      "Diplomatic": {
            "status": "Implemented or announced diplomacy — no influence score",
            "candidateBaseline": "China's foreign ministry describes the March 2023 Saudi–Iran agreement and subsequent implementation review.",
            "candidateOutcome": "The reported rapprochement is a diplomatic event; durable Chinese leverage remains unmeasured.",
            "sources": [
                  "chinaDeal",
                  "chinaDipl"
            ],
            "interpretation": "Official participant statements are not independent proof of Chinese control over subsequent Saudi or Iranian decisions.",
            "additionalOutcomesNeeded": "Independent implementation evidence, sustained third-party cooperation and specific policy concessions attributable to Chinese mediation.",
            "costAccountingNeeded": "Mediation resources, commercial exposure, reputational costs and commitments to both parties.",
            "counterfactualNeeded": "Regional de-escalation incentives, Iraqi/Omani mediation and bilateral decisions predating the Beijing announcement.",
            "calibrationNeeded": "Predefine independently measurable diplomatic bargaining outcomes, attribution rules and a fixed materiality threshold before assigning any influence score.",
            "editorialReview": "Pending; no score authorized"
      },
      "Economic": {
            "status": "Candidate evidence — no influence score",
            "candidateBaseline": "2025 real GDP growth is reported in the World Bank WDI series.",
            "candidateOutcome": "No independently reviewed net geopolitical influence outcome established from this input.",
            "sources": [
                  "wb"
            ],
            "interpretation": "Output growth does not directly measure foreign leverage.",
            "additionalOutcomesNeeded": "Realized trade share, independently documented port throughput, investment receipts and counterparty bargaining outcomes.",
            "costAccountingNeeded": "Debt and subsidy burdens, partner liabilities and external financing costs.",
            "counterfactualNeeded": "Preexisting industrial capacity, cyclical demand and trade diversion.",
            "calibrationNeeded": "Predefine the unit, historical baseline, net-change method and materiality target before scoring; do not combine incompatible proxy units.",
            "editorialReview": "Pending; no score authorized"
      },
      "Strategic": {
            "status": "Candidate evidence — no influence score",
            "candidateBaseline": "SIPRI publishes estimated Chinese military spending changes for 2025.",
            "candidateOutcome": "No independently reviewed net geopolitical influence outcome established from this input.",
            "sources": [
                  "sipri"
            ],
            "interpretation": "Spending estimates do not establish usable overseas reach.",
            "additionalOutcomesNeeded": "Verified access agreements, deployed assets, sustained operations and independent readiness outcomes.",
            "costAccountingNeeded": "Acquisition, maintenance, regional security response and economic opportunity costs.",
            "counterfactualNeeded": "Modernization already underway and neighboring states' deterrence investments.",
            "calibrationNeeded": "Predefine the unit, historical baseline, net-change method and materiality target before scoring; do not combine incompatible proxy units.",
            "editorialReview": "Pending; no score authorized"
      },
      "Energy and resources": {
        "status": "Import exposure research — no influence score",
        "candidateBaseline": "Chinese crude-oil import sourcing before the latest reported EIA observation; comparable source-by-source baseline not yet established.",
        "candidateOutcome": "EIA's 2026 report describes Chinese crude import patterns; import sourcing is an exposure measure, not an influence outcome.",
        "sources": ["chinaoil"],
        "interpretation": "Supplier concentration and maritime vulnerability can affect leverage, but import volume alone cannot establish dependence or coercion.",
        "additionalOutcomesNeeded": "Matched supplier shares, actual discounted prices, storage buffers, alternative route capacity and independently verified contract outcomes.",
        "costAccountingNeeded": "Import premiums and discounts, refining and storage costs, infrastructure spending and consumer or industrial price incidence.",
        "counterfactualNeeded": "Demand cycles, refinery capacity, strategic-stockpiling decisions and preexisting supplier diversification.",
        "calibrationNeeded": "Specify ex-ante comparable net energy bargaining-power units and a fixed materiality target.",
        "editorialReview": "Pending; no score authorized"
      }
    },
    "eu": {
      "Diplomatic": {
            "status": "Implemented or announced diplomacy — no influence score",
            "candidateBaseline": "The EU–New Zealand free trade agreement entered into force on 1 May 2024.",
            "candidateOutcome": "Legal implementation establishes market access, not realized net diplomatic leverage.",
            "sources": [
                  "eunz",
                  "eunzimpact"
            ],
            "interpretation": "Trade-growth forecasts are projections, not independently measured outcomes or political influence.",
            "additionalOutcomesNeeded": "Observed matched bilateral trade and investment changes, verified policy concessions and durable standards adoption.",
            "costAccountingNeeded": "Sectoral adjustment, compliance, consumer and producer distributional costs.",
            "counterfactualNeeded": "Preexisting trade growth, global prices, supply-chain shifts and New Zealand's independent trade policy.",
            "calibrationNeeded": "Predefine independently measurable diplomatic bargaining outcomes, attribution rules and a fixed materiality threshold before assigning any influence score.",
            "editorialReview": "Pending; no score authorized"
      },
      "Economic": {
            "status": "Candidate evidence — no influence score",
            "candidateBaseline": "World Bank WDI reports EU aggregate economic growth; member-country coverage and observation periods require care.",
            "candidateOutcome": "No independently reviewed net geopolitical influence outcome established from this input.",
            "sources": [
                  "wb"
            ],
            "interpretation": "EU economic output cannot be conflated with European geopolitical influence.",
            "additionalOutcomesNeeded": "Verified cross-border investment, implemented trade gains, market access and partner policy changes.",
            "costAccountingNeeded": "Adjustment costs, subsidies, energy premiums and uneven member-state incidence.",
            "counterfactualNeeded": "Business cycles, preexisting trade integration and national rather than EU-level policies.",
            "calibrationNeeded": "Predefine the unit, historical baseline, net-change method and materiality target before scoring; do not combine incompatible proxy units.",
            "editorialReview": "Pending; no score authorized"
      },
      "Strategic": {
            "status": "Candidate evidence — no influence score",
            "candidateBaseline": "EDA reported EU-27 defence spending of €418B in 2025; 2026 figures are projections.",
            "candidateOutcome": "No independently reviewed net geopolitical influence outcome established from this input.",
            "sources": [
                  "eda"
            ],
            "interpretation": "Member-state budgets are not an EU standing force or independently verified readiness.",
            "additionalOutcomesNeeded": "Delivered joint procurement, operational deployments, interoperability and security outcomes.",
            "costAccountingNeeded": "National budget incidence, procurement duplication, sustainment and displacement of social spending.",
            "counterfactualNeeded": "NATO and U.S. contributions, previously planned spending and national initiatives.",
            "calibrationNeeded": "Predefine the unit, historical baseline, net-change method and materiality target before scoring; do not combine incompatible proxy units.",
            "editorialReview": "Pending; no score authorized"
      },
      "Energy and resources": {
        "status": "Gas diversification research — no influence score",
        "candidateBaseline": "EU Russian-gas exposure before 2022; Council source reports more than 150 bcm supplied in 2021.",
        "candidateOutcome": "EU gas sourcing subsequently diversified; the existing source does not establish the EU's net influence gain.",
        "sources": ["gas"],
        "interpretation": "Reduced supplier concentration may improve autonomy but can also introduce new costs or dependencies; this overlaps Russia's loss-of-access observation.",
        "additionalOutcomesNeeded": "Matched origin shares, contracted capacity, delivered gas volumes, price and supply reliability outcomes from independent sources.",
        "costAccountingNeeded": "Replacement fuel premiums, LNG terminals, industrial competitiveness, household costs and public subsidies.",
        "counterfactualNeeded": "Demand reduction, weather, storage policy, preexisting diversification and renewable generation trends.",
        "calibrationNeeded": "Fix a net autonomy/leverage measure and materiality threshold before comparing the EU with other actors.",
        "editorialReview": "Pending; no score authorized"
      }
    },
    "india": {
      "Diplomatic": {
            "status": "Implemented or announced diplomacy — no influence score",
            "candidateBaseline": "India–EFTA TEPA entered into force on 1 October 2025; EFTA is not the EU.",
            "candidateOutcome": "The agreement is implemented, but investment and job targets are future commitments, not delivered outcomes.",
            "sources": [
                  "efta",
                  "indiaDeal"
            ],
            "interpretation": "Do not book the US$100B investment or one million jobs objective as realized geopolitical influence.",
            "additionalOutcomesNeeded": "Verified EFTA capital deployed to India, independently counted jobs and bilateral market-access outcomes.",
            "costAccountingNeeded": "Tariff concessions, adjustment costs, public incentives and distribution of benefits.",
            "counterfactualNeeded": "Preexisting investor plans, domestic growth, trade diversion and partner incentives.",
            "calibrationNeeded": "Predefine independently measurable diplomatic bargaining outcomes, attribution rules and a fixed materiality threshold before assigning any influence score.",
            "editorialReview": "Pending; no score authorized"
      },
      "Economic": {
            "status": "Candidate evidence — no influence score",
            "candidateBaseline": "World Bank WDI reports India's 2025 real GDP growth; national-account periods need reconciliation.",
            "candidateOutcome": "No independently reviewed net geopolitical influence outcome established from this input.",
            "sources": [
                  "wb"
            ],
            "interpretation": "Growth does not prove external bargaining power or treaty benefits.",
            "additionalOutcomesNeeded": "Delivered TEPA investment, verified employment, export access and counterpart dependence after entry into force.",
            "costAccountingNeeded": "Tariff concessions, infrastructure and fiscal costs, and distributional impacts.",
            "counterfactualNeeded": "Domestic growth momentum, investment plans preceding TEPA and global demand.",
            "calibrationNeeded": "Predefine the unit, historical baseline, net-change method and materiality target before scoring; do not combine incompatible proxy units.",
            "editorialReview": "Pending; no score authorized"
      },
      "Strategic": {
            "status": "Candidate evidence — no influence score",
            "candidateBaseline": "SIPRI publishes Indian military expenditure estimates for 2025.",
            "candidateOutcome": "No independently reviewed net geopolitical influence outcome established from this input.",
            "sources": [
                  "sipri"
            ],
            "interpretation": "Input spending does not measure strategic autonomy or delivered deterrence.",
            "additionalOutcomesNeeded": "Verified deployment readiness, domestic production deliveries, usable access and partner policy outcomes.",
            "costAccountingNeeded": "Procurement and sustainment costs, import dependence and public budget trade-offs.",
            "counterfactualNeeded": "Long-running modernization, regional threats and alliance-independent decisions.",
            "calibrationNeeded": "Predefine the unit, historical baseline, net-change method and materiality target before scoring; do not combine incompatible proxy units.",
            "editorialReview": "Pending; no score authorized"
      },
      "Energy and resources": {
        "status": "Energy import exposure research — no influence score",
        "candidateBaseline": "India ministry's 2025 statement reports roughly 88% crude-oil import reliance; this is a single-period exposure snapshot.",
        "candidateOutcome": "A comparable subsequent import-reliance and supplier-diversification outcome has not yet been verified.",
        "sources": ["indiaoil"],
        "interpretation": "Import reliance does not by itself prove lost autonomy; price terms, alternate suppliers and reserve capacity matter.",
        "additionalOutcomesNeeded": "Independently sourced matched-period crude and gas dependence, supplier shares, realized price discounts and contract outcomes.",
        "costAccountingNeeded": "Import bill, freight and insurance, fiscal subsidy exposure, refiner margins and household fuel costs.",
        "counterfactualNeeded": "Economic growth, refinery demand, domestic production and diversification predating the conflict.",
        "calibrationNeeded": "Set an ex-ante net autonomy or bargaining-power metric and materiality threshold.",
        "editorialReview": "Pending; no score authorized"
      }
    },
    "us": {
      "Diplomatic": {
            "status": "Implemented or announced diplomacy — no influence score",
            "candidateBaseline": "Sweden joined NATO on 7 March 2024; this is an alliance-wide institutional outcome, not exclusively a U.S. gain.",
            "candidateOutcome": "Membership is implemented, but incremental American leverage and security burdens have not been independently quantified.",
            "sources": [
                  "nato",
                  "sweden"
            ],
            "interpretation": "Do not credit the United States alone for Swedish sovereign accession or equate allied capacity with unilateral command.",
            "additionalOutcomesNeeded": "Independently verified basing, interoperability, partner commitments and durable diplomatic concessions attributable to U.S. actions.",
            "costAccountingNeeded": "U.S. and allied security commitments, defense support, deployment and fiscal exposure.",
            "counterfactualNeeded": "Sweden's own security decisions, Russian invasion, Finland's accession and preexisting NATO cooperation.",
            "calibrationNeeded": "Predefine independently measurable diplomatic bargaining outcomes, attribution rules and a fixed materiality threshold before assigning any influence score.",
            "editorialReview": "Pending; no score authorized"
      },
      "Economic": {
            "status": "Candidate evidence — no influence score",
            "candidateBaseline": "Real GDP growth, 2025 versus 2024: 2.2% (World Bank WDI series).",
            "candidateOutcome": "No independently reviewed net geopolitical influence outcome established from this input.",
            "sources": [
                  "wb"
            ],
            "interpretation": "Domestic growth is not a measure of overseas bargaining power.",
            "additionalOutcomesNeeded": "Cross-border realized investment and production, partner dependence, verified trade terms and employment changes.",
            "costAccountingNeeded": "Subsidies, tariff incidence, consumer prices and public debt exposure.",
            "counterfactualNeeded": "Business-cycle and investment trends that preceded the geopolitical events.",
            "calibrationNeeded": "Predefine the unit, historical baseline, net-change method and materiality target before scoring; do not combine incompatible proxy units.",
            "editorialReview": "Pending; no score authorized"
      },
      "Strategic": {
            "status": "Candidate evidence — no influence score",
            "candidateBaseline": "SIPRI estimates U.S. 2025 military expenditure at US$954B, with a reported real change of −7.5%.",
            "candidateOutcome": "No independently reviewed net geopolitical influence outcome established from this input.",
            "sources": [
                  "sipri"
            ],
            "interpretation": "Spending is a resource input, not delivered readiness or deterrence.",
            "additionalOutcomesNeeded": "Operationally available access, delivered systems, independently assessed readiness and measurable security outcomes.",
            "costAccountingNeeded": "Taxpayer opportunity costs, deployment, sustainment and conflict losses.",
            "counterfactualNeeded": "Changes already budgeted, inflation, allied contributions and adversary responses.",
            "calibrationNeeded": "Predefine the unit, historical baseline, net-change method and materiality target before scoring; do not combine incompatible proxy units.",
            "editorialReview": "Pending; no score authorized"
      },
      "Energy and resources": {
        "status": "Baseline research — no influence score",
        "candidateBaseline": "Global LNG export share, 2024: 21%",
        "candidateOutcome": "Global LNG export share, 2025: 26% (+5 percentage points)",
        "sources": ["lng"],
        "interpretation": "Observed market-share change, not proof of geopolitical bargaining power or a causal effect of the Iran conflict.",
        "additionalOutcomesNeeded": "Independently sourced destination-level contracted deliveries and realized net export revenues, matched to baseline and period.",
        "costAccountingNeeded": "Domestic gas and electricity price exposure, terminal and transport costs, taxpayer support, emissions and consumer incidence.",
        "counterfactualNeeded": "Preexisting LNG capacity expansion, competitor outages, demand and price trends without the conflict.",
        "calibrationNeeded": "Define an ex-ante materiality target in a common unit for net external leverage; distinguish commercial market share from durable geopolitical control.",
        "editorialReview": "Pending; no score authorized"
      }
    },
    "russia": {
      "Diplomatic": {
            "status": "Implemented or announced diplomacy — no influence score",
            "candidateBaseline": "Russian authorities reported ratification of the Russia–North Korea treaty in November 2024.",
            "candidateOutcome": "Ratification is not independent evidence of delivered alliance benefits or measurable leverage.",
            "sources": [
                  "russiaTreaty"
            ],
            "interpretation": "Distinguish treaty status, claimed support, delivered military assistance and net bargaining gains.",
            "additionalOutcomesNeeded": "Independent evidence of treaty implementation, verified delivered resources, operational effects and concessions.",
            "costAccountingNeeded": "Financial transfers, sanctions costs, military supply dependence and opportunity costs.",
            "counterfactualNeeded": "War-driven demand, longstanding bilateral ties and North Korea's independent incentives.",
            "calibrationNeeded": "Predefine independently measurable diplomatic bargaining outcomes, attribution rules and a fixed materiality threshold before assigning any influence score.",
            "editorialReview": "Pending; no score authorized"
      },
      "Economic": {
            "status": "Candidate evidence — no influence score",
            "candidateBaseline": "2025 real GDP growth is reported in the World Bank WDI series.",
            "candidateOutcome": "No independently reviewed net geopolitical influence outcome established from this input.",
            "sources": [
                  "wb"
            ],
            "interpretation": "Domestic output and wartime spending are not net external economic influence.",
            "additionalOutcomesNeeded": "Realized export receipts, sanctions-adjusted trade access, capital flows and verified partner dependence.",
            "costAccountingNeeded": "Fiscal burden, financing restrictions, war-related losses and price discounts.",
            "counterfactualNeeded": "Commodity prices, exchange-rate effects and prewar trading patterns.",
            "calibrationNeeded": "Predefine the unit, historical baseline, net-change method and materiality target before scoring; do not combine incompatible proxy units.",
            "editorialReview": "Pending; no score authorized"
      },
      "Strategic": {
            "status": "Candidate evidence — no influence score",
            "candidateBaseline": "SIPRI publishes Russian military expenditure estimates for 2025.",
            "candidateOutcome": "No independently reviewed net geopolitical influence outcome established from this input.",
            "sources": [
                  "sipri"
            ],
            "interpretation": "War spending and treaty announcements are not proof of strategic gains.",
            "additionalOutcomesNeeded": "Verified force readiness, deployable capacity, access implementation and durable partner security outcomes.",
            "costAccountingNeeded": "Equipment attrition, casualties, military expenditure and civilian displacement.",
            "counterfactualNeeded": "Prewar force posture, battlefield adaptation and independent allied actions.",
            "calibrationNeeded": "Predefine the unit, historical baseline, net-change method and materiality target before scoring; do not combine incompatible proxy units.",
            "editorialReview": "Pending; no score authorized"
      },
      "Energy and resources": {
        "status": "Baseline research — no influence score",
        "candidateBaseline": "EU gas dependence before 2022; source reports over 150 bcm Russian supply in 2021.",
        "candidateOutcome": "Reduced EU reliance on Russian gas; existing record does not support a precise matched net influence estimate.",
        "sources": ["gas"],
        "interpretation": "A market-access loss for Russia may coincide with higher energy revenue elsewhere; do not treat EU imports as Russia's total export revenue.",
        "additionalOutcomesNeeded": "Independently verified destination-level gas and oil volumes, realized net receipts, contract duration and sanctions-related discounts.",
        "costAccountingNeeded": "Production, transport, discounts, taxes, lost market access, infrastructure and war-related expenditures.",
        "counterfactualNeeded": "European diversification already underway, demand changes, weather and alternative export markets.",
        "calibrationNeeded": "Predefine comparable net external leverage measures and fixed materiality target before computing any score.",
        "editorialReview": "Pending; no score authorized"
      }
    }
  },
  "sources": {
    "cheniere2025Operations": {"label": "Cheniere FY2025 10-K · statements of operations", "url": "https://lngir.cheniere.com/sec-filings/all-sec-filings/xbrl_doc_only/4738", "date": "2026-02-26; FY2024–FY2025 observations"},
    "cheniere2025Revenue": {"label": "Cheniere FY2025 10-K · revenue disaggregation", "url": "https://lngir.cheniere.com/sec-filings/all-sec-filings/xbrl_doc_only/4778", "date": "2026-02-26; FY2024–FY2025 observations"},
    "cheniere2025CashFlow": {"label": "Cheniere FY2025 10-K · cash-flow statement", "url": "https://lngir.cheniere.com/sec-filings/all-sec-filings/xbrl_doc_only/4742", "date": "2026-02-26; FY2024–FY2025 observations"},
    "cheniere2025Debt": {"label": "Cheniere FY2025 10-K · debt note", "url": "https://lngir.cheniere.com/sec-filings/all-sec-filings/xbrl_doc_only/4753", "date": "2026-02-26; FY2024–FY2025 observations"},
    "cheniere2025CashSupplement": {"label": "Cheniere FY2025 10-K · supplemental cash flows", "url": "https://lngir.cheniere.com/sec-filings/all-sec-filings/xbrl_doc_only/4764", "date": "2026-02-26; FY2024–FY2025 observations"},
    "cheniere2025Taxes": {"label": "Cheniere FY2025 10-K · income tax note", "url": "https://lngir.cheniere.com/sec-filings/all-sec-filings/xbrl_doc_only/4757", "date": "2026-02-26; FY2024–FY2025 observations"},
    "cheniere2025Audit": {"label": "Cheniere FY2025 10-K · auditor and full report", "url": "https://lngir.cheniere.com/sec-filings/all-sec-filings/content/0000003570-26-000005/lng-20251231.htm", "date": "2026-02-26; FY2024–FY2025 observations"},
    "cheniere2025Results": {"label": "Cheniere FY2025 results · derivative and margin caveats", "url": "https://lngir.cheniere.com/news-events/press-releases/detail/333/cheniere-reports-fourth-quarter-and-full-year-2025-results", "date": "2026-02-26; FY2024–FY2025 observations"},
    "wb": {
      "label": "World Bank WDI · 2025 observations",
      "url": "https://databank.worldbank.org/reports.aspx?country=USA%2CEMU%2CEUU%2CRUS%2CCHN%2CIND%2CBRA&series=NY.GDP.MKTP.KD.ZG&source=2",
      "date": "2025 data; retrieved 2026-10-31"
    },
    "sipri": {
      "label": "SIPRI · military expenditure 2025",
      "url": "https://www.sipri.org/publications/2026/sipri-fact-sheets/trends-world-military-expenditure-2025",
      "date": "2026-04"
    },
    "eda": {
      "label": "EDA · Defence Data 2025–2026",
      "url": "https://www.eda.europa.eu/news-and-events/press-office/latest-press-releases/2026/07/16/eu-defence-spending---418-billion-in-2025--projected-to--454-billion-in-2026",
      "date": "2026-07-16"
    },
    "gas": {
      "label": "Council of the EU · gas imports",
      "url": "https://www.consilium.europa.eu/en/infographics/where-does-the-eu-s-gas-come-from/",
      "date": "2025 data; retrieved 2026-10-31"
    },
    "eiaHenry2024": {"label":"EIA · Henry Hub 2024 annual average","url":"https://www.eia.gov/TodayinEnergy/detail.php?id=64184","date":"2025-01-08; 2024 observation"},
    "fercGas2025": {"label":"FERC · 2025 State of the Markets natural gas price review","url":"https://www.ferc.gov/sites/default/files/2026-03/26_State-of-the-Market_0324_1430.pdf","date":"2026-03; 2025 observation"},
    "lngDest": {"label":"EIA · U.S. LNG exports by destination","url":"https://www.eia.gov/TodayinEnergy/detail.php?id=67484","date":"2026; 2024–2025 observations"},
    "fercLNG": {"label":"FERC · 2025 State of the Markets","url":"https://www.ferc.gov/sites/default/files/2026-03/26_State-of-the-Market_0324_1430.pdf","date":"2026-03; 2025 review"},
    "lng": {
      "label": "EIA · global LNG trade",
      "url": "https://www.eia.gov/todayinenergy/detail.php?id=67864",
      "date": "2026-07-14"
    },
    "chinaoil": {
      "label": "EIA · Chinese crude imports",
      "url": "https://www.eia.gov/todayinenergy/detail.php?id=67905",
      "date": "2026-07-31"
    },
    "indiaoil": {
      "label": "India Ministry of Petroleum · import exposure",
      "url": "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2183703&lang=2&reg=48",
      "date": "2025 ministerial statement"
    },
    "nato": {
      "label": "NATO · Swedish accession",
      "url": "https://www.nato.int/en/news-and-events/articles/news/2024/03/07/sweden-officially-joins-nato",
      "date": "2024-03-07"
    },
    "sweden": {
      "label": "Swedish government · accession record",
      "url": "https://www.government.se/government-policy/sweden-in-nato/history-of-sweden-and-nato/",
      "date": "2024-04-03"
    },
    "chinaDipl": {
      "label": "China MFA · trilateral implementation review",
      "url": "https://www.mfa.gov.cn/mfa_eng/xw/wjbxw/202405/t20240530_11343832.html",
      "date": "2023-12-16"
    },
    "chinaDeal": {
      "label": "China MFA · agreement and prior mediation",
      "url": "https://www.mfa.gov.cn/eng/zy/gb/202405/t20240531_11367487.html",
      "date": "2023-03-10"
    },
    "russiaTreaty": {
      "label": "Russian presidency · treaty ratification",
      "url": "https://ebs.publicnow.com/view/073E4CA41A226F1B6F09A356E1B61E691B7761E0",
      "date": "2024-11-09"
    },
    "eunz": {
      "label": "Council of the EU · treaty register",
      "url": "https://www.consilium.europa.eu/en/documents/treaties-agreements/agreement/?DocLanguage=en&id=2023005",
      "date": "Entry into force 2024-05-01"
    },
    "eunzimpact": {
      "label": "European Commission · FTA scope and forecasts",
      "url": "https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/new-zealand/eu-new-zealand-agreement_en",
      "date": "Retrieved 2026-10-31"
    },
    "efta": {
      "label": "EFTA · treaty status",
      "url": "https://www.efta.int/trade-relations/free-trade-network/india",
      "date": "Entry into force 2025-10-01"
    },
    "indiaDeal": {
      "label": "India Commerce Ministry · TEPA objectives",
      "url": "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2173968&lang=2&reg=48",
      "date": "2025-10-01"
    }
  },
  "actors": {
    "us": {
      "Economic": {
        "title": "Real GDP growth",
        "value": "2.2%",
        "period": "2025 versus 2024",
        "stage": "Observed statistic",
        "kind": "Output proxy",
        "sources": [
          "wb"
        ],
        "meaning": "Domestic output grew. This does not measure external bargaining power or gains caused by geopolitical disruption.",
        "costs": "Distribution among workers, firms and consumers, fiscal subsidies and external costs are not netted out.",
        "gap": "Comparable realized cross-border outcomes, policy counterfactual and net costs remain incomplete.",
        "confidence": "Moderate",
        "metric": "gdp-growth-2025",
        "number": 2.2,
        "score": null
      },
      "Strategic": {
        "title": "Real military spending change",
        "value": "-7.5% · US$954B",
        "period": "2024 → 2025",
        "stage": "Published estimate",
        "kind": "Resource input",
        "sources": [
          "sipri"
        ],
        "meaning": "Real spending change is distinct from the current-dollar spending total. More spending does not prove stronger deterrence, readiness or influence.",
        "costs": "Taxpayers fund spending; displacement of civilian resources and conflict losses are not quantified here.",
        "gap": "Delivered capabilities, usable access, independent readiness tests and attributable security outcomes are required.",
        "confidence": "Moderate",
        "metric": "sipri-real-change-2025",
        "number": -7.5,
        "score": null
      },
      "Diplomatic": {
        "title": "NATO accession implemented",
        "value": "31 → 32 allies",
        "period": "Before → after 7 March 2024",
        "stage": "Implemented",
        "kind": "Institutional outcome",
        "sources": [
          "nato",
          "sweden"
        ],
        "meaning": "Sweden joined NATO. This is a shared alliance outcome; Sweden retains an equal voice and sovereign choices.",
        "costs": "Article 5 obligations and national defence costs accompany expanded collective security.",
        "gap": "Application began in 2022. Do not attribute accession to later U.S. policy or count it again as an independent strategic gain.",
        "confidence": "Moderate",
        "metric": null,
        "number": null,
        "score": null
      },
      "Energy and resources": {
        "title": "Global LNG export share",
        "value": "21% → 26% · +5 pp",
        "period": "2024 → 2025",
        "stage": "Observed statistic",
        "kind": "Market outcome",
        "sources": [
          "lng"
        ],
        "meaning": "U.S. suppliers gained global LNG market share. Exporter receipts are not the same as national net benefit or diplomatic leverage.",
        "costs": "Capital costs, domestic gas prices and consumer effects need separate measurement.",
        "gap": "Infrastructure predates current disruptions; quantify incremental profits, costs and policy attribution before scoring.",
        "confidence": "Moderate",
        "metric": "lng-export-share-pp",
        "number": 5,
        "score": null
      }
    },
    "china": {
      "Economic": {
        "title": "Real GDP growth",
        "value": "5.0%",
        "period": "2025 versus 2024",
        "stage": "Observed statistic",
        "kind": "Output proxy",
        "sources": [
          "wb"
        ],
        "meaning": "Domestic output grew. This does not measure external bargaining power or gains caused by geopolitical disruption.",
        "costs": "Distribution among workers, firms and consumers, fiscal subsidies and external costs are not netted out.",
        "gap": "Comparable realized cross-border outcomes, policy counterfactual and net costs remain incomplete.",
        "confidence": "Moderate",
        "metric": "gdp-growth-2025",
        "number": 5.0,
        "score": null
      },
      "Strategic": {
        "title": "Real military spending change",
        "value": "+7.4% · US$336B",
        "period": "2024 → 2025",
        "stage": "Published estimate",
        "kind": "Resource input",
        "sources": [
          "sipri"
        ],
        "meaning": "Real spending change is distinct from the current-dollar spending total. More spending does not prove stronger deterrence, readiness or influence.",
        "costs": "Taxpayers fund spending; displacement of civilian resources and conflict losses are not quantified here.",
        "gap": "Delivered capabilities, usable access, independent readiness tests and attributable security outcomes are required.",
        "confidence": "Moderate",
        "metric": "sipri-real-change-2025",
        "number": 7.4,
        "score": null
      },
      "Diplomatic": {
        "title": "Saudi–Iran diplomatic restoration",
        "value": "Embassies reopened",
        "period": "2016 rupture → 2023 restoration",
        "stage": "Implemented",
        "kind": "Institutional outcome",
        "sources": [
          "chinaDipl",
          "chinaDeal"
        ],
        "meaning": "A trilateral review records reopened embassies. China hosted the agreement; Iraq and Oman conducted earlier talks.",
        "costs": "Saudi Arabia and Iran retain independent policies; mediation costs and durable security benefits are unquantified.",
        "gap": "Official participant accounts confirm the record but are not independent proof of Chinese control or durable peace. Historical context, not a fresh 2026 gain.",
        "confidence": "Moderate",
        "metric": null,
        "number": null,
        "score": null
      },
      "Energy and resources": {
        "title": "Crude oil import exposure",
        "value": "11.6 → 8.1 million b/d",
        "period": "2025 annual → Q2 2026",
        "stage": "Observed statistic",
        "kind": "Exposure proxy",
        "sources": [
          "chinaoil"
        ],
        "meaning": "Q2 2026 imports fell 32% from Q1. Annual and quarterly levels are shown for context, not used to calculate a like-for-like trend.",
        "costs": "Importers and users face price and supply risks; lower imports may reflect inventory changes or reduced refinery activity.",
        "gap": "No quantified net national benefit. Require matched-quarter volumes, inventory draws and realized costs before inferring vulnerability or leverage.",
        "confidence": "Moderate",
        "metric": null,
        "number": null,
        "score": null
      }
    },
    "russia": {
      "Economic": {
        "title": "Real GDP growth",
        "value": "1.0%",
        "period": "2025 versus 2024",
        "stage": "Observed statistic",
        "kind": "Output proxy",
        "sources": [
          "wb"
        ],
        "meaning": "Domestic output grew. This does not measure external bargaining power or gains caused by geopolitical disruption.",
        "costs": "Distribution among workers, firms and consumers, fiscal subsidies and external costs are not netted out.",
        "gap": "Comparable realized cross-border outcomes, policy counterfactual and net costs remain incomplete.",
        "confidence": "Moderate",
        "metric": "gdp-growth-2025",
        "number": 1.0,
        "score": null
      },
      "Strategic": {
        "title": "Real military spending change",
        "value": "+5.9% · US$190B",
        "period": "2024 → 2025",
        "stage": "Published estimate",
        "kind": "Resource input",
        "sources": [
          "sipri"
        ],
        "meaning": "Real spending change is distinct from the current-dollar spending total. More spending does not prove stronger deterrence, readiness or influence.",
        "costs": "Taxpayers fund spending; displacement of civilian resources and conflict losses are not quantified here.",
        "gap": "Delivered capabilities, usable access, independent readiness tests and attributable security outcomes are required.",
        "confidence": "Moderate",
        "metric": "sipri-real-change-2025",
        "number": 5.9,
        "score": null
      },
      "Diplomatic": {
        "title": "Russia–DPRK partnership treaty",
        "value": "Ratified in Russia",
        "period": "Signed June → ratified November 2024",
        "stage": "Ratified",
        "kind": "Legal commitment",
        "sources": [
          "russiaTreaty"
        ],
        "meaning": "The Russian presidency records ratification. A mutual-support commitment is not itself a measured diplomatic victory.",
        "costs": "Reciprocal obligations, escalation exposure and bargaining concessions require a separate audit.",
        "gap": "This record does not independently verify entry into force, implementation, troop numbers or net gains. No points assigned.",
        "confidence": "Low",
        "metric": null,
        "number": null,
        "score": null
      },
      "Energy and resources": {
        "title": "Gas delivered to the EU",
        "value": "Over 150 → 36 bcm",
        "period": "2021 → 2025",
        "stage": "Observed statistic",
        "kind": "Market outcome",
        "sources": [
          "gas"
        ],
        "meaning": "A major contraction in the EU gas market, not a complete account of Russian global energy exports.",
        "costs": "Lost market access, price changes, rerouting costs and alternative buyers affect net receipts.",
        "gap": "Council text says over 150 bcm for 2021; no false precision or derived index. Global net revenue remains unquantified.",
        "confidence": "Moderate",
        "metric": null,
        "number": null,
        "score": null
      }
    },
    "eu": {
      "Economic": {
        "title": "Real GDP growth",
        "value": "1.5%",
        "period": "2025 versus 2024",
        "stage": "Observed statistic",
        "kind": "Output proxy",
        "sources": [
          "wb"
        ],
        "meaning": "Domestic output grew. This does not measure external bargaining power or gains caused by geopolitical disruption.",
        "costs": "Distribution among workers, firms and consumers, fiscal subsidies and external costs are not netted out.",
        "gap": "Comparable realized cross-border outcomes, policy counterfactual and net costs remain incomplete.",
        "confidence": "Moderate",
        "metric": "gdp-growth-2025",
        "number": 1.5,
        "score": null
      },
      "Strategic": {
        "title": "EU-27 defence expenditure",
        "value": "€418B · +20%",
        "period": "2024 → 2025",
        "stage": "Observed statistic",
        "kind": "Resource input",
        "sources": [
          "eda"
        ],
        "meaning": "EDA reports member-state expenditure, not a unified EU military budget. EU-27 differs from NATO and geographical Europe.",
        "costs": "Member-state taxpayers fund expenditure. Procurement does not establish delivered operational capability.",
        "gap": "2026 €454B is a projection and is excluded. EDA and SIPRI definitions differ; no direct spending-growth ranking.",
        "confidence": "Moderate",
        "metric": null,
        "number": null,
        "score": null
      },
      "Diplomatic": {
        "title": "EU–New Zealand trade agreement",
        "value": "In force 1 May 2024",
        "period": "Signed 2023 → in force 2024",
        "stage": "Implemented",
        "kind": "Institutional outcome",
        "sources": [
          "eunz",
          "eunzimpact"
        ],
        "meaning": "An implemented market-access agreement, with New Zealand also a beneficiary.",
        "costs": "Sector adjustment and compliance costs must be measured alongside exporter and consumer gains.",
        "gap": "Projected 30% trade growth is not realized additional trade. Treaty entry alone does not prove leverage or net gains.",
        "confidence": "Moderate",
        "metric": null,
        "number": null,
        "score": null
      },
      "Energy and resources": {
        "title": "Russian gas exposure reduced",
        "value": "36 bcm from Russia in 2025",
        "period": "2021 → 2025",
        "stage": "Observed statistic",
        "kind": "Dependency outcome",
        "sources": [
          "gas"
        ],
        "meaning": "Russian deliveries fell from over 150 bcm. Diversification and lower demand both contributed; this mirrors the Russian record, not independent evidence.",
        "costs": "Replacement LNG, terminals and demand reduction carry costs; lower dependency on one supplier can increase another.",
        "gap": "The 2027 prohibition is a future legal schedule, not a completed cessation. Net affordability and resilience need measurement.",
        "confidence": "Moderate",
        "metric": null,
        "number": null,
        "score": null
      }
    },
    "india": {
      "Economic": {
        "title": "Real GDP growth",
        "value": "7.6%",
        "period": "2025 versus 2024",
        "stage": "Observed statistic",
        "kind": "Output proxy",
        "sources": [
          "wb"
        ],
        "meaning": "Domestic output grew. This does not measure external bargaining power or gains caused by geopolitical disruption.",
        "costs": "Distribution among workers, firms and consumers, fiscal subsidies and external costs are not netted out.",
        "gap": "Comparable realized cross-border outcomes, policy counterfactual and net costs remain incomplete.",
        "confidence": "Moderate",
        "metric": "gdp-growth-2025",
        "number": 7.6,
        "score": null
      },
      "Strategic": {
        "title": "Real military spending change",
        "value": "+8.9% · US$92.1B",
        "period": "2024 → 2025",
        "stage": "Published estimate",
        "kind": "Resource input",
        "sources": [
          "sipri"
        ],
        "meaning": "Real spending change is distinct from the current-dollar spending total. More spending does not prove stronger deterrence, readiness or influence.",
        "costs": "Taxpayers fund spending; displacement of civilian resources and conflict losses are not quantified here.",
        "gap": "Delivered capabilities, usable access, independent readiness tests and attributable security outcomes are required.",
        "confidence": "Moderate",
        "metric": "sipri-real-change-2025",
        "number": 8.9,
        "score": null
      },
      "Diplomatic": {
        "title": "India–EFTA TEPA",
        "value": "In force 1 October 2025",
        "period": "Signed 2024 → in force 2025",
        "stage": "Implemented",
        "kind": "Institutional outcome",
        "sources": [
          "efta",
          "indiaDeal"
        ],
        "meaning": "Treaty status is confirmed by both parties. EFTA is not the European Union.",
        "costs": "Tariff concessions and sector adjustment accompany market access; distribution of gains remains unmeasured.",
        "gap": "US$100B investment and one million jobs are objectives over 15 years, not delivered capital or realized employment.",
        "confidence": "Moderate",
        "metric": null,
        "number": null,
        "score": null
      },
      "Energy and resources": {
        "title": "Crude oil import reliance",
        "value": "About 88%",
        "period": "2025 ministerial statement",
        "stage": "Reported statistic",
        "kind": "Exposure proxy",
        "sources": [
          "indiaoil"
        ],
        "meaning": "The ministry reported roughly 88% crude import reliance and 51% gas reliance. This is a dated exposure snapshot.",
        "costs": "Consumers, refiners and the external balance bear import-price and shipping exposure.",
        "gap": "No harmonized newer before/after series verified here. Import reliance alone does not establish coercion, loss of autonomy or a change score.",
        "confidence": "Moderate",
        "metric": null,
        "number": null,
        "score": null
      }
    }
  }
};
