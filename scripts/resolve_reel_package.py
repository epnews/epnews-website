#!/usr/bin/env python3
"""Resolve a reviewed EP News Reel package stored in the repository."""
import json, os, pathlib, re, urllib.parse

path=os.environ.get("PACKAGE_PATH","").strip()
if not path:
    print("No package supplied; manual inputs retained.")
    raise SystemExit(0)
if not re.fullmatch(r"reel-packages/[a-zA-Z0-9_/-]+\.json",path) or ".." in path:
    raise SystemExit("Package must be a reviewed JSON file inside reel-packages/")
data=json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
if data.get("approved") is not True:
    raise SystemExit("Package is not marked approved.")
required=("drive_file_id","reel_title","reel_description","music_category","duration")
for field in required:
    if not isinstance(data.get(field),str) or not data[field].strip():
        raise SystemExit(f"Package missing {field}")
if data["music_category"] not in ("none","breaking-news","war-military","concerning","texas-south"):
    raise SystemExit("Invalid music category")
if data["duration"] not in ("10","15","30","60","auto","custom"):
    raise SystemExit("Invalid duration")
if data["duration"]=="custom":
    seconds=int(data.get("custom_seconds","0"))
    if not 4<=seconds<=60: raise SystemExit("Custom Reel duration must be 4-60 seconds")
if len(data["reel_description"])>5000: raise SystemExit("Description too long")
if not re.fullmatch(r"[A-Za-z0-9_-]{15,}",data["drive_file_id"]):
    raise SystemExit("Package drive_file_id must be a Drive file ID")
catalog=json.loads(pathlib.Path("config/reel-music-catalog.json").read_text())
tracks=[] if data["music_category"]=="none" else catalog["categories"][data["music_category"]]["tracks"]
override=data.get("music_track","").strip()
if override and not any(t["title"].lower()==override.lower() for t in tracks):
    raise SystemExit("Music override not found in selected category")
with open(os.environ["GITHUB_ENV"],"a",encoding="utf-8") as fh:
    for key,field in (("DRIVE_FILE_ID","drive_file_id"),("REEL_TITLE","reel_title"),("REEL_DESCRIPTION","reel_description"),("MUSIC_CATEGORY","music_category"),("MUSIC_TRACK","music_track"),("DURATION","duration"),("CUSTOM_SECONDS","custom_seconds")):
        value=str(data.get(field,""))
        delimiter="EP_NEWS_END_"+key
        if delimiter in value: raise SystemExit("Invalid package text")
        fh.write(f"{key}<<{delimiter}\n{value}\n{delimiter}\n")
print(f"Validated approved package: {path}. Public publishing remains disabled.")
