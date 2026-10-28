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
subprocess.run(["git", "fetch", "--no-tags", "origin", base, "--depth=1"], check=True)
changed = subprocess.check_output(["git", "diff", "--name-only", "origin/" + base + "...HEAD"], text=True).splitlines()
articles = [p for p in changed if re.fullmatch(r"content/[a-z0-9-]+\.js", p) and p not in ("content/editorial.js", "content/stories.js")]
manifest = json.loads(Path("content/image-imports.json").read_text())
imports = {entry["path"]: entry["url"] for entry in manifest}
for path in articles:
    content = Path(path).read_text()
    match = re.search(r"image\s*:\s*\{[^}]*?src\s*:\s*['\\"]([^'\\"]+)['\\"]", content, re.S)
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
            if img.size != (1600, 900):
                fail(f"{path}: {asset} is {img.size}, expected 1600x900")
    except Exception as exc:
        fail(f"{path}: image unreadable: {exc}")
    if asset not in changed:
        fail(f"{path}: {asset} must be newly imported/committed on the article PR branch")
print(f"Checked {len(articles)} changed article(s); errors: {len(errors)}")
sys.exit(bool(errors))
