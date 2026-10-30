# EP News website-to-Reel automatic handoff

When preparing a new EP News website story, follow the existing publication workflow: independently verify claims, upload the approved graphic to Google Drive, verify its download and size, then publish the website article.

For the **same** story, add one JSON file to `publication-manifests/<slug>.json` following `docs/reel-publication-manifest.example.json`. Include the verified Google Drive file ID, headline, approximately 100-word Facebook caption, music category, duration, and the flags `image_verified:true`, `fact_checked:true`, `website_published:true` only when verified. Add `approved_for_reel:true` and `automatic_reel:true` only after editorial approval. This manifest must be added to the publishing PR and merged after the website publication has been verified, not before.

On merge to main, the existing Reel Generator now detects a changed opted-in manifest, converts it into the approved Reel package automatically, and generates the preview MP4. The generated package is temporary in the GitHub runner; it does not automatically commit the JSON back to the repository. Only one opted-in manifest/package per push is supported.

No public Facebook publishing or automatic Meta draft creation. Music metadata is not audio. The website's current static article registry is not itself an authoritative source for the Facebook caption or Google Drive file ID, so this manifest must be supplied by the editorial workflow; there is no reliable automatic extraction of those fields from the existing website code.
