# Command Meter gap-closure reset — executable first pass

## Audit finding from actual production data (not an editorial guess)
`chaos-meter-data.js` still reports **53% editorial readiness**, with components: technical 90, verified economic evidence 60, costs-versus-benefits 50, causation/counterfactuals 25, and influence scoring 20. Its `lastEvidencePr` remains **201** despite many subsequent research PRs. This is a **stale provenance field**, not proof that all later work was worthless, and not permission to raise readiness without review.

`chaos-meter-model.js` requires **two independent measured outcome groups, dated baseline, cost accounting, counterfactual, predeclared materiality normalization, net change, moderate/high confidence and editorial approval** before scoring any geopolitical influence dimension. Merely collecting an LNG share, GDP growth, military spending or treaty announcement does not satisfy those requirements.

## New executable audit
Run `node scripts/audit_command_meter_gaps.cjs [output.json]`. It evaluates **all 20 country/dimension slots** (US, China, Russia, EU, India × economic, strategic, diplomatic, energy/resources) using the **actual production data and actual scoring model**. It emits category, source-backed numeric observation count, scoring eligibility, and precise missing scoring requirements. A GitHub Action runs automatically after changes to main data/model/audit files and preserves the JSON as an artifact. **No manual launch is required** after those changes; a manual dispatch option remains available.

The first-pass categories are intentionally narrow: `verified-scored`, `verified-observation`, `researchable`, `missing-record`. The automated script **does not claim** to establish the deeper statuses `estimated` or `unidentifiable` from source existence alone. Those require separate reviewed uncertainty/identification worksheets. No source-backed observation becomes a scored influence finding automatically.

## Concrete closure backlog (not more duplicative documentation)
1. **EU LNG conflict:** Eurostat EU27 LNG 2025/26 US 34.56→40.58% versus NUPI/Bruegel EEA US 57→62%. Both are traceable, **not comparable yet**. Identify country coverage, commodity codes, partner basis, reporting origin, and source vintage. Do not activate EEA needle based on EU27 numbers.
2. **US domestic cost incidence:** Existing 2026 wholesale and delivered-price observations are descriptive. Estimate export-caused marginal cost only with a stated no-shock identification design, uncertainty and separate sector exposure.
3. **US export financial attribution:** Reconcile realized third-party receipts, margins, capital recovery, public costs and displacement effects by matched project/period; corporate totals cannot stand for national welfare.
4. **Geopolitical influence:** The EU methane recommendation is a documented policy event but nonbinding and multi-causal. Demand-to-decision chronology is insufficient without competing-cause assessment.
5. **All 20 dimensions:** The new executable output supplies a current, per-slot scoring requirement list. Prioritize missing *measured outcomes* before new descriptive proxies.

## Score and readiness integrity
Keep 53% until a human-reviewed, specific criterion is closed. **Do not lower the denominator, assign probabilities to unknown causal outcomes, or auto-raise readiness on merges.** Maintain separate future measures of (a) observed evidence coverage, (b) causal identification coverage, and (c) editorial project readiness. Existing needle, selectors, comparisons and evidence panels are not modified in this milestone.

**Limitations:** This first executable audit is scoped to the 20 primary actor/dimension slots; it does **not yet traverse every nested US LNG economic gate**. A follow-up should map those gates by stable IDs and statuses and link them to the same report rather than create another prose-only PR.
