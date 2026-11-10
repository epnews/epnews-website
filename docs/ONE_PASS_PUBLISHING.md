# EP News one-pass publishing contract

1. Approve article and graphic; verify each source URL against its actual report before publication.
2. Create exactly one branch beginning with `feature/`. Keep the same PR until green.
3. Put the image in the permanent public Google Drive transfer folder `EP News Public` (folder ID `11Lu7G8A6hzT7F9QKP3quF-MJlLWt9ByZ`, https://drive.google.com/drive/folders/11Lu7G8A6hzT7F9QKP3quF-MJlLWt9ByZ); add its real ID and target `assets/images/<slug>.png` to `content/image-imports.json`.
4. Commit the manifest on the feature branch. The existing importer runs on that push, validates the raster and commits the actual file to the same branch. Never manually run it on main.
5. Use `STORIES.push({ id: "...", status: "published", title: "...", deck: "...", image: { src: "assets/images/...", alt: "...", credit: "..." }, ... })`. **Use unquoted `image` and `src` keys**, required by existing validators.
6. Register the script in `index.html`. Generate sitemap with `node scripts/generate-sitemap.mjs` and commit it.
7. After the importer commits the image, run `bash scripts/prepare-article-package.sh content/<slug>.js`. It generates sitemap and Facebook share metadata, runs article preflight and existing integrity checks, and fails on missing assets. Commit the generated `sitemap.xml` and `content/share-index.json` in the **same feature branch and PR**. The PR check also rejects stale share metadata. Do not request merge while preflight, article integrity, publishing gate, or Cloudflare checks fail.
8. Merge only with explicit editor approval. Verify production article, hero image, source links, and Facebook share preview after Cloudflare production deployment.

The CI preflight is a guardrail, not a replacement for source verification or human approval.
