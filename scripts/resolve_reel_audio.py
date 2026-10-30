#!/usr/bin/env python3
"""Resolve explicitly licensed EP News soundtrack; never substitute silent audio."""
import json, os, pathlib, subprocess, sys

catalog=json.loads(pathlib.Path("config/reel-music-catalog.json").read_text())
category=os.getenv("MUSIC_CATEGORY","none").strip()
override=os.getenv("MUSIC_TRACK","").strip()
if category not in ("none", *catalog["categories"].keys()):
    sys.exit("Unknown music category: "+category)
if category == "none":
    if override: sys.exit("Cannot specify a music track with category=none")
    result={"category":"none","preferred_track":None,"audio_embedded":False,"rights_verified":False,"intentional_silence":True}
    pathlib.Path("reel-music-selection.json").write_text(json.dumps(result,indent=2)+"\n")
    with open(os.environ["GITHUB_ENV"],"a") as f: f.write("REEL_MUSIC_MODE=none\n")
    sys.exit(0)
tracks=catalog["categories"][category]["tracks"]
chosen=next((t for t in tracks if t["title"].casefold()==override.casefold()),None) if override else tracks[0]
if chosen is None: sys.exit("Selected track not found in category")
name=chosen["title"]+" — "+chosen["artist"]
# Fail closed until a legal audio file and explicit documented rights have been configured.
path=chosen.get("audio_path","")
rights=chosen.get("rights",{})
if not isinstance(rights,dict) or not rights.get("verified") or not rights.get("evidence"):
    sys.exit("Soundtrack '"+name+"' is catalog metadata only: no verified audio license. Upload/license the actual recording and document rights before rendering.")
if not isinstance(path,str) or not path.startswith("assets/reel-audio/") or pathlib.PurePosixPath(path).is_absolute() or ".." in pathlib.PurePosixPath(path).parts:
    sys.exit("Soundtrack '"+name+"' has no safe assets/reel-audio/ path")
audio=pathlib.Path(path)
if not audio.is_file() or audio.stat().st_size==0:
    sys.exit("Licensed soundtrack missing: "+path+"; no silent fallback")
probe=subprocess.run(["ffprobe","-v","error","-select_streams","a:0","-show_entries","stream=codec_type","-of","default=nokey=1:noprint_wrappers=1",str(audio)],capture_output=True,text=True)
if probe.returncode or "audio" not in probe.stdout:
    sys.exit("Selected soundtrack is not decodable audio")
with open(os.environ["GITHUB_ENV"],"a") as f:
    f.write("REEL_MUSIC_MODE=track\n")
    f.write("REEL_AUDIO_PATH="+path+"\n")
result={"category":category,"preferred_track":chosen,"audio_embedded":True,"rights_verified":True,"license_evidence":rights["evidence"]}
pathlib.Path("reel-music-selection.json").write_text(json.dumps(result,indent=2)+"\n")
print("Licensed soundtrack selected:",name)
