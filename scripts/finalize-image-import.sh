#!/usr/bin/env bash
# Run only in the disposable GitHub Actions checkout.
# Each attempt starts from the current remote branch, so generated metadata
# never rebases over a different version of itself.
set -euo pipefail
: "${GITHUB_REF_NAME:?Expected a named GitHub Actions branch}"
if [[ "${GITHUB_REF_NAME}" != feature/* ]]; then
  echo "Image imports only run on feature branches" >&2
  exit 2
fi
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
sleep 15
for attempt in 1 2 3; do
  echo "Publication finalization attempt $attempt/3"
  git fetch origin "${GITHUB_REF_NAME}"
  git reset --hard "origin/${GITHUB_REF_NAME}"
  python scripts/import_images.py
  node scripts/generate-sitemap.mjs
  node scripts/build-share-index.mjs
  for article in content/*.js; do
    [[ "$article" == "content/editorial.js" || "$article" == "content/stories.js" ]] && continue
    node --check "$article"
  done
  node scripts/validate-publishing.mjs
  node scripts/validate-all-articles.mjs
  node scripts/generate-sitemap.mjs --check
  # Check every newly imported article, not just a filename-based guess.
  node scripts/verify-imported-articles.mjs
  git add assets/images sitemap.xml content/share-index.json
  if git diff --cached --quiet; then
    echo "Verified package already up to date"
    exit 0
  fi
  git commit -m "Finalize verified EP News images and publication metadata"
  if git push origin "HEAD:refs/heads/${GITHUB_REF_NAME}"; then
    echo "Verified image and metadata committed together"
    exit 0
  fi
  echo "Remote branch moved during commit; rebuilding against latest version" >&2
done
echo "Could not commit after three attempts; no force push was attempted" >&2
exit 1
