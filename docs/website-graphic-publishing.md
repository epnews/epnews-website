# EP News website graphic publishing workflow

## Required Google Drive destination

**All newly created EP News website graphics must be uploaded to the existing public folder:**

- Folder: **Ep news public**
- Folder ID: `11Lu7G8A6hzT7F9QKP3quF-MJlLWt9ByZ`
- Link: https://drive.google.com/drive/folders/11Lu7G8A6hzT7F9QKP3quF-MJlLWt9ByZ

Never upload publishing artwork to the Drive root or a restricted folder.

## Before importing

1. Create the approved **1600 × 900 raster** website graphic (JPG/PNG/WebP), using accurate editorial text. Generated scenes must be clearly identified as illustrations, not documentary photographs.
2. Upload the graphic with `parent_folder_id=11Lu7G8A6hzT7F9QKP3quF-MJlLWt9ByZ`.
3. Verify the returned Drive file metadata shows that folder in `parent_ids`.
4. **Check the new file's own permissions**, not just the parent folder's permissions. It must have `type=anyone`, `role=reader`. If it does not, set General access to **Anyone with the link — Viewer**, and verify unauthenticated access. A public folder does not guarantee that every uploaded file is publicly readable.
5. Register the actual Drive file ID in `content/image-imports.json`, referencing the matching `assets/images/...` destination.
6. Create a `feature/**` branch and push the manifest change. The **Import EP News images** GitHub Action will download and commit the raster image.
7. Verify that import succeeded, the binary image is in the PR, the **publishing gate** and **article smoke test** pass, and the Cloudflare branch preview renders the **correct image and article**.
8. Only after checks pass, merge the PR and verify the production article plus existing homepage stories. Do not bypass required checks or publish a misleading graphic.

## Failure handling

- If `gdown` reports that it cannot retrieve a public link, verify the **file-level** Anyone-with-link permission and rerun the failed import job.
- If an image appears wrong or stale, compare the actual downloaded asset, source Drive file ID, and browser cache before merging.
- Preserve all existing article registry entries and homepage wire items.

**Important:** This document is a publishing procedure. It does not by itself enforce the Drive destination. Upload tools must explicitly receive the folder ID; CI validates imported image dimensions and manifest provenance, not the remote Drive parent folder.
