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
  "researchWorksheets": {
    "us": {
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
