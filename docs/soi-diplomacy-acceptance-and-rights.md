# Diplomatic evidence acceptance: bundled research and activation gate

**Primary-source confirmation (1 Nov 2026):** The UN Dag Hammarskjöld Library describes its GA voting CSV as a regularly updated compilation of votes on adopted resolutions. It excludes failed drafts, paragraph votes and resolutions adopted without a recorded vote. Source: https://ask.un.org/faq/417475 ; https://research.un.org/en/docs/unvoting/ga .

**Licensing blocker:** UN Digital Library datasets are generally designated **noncommercial with attribution**, per the UN Library's own guidance: https://ask.un.org/faq/432839 . EP News is monetized. Do not publish or redistribute UN dataset rows or commercial derivatives without rights review. A separate CC0 academic ideal-point dataset exists (Bailey, Strezhnev & Voeten, Harvard Dataverse, DOI 10.7910/DVN/LEJUQZ) but its measures and licensing must be verified before use; it is not a drop-in substitute for raw voting agreement.

**Comparability blocker:** EU-27 voting cohesion is an internal agreement measure; US, China, Russia and India scores use agreement with other countries. Those values cannot legitimately occupy a common influence scale. EU member states each have votes, the EU itself does not. A single comparable alternative would calculate the same **external agreement to a pre-registered EU common position** for each actor, but EU common-position source coverage must be independently established; otherwise do not rank all five.

## Ten acceptance gates

1. Primary-source URL, retrieval date and checksum.
2. Commercial publication rights review.
3. Full dataset size and completeness.
4. Frozen comparable world partner universe.
5. All five actors have adequate baseline and follow-up coverage.
6. EU is measured using a genuinely comparable definition.
7. Topic-composition sensitivity.
8. Independent sample verification of resolution records.
9. Missing-vote and abstention sensitivity.
10. Independent influence/causality review.

Run `node scripts/test_soi_diplomacy_acceptance.cjs` to verify acceptance logic. Even when all gates pass, the outcome is **eligible for human review**, not automatic needle activation or an influence score. The historical dataset remains unimported in this repository; no observed country rankings or numerical influence estimates are authorized.
