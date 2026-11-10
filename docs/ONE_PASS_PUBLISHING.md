# EP News one-pass publishing contract

1. Approve article and graphic; verify each source URL against its actual report before publication.
2. Create exactly one branch beginning with `feature/`. Keep the same PR until green.
3. Put the image in the public Google Drive transfer folder; add its real ID and target `assets/images/<slug>.png` to `content/image-imports.json`.
4. Commit the manifest on the feature branch. The existing importer runs on that push, validates the raster and commits the actual file to the same branch. Never manually run it on main.
5. Use `STORIES.push({ id: "...", status: "published", title: "...", deck: "...", image: { src: "assets/images/...", alt: "...", credit: "..." }, ... })`. **Use unquoted `image` and `src` keys**, required by existing validators.
6. Register the script in `index.html`. Generate sitemap with `node scripts/generate-sitemap.mjs` and commit it.
7. Run `node scripts/preflight-article.mjs content/<slug>.js` after the image is imported. Do not request merge while preflight, article integrity, publishing gate, or Cloudflare checks fail.
8. Merge only with explicit editor approval. Verify production article, hero image, source links, and Facebook share preview after Cloudflare production deployment.

The CI preflight is a guardrail, not a replacement for source verification or human approval.
