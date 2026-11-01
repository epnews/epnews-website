/* Reviewed evidence records. Null scores are intentional, never zero-filled. */
window.EP_CHAOS_DATA = {
  "reviewed": "2026-10-31",
  "methodologyVersion": "2.0",
  "meterReadiness": {
  "label": "Command Meter Readiness",
  "asOf": "2026-10-31",
  "percent": 51,
  "previousPercent": 49,
  "lastEvidencePr": 198,
  "changeReason": "EIA January–August 2026 retail electricity prices and utility revenue establish newer observed domestic cost indicators alongside producer financial gains. They do not establish LNG export causation or incremental national welfare costs.",
  "baselinePr": 192,
  "kind": "Editorial planning estimate; not a measured statistical percentage",
  "components": [
    {
      "id": "technical",
      "label": "Technical meter and interactions",
      "percent": 90
    },
    {
      "id": "evidence",
      "label": "Verified economic evidence",
      "percent": 60
    },
    {
      "id": "incidence",
      "label": "Costs versus benefits",
      "percent": 45
    },
    {
      "id": "causation",
      "label": "Causation and counterfactuals",
      "percent": 25
    },
    {
      "id": "scoring",
      "label": "Defensible influence scoring",
      "percent": 20
    }
  ],
  "changePolicy": "Only update the percentage when a meaningful evidence, causation, cost-accounting or scoring gap closes. A merged PR alone does not earn percentage points.",
  "nextEvidenceGate": "Destination- and contract-matched realized receipts, incremental project costs and a credible disruption counterfactual.",
  "influenceScore": null,
  "netNationalBenefitUsd": null
},
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
            "domesticGasMatched2025to2026": {
  "title": "Matched August 2025 vs August 2026 natural-gas prices",
  "period": "Same calendar month, nominal dollars per thousand cubic feet",
  "rows": [
    {
      "id": "residential",
      "label": "Residential",
      "prior": 26.26,
      "current": 27.05,
      "source": "eiaGasResidentialHistory",
      "note": "Retail end-use price; does not directly measure typical household monthly bill."
    },
    {
      "id": "commercial",
      "label": "Commercial",
      "prior": 12.55,
      "current": 12.87,
      "source": "eiaGasCommercialHistory",
      "note": "Retail commercial price includes different delivery and service costs."
    },
    {
      "id": "industrial",
      "label": "Industrial",
      "prior": 4.47,
      "current": 4.34,
      "source": "eiaGasIndustrialHistory",
      "note": "Only 13.1% of industrial deliveries included in reported August 2026 prices."
    },
    {
      "id": "lng-export",
      "label": "LNG export price",
      "prior": 7.51,
      "current": 7.92,
      "source": "eiaGasLNGExportHistory",
      "note": "EIA export price, not net company profit or destination-matched cash receipt."
    }
  ],
  "supplemental": [
    {
      "id": "residential-january",
      "label": "Residential January matched comparison",
      "prior": 12.44,
      "current": 13.96,
      "source": "eiaGasResidentialHistory",
      "note": "Same month in both years; distinct seasonal level from August."
    },
    {
      "id": "commercial-january",
      "label": "Commercial January matched comparison",
      "prior": 9.88,
      "current": 11.26,
      "source": "eiaGasCommercialHistory",
      "note": "Same month in both years; does not isolate LNG-driven effects."
    },
    {
      "id": "industrial-january",
      "label": "Industrial January matched comparison",
      "prior": 6.03,
      "current": 7.2,
      "source": "eiaGasIndustrialHistory",
      "note": "Industrial survey coverage limitation also applies."
    },
    {
      "id": "lng-export-january",
      "label": "LNG export January matched comparison",
      "prior": 8.51,
      "current": 8.69,
      "source": "eiaGasLNGExportHistory",
      "note": "Export price series, not realized company net margin."
    }
  ],
  "methodology": "Eight same-month paired comparisons (January and August, four sectors), all drawn from four EIA monthly historical series; NOT eight independent sources. Calculate change from stored matched raw values, not rounded headline claims. January and August have very different seasonal demand profiles. No causal attribution to LNG export volumes or the Hormuz disruption.",
  "causalStatus": "Not identified; weather, storage, pipeline constraints, utility costs, preexisting export capacity and contracts require controls.",
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "domesticGasPricesAug2026": {
  "title": "August 2026 observed U.S. natural-gas prices and survey coverage",
  "period": "August 2026 (single-month snapshot; no matched 2025 comparison yet)",
  "source": "eiaNaturalGasPricesAug2026",
  "items": [
    {
      "id": "citygate",
      "label": "Citygate gas price",
      "value": 5.03,
      "unit": "USD/thousand cubic feet",
      "type": "price"
    },
    {
      "id": "residential",
      "label": "Residential gas price",
      "value": 27.05,
      "unit": "USD/thousand cubic feet",
      "type": "price"
    },
    {
      "id": "commercial",
      "label": "Commercial gas price",
      "value": 12.87,
      "unit": "USD/thousand cubic feet",
      "type": "price"
    },
    {
      "id": "industrial",
      "label": "Industrial gas price",
      "value": 4.34,
      "unit": "USD/thousand cubic feet",
      "type": "price"
    },
    {
      "id": "electric",
      "label": "Electric power gas price",
      "value": 3.22,
      "unit": "USD/thousand cubic feet",
      "type": "price"
    },
    {
      "id": "lng-export",
      "label": "LNG export price (EIA reported)",
      "value": 7.92,
      "unit": "USD/thousand cubic feet",
      "type": "price"
    },
    {
      "id": "residential-coverage",
      "label": "Residential deliveries included in price reporting",
      "value": 97.1,
      "unit": "percent of deliveries",
      "type": "coverage"
    },
    {
      "id": "industrial-coverage",
      "label": "Industrial deliveries included in price reporting",
      "value": 13.1,
      "unit": "percent of deliveries",
      "type": "coverage"
    }
  ],
  "methodology": "Price figures use nominal dollars per thousand cubic feet. Residential, commercial, industrial and power sector prices represent distinct markets, with delivery and retail cost differences; they are not directly comparable margins. EIA's reported LNG export price is not a company's realized profit or a matched transaction receipt. Industrial price coverage is only 13.1% of deliveries, which limits extrapolation.",
  "causality": "Single-month observations do not establish a price change or LNG export/disruption causation. Obtain matched 2025 monthly and 2026 January–August price/volume series before computing household burden or causal differences.",
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "domesticElectricity2026": {
  "title": "Observed U.S. retail electricity prices and bills paid: January–August 2026 vs 2025",
  "period": "Year to date through August in both years",
  "source": "eiaElectricity2026Aug",
  "items": [
    {
      "id": "residential-price",
      "label": "Residential electricity average retail price",
      "v2025": 17.03,
      "v2026": 18.19,
      "unit": "cents/kWh",
      "changePercent": 6.8,
      "kind": "price"
    },
    {
      "id": "commercial-price",
      "label": "Commercial electricity average retail price",
      "v2025": 13.29,
      "v2026": 14.04,
      "unit": "cents/kWh",
      "changePercent": 5.6,
      "kind": "price"
    },
    {
      "id": "industrial-price",
      "label": "Industrial electricity average retail price",
      "v2025": 8.5,
      "v2026": 9.09,
      "unit": "cents/kWh",
      "changePercent": 6.9,
      "kind": "price"
    },
    {
      "id": "transportation-price",
      "label": "Transportation electricity average retail price",
      "v2025": 13.73,
      "v2026": 15.64,
      "unit": "cents/kWh",
      "changePercent": 13.9,
      "kind": "price"
    },
    {
      "id": "all-sector-price",
      "label": "All-sector electricity average retail price",
      "v2025": 13.5,
      "v2026": 14.37,
      "unit": "cents/kWh",
      "changePercent": 6.4,
      "kind": "price"
    },
    {
      "id": "residential-revenue",
      "label": "Residential electricity retail revenue",
      "v2025": 179270,
      "v2026": 192801,
      "unit": "USD millions",
      "changePercent": 7.5,
      "kind": "revenue"
    },
    {
      "id": "industrial-revenue",
      "label": "Industrial electricity retail revenue",
      "v2025": 59626,
      "v2026": 64014,
      "unit": "USD millions",
      "changePercent": 7.4,
      "kind": "revenue"
    },
    {
      "id": "all-sector-revenue",
      "label": "All-sector electricity retail revenue",
      "v2025": 373483,
      "v2026": 403750,
      "unit": "USD millions",
      "changePercent": 8.1,
      "kind": "revenue"
    }
  ],
  "context": "Electricity retail prices and revenues include generation fuel, capacity, transmission, distribution, weather, regulation, and load mix. Revenue is utility retail sales, not consumer economic welfare loss, and overlaps among sector and total rows.",
  "causality": "No causal attribution to LNG exports or Hormuz disruption. Observed consumer-facing cost indicators only; gas-to-power exposure is one possible channel among many.",
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "q32026SecCashAndCosts": {
  "title": "Nine-month 2026 SEC cash flows, investment and taxpayer exposure",
  "status": "Observed cash-flow and project-cost disclosures; not incremental disruption benefit",
  "period": "Nine months ended September 30",
  "items": [
    {
      "id": "operating-cash",
      "label": "Operating cash provided",
      "v2026": 5124,
      "v2025": 3484,
      "unit": "USD millions",
      "note": "SEC: most of the increase reflects working-capital timing; increased LNG cash receipts contribute to a lesser extent."
    },
    {
      "id": "investing-cash",
      "label": "Net investing cash used",
      "v2026": 2685,
      "v2025": 2263,
      "unit": "USD millions spent",
      "note": "Consolidated investing cash outflow, not a net-loss measure."
    },
    {
      "id": "financing-cash",
      "label": "Net financing cash used",
      "v2026": 1967,
      "v2025": 3010,
      "unit": "USD millions spent",
      "note": "Includes borrowing, repayments, repurchases and dividends; not operating cost."
    },
    {
      "id": "corpus-stage3-capex",
      "label": "Corpus Christi Stage 3 project cash spending",
      "v2026": 1100,
      "v2025": 1100,
      "unit": "USD millions approximate",
      "note": "Project-specific capital cash spending; figures rounded by issuer, exclude capitalized interest."
    },
    {
      "id": "midscale89-capex",
      "label": "Corpus Christi midscale trains 8–9 cash spending",
      "v2026": 709,
      "v2025": 750,
      "unit": "USD millions",
      "note": "Separate expansion; should not be charged exclusively to 2026 disruption."
    },
    {
      "id": "gregory-power-capex",
      "label": "Gregory Power Plant cash spending",
      "v2026": 245,
      "v2025": 82,
      "unit": "USD millions",
      "note": "Electricity infrastructure costs, separate project."
    },
    {
      "id": "cash-interest",
      "label": "Cash interest paid, net of capitalized amounts",
      "v2026": 664,
      "v2025": 640,
      "unit": "USD millions",
      "note": "Financing cash cost; capitalized interest is excluded."
    },
    {
      "id": "cash-income-tax",
      "label": "Cash income taxes paid, net of refunds",
      "v2026": 36,
      "v2025": 415,
      "unit": "USD millions",
      "note": "2025 included $380m CAMT later refunded in December 2025; period cash paid is not durable tax benefit."
    }
  ],
  "source": "cheniereQ32026Sec",
  "limitations": "Single consolidated issuer; cash flow affected by timing, derivatives, contracts, expansions and working capital. No cash receipts attributable solely to Hormuz or net national welfare. Do not add project cash spending to net investing cash flow or count subsidiary results twice.",
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "q32026CompanyOutcomes": {
  "title": "Cheniere 2026 third-quarter and nine-month company outcomes",
  "status": "Reported company-level results; not Stage 3-only or national net benefit",
  "asOf": "2026-10-28",
  "items": [
    {
      "id": "q3-revenue",
      "label": "1 · Q3 recognized revenues",
      "value2026": 6173,
      "value2025": 4441,
      "unit": "USD millions",
      "meaning": "39% reported year-on-year growth",
      "caveat": "Consolidated Cheniere accrual revenue, not collected export cash."
    },
    {
      "id": "nine-revenue",
      "label": "2 · Nine-month recognized revenues",
      "value2026": 17773,
      "value2025": 14526,
      "unit": "USD millions",
      "meaning": "22% reported year-on-year growth",
      "caveat": "Includes all consolidated Cheniere business; not incremental disruption gains."
    },
    {
      "id": "q3-ebitda",
      "label": "3 · Q3 adjusted EBITDA",
      "value2026": 1900,
      "value2025": 1608,
      "unit": "USD millions",
      "meaning": "18% reported growth",
      "caveat": "Company-defined non-GAAP metric, not net income or national profit."
    },
    {
      "id": "nine-ebitda",
      "label": "4 · Nine-month adjusted EBITDA",
      "value2026": 6037,
      "value2025": 4896,
      "unit": "USD millions",
      "meaning": "23% reported growth",
      "caveat": "Non-GAAP measure with reconciliations; cannot be equated to national welfare."
    },
    {
      "id": "q3-dcf",
      "label": "5 · Q3 distributable cash flow",
      "value2026": 1230,
      "value2025": null,
      "unit": "USD millions",
      "meaning": "Company-reported non-GAAP cash-flow metric",
      "caveat": "Not identical to operating cash flow, tax revenue or free national economic gain."
    },
    {
      "id": "nine-dcf",
      "label": "6 · Nine-month distributable cash flow",
      "value2026": 4070,
      "value2025": null,
      "unit": "USD millions",
      "meaning": "Company-reported non-GAAP cash-flow metric",
      "caveat": "Do not add to revenue or adjusted EBITDA: overlapping measures."
    },
    {
      "id": "q3-cargoes",
      "label": "7 · Q3 LNG cargoes exported",
      "value2026": 188,
      "value2025": 163,
      "unit": "cargoes",
      "meaning": "15% reported year-on-year growth",
      "caveat": "Company cargo count; does not establish realized price or margin per cargo."
    },
    {
      "id": "nine-volume",
      "label": "8 · Nine-month LNG volumes exported",
      "value2026": 2044,
      "value2025": 1745,
      "unit": "TBtu",
      "meaning": "17% reported year-on-year growth",
      "caveat": "Company LNG exported volume, not national LNG exports or realized receipts."
    }
  ],
  "context": "EIA October 2026 forecasts 2026 Henry Hub average $3.48/MMBtu vs $3.53 in 2025 and 2026 LNG exports 17.6 Bcf/d vs 15.1 in 2025. These are annual forecasts, not observed household bill changes or a disruption counterfactual.",
  "contextSource": "eiaOct2026Steo",
  "companySource": "cheniereQ32026",
  "limits": "Financial measures and cargo counts overlap; they must not be summed into a benefit figure. Results are corporate-level and do not isolate the 2026 Strait of Hormuz shock, Stage 3, or net U.S. welfare.",
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "tradeFinancialCrossChecks": {
  "title": "Eight cross-checks linking LNG flows and company accounts",
  "status": "Arithmetic derived from separately labeled published observations; NOT independent causal findings",
  "items": [
    {
      "id": "national-volume",
      "title": "1 · U.S. LNG export growth 2024–25",
      "value": 3.2,
      "unit": "Bcf/day",
      "formula": "15.1 − 11.9",
      "sources": [
        "eiaGlobalTrade2025"
      ],
      "limit": "Annual national average; not a company receipt."
    },
    {
      "id": "national-growth",
      "title": "2 · U.S. LNG export growth rate",
      "value": 26.9,
      "unit": "percent",
      "formula": "100 × (15.1 / 11.9 − 1), rounded",
      "sources": [
        "eiaGlobalTrade2025"
      ],
      "limit": "Annual average growth, not a causal share of disruption."
    },
    {
      "id": "europe-growth",
      "title": "3 · Europe-bound LNG volume change",
      "value": 4,
      "unit": "Bcf/day",
      "formula": "10.3 − 6.3",
      "sources": [
        "eiaLNGDestinations2025"
      ],
      "limit": "Europe includes Türkiye in EIA classification."
    },
    {
      "id": "asia-change",
      "title": "4 · Asia-bound LNG volume change",
      "value": -1.5,
      "unit": "Bcf/day",
      "formula": "2.5 − 4.0",
      "sources": [
        "eiaLNGDestinations2025"
      ],
      "limit": "Regional reallocation, not lost company profit."
    },
    {
      "id": "external-revenue-change",
      "title": "5 · CCH third-party LNG recognized revenue change",
      "value": 849,
      "unit": "USD millions",
      "formula": "4,448 − 3,599",
      "sources": [
        "cch2025Sec"
      ],
      "limit": "Accrual revenue; not cash collected or Stage 3-only."
    },
    {
      "id": "affiliate-revenue-change",
      "title": "6 · CCH affiliate LNG recognized revenue change",
      "value": 772,
      "unit": "USD millions",
      "formula": "2,053 − 1,281",
      "sources": [
        "cch2025Sec"
      ],
      "limit": "Affiliate accounting is not an additional external national export receipt."
    },
    {
      "id": "operating-cash",
      "title": "7 · CCH operating cash-flow change",
      "value": 224,
      "unit": "USD millions",
      "formula": "1,995 − 1,771",
      "sources": [
        "cch2025Sec"
      ],
      "limit": "Consolidated CCH, not incremental Stage 3 margin."
    },
    {
      "id": "investing-cash",
      "title": "8 · CCH investing outflow magnitude change",
      "value": 476,
      "unit": "USD millions",
      "formula": "2,306 − 1,830",
      "sources": [
        "cch2025Sec"
      ],
      "limit": "Investing flows cover multiple projects; not Stage 3-only spending."
    }
  ],
  "warning": "Do not multiply aggregate export volume by destination FOB price to claim actual receipts, or sum these eight differences as net U.S. benefit. Different populations, units and accounting boundaries.",
  "newIndependentStudies": 0,
  "stage3ReturnUsd": null,
  "netBenefitUsd": null,
  "influenceScore": null
},
            "h12026MarketObservations": {
  "title": "Eight first-half 2026 LNG market observations",
  "status": "Observed volumes and benchmark prices · January–June comparisons where available",
  "source": "eiaH12026Exports",
  "items": [
    {
      "id": "total",
      "label": "1 · U.S. LNG exports",
      "value": 17.4,
      "unit": "Bcf/day",
      "comparison": "+23% versus H1 2025",
      "caution": "EIA national export average, not realized company receipts."
    },
    {
      "id": "ttf",
      "label": "2 · European TTF benchmark",
      "value": 14.74,
      "unit": "USD/MMBtu",
      "comparison": "H1 2025: $13.10/MMBtu",
      "caution": "Regional benchmark futures price, not DOE FOB export price or company margin."
    },
    {
      "id": "jkm",
      "label": "3 · East Asian JKM benchmark",
      "value": 15.56,
      "unit": "USD/MMBtu",
      "comparison": "+$2.38/MMBtu versus H1 2025",
      "caution": "Regional benchmark, not cargo-specific U.S. realized sales price."
    },
    {
      "id": "europe-change",
      "label": "4 · Europe-bound U.S. LNG change",
      "value": 0.1,
      "unit": "Bcf/day increase",
      "comparison": "+1% versus H1 2025",
      "caution": "Europe-bound volume change; not total European import dependence."
    },
    {
      "id": "asia-change",
      "label": "5 · Asia-bound U.S. LNG change",
      "value": 2.3,
      "unit": "Bcf/day increase",
      "comparison": "+108% versus H1 2025",
      "caution": "EIA says Hormuz disruption contributed; not a quantified disruption-only causal effect."
    },
    {
      "id": "other-change",
      "label": "6 · Other regional U.S. LNG change",
      "value": 0.8,
      "unit": "Bcf/day increase",
      "comparison": "+46% to Latin America/Caribbean and Middle East/North Africa combined",
      "caution": "Combined region; not all exports or a company-specific result."
    },
    {
      "id": "egypt",
      "label": "7 · Egypt-bound U.S. LNG",
      "value": 1.7,
      "unit": "Bcf/day",
      "comparison": "H1 2026 destination average",
      "caution": "Destination flow, not profit or a dependency score."
    },
    {
      "id": "netherlands",
      "label": "8 · Netherlands-bound U.S. LNG",
      "value": 1.7,
      "unit": "Bcf/day",
      "comparison": "H1 2026 destination average",
      "caution": "Country of discharge need not equal final gas consumption destination."
    }
  ],
  "causalNote": "EIA associates first-half 2026 market disruption with higher global prices and greater Asia-bound U.S. shipments, but also attributes total export growth to capacity additions. Do not infer the share of profits or export growth caused by Hormuz without a counterfactual.",
  "nationalBenefitUsd": null,
  "influenceScore": null
},
            "observedTradeIndicators": {
  "title": "Eight observed LNG trade indicators · 2024 to 2025",
  "status": "Observed EIA/GIIGNL trade quantities and shares · not revenues or national benefit",
  "items": [
    {
      "id": "us-exports",
      "title": "1 · U.S. total LNG exports",
      "baseline": 11.9,
      "outcome": 15.1,
      "unit": "Bcf/day",
      "source": "eiaGlobalTrade2025",
      "limit": "National annual averages; not Stage 3-specific."
    },
    {
      "id": "global-share",
      "title": "2 · U.S. share of global LNG exports",
      "baseline": 21,
      "outcome": 26,
      "unit": "percent",
      "source": "eiaGlobalTrade2025",
      "limit": "Global market share is not geopolitical control or profit."
    },
    {
      "id": "us-to-europe",
      "title": "3 · U.S. LNG shipped to Europe",
      "baseline": 6.3,
      "outcome": 10.3,
      "unit": "Bcf/day",
      "source": "eiaLNGDestinations2025",
      "limit": "Europe includes Türkiye; exports are destination volumes, not realized receipts."
    },
    {
      "id": "europe-share",
      "title": "4 · Europe share of U.S. LNG exports",
      "baseline": 53,
      "outcome": 68,
      "unit": "percent",
      "source": "eiaLNGDestinations2025",
      "limit": "Rounded shares; not Europe's dependence on the U.S. as a share of all its energy."
    },
    {
      "id": "us-to-asia",
      "title": "5 · U.S. LNG shipped to Asia",
      "baseline": 4,
      "outcome": 2.5,
      "unit": "Bcf/day",
      "source": "eiaLNGDestinations2025",
      "limit": "Trade reallocation is not automatically a U.S. net economic gain."
    },
    {
      "id": "us-to-china",
      "title": "6 · U.S. LNG shipped to China",
      "baseline": 0.6,
      "outcome": 0,
      "unit": "Bcf/day",
      "source": "eiaLNGDestinations2025",
      "limit": "EIA attributes resale patterns to trade tensions; zero is a reported 2025 flow, not a permanent forecast."
    },
    {
      "id": "us-to-egypt",
      "title": "7 · U.S. LNG shipped to Egypt",
      "baseline": 0.3,
      "outcome": 1.2,
      "unit": "Bcf/day",
      "source": "eiaLNGDestinations2025",
      "limit": "A destination flow, not evidence of a particular buyer's long-term dependency."
    },
    {
      "id": "europe-all-suppliers",
      "title": "8 · European LNG imports from all suppliers",
      "baseline": null,
      "outcome": 29,
      "unit": "percent year-on-year growth in 2025",
      "source": "eiaGlobalTrade2025",
      "limit": "2025 percentage change only, not Bcf/day or U.S.-specific market share; no 2024 percentage baseline."
    }
  ],
  "interpretation": "Eight distinct observed trade indicators, primarily from two EIA articles drawing on Natural Gas Monthly and GIIGNL. These are related measures from overlapping datasets, not eight independent causal studies. 2025 predates the 2026 Hormuz disruption; no post-disruption causation is inferred.",
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "evidenceQualityGates": {
  "title": "Eight evidence-quality gates for the LNG investigation",
  "status": "Methodological safeguards · no new empirical outcomes",
  "reviewed": "2026-10-31",
  "checks": [
    {
      "id": "source-independence",
      "title": "1 · Source independence",
      "risk": "Several CCH figures derive from the same SEC filing; repeated rows do not constitute independent corroboration.",
      "requirement": "Require a genuinely independent source for disputed or causal assertions; identify shared underlying datasets.",
      "baselineSource": "cch2025Sec"
    },
    {
      "id": "accounting-boundary",
      "title": "2 · Consistent accounting boundary",
      "risk": "CCH consolidated financials and Stage 3 construction figures cover different scopes.",
      "requirement": "Label entity, project, affiliate transactions and time period before calculating any return.",
      "baselineSource": "cch2025Sec"
    },
    {
      "id": "cash-vs-accrual",
      "title": "3 · Cash versus accrual",
      "risk": "Reported revenue and cash flow are not interchangeable.",
      "requirement": "Reconcile recognized sales, working capital and cash collections before stating realized receipts.",
      "baselineSource": "cch2025Sec"
    },
    {
      "id": "price-vs-profit",
      "title": "4 · Price versus profit",
      "risk": "DOE FOB prices exclude downstream costs and cannot establish company profit.",
      "requirement": "Require matched shipment quantity, costs, contract and ownership data before margin claims.",
      "baselineSource": "doeLNGPrices2026Aug"
    },
    {
      "id": "counterfactual",
      "title": "5 · Causal counterfactual",
      "risk": "Stage 3 startup predates the later 2026 disruptions.",
      "requirement": "Compare observed output with a credible no-disruption scenario; distinguish trend from event effect.",
      "baselineSource": "eiaCorpusStartup"
    },
    {
      "id": "domestic-incidence",
      "title": "6 · Domestic cost incidence",
      "risk": "Henry Hub changes alone cannot isolate export-driven household and manufacturing costs.",
      "requirement": "Use matched consumer/industry series and control for weather, supply, storage and other demand.",
      "baselineSource": "eiaHenryHubAnnual"
    },
    {
      "id": "model-vs-observation",
      "title": "7 · Model versus observed outcome",
      "risk": "DOE 2050 scenario results are not observed 2026 household bills.",
      "requirement": "Separate model assumptions, scenario year, price basis and uncertainty from historical observations.",
      "baselineSource": "doeLngEconomic2025"
    },
    {
      "id": "netting-and-uncertainty",
      "title": "8 · Nonduplicative national accounting",
      "risk": "Adding revenue, capital spending and borrowing double-counts flows and omits costs.",
      "requirement": "Use comparable incremental welfare measures, cost allocation and uncertainty intervals before any net benefit score.",
      "baselineSource": "cch2025Sec"
    }
  ],
  "interpretation": "These are publication safeguards, not verified discoveries. Each baseline citation supports the identified limitation or data category; it does not resolve the underlying causal question.",
  "newEmpiricalFindings": 0,
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "causalResearchGates": {
  "title": "Eight unanswered tests of who benefits from LNG expansion",
  "status": "OPEN RESEARCH QUESTIONS — NOT VERIFIED OUTCOMES",
  "asOf": "2026-10-31",
  "questions": [
    {
      "id": "incremental-sales",
      "title": "1 · Additional export sales",
      "known": "CCH recognized revenue and DOE destination FOB prices are documented.",
      "missing": "Destination-matched realized shipment quantities and attributable third-party cash receipts, excluding affiliate double-counting.",
      "test": "Reconcile invoices/receivables with shipment-level quantities, contract prices and ownership.",
      "source": "cch2025Sec"
    },
    {
      "id": "incremental-margin",
      "title": "2 · Actual project margins",
      "known": "Consolidated CCH cash flows and Stage 3 construction spending are documented.",
      "missing": "Stage 3-only incremental operating expenses, revenue, debt service, maintenance and capital cost.",
      "test": "Calculate project-level cash margin only after a reconciled project boundary and counterfactual exist.",
      "source": "cch2025Sec"
    },
    {
      "id": "taxpayer-exposure",
      "title": "3 · Taxpayer costs and guarantees",
      "known": "Subsidiary financing flows are documented, but they do not measure public exposure.",
      "missing": "Award-level subsidies, tax expenditures, guarantees, permitting costs and public infrastructure spending, with recipient and dates.",
      "test": "Cross-check award, budget and guarantee records; avoid treating absence of an identified award as zero.",
      "source": "cch2025Sec"
    },
    {
      "id": "household-incidence",
      "title": "4 · Domestic household gas costs",
      "known": "EIA annual Henry Hub observations and conditional DOE 2050 model scenarios are separately documented.",
      "missing": "Observed regional residential bills and a defensible export-driven counterfactual.",
      "test": "Separate weather, production, storage, infrastructure and policy from export-driven price effects.",
      "source": "eiaHenryHubAnnual"
    },
    {
      "id": "manufacturing-incidence",
      "title": "5 · Domestic industry competitiveness",
      "known": "The domestic benchmark price series alone does not establish factory impacts.",
      "missing": "Industry-level natural-gas input cost, output, employment and export response matched over time.",
      "test": "Compare gas-intensive industries with plausible controls and account for broader economic trends.",
      "source": "eiaHenryHubAnnual"
    },
    {
      "id": "european-dependence",
      "title": "6 · European buyer dependence",
      "known": "DOE destination FOB prices establish export-side prices, not the buyer's full delivered cost.",
      "missing": "Destination-matched delivered prices, total imports, substitution options and contract flexibility.",
      "test": "Measure concentration, alternatives and delivered-cost changes; distinguish supply security from coercive leverage.",
      "source": "doeLNGPrices2026Aug"
    },
    {
      "id": "causal-timing",
      "title": "7 · What actually caused capacity growth",
      "known": "Stage 3 startup predates the later 2026 disruptions.",
      "missing": "Pre-disruption investment decisions, contractual commitments, capacity utilization and credible alternative scenarios.",
      "test": "Separate investment timing, 2025 output, and any post-disruption change in sales or utilization.",
      "source": "eiaCorpusStartup"
    },
    {
      "id": "national-net",
      "title": "8 · Net American benefit",
      "known": "Revenue, capital outlays, financing and conditional model projections use incompatible accounting scopes.",
      "missing": "Comparable incremental producer surplus, consumer costs, public costs, wages, taxes, environmental effects and alternative uses.",
      "test": "Build a non-duplicative national accounting boundary and uncertainty ranges before assigning any net result.",
      "source": "cch2025Sec"
    }
  ],
  "rule": "A research question is not an evidence milestone or a confirmed outcome. Keep all scores null until independently corroborated causal outcomes and comparable costs are available.",
  "resolvedCount": 0,
  "netBenefitUsd": null,
  "influenceScore": null
},
            "eightPointAudit": {
  "title": "Eight-point LNG evidence integrity audit",
  "status": "Eight descriptive cross-checks; no causal or national-benefit scoring",
  "unitNote": "USD millions unless otherwise noted; observations drawn from previously published source records",
  "items": [
    {
      "id": "external-share",
      "title": "1 · Third-party revenue share",
      "source": "cch2025Sec",
      "baseline": 0.7375,
      "outcome": 0.6842024303953238,
      "unit": "fraction",
      "method": "Third-party revenue divided by total reported revenue; affiliate revenue is not an extra external receipt.",
      "limit": "Revenue is accrued, not cash received."
    },
    {
      "id": "reported-revenue-change",
      "title": "2 · Reported revenue change",
      "source": "cch2025Sec",
      "baseline": 4880,
      "outcome": 6501,
      "unit": "USD millions",
      "method": "2025 reported revenue minus 2024 reported revenue.",
      "limit": "Consolidated CCH change cannot be assigned entirely to Stage 3."
    },
    {
      "id": "operating-cash-change",
      "title": "3 · Operating cash-flow change",
      "source": "cch2025Sec",
      "baseline": 1771,
      "outcome": 1995,
      "unit": "USD millions",
      "method": "Consolidated operating cash flows; do not subtract embedded operating payments again.",
      "limit": "Not project-specific incremental return."
    },
    {
      "id": "investing-outflow-change",
      "title": "4 · Investing cash outflow change",
      "source": "cch2025Sec",
      "baseline": 1830,
      "outcome": 2306,
      "unit": "USD millions outflow magnitude",
      "method": "Compare positive magnitudes of net cash used in investing activities.",
      "limit": "Includes other projects; not all Stage 3 costs."
    },
    {
      "id": "interest-expense",
      "title": "5 · Interest expense after capitalization",
      "source": "cch2025Sec",
      "baseline": 65,
      "outcome": 31,
      "unit": "USD millions",
      "method": "Total interest incurred less capitalized interest: 239−174 and 221−190.",
      "limit": "Accrual expense differs from cash interest; capitalized interest is not an extra cost to add."
    },
    {
      "id": "construction-spend",
      "title": "6 · Stage 3 construction cash spending",
      "source": "cch2025Sec",
      "baseline": 1500,
      "outcome": 1300,
      "unit": "USD millions approximate",
      "method": "Compare reported approximate construction cash spending in 2024 and 2025.",
      "limit": "Do not add annual payments to EPC contract face value."
    },
    {
      "id": "doe-fob-belgium",
      "title": "7 · Belgium FOB LNG price",
      "source": "doeLNGPrices2026Aug",
      "baseline": 6.23,
      "outcome": 8.96,
      "unit": "USD/MMBtu",
      "method": "DOE vessel LNG annual FOB price, 2024 to 2025, same destination and unit.",
      "limit": "FOB price is not cash receipts, delivered consumer price or profit."
    },
    {
      "id": "henry-hub",
      "title": "8 · Henry Hub annual spot price",
      "source": "eiaHenryHubAnnual",
      "baseline": 2.19,
      "outcome": 3.52,
      "unit": "USD/MMBtu",
      "method": "EIA same-series annual U.S. benchmark observations for 2024 and 2025.",
      "limit": "Cannot attribute observed domestic price change to LNG exports without counterfactual."
    }
  ],
  "interpretation": "These eight checks reuse source-backed observations and explicitly retain source definitions. They are not eight independent geopolitical outcomes. Differences across revenue, cash flow, contract commitments and prices must not be summed.",
  "stage3ReturnUsd": null,
  "publicExposureUsd": null,
  "domesticExportAttributableCostUsd": null,
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "accountingReconciliationEvidence": {
  "title": "LNG audit · three accounting cross-checks",
  "status": "Reconciled published figures; descriptive calculations only",
  "unit": "USD millions unless otherwise stated",
  "checks": [
    {
      "title": "1 · Third-party and affiliate revenue reconcile to reported total",
      "source": "cch2025Sec",
      "baseline": {
        "thirdParty": 3599,
        "affiliate": 1281,
        "total": 4880
      },
      "outcome": {
        "thirdParty": 4448,
        "affiliate": 2053,
        "total": 6501
      },
      "method": "Third-party LNG revenue + affiliate LNG revenue = reported revenue in each year. Third-party share = third-party divided by total, displayed to one decimal percent.",
      "limitation": "Affiliate sales may represent intra-group transactions and are not an additional national export receipt. Recognized revenue is not cash collected."
    },
    {
      "title": "2 · Interest cost reconciles with capitalized interest",
      "source": "cch2025Sec",
      "baseline": {
        "total": 239,
        "capitalized": 174,
        "expense": 65
      },
      "outcome": {
        "total": 221,
        "capitalized": 190,
        "expense": 31
      },
      "method": "Total interest incurred minus capitalized interest = interest expense after capitalization for each year. Do not add the components together.",
      "limitation": "Cash interest paid net of capitalized amounts is a different cash-flow measure and must not be used to force a reconciliation to accrual interest."
    },
    {
      "title": "3 · Operating cash flow compared with investing outflows",
      "source": "cch2025Sec",
      "baseline": {
        "operating": 1771,
        "investingOutflow": 1830
      },
      "outcome": {
        "operating": 1995,
        "investingOutflow": 2306
      },
      "method": "Operating cash flow / magnitude of net investing cash outflow; ratio is a descriptive coverage comparison, not free cash flow or return on investment.",
      "limitation": "Investing outflows cover multiple projects, not Stage 3 alone. The ratio omits financing, working-capital context, asset-life recovery and future project returns."
    }
  ],
  "conclusion": "These reconciliations test internal accounting consistency; they do not measure incremental Stage 3 profit, U.S. national welfare or geopolitical influence.",
  "stage3ReturnUsd": null,
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "threePartFinancialAudit": {
  "title": "LNG economic incidence · three verified evidence checkpoints",
  "status": "Descriptive company accounts and modeled consumer impacts; net benefit not established",
  "components": [
    {
      "title": "1 · Recognized LNG revenue versus realized receipts",
      "source": "cch2025Sec",
      "rows": [
        {
          "label": "CCH LNG revenues, third-party",
          "baseline": 3599,
          "outcome": 4448,
          "unit": "USD millions"
        },
        {
          "label": "CCH LNG revenues, affiliates",
          "baseline": 1281,
          "outcome": 2053,
          "unit": "USD millions"
        },
        {
          "label": "CCH total reported revenue",
          "baseline": 4880,
          "outcome": 6501,
          "unit": "USD millions"
        }
      ],
      "note": "Recognized revenue is accrual accounting, not cash collected. Affiliate revenue is not an additional external national sale. Reported company-wide increase reflects higher Henry Hub-linked prices and additional output, not isolated Stage 3 realized margin or post-2025 disruption impact."
    },
    {
      "title": "2 · Financing cost and public exposure boundary",
      "source": "cch2025Sec",
      "rows": [
        {
          "label": "CCH total interest cost",
          "baseline": 239,
          "outcome": 221,
          "unit": "USD millions"
        },
        {
          "label": "CCH capitalized interest",
          "baseline": 174,
          "outcome": 190,
          "unit": "USD millions"
        },
        {
          "label": "CCH interest expense after capitalization",
          "baseline": 65,
          "outcome": 31,
          "unit": "USD millions"
        },
        {
          "label": "Cash interest paid, net of capitalized amounts",
          "baseline": 140,
          "outcome": 23,
          "unit": "USD millions"
        }
      ],
      "note": "Capitalized interest is included in qualifying asset costs; total interest already contains it. Do not sum total interest, capitalized interest and expense. Cash interest net of capitalized amounts is not all cash borrowing costs. Public grants, guarantees and taxpayer exposure have not been comprehensively verified; absence of an identified figure is not proof of zero exposure."
    },
    {
      "title": "3 · Domestic consumer impact: modeled, not observed",
      "source": "doeLngEconomic2025",
      "rows": [],
      "note": "DOE LNG export assessment scenario comparison for 2050, Defined Policies with reference U.S. supply: modeled Henry Hub $3.53 versus $4.62 per MMBtu (+31%) with higher model-resolved exports relative to existing/FID exports; modeled residential gas prices 4% higher. These are conditional 2050 model results in 2022 dollars, not observed 2024–2026 household bills or a causal estimate of 2025 price changes. The study does not establish a realized 2026 national net benefit."
    }
  ],
  "limitations": "CCH data are one subsidiary reporting family; DOE scenarios are a distinct modeling study, not independent realized outcomes. Company receipts, finance cost and hypothetical domestic-price impacts are not directly additive. Do not attribute these changes to 2026 disruptions.",
  "stage3ReturnUsd": null,
  "publicExposureUsd": null,
  "domesticRealizedCostUsd": null,
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "subsidiaryCashFlowEvidence": {
  "title": "Corpus Christi Holdings · cash generation and financing, 2024–2025",
  "status": "Audited consolidated subsidiary cash flows; Stage 3 incremental returns not isolated",
  "scope": "Cheniere Corpus Christi Holdings LLC and subsidiaries; USD millions; calendar years 2024 and 2025.",
  "observations": [
    {
      "label": "Operating cash flow",
      "baseline": 1771,
      "outcome": 1995,
      "unit": "USD millions",
      "source": "cch2025Sec"
    },
    {
      "label": "Net cash used in investing activities",
      "baseline": 1830,
      "outcome": 2306,
      "unit": "USD millions",
      "source": "cch2025Sec"
    },
    {
      "label": "Cash distributions to member",
      "baseline": 400,
      "outcome": 515,
      "unit": "USD millions",
      "source": "cch2025Sec"
    },
    {
      "label": "Cash contributions from member",
      "baseline": 415,
      "outcome": 375,
      "unit": "USD millions",
      "source": "cch2025Sec"
    },
    {
      "label": "Borrowing proceeds",
      "baseline": 0,
      "outcome": 550,
      "unit": "USD millions",
      "source": "cch2025Sec"
    }
  ],
  "accountingRules": "Operating cash flow already incorporates operating receipts and payments, working-capital changes and relevant cash settlements; do not subtract them again. Investing outflows include Stage 3, separate Trains 8 & 9 and other items; they are not Stage 3-only costs. Distributions and contributions are financing transfers within the ownership structure, not profit or public receipts. Borrowing proceeds are financing, not income. Do not add these lines into a national-benefit total or claim the 2025 change is caused by Stage 3.",
  "interpretation": "Operating cash flow increased $224 million year over year for the entire CCH consolidated business; the filing attributes the increase primarily to higher net LNG sales cash inflows, partially offset by working-capital timing. The figure cannot isolate incremental Stage 3 returns or effects of later 2026 disruptions.",
  "remaining": "Isolate Stage 3 cash inflows, realized cargo receipts and costs, asset-life capital recovery, financing allocation, domestic incidence, public exposure and a pre-disruption counterfactual.",
  "netNationalBenefitUsd": null,
  "stage3ReturnUsd": null,
  "influenceScore": null
},
            "projectCapitalEvidence": {
  "title": "Corpus Christi Stage 3 · construction costs and commitments",
  "status": "Reported subsidiary construction cash spending and EPC commitments; returns unmeasured",
  "scope": "Cheniere Corpus Christi Holdings (CCH), not all U.S. LNG exporters. USD billions; amounts approximate where reported.",
  "observations": [
    {
      "label": "Stage 3 construction costs paid",
      "baseline": 1.5,
      "outcome": 1.3,
      "unit": "USD billions",
      "period": "2024 → 2025",
      "source": "cch2025Sec"
    }
  ],
  "commitments": [
    {
      "label": "Stage 3 EPC contract price including change orders",
      "value": 6,
      "unit": "USD billions",
      "asOf": "December 31, 2025",
      "source": "cch2025Sec"
    },
    {
      "label": "Stage 3 EPC remaining contractual obligations",
      "value": 0.7,
      "unit": "USD billions",
      "asOf": "December 31, 2025",
      "source": "cch2025Sec"
    }
  ],
  "boundaries": "The $6.0B EPC price is a contract amount, not all-in capital invested, net present value or cash paid in 2025. Remaining $0.7B is part of the contract commitments, not an additional $0.7B to add to the contract price. The annual $1.5B and $1.3B construction cash spending are components of project investment, not profit or household costs. Do not sum these categories.",
  "remaining": "Verify complete lifetime capital spending, financing and interest allocation, post-2025 costs, project-specific realized operating cash flows, public exposure and domestic price counterfactual. Do not calculate project ROI or net national benefit.",
  "netNationalBenefitUsd": null,
  "influenceScore": null
},
            "capacityTimelineEvidence": {
  "title": "LNG capacity timing · preexisting investment versus later disruptions",
  "status": "Verified milestones; project return and causal impact unresolved",
  "scope": "Corpus Christi Stage 3, Texas; capacity is not shipped volume",
  "events": [
    {
      "date": "December 2024",
      "event": "First LNG production",
      "source": "eiaCorpusStartup"
    },
    {
      "date": "February 2025",
      "event": "First LNG cargo",
      "source": "eiaCorpusStartup"
    },
    {
      "date": "August 28, 2026",
      "event": "Final Stage 3 train transferred into custody and control",
      "source": "eiaCorpusComplete"
    }
  ],
  "capacity": "Stage 3: 1.3 Bcf/day nominal and 1.5 Bcf/day peak. Total Corpus Christi: 3.1 Bcf/day nominal and 3.9 Bcf/day peak.",
  "interpretation": "Production began in 2024. Later 2026 disruptions cannot be credited with initiating this project. Completion does not prove profit, net U.S. benefit or geopolitical leverage.",
  "remaining": "Project-specific realized capital spending, financing, operating costs, cash receipts, public exposure and counterfactual are not established. No influence score."
},
            "exportPriceEvidence": {
              "caseId": "doe-destination-fob-2024-2025",
              "title": "DOE destination comparisons · FOB export prices",
              "status": "Observed export-price statistics; realized receipts and margins unresolved",
              "scope": "LNG by vessel only; 15 European destinations with numeric annual observations in both 2024 and 2025. Includes non-EU countries and Turkiye under DOE’s convention. ISO containers, trucks and year-to-date columns are excluded.",
              "baselinePeriod": "2024 calendar year",
              "comparisonPeriod": "2025 calendar year",
              "unit": "USD/MMBtu",
              "priceBasis": "FOB",
              "transport": "Vessel",
              "stage": "Independently measured outcome",
              "stageLimitation": "Government-published reported statistics, not an independent audit of cash receipts or causal outcomes.",
              "source": "doeLNGPrices2026Aug",
              "sourceFamily": "DOE natural gas import/export reporting",
              "published": "2026-10-22",
              "retrieved": "2026-10-31",
              "table": "15b, printed page 32 (PDF page 38)",
              "definition": "FOB export prices include commodity and liquefaction costs up to export. They are not realized company revenue, cash receipts, profit, or net national economic benefit; subsequent shipping and regasification are outside this price boundary.",
              "comparability": "Each row compares the same destination, vessel mode, annual period and USD/MMBtu definition within one report vintage. Cargo, seller and contract mix can change; this is not a constant-contract price index. Missing or withheld values must stay null, never zero.",
              "calculation": "Change = 2025 price minus 2024 price, rounded to two decimals. No volume multiplication, regional average or profit estimate is calculated. MMBtu measures energy; Bcf measures volume and cannot be substituted without heat-content conversion.",
              "independence": "DOE price rows are one reporting family, not 15 independent geopolitical outcomes. EIA republication of DOE data does not add independent confirmation.",
              "observations": [
                {
                  "destination": "Belgium",
                  "baseline": 6.23,
                  "outcome": 8.96,
                  "change": 2.73
                },
                {
                  "destination": "Croatia",
                  "baseline": 5.89,
                  "outcome": 7.0,
                  "change": 1.11
                },
                {
                  "destination": "Finland",
                  "baseline": 6.45,
                  "outcome": 6.62,
                  "change": 0.17
                },
                {
                  "destination": "France",
                  "baseline": 6.26,
                  "outcome": 7.66,
                  "change": 1.4
                },
                {
                  "destination": "Germany",
                  "baseline": 8.66,
                  "outcome": 8.98,
                  "change": 0.32
                },
                {
                  "destination": "Greece",
                  "baseline": 6.83,
                  "outcome": 7.83,
                  "change": 1.0
                },
                {
                  "destination": "Italy",
                  "baseline": 6.05,
                  "outcome": 7.9,
                  "change": 1.85
                },
                {
                  "destination": "Lithuania",
                  "baseline": 5.87,
                  "outcome": 7.6,
                  "change": 1.73
                },
                {
                  "destination": "Malta",
                  "baseline": 5.49,
                  "outcome": 6.49,
                  "change": 1.0
                },
                {
                  "destination": "Netherlands",
                  "baseline": 5.94,
                  "outcome": 7.67,
                  "change": 1.73
                },
                {
                  "destination": "Poland",
                  "baseline": 6.37,
                  "outcome": 7.14,
                  "change": 0.77
                },
                {
                  "destination": "Portugal",
                  "baseline": 5.1,
                  "outcome": 6.22,
                  "change": 1.12
                },
                {
                  "destination": "Spain",
                  "baseline": 6.03,
                  "outcome": 7.45,
                  "change": 1.42
                },
                {
                  "destination": "Turkiye",
                  "baseline": 6.86,
                  "outcome": 8.13,
                  "change": 1.27
                },
                {
                  "destination": "United Kingdom",
                  "baseline": 7.08,
                  "outcome": 8.06,
                  "change": 0.98
                }
              ],
              "revenueFinding": "Cheniere assigns country revenue using the contractual buyer’s principal business location, not cargo destination. Its UK revenue cannot be matched directly to DOE UK deliveries or extrapolated to Europe. No matched cash receipts or cargo netback has been established.",
              "revenueSource": "cheniere2025Geography",
              "costFinding": "The existing audited company table documents capital spending, operating costs and financing. Those consolidated figures cannot be allocated to these destinations without contract and project accounts. Lifetime capital recovery, public exposure and export-attributable household costs remain open.",
              "domesticFollowup": {
                "baseline": 2.19,
                "outcome": 3.52,
                "unit": "USD/MMBtu",
                "source": "eiaHenryHubAnnual",
                "text": "A same-series check of EIA’s annual Henry Hub spot series gives $2.19/MMBtu for 2024 and $3.52/MMBtu for 2025 (release October 28, 2026). This supplements the differently sourced historical context below. It does not reconcile all provider/vintage differences or identify the contribution of exports to domestic prices or bills."
              },
              "realizedRevenueUsd": null,
              "realizedMarginUsd": null,
              "netNationalBenefitUsd": null,
              "influenceScore": null
            },
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
    "eiaGasResidentialHistory":{"label":"EIA · Monthly U.S. residential gas price, 2025–2026","url":"https://www.eia.gov/dnav/ng/hist/n3010us3m.htm","date":"2026-10-30"},
    "eiaGasCommercialHistory":{"label":"EIA · Monthly U.S. commercial gas price, 2025–2026","url":"https://www.eia.gov/dnav/ng/hist/n3020us3m.htm","date":"2026-10-30"},
    "eiaGasIndustrialHistory":{"label":"EIA · Monthly U.S. industrial gas price, 2025–2026","url":"https://www.eia.gov/dnav/ng/hist/n3035us3m.htm","date":"2026-10-30"},
    "eiaGasLNGExportHistory":{"label":"EIA · Monthly U.S. LNG export price, 2025–2026","url":"https://www.eia.gov/dnav/ng/hist/n9133us3m.htm","date":"2026-10-30"},
    "eiaNaturalGasPricesAug2026": {"label":"EIA Natural Gas Monthly · U.S. Natural Gas Prices, August 2026, released October 30","url":"https://www.eia.gov/dnav/ng/ng_pri_sum_dcu_nus_m.htm","date":"2026-10-30; August 2026"},
    "eiaElectricity2026Aug": {"label":"EIA Electric Power Monthly · Table ES1.B, U.S. retail electricity sales, revenue and average price, January–August 2025 and 2026","url":"https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=table_es1b","date":"2026-10; YTD through August"},
    "cheniereQ32026Sec": {"label":"Cheniere Energy · SEC Form 10-Q, nine months ended September 30, 2026, cash flows and notes","url":"https://www.sec.gov/Archives/edgar/data/3570/000000357026000038/lng-20260930.htm","date":"2026-10-29"},
    "cheniereQ32026": {"label":"Cheniere Energy · Third Quarter 2026 Results, reported October 28, 2026","url":"https://lngir.cheniere.com/news-events/press-releases/detail/349/cheniere-reports-third-quarter-2026-results-raises-full","date":"2026-10-28"},
    "eiaOct2026Steo": {"label":"EIA · October 2026 Short-Term Energy Outlook natural gas table","url":"https://www.eia.gov/outlooks/steo/marketreview/natgas.php","date":"2026-10-06"},
    "eiaH12026Exports": {"label":"EIA · U.S. LNG exports rose 23% in the first half of 2026 because of higher capacity","url":"https://www.eia.gov/todayinenergy/detail.php?id=68064","date":"2026-09-01"},
    "eiaGlobalTrade2025": {"label":"EIA · Global LNG trade volumes reached record high in 2025 (GIIGNL and Natural Gas Monthly)","url":"https://www.eia.gov/todayinenergy/detail.php?id=67864","date":"2026-07-14"},
    "eiaLNGDestinations2025": {"label":"EIA · U.S. natural gas exports to grow nearly 30% by 2027 (2024–25 observed destination flows)","url":"https://www.eia.gov/todayinenergy/detail.php?id=67484","date":"2026-04-16"},
    "doeLngEconomic2025": {"label":"DOE · Energy, Economic, and Environmental Assessment of U.S. LNG Exports (model scenarios)","url":"https://www.energy.gov/sites/default/files/2025-10/ENERGY%2C%20ECONOMIC%2C%20AND%20ENVIRONMENTAL%20ASSESSMENT%20OF%20U.S.%20LNG%20EXPORTS_0.pdf","date":"2025-10; 2050 scenario projections"},
    "cch2025Sec": {"label":"Cheniere Corpus Christi Holdings · FY2025 SEC Form 10-K, construction costs and EPC commitments","url":"https://www.sec.gov/Archives/edgar/data/1693317/000169331726000003/cch-20251231.htm","date":"2026-02-26; FY2024–FY2025 figures"},
    "eiaCorpusStartup": {"label":"EIA · Corpus Christi Stage 3 first cargo","url":"https://www.eia.gov/todayinenergy/detail.php?id=64704","date":"2025-03-11"},
    "eiaCorpusComplete": {"label":"EIA · Corpus Christi Stage 3 completion","url":"https://www.eia.gov/todayinenergy/detail.php?id=68144","date":"2026-09-15"},
    "doeLNGPrices2026Aug": {"label": "DOE · August 2026 report, Table 15b (annual columns)", "url": "https://www.energy.gov/sites/default/files/2026-10/Natural%20Gas%20Imports%20and%20Exports%20Monthly%20August%202026.pdf#page=38", "date": "2026-10-22; 2024–2025 annual observations"},
    "cheniere2025Geography": {"label": "Cheniere FY2025 10-K · geographic revenue attribution", "url": "https://lngir.cheniere.com/sec-filings/all-sec-filings/xbrl_doc_only/4763", "date": "2026-02-26; FY2024–FY2025 observations"},
    "eiaHenryHubAnnual": {"label": "EIA · Henry Hub annual spot price series", "url": "https://www.eia.gov/dnav/ng/hist/rngwhhda.htm", "date": "2026-10-28 release; 2024–2025 observations"},

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
