# EP News website → optional Reel handoff

## Authority and default

The [current EP News Master Workflow](https://drive.google.com/file/d/1-S44eeR25lVsO9WVCEdz2SPgAAAcTtpm/view) governs editorial policy and approval. Retrieve it by permanent Drive ID on each run. Current main-branch validators and [connector handoff instructions](connector-pr-handoff.md) govern technical execution.

Website-only publication is the default. Omit Reel input entirely unless separately requested and explicitly approved. Website approval alone does not authorize a Reel, YouTube Short, Meta draft or social publication.

## Optional approved Reel input

For a separately approved combined package, use the current schema and validators for `editorial-reel-inputs/<slug>.json`. Retain the approved 1600×900 website image as `drive_file_id` and the separately approved 1080×1920 borderless Reel artwork as `reel_drive_file_id`; IDs must differ. Set `reel_image_verified:true` only after verification and explicit approval of that portrait artwork. The 1080×1350 Facebook feed graphic is a separate asset, not Reel artwork.

Include the matching slug, article script, headline, Facebook description and required fact-check, image-verification and Reel approval fields according to current validators. Never set `website_published:true` in editorial input; the live verifier sets it. Do not substitute website artwork or fabricate approval flags.

## Post-publication handoff

After the approved website PR is merged, `post-publication-reel.yml` runs when a new editorial Reel input is added. It verifies the live article before manifest preparation, checks for duplicates, and creates a remote candidate branch and `reel-connector-handoff` artifact. It does not open the PR itself. Website-only merges without Reel input do not trigger this path.

The orchestrator follows the connector handoff instructions: verify successful live verification and manifest preparation, exact remote SHA, source main SHA, artifact, approved input and artwork IDs, one-manifest diff and absence of duplicate PRs or existing main manifest. Open one authenticated non-draft PR only when eligible. Closed PR recovery requires explicit authorization.

Wait for independent checks and explicit publisher merge approval. Merge triggers the preview generator; inspect actual MP4 output and frame, dimensions and audio against current requirements. Preview generation is not social publication. No automatic Meta drafts or public Facebook publishing. Never bypass failed checks.

For a standalone social package requested after website publication, follow the current Master Workflow and applicable repository schema; do not modify a published article or manufacture a combined input merely to trigger automation.

## Recovery

Manual workflow dispatch is for authorized recovery of an existing approved input on main. Verify live publication and duplicate state again. Report actual failures and do not infer success from a merge or artifact alone.
