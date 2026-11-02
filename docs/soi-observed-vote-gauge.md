# Observed UN voting agreement gauge

The diplomatic evidence panel now includes a **separate, visibly filled observed-vote gauge** calculated from the existing audited SWP/GESIS 2021–2024 pairwise dataset. It displays each sphere's 2024 average of its four counterpart relationships and percentage-point change from 2021. The four relationship values are already shown in the existing comparison table; this is a visual representation of the same data, not a new influence estimate.

This is **not** the unified external-partner cohort measure, and the four relationships have different eligible-vote denominators and issue mix. It must not be interpreted as a calibrated influence needle. The main geopolitical influence needle stays gated by `chaos-meter-model.js`, which requires independently measured outcomes, causal assessment, costs and predefined normalization. No score field is populated.

The SWP/GESIS source was already acquired and audited for 2021–2024 (see `docs/soi-verified-unga-voting-alignment-2021-2024.md`); older `docs/soi-diplomacy-unified-external-alignment.md` wording that says *no real UN bulk dataset has been acquired* refers to the **unbuilt external-cohort report**, not to the separately verified pairwise data. The external-cohort importer still needs source-to-format mapping, licensing review and topic/abstention sensitivity validation before production use.
