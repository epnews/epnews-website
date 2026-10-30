#!/usr/bin/env python3
"""Download *exact* editor-approved MP4; refuse any byte mismatch."""
import hashlib, os, pathlib, re, subprocess, sys
import gdown
file_id=os.environ["DRIVE_FILE_ID"].strip()
expected=os.environ["EXPECTED_SHA256"].strip().lower()
if not re.fullmatch(r"[A-Za-z0-9_-]{15,}",file_id):
    sys.exit("Invalid Google Drive file ID")
if not re.fullmatch(r"[a-f0-9]{64}",expected):
    sys.exit("Invalid SHA256 digest")
dest=pathlib.Path("reel.mp4")
try:
    got=gdown.download(id=file_id,output=str(dest),quiet=False)
except Exception as exc:
    sys.exit(f"Could not download approved MP4 from Google Drive: {exc}")
if not got or not dest.is_file():
    sys.exit("Approved video download failed; no upload attempted")
actual=hashlib.file_digest(dest.open("rb"),"sha256").hexdigest()
if actual != expected:
    sys.exit(f"Approved video checksum mismatch. Expected {expected}; got {actual}. REFUSING TO PUBLISH.")
probe=subprocess.run(["ffprobe","-v","error","-show_entries","stream=codec_type,codec_name,width,height:format=duration","-of","json",str(dest)],capture_output=True,text=True)
if probe.returncode:
    sys.exit("Approved file is not a valid video")
import json
data=json.loads(probe.stdout)
video=next((s for s in data.get("streams",[]) if s.get("codec_type")=="video"),None)
audio=next((s for s in data.get("streams",[]) if s.get("codec_type")=="audio"),None)
duration=float(data.get("format",{}).get("duration",0))
if not video or video.get("width")!=1080 or video.get("height")!=1920 or not audio or not 14.9<=duration<=15.2:
    sys.exit("Approved Reel lacks expected video/audio format or duration")
print("Verified exact approved MP4 SHA256, 1080x1920, ~15s, and audio. No re-encoding performed.")
