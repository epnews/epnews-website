#!/usr/bin/env python3
"""Automatically select a newly merged, approved Reel package (preview only)."""
import json, os, pathlib, subprocess
before=os.environ.get("BEFORE_SHA","")
after=os.environ.get("AFTER_SHA","HEAD")
if not before or set(before)=={"0"}:
    raise SystemExit("Cannot identify prior commit; refusing automatic run.")
result=subprocess.run(["git","diff","--name-only","--diff-filter=AM",before,after,"--","reel-packages/"],capture_output=True,text=True,check=True)
paths=[p for p in result.stdout.splitlines() if p.startswith("reel-packages/") and p.endswith(".json")]
approved=[]
for path in paths:
    data=json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
    if data.get("approved") is True and data.get("automatic_reel") is True:
        approved.append(path)
if len(approved)!=1:
    raise SystemExit(f"Automatic generation requires exactly one newly changed package with approved:true and automatic_reel:true; found {len(approved)}. No video submitted.")
path=approved[0]
with open(os.environ["GITHUB_ENV"],"a") as f:
    f.write(f"PACKAGE_PATH={path}\n")
os.environ["PACKAGE_PATH"]=path
print(path)
