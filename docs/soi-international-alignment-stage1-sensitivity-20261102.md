# Stage 1: UNGA alignment sensitivity crosswalk

This is a reproducible **derived-data audit**, not independent reproduction from the original ~2-million-row vote archive. It crosschecks the existing full recorded-vote cohort against a six-code restricted policy-topic cohort for **20 actor-year readings** (five spheres × 2021–2024), and joins published worst-case missing-vote bounds.

The maximum absolute gap between restricted and full-cohort readings is **4.5179 percentage points**. This shows why the selected UN resolution cohort must be stated beside every percentage. Missing-vote bounds assume all missing partners disagree (lower) or agree (upper); they are **not** statistical confidence intervals. Both cohorts share a 160-partner frozen universe but differ in resolution selection. The EU reference is a derived 20-member / 75% supermajority proxy, **not** a sovereign EU vote.

| Sphere | 2024 full cohort | 2024 restricted six-code | Difference (pp) | 2024 full-cohort missing-vote bounds |
|---|---:|---:|---:|---|
| US | 32.09% | 27.64% | -4.45 | 29.43–37.71% |
| CHINA | 66.22% | 68.02% | 1.80 | 60.66–69.06% |
| RUSSIA | 51.46% | 54.23% | 2.77 | 47.17–55.51% |
| EU | 58.95% | 56.36% | -2.59 | 54.00–62.39% |
| INDIA | 66.01% | 65.59% | -0.42 | 60.51–68.84% |

## Remaining publication blockers

1. Independently reproduce numerator and denominator from the original archive and verify source license/hash.
2. Verify EU proxy against raw EU27 positions and alternative 90%/24-vote thresholds.
3. Choose and pre-register the production topic cohort; document changing issue composition and absent/abstaining votes.
4. Integrate descriptive alignment as its own percent scale without assigning influence points or including it in the old weighted overall score.
5. Run desktop/mobile and existing needle/selector/evidence regression tests before any UI migration.

**No live code or public meter changes in this stage.**
