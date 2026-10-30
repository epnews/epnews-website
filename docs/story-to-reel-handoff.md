# EP News editorial publication → Reel package handoff

After independent verification, publish the website article using the existing EP News website workflow. Upload its approved graphic to the public Google Drive folder and verify that the image is downloadable and within the current size limit **before** creating a GitHub publishing PR.

In the same editorial preparation step, write a JSON publication manifest following `docs/reel-publication-manifest.example.json`. Populate slug, verified headline, ~100-word Facebook caption with 3–5 hashtags, actual Google Drive file ID, music category, and duration. Set `image_verified`, `fact_checked`, and `website_published` true only after the corresponding checks are actually complete.

Run `python3 scripts/create_reel_package.py path/to/manifest.json` to create an **unapproved** package for review. Once the story is approved for Reel preview generation, run with `--approve` **only if the package does not already exist**, or review/edit the package explicitly to set `approved:true` and `automatic_reel:true`. Commit the resulting `reel-packages/<slug>.json` in the GitHub PR. After merge, the existing GitHub Actions push trigger creates a preview artifact automatically.

Important: The generator does not itself inspect the website, fetch Google Drive permissions, or verify article accuracy; the publishing process must actually perform those checks. This is a machine-readable bridge for the upstream publishing process, **not yet a direct hook into Story Multiplier**. The script will not overwrite an existing package. Only one opted-in package per merge is supported by the current automatic selector. Facebook public publishing is disabled. Soundtrack selections are metadata, not embedded music.
