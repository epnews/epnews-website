# EP News: image imports without manual GitHub uploads

The `Import EP News images` GitHub Action imports accessible HTTPS image files into `assets/images/` on a **feature branch**, then commits them to that branch for the Cloudflare preview and pull request review.

1. Create a GitHub feature branch and prepare article changes, keeping the branch unmerged.
2. Add image entries to `content/image-imports.json` with public direct HTTPS download links and the final filenames.
3. Pushing the changed manifest triggers GitHub Actions. It checks that files are images (PNG/JPEG/WebP), caps them at 8 MB, and commits them to the SAME branch.
4. Verify the three generated images really exist in the branch and the Cloudflare PR preview displays them, then approve and merge.

Example:
```json
[
  {"url":"https://your-image-host.example/asset.jpg","path":"assets/images/news-hero.jpg"}
]
```

**Limitations:** The source files must first have accessible, stable HTTPS URLs. Images stored only in ChatGPT's local session or Library cannot be fetched by GitHub Actions automatically. Current GitHub connector does not invoke workflow dispatch; the manifest push is the trigger. The workflow won't be available to feature branches until it is merged to `main`. No third-party hosting is included or configured here.

Always verify image ownership/permission, news-photo authenticity, cropping, source dates, and the article itself before merge. **A successful GitHub upload does not mean an article is fact-checked.**
