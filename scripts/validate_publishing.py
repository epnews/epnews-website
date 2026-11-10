#!/usr/bin/env python3
"""Fail PRs that introduce EP News articles without imported raster website artwork."""
import json, os, re, subprocess, sys
from pathlib import Path
from PIL import Image

def fail(message):
    print("::error::" + message)
    errors.append(message)

errors = []
base = os.environ.get("GITHUB_BASE_REF", "main")
# Checkout uses fetch-depth: 0. Do not shallow-fetch the base branch here:
# depth=1 can remove the merge base during fast-moving research PR merges.
subprocess.run(["git", "fetch", "--no-tags", "origin", f"+refs/heads/{base}:refs/remotes/origin/{base}"], check=True)
merge_base = subprocess.run(
    ["git", "merge-base", f"origin/{base}", "HEAD"],
    capture_output=True, text=True
)
if merge_base.returncode != 0:
    print("::error::Publishing gate cannot find PR merge base; checkout must retain full history")
    sys.exit(1)
changed = subprocess.check_output(["git", "diff", "--name-only", f"origin/{base}...HEAD"], text=True).splitlines()
articles = [p for p in changed if re.fullmatch(r"content/[a-z0-9-]+\.js", p) and p not in ("content/editorial.js", "content/stories.js")]
manifest = json.loads(Path("content/image-imports.json").read_text())
imports = {entry["path"]: entry["url"] for entry in manifest}
for path in articles:
    content = Path(path).read_text()
    match = re.search(r"""image\s*:\s*\{[^}]*?src\s*:\s*['"]([^'"]+)['"]""", content, re.S)
    if not match:
        fail(f"{path}: missing image.src")
        continue
    asset = match.group(1)
    if not re.fullmatch(r"assets/images/[a-zA-Z0-9_.-]+\.(png|jpg|jpeg|webp)", asset, re.I):
        fail(f"{path}: website image must be a raster PNG/JPG/WebP in assets/images (not SVG): {asset}")
        continue
    if asset not in imports or "drive.google.com/" not in imports[asset] or "id=" not in imports[asset]:
        fail(f"{path}: {asset} must be registered with a Google Drive file ID in content/image-imports.json")
    file = Path(asset)
    if not file.is_file():
        fail(f"{path}: imported image missing: {asset}; run and verify Import EP News images workflow")
        continue
    try:
        with Image.open(file) as img:
            img.verify()
        with Image.open(file) as img:
            if img.width < 1 or img.height < 1 or max(img.size) > 1600:
                fail(f"{path}: {asset} has invalid dimensions {img.size}")
    except Exception as exc:
        fail(f"{path}: image unreadable: {exc}")
    # Allow a previously imported, verified image on the base branch when its
    # original import was merged separately (for example a graphic-only PR).
    # The manifest and actual raster validation above remain mandatory.
    prior = subprocess.run(
        ["git", "show", f"origin/{base}:{path}"],
        capture_output=True, text=True
    )
    prior_match = re.search(
        r"""image\s*:\s*\{[^}]*?src\s*:\s*['"]([^'"]+)['"]""",
        prior.stdout, re.S
    ) if prior.returncode == 0 else None
    reusing_existing_image = (
        prior_match is not None and prior_match.group(1) == asset
        and subprocess.run(
            ["git", "cat-file", "-e", f"origin/{base}:{asset}"],
            capture_output=True
        ).returncode == 0
    )
    already_imported_on_base = subprocess.run(
        ["git", "cat-file", "-e", f"origin/{base}:{asset}"],
        capture_output=True
    ).returncode == 0
    if asset not in changed and not reusing_existing_image and not already_imported_on_base:
        fail(f"{path}: {asset} must be newly imported or already committed on the base branch")
print(f"Checked {len(articles)} changed article(s); errors: {len(errors)}")
sys.exit(bool(errors))
