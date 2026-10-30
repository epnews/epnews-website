#!/usr/bin/env python3
"""Reject Reel audio tracks that are absent or effectively silent."""
import json, subprocess, sys, re
video=sys.argv[1]
p=subprocess.run(["ffprobe","-v","error","-select_streams","a:0","-show_entries","stream=codec_type","-of","json",video],capture_output=True,text=True,check=True)
if not json.loads(p.stdout).get("streams"):
    sys.exit("Audio validation failed: Reel contains no audio stream")
p=subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",video,"-vn","-af","volumedetect","-f","null","-"],capture_output=True,text=True)
if p.returncode: sys.exit("Audio decoding failed: "+p.stderr[-600:])
m=re.search(r"mean_volume:\\s*(-?[0-9.]+) dB",p.stderr)
if not m:
    sys.exit("Cannot measure Reel soundtrack loudness")
mean=float(m.group(1))
if mean < -45:
    sys.exit(f"Reel soundtrack is effectively silent: mean volume {mean} dB")
print(f"Verified decodable audio; mean volume {mean} dB")
