# EP News — mandatory publishing procedure

## Release sequence
1. Research, independently verify and source the story. Distinguish verified facts from claims.
2. Write the website article and select its correct category. Investigations receive comprehensive inline citations.
3. Generate original EP News-standard visual assets: **1600×900 raster website image** and, when requested, separate **1080×1350 Facebook image**. Use genuine appropriately licensed photos where available; never imply generated imagery is documentary photography.
4. Render, inspect and fact-check the *actual* finished graphic. Check mobile legibility, branding, cropping and dimensions.
5. Upload generated image files to the established EP News Google Drive image-transfer folder.
6. Add each Google Drive download URL and destination under `assets/images/` to `content/image-imports.json` on the article feature branch.
7. Wait for `.github/workflows/import-images.yml` to complete successfully. Confirm the imported raster file is committed to that branch.
8. Reference the imported website raster file in the article's `image.src`. Check article registration, category placement, source links and image rendering.
9. Run `EP News publishing gate / validate-article-assets`. Fix every failure before presenting the PR as publication-ready.
10. Submit draft PR with visible preview links, evidence of checks, and clear statement of any unverified steps. The editor reviews and merges; verify Cloudflare Pages after deployment.

## Non-negotiable rules
- Never replace the Google Drive transfer/import process with hand-authored SVG placeholders.
- Never say an image, workflow, website preview or deployment was verified unless it was actually checked.
- Do not merge or publish without editor approval.
- The automated gate verifies raster size, manifest entry, imported file presence, and new image commit for each newly changed article. It **cannot** judge editorial quality, source reliability, licensing or whether a human saw the preview; those require explicit editorial review.
- Configure branch protection/rulesets to require the **validate-article-assets** status check before merging. Until configured, this gate is advisory and bypassable.
