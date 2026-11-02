# Official Eurostat retrieval run #41394900582

The first manually dispatched source capture successfully downloaded **both** original Eurostat JSON-stat responses, as shown by the successful download step. The extractor then failed with `AssertionError: Official Eurostat source metadata required`, because it assumed a top-level `source` string naming Eurostat. This field is not guaranteed in the API's JSON-stat output.

Fix: treat `source` as optional, validate its type when present, and retain provenance from the GitHub Actions capture URL, UTC retrieval timestamp, SHA256 manifest, and archived original raw files. An optional self-described `source` field would not itself authenticate the downloaded file.

Evidence artifact: https://github.com/epnews/epnews-website/actions/runs/41394900582/artifacts/13118703197

This removes only the confirmed first blocker. Other schema or numeric mismatches may emerge on rerun; those must be inspected, not bypassed. No 22-cell reconciliation passed yet. No scores, meter changes or audit increment; remains 20/30.
