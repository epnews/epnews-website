# EP News v7.0 execution addendum

This addendum preserves v7.0 and adds enforceable branch checks.

1. Before approval, verify each source directly and record the claims it supports, a short evidence excerpt and date. Never mark a claim verified based on a guessed URL. Record authentic photo provenance, rights and attribution. Verify website image 1600×900 and Facebook image 1080×1350 by decoding actual files; never stretch. Facebook output is a separate artifact.
2. After publisher approves article and graphic, continue without additional prompts: upload, confirm public permissions, commit import manifest, register article, create evidence and Reel handoff. Record SHA-256 of approved article and image bytes in editorial-evidence/<slug>.json. Do not mark image verified until imported bytes match. If importer transforms bytes, obtain approval for the transformed asset and document its provenance before updating hash.
3. A 404 during import is transient until bounded retries are exhausted. The branch runner polls every 15 seconds up to 12 attempts. A PR-only workflow listing cannot diagnose push-triggered import. Inspect actual push run or branch asset.
4. Branch runner executes both generators and all validators. Wait for successful run and verify its reported validated branch head matches current head. Do not open PR on stale or failed validation. Never manually edit generated metadata. If runner cannot push, diagnose permissions or non-fast-forward and retry on current head.
5. Open one PR, verify all checks, request merge approval. Do not merge without authorization. After merge verify live article, image, share metadata and mobile/desktop layout; report exact unverified items. Only then set website_published and enable Reel handoff. Do not claim successful live verification from repository presence alone.
6. Stop only for publisher approval, a material editorial decision, or a documented blocker after reasonable retries. Continue through all other checkpoints without asking for 'go'. Never fabricate verification.
7. Evidence records are attestations, not automated proof of truth. The validator checks completeness and byte integrity; editorial judgment remains necessary. Historical articles are not retroactively certified.

Branch runner uses GitHub Actions write permission for generated metadata only. Its push uses the default token, which normally does not trigger another workflow. Validate the final commit SHA from the run summary, not just the triggering SHA. A failed push must fail the run.
