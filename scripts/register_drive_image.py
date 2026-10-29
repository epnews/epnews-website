#!/usr/bin/env python3
"""Register a verified Google Drive website image, never upload or verify it implicitly."""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "content/image-imports.json"
PUBLIC_FOLDER_ID = "11Lu7G8A6hzT7F9QKP3quF-MJlLWt9ByZ"

def register(file_id, filename, verified_folder, verified_public, dry_run=False):
    if not verified_folder or not verified_public:
        raise ValueError("STOP: independently verify Drive folder membership and public file access first")
    if not re.fullmatch(r"[A-Za-z0-9_-]{15,}", file_id):
        raise ValueError("Invalid Google Drive file ID")
    if not re.fullmatch(r"[A-Za-z0-9_.-]+\.(?:png|jpg|jpeg|webp)", filename, re.I):
        raise ValueError("Invalid raster image filename")
    path = "assets/images/" + filename
    url = "https://drive.google.com/uc?export=download&id=" + file_id
    items = json.loads(MANIFEST.read_text())
    if not isinstance(items, list):
        raise ValueError("Invalid manifest")
    for item in items:
        if item["path"] == path:
            if item["url"] == url:
                print("Already registered:", path)
                return
            raise ValueError("Destination path already registered with a different Drive ID")
        if item["url"] == url:
            raise ValueError("Drive ID already registered with a different filename")
    if len(items) >= 20:
        raise ValueError("Manifest import limit reached (20); review before proceeding")
    items.append({"url": url, "path": path})
    if not dry_run:
        MANIFEST.write_text(json.dumps(items, indent=2) + "\n")
    print(("Would register: " if dry_run else "Registered: ") + path)
    print("Drive folder verification is an external prerequisite, NOT performed by this script.")

if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--drive-file-id", required=True)
    p.add_argument("--filename", required=True)
    p.add_argument("--verified-folder-id", required=True, help="Independently confirmed parent folder ID")
    p.add_argument("--verified-public", action="store_true", help="Explicit acknowledgement of independently tested public download access")
    p.add_argument("--dry-run", action="store_true")
    a = p.parse_args()
    if a.verified_folder_id != PUBLIC_FOLDER_ID:
        p.error("Wrong Drive folder: expected EP News Public folder " + PUBLIC_FOLDER_ID)
    register(a.drive_file_id, a.filename, True, a.verified_public, a.dry_run)
