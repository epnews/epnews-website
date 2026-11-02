#!/usr/bin/env bash
# Recover the exact successful national HICP artifact and create the durable research JSON.
# Requires gh, unzip, sha256sum, node; authenticated GitHub CLI with Actions read access.
set -euo pipefail
repo="epnews/epnews-website"
artifact="13116843168"
expected="c84eb9bf7cb87b0f004503f9902713e8f1a52dde95bd6efe750337e52e74feaf"
file="soi-eu-gap12-national-real-energy-price-changes-20261102.json"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
gh api "repos/$repo/actions/artifacts/$artifact/zip" > "$tmp/artifact.zip"
actual="$(sha256sum "$tmp/artifact.zip" | cut -d' ' -f1)"
if [[ "$actual" != "$expected" ]]; then
  echo "Artifact ZIP digest mismatch; refusing import: $actual" >&2
  exit 1
fi
unzip -p "$tmp/artifact.zip" "$file" > "$tmp/$file"
node scripts/audit_soi_eu_gap12_import_official_hicp_artifact_20261102.cjs "$tmp/$file"
node scripts/audit_soi_eu_gap12_national_real_output_20261102.cjs
echo "Durable JSON generated and verified. Review and commit the generated data file."
