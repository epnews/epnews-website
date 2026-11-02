# EU27 LNG: full partner-cell reconciliation from official capture

**Official extraction:** [GitHub Actions run #41398935427](https://github.com/epnews/epnews-website/actions/runs/41398935427), artifact `europe-lng-all-partners.json` (ID 13120931082). Dataset `nrg_ti_gasm`, `G3200`, `MIO_M3`, EU27_2020, Jan–Jun 2025/2026.

The full partner table provides a decisive completeness test absent from the earlier six-partner residual: adding **all reported non-TOTAL partner cells** gives 74.761468 bcm against 74.763896 bcm total in H1 2025 (difference **0.002428 bcm**) and 71.913065 bcm against 71.913064 bcm in H1 2026 (difference **-0.000001 bcm**). There are 24 positive partner codes in 2025 and 28 in 2026. This establishes that the earlier 41.384/34.837 bcm *six-partner residual* was overwhelmingly accounted for by other partner codes, **not simply unclassified origin**.

| EU27 H1, bcm | 2025 | 2026 |
|---|---:|---:|
| Total LNG | 74.763896 | 71.913064 |
| US-coded | 25.838331 | 29.181938 |
| NSP-coded | 7.209819 | 9.818390 |
| All other attributed categories (total minus US minus NSP) | 41.715746 | 32.912736 |
| Sum of non-TOTAL partner cells | 74.761468 | 71.913065 |

**Largest partner labels, H1 2025:** US 25.838331, Algeria (DZ) 12.723260, Nigeria (NG) 8.937726, Russia (RU) 7.428523, NSP 7.209819, Qatar (QA) 5.782623 bcm. **H1 2026:** US 29.181938, DZ 11.769738, NSP 9.818390, RU 7.734844, NG 6.269702, QA 2.039884 bcm.

**Implication:** The official Eurostat LNG aggregate is almost fully accounted for across partner codes; the mismatch with NUPI's separately rounded EEA US-origin totals cannot be characterized as simply missing Eurostat partner data. Reporting conventions, ultimate versus transit origin, geographical scope, and vintage must still be matched. Named Eurostat partner labels are **not independently verified physical cargo origins**. Do not reassign named DZ/NG/RU/QA flows to US without cargo-level evidence.

**Reproducibility:** `node scripts/audit_europe_lng_full_partner_residual_20261102.cjs europe-lng-all-partners.json` verifies full partner-cell summation within 0.01 bcm and outputs top contributors. No causal inference, score or command-meter UI change. SOI audit remains 20/30; Europe readiness remains 53%.
