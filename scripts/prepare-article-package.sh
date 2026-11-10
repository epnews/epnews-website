#!/usr/bin/env bash
# EP News publishing package finalizer: run after image importer commits the asset.
set -euo pipefail
if [[ $# -ne 1 || ! "$1" =~ ^content/[a-z0-9-]+\.js$ ]]; then
  echo 'Usage: bash scripts/prepare-article-package.sh content/<slug>.js' >&2
  exit 2
fi
if [[ ! -f "$1" ]]; then echo "Article not found: $1" >&2; exit 2; fi
node scripts/generate-sitemap.mjs
node scripts/build-share-index.mjs
node scripts/preflight-article.mjs "$1"
node scripts/validate-publishing.mjs
node scripts/validate-all-articles.mjs
node scripts/generate-sitemap.mjs --check
echo 'PACKAGE READY: commit article, imported image, index.html, sitemap.xml and content/share-index.json on the same feature branch.'
