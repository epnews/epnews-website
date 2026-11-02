# SOI GAP-12 extraction correctness fixes

Review of merged #515/#516 found a literal JavaScript regex bug: `/^\\d{4}/` matches a backslash followed by d, not a four-digit year. As a result, **valid actual retrieval timestamps were rejected**. This PR replaces it with a proper anchored ISO 8601 timestamp expression.

Additional guardrails:
- Reject observations with Eurostat JSON-stat status/quality flags pending explicit analyst review.
- Assert that any unspecified dimension is single-valued before using its zero index.
- Continue requiring 22 exact observations from both semesters. No missing or unverified values are substituted.

This is a correctness fix, not a claim that the source data has been retrieved. The live meter, selectors, score and 20/30 evidence gate tally are unchanged. Full schema validation against official live JSON-stat remains pending.
