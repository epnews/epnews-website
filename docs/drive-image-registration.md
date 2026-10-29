# EP News — verified Drive image registration

This helper prevents accidental manual JSON editing, but **does not verify Google Drive itself**.

1. Upload the approved 1600×900 raster website graphic to EP News Public folder (ID `11Lu7G8A6hzT7F9QKP3quF-MJlLWt9ByZ`).
2. Independently read Google Drive metadata: exact file ID, filename, parent folder, and MIME type. Confirm the actual image is the approved version.
3. Confirm the file is anonymously downloadable (Anyone with the link — Viewer). Do not proceed if this fails.
4. On a publication feature branch, run:

```bash
python scripts/register_drive_image.py \
  --drive-file-id VERIFIED_FILE_ID \
  --filename approved-website-1600x900.png \
  --verified-folder-id 11Lu7G8A6hzT7F9QKP3quF-MJlLWt9ByZ \
  --verified-public
```

The acknowledgement flags **are not proof** of verification. The operator/assistant must actually complete steps 2–3 using Google Drive before invoking the script.

5. Commit the manifest change to the feature branch. The existing `Import EP News images` workflow runs when `content/image-imports.json` changes on a feature branch, downloads the image and commits the binary.
6. Confirm the imported asset exists and is a valid 1600×900 raster image. Wait for article-registry, validate-article-assets, and deployment preview checks to pass before asking for merge approval.
7. After merge, verify the actual Cloudflare production article and correct image.

This is a guarded manifest helper, **not** an unattended Google Drive watcher. No production changes are made until the pull request is merged.
