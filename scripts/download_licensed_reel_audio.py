#!/usr/bin/env python3
"""Fetch only approved and licensed soundtrack sources from Google Drive."""
import json,os,pathlib,re,sys,subprocess
import gdown
catalog=json.loads(pathlib.Path("config/reel-music-catalog.json").read_text())
category=os.getenv("MUSIC_CATEGORY","none").strip()
override=os.getenv("MUSIC_TRACK","").strip()
if category=="none": sys.exit(0)
tracks=catalog["categories"].get(category,{}).get("tracks",[])
track=next((t for t in tracks if t["title"].casefold()==override.casefold()),None) if override else (tracks[0] if tracks else None)
if not track: sys.exit("Unknown music selection")
rights=track.get("rights",{})
if rights.get("verified") is not True or not rights.get("evidence") or str(rights["evidence"]).startswith("PENDING"):
    sys.exit("Soundtrack is staged but license not verified: "+track["title"]+". Do not download or embed until approved.")
drive_id=track.get("drive_file_id","")
path=track.get("audio_path","")
if not re.fullmatch(r"[A-Za-z0-9_-]{15,}",drive_id): sys.exit("Invalid audio Drive ID")
p=pathlib.PurePosixPath(path)
if not path.startswith("assets/reel-audio/") or ".." in p.parts or p.is_absolute(): sys.exit("Invalid local soundtrack path")
dest=pathlib.Path(path);dest.parent.mkdir(parents=True,exist_ok=True)
if not dest.exists():
    try: downloaded=gdown.download(id=drive_id,output=str(dest),quiet=False)
    except Exception as exc: sys.exit("Audio Drive download failed: "+str(exc))
    if not downloaded: sys.exit("Audio not publicly downloadable")
if not dest.is_file() or dest.stat().st_size==0: sys.exit("Empty audio file")
subprocess.run(["ffprobe","-v","error","-select_streams","a:0","-show_entries","stream=codec_type","-of","default=nokey=1:noprint_wrappers=1",str(dest)],check=True)
print("Licensed soundtrack available:",dest)
