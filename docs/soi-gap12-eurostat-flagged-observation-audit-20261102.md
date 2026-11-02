# Eurostat flagged-cell evidence, actual workflow run 41395329978

Both official dataset downloads succeeded. The extractor halted at **Malta electricity 2026-S1** because Eurostat JSON-stat reported a nonempty observation status flag. Previous behavior discarded the entire extracted output at that point.

The revised extractor preserves `sourceStatus` per observation, allowing the offline auditor to report every flagged cell with its country/commodity/period and exact status code. **Flagged cells still prevent `all-exact-cells-match`**, so this does not silently approve provisional, estimated, confidential or otherwise qualified observations.

Raw artifact: https://github.com/epnews/epnews-website/actions/runs/41395329978/artifacts/13118584501

The exact status code and full set of flagged cells must be inspected from the next run before deciding on any narrowly justified acceptance policy. No influence scoring, meter changes or audit increment; 20/30.
