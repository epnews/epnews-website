# EP News publication-to-Reel handoff (v6.2 compatible)

Follow the latest Google Drive master website publishing workflow before running this handoff. Do not change GitHub publishing files until the 1600×900 image is validated, uploaded to the public Drive folder, and independently verified. Use the free image importer and publishing gate, preserve chronological Headline Wire ordering, and never merge without user approval.

After the website article has actually been merged, deployed, and verified, supply one editorial JSON object with slug, headline, approved ~100-word facebook_description, verified drive_file_id, image_verified:true, fact_checked:true, website_published:true, optional music_category and duration. Run:

`python3 scripts/prepare_publication_reel.py path/to/verified-story.json --approve-reel`

This creates `publication-manifests/<slug>.json` without copying fields by hand. Commit that file in a separate PR and obtain explicit approval to merge. Its merge automatically triggers the existing Reel Generator, which produces an MP4 artifact for review. One opted-in manifest per merge. This avoids setting website_published:true before deployment is verified.

The process is not a self-executing hook into the current ChatGPT publishing agent: the agent must call this script or construct the equivalent manifest. No automatic Meta draft or public Facebook publishing. Music selections are metadata only.
