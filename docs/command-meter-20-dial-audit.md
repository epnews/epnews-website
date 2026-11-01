# EP News — 20-dial evidence quality audit

**Scope:** main after PR #241. All 20 indicators reviewed. Grades are **editorial evidence quality, not influence scores**. B = observed numeric indicator with limitations; C = contextual input/proxy; D = mismatched comparison or institutional milestone. P0 = urgent correction; P1 = important replacement; P2 = longer-term causal upgrade. No grade changes the dashboard needle or its scale.

| Country | Dimension | Metric | Grade | Priority | Main limitation | Research gate |
|---|---|---|---|---|---|---|
| US | Economic | `gdp-growth-2025` | C | P2 | GDP is macro context, not net geopolitical benefit | Measure realized cross-border receipts, jobs, costs and counterfactual |
| US | Strategic | `sipri-real-change-2025` | C | P2 | Defense spending is input, not delivered capability; EDA differs from SIPRI | Measure delivered capabilities, access, readiness and security outcomes |
| US | Diplomatic | `nato-membership-change` | C | P1 | Institutional milestone or tariff coverage, not measured influence | Measure burden-sharing and delivered alliance capabilities |
| US | Energy and resources | `lng-export-share-pp` | B | P1 | LNG share is not realized exporter margin or national net benefit | Measure realized receipts, margins, financing and consumer costs |
| CHINA | Economic | `gdp-growth-2025` | C | P2 | GDP is macro context, not net geopolitical benefit | Measure realized cross-border receipts, jobs, costs and counterfactual |
| CHINA | Strategic | `sipri-real-change-2025` | C | P2 | Defense spending is input, not delivered capability; EDA differs from SIPRI | Measure delivered capabilities, access, readiness and security outcomes |
| CHINA | Diplomatic | `china-mediated-embassies-reopened-count` | D | P1 | Institutional milestone or tariff coverage, not measured influence | Verify sustained Saudi–Iran security outcomes |
| CHINA | Energy and resources | `china-oil-import-context-gap` | D | P0 | Annual 2025 versus Q2 2026 periods are unmatched | Find same-definition Q2 2025 vs Q2 2026 customs imports and check inventory |
| RUSSIA | Economic | `gdp-growth-2025` | C | P2 | GDP is macro context, not net geopolitical benefit | Measure realized cross-border receipts, jobs, costs and counterfactual |
| RUSSIA | Strategic | `sipri-real-change-2025` | C | P2 | Defense spending is input, not delivered capability; EDA differs from SIPRI | Measure delivered capabilities, access, readiness and security outcomes |
| RUSSIA | Diplomatic | `russia-dprk-treaties-in-force-count` | D | P1 | Institutional milestone or tariff coverage, not measured influence | Measure treaty implementation and associated costs |
| RUSSIA | Energy and resources | `russia-eu-gas-decline-minimum` | C | P1 | Lower-bound gas-flow decline, not exact revenue | Verify matched prices, receipts, rerouting costs |
| EU | Economic | `gdp-growth-2025` | C | P2 | GDP is macro context, not net geopolitical benefit | Measure realized cross-border receipts, jobs, costs and counterfactual |
| EU | Strategic | `defence-spending-change-pct` | C | P2 | Defense spending is input, not delivered capability; EDA differs from SIPRI | Measure delivered capabilities, access, readiness and security outcomes |
| EU | Diplomatic | `eu-nz-bilateral-trade-growth-pct` | B | P2 | Observed nominal trade increase; no treaty attribution | Isolate treaty effect, price and currency impacts |
| EU | Energy and resources | `eu-russian-gas-import-share-pp` | B | P1 | Matched annual gas shares, not total vulnerability or replacement costs | Quantify substitute supply, prices, infrastructure and demand |
| INDIA | Economic | `gdp-growth-2025` | C | P2 | GDP is macro context, not net geopolitical benefit | Measure realized cross-border receipts, jobs, costs and counterfactual |
| INDIA | Strategic | `sipri-real-change-2025` | C | P2 | Defense spending is input, not delivered capability; EDA differs from SIPRI | Measure delivered capabilities, access, readiness and security outcomes |
| INDIA | Diplomatic | `india-efta-tariff-lines-covered-pct` | D | P1 | Institutional milestone or tariff coverage, not measured influence | Measure matched TEPA trade, FDI and jobs |
| INDIA | Energy and resources | `india-crude-import-dependence-pp` | B | P1 | Matched fiscal years but latest figure provisional | Verify revised PPAC import dependence, prices and supplier mix |

## Findings and safeguards

- **20/20 numeric indicators; zero validated influence scores.** Different units, periods and meanings must never be summed, ranked by needle angle or averaged into a country score.
- **China Energy (P0):** −3.5 million barrels/day compares a 2025 annual average to Q2 2026, not matched quarters. Research Q2 2025 and Q2 2026 from one official methodology; if unavailable, keep its unmatched-context warning prominent and do not call it a trend.
- **Diplomatic:** China embassies reopened and Russia DPRK treaty took effect in 2023–24; India TEPA 92.2% tariff-line coverage is an implementation commitment. None proves a new 2026 influence gain. EU–NZ +8% is observed nominal trade, not treaty-attributable growth. NATO membership is a joint institutional outcome.
- **Economic:** 2025 GDP growth measures domestic macro activity, not conflict-driven gains or national net benefit.
- **Strategic:** Spending measures inputs, not military readiness or deterrence. EU EDA and SIPRI series use different definitions and should not be ranked as equivalent.
- **Energy:** Add realized prices, margins, consumer costs, infrastructure and financing costs, alternative supply, inventory, and a credible counterfactual before asserting net benefits.
- **No invented scores:** preserve `score:null` until matched outcome data, credible attribution, and costs support a defensible quantitative inference.

## Research order

1. **P0:** China Q2 2025 vs Q2 2026 crude imports (matched unit, quarter and source).
2. **P1:** Russia gas revenue and EU replacement supply cost; India TEPA realized trade/FDI; US LNG realized receipts and domestic costs.
3. **P2:** Replace macro GDP and military-spending inputs with verified sector-specific and delivered-capability outcomes where available.

**Readiness stays 53%.** Publishing an audit does not close the causal or cost-accounting evidence gaps.
