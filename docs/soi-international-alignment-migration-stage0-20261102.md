# Diplomatic Influence → International Alignment: staged migration

## Decision

Replace the **Diplomatic Influence** category with **International Alignment**: a descriptive UNGA recorded-vote agreement percentage for a fixed external partner cohort. It measures voting agreement, **not persuasion, influence, support for an actor's policy, or net benefit**. Diplomatic treaties, embassies and mediation remain accessible as *unscored implementation evidence*.

## Dataset audit

- Frozen 160 external partners; annual 2021–2024 recorded resolutions: 86, 89, 88, 95.
- Five reference positions: US, China, Russia, India sovereign recorded votes; EU-27 supermajority-derived proxy requiring >=20 valid member votes and >=75% agreement. This is **not** an EU UNGA vote.
- Preliminary full-cohort agreement percentages by year (2021, 2022, 2023, 2024):
  - US: 26.3343%, 34.4341%, 31.0386%, 32.0913%
  - CHINA: 71.6275%, 64.8438%, 65.1993%, 66.2191%
  - RUSSIA: 57.5385%, 51.4975%, 48.9646%, 51.4606%
  - INDIA: 67.6766%, 65.4398%, 65.3877%, 66.0088%
  - EU: 60.4288%, 61.2742%, 58.7824%, 58.9489%
- Restricted six-topic cohort is a different denominator and cannot replace the above. Annual topic changes, abstentions, missing positions, resolution selection and source vintage need sensitivity audits.
- The 2021–2024 frozen-partner file is explicitly preliminary; a complete five-sphere production dial is **not authorized** by this stage.

## Meter code audit

- **source-cohort (blocker)**: Frozen external partner series is preliminary; verify archive hash, denominator, source licensing, annual topic mix, matched resolution cohort and independently reproduce calculations before public needle.
- **restricted-topic (blocker)**: Six-code restricted policy-topic cohort differs from full recorded-vote cohort; must show sensitivity and coverage rather than silently interchange percentages.
- **eu-proxy (blocker)**: EU has no sovereign UNGA vote; EU-27 supermajority proxy must be clearly labeled, sensitivity-tested and shown as unavailable when insufficient member agreement.
- **legacy-data (integration)**: Existing data.dimensions, weights, actors and evidence maps use Diplomatic as object key; renaming a selector without a compatibility adapter would break lookups.
- **legacy-model (integration)**: Model assessment expects four influence assessments with Diplomatic weighted .20; International Alignment is a descriptive percentage and must not be inserted as if it were a net-influence score.
- **legacy-dashboard (integration)**: Voting evidence, diplomatic cases, selectedScore, cards and selectors branch on Diplomatic; migration must preserve archived cases in a separate drawer and existing gauge states.
- **regressions (integration)**: Command-meter tests reference existing dimensions, source registries and moving needle behavior; avoid mass replace of legacy keys and preserve all non-diplomatic paths.

## Migration order

0. **Audit and freeze metric contract** — Published research audit, tests, no changed UI or model scores
1. **Introduce isolated alignment view-model and independent reproduction** — Matched partner denominators, EU proxy, abstention/absence and topic sensitivity validated for 2021–2024
2. **Display International Alignment selector with descriptive percent and trend, separate from influence score** — Feature flag, legacy Diplomatic alias for archived evidence, all existing selectors/needles work; insufficient data shows unavailable
3. **Remove obsolete diplomatic scoring weight from any overall influence composite and revise methodology** — No mixing of UN voting percent with influence points; overall remains unscored unless independently valid
4. **Retire legacy display label after production smoke test** — Desktop/mobile checks, rollback switch, four required CI checks and explicit approval

Stage 0 is intentionally non-invasive. Existing Diplomatic object keys remain intact, the gauge continues to work, and all historical research remains available. **Do not blend alignment percentages with the old .20 influence weight.** Do not activate a descriptive alignment needle until source reproduction, coverage, sensitivity and interface tests pass. No score or readiness percentage is upgraded.
