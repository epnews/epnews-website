#!/usr/bin/env python3
"""Create an unapproved Reel package from a verified EP News publication manifest.

Usage: python3 scripts/create_reel_package.py path/to/approved-story.json
The editorial workflow must supply and verify the manifest and Drive graphic first.
"""
import argparse, json, pathlib, re
parser=argparse.ArgumentParser()
parser.add_argument("manifest",type=pathlib.Path)
parser.add_argument("--approve",action="store_true",help="Only after human editorial approval")
args=parser.parse_args()
source=json.loads(args.manifest.read_text(encoding="utf-8"))
for key in ("slug","headline","facebook_description","drive_file_id"):
    if not isinstance(source.get(key),str) or not source[key].strip():
        raise SystemExit(f"Missing required verified publication field: {key}")
slug=source["slug"]
if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*",slug):
    raise SystemExit("Invalid slug")
if not re.fullmatch(r"[A-Za-z0-9_-]{15,}",source["drive_file_id"]):
    raise SystemExit("Drive graphic ID must be verified before package creation")
if source.get("image_verified") is not True or source.get("fact_checked") is not True:
    raise SystemExit("Graphic verification and factual review are required")
if source.get("website_published") is not True:
    raise SystemExit("Website publication must be confirmed first")
description=source["facebook_description"].strip()
if len(description)>5000:
    raise SystemExit("Facebook description too long")
category=source.get("music_category","none")
if category not in ("none","breaking-news","war-military","concerning","texas-south"):
    raise SystemExit("Invalid music category")
duration=str(source.get("duration","15"))
if duration not in ("10","15","30","60","auto","custom"):
    raise SystemExit("Invalid duration")
package={"approved":bool(args.approve),"automatic_reel":bool(args.approve),
         "drive_file_id":source["drive_file_id"],"reel_title":source["headline"].strip(),
         "reel_description":description,"music_category":category,
         "music_track":source.get("music_track",""),"duration":duration,
         "custom_seconds":str(source.get("custom_seconds","30"))}
dest=pathlib.Path("reel-packages")/(slug+".json")
dest.parent.mkdir(parents=True,exist_ok=True)
if dest.exists():
    raise SystemExit(f"Package already exists: {dest}; refusing overwrite")
dest.write_text(json.dumps(package,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(dest)
