#!/usr/bin/env python3
"""Select one new approved package or convert one verified publication manifest."""
import json, os, pathlib, subprocess, sys
before=os.environ.get("BEFORE_SHA","")
after=os.environ.get("AFTER_SHA","HEAD")
if not before or set(before)=={"0"}:
    raise SystemExit("Cannot identify prior commit; refusing automatic run.")
result=subprocess.run(["git","diff","--name-only","--diff-filter=AM",before,after,"--","reel-packages/","publication-manifests/"],capture_output=True,text=True,check=True)
paths=[p for p in result.stdout.splitlines() if p.endswith(".json")]
candidates=[]
for path in paths:
    data=json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
    if path.startswith("reel-packages/") and data.get("approved") is True and data.get("automatic_reel") is True:
        candidates.append(("package",path))
    if path.startswith("publication-manifests/") and data.get("approved_for_reel") is True and data.get("automatic_reel") is True:
        candidates.append(("manifest",path))
if len(candidates)!=1:
    raise SystemExit(f"Expected exactly one approved, opted-in changed package or manifest; found {len(candidates)}")
kind,path=candidates[0]
if kind=="manifest":
    subprocess.run([sys.executable,"scripts/create_reel_package.py",path,"--approve"],check=True,stdout=sys.stderr)
    slug=json.loads(pathlib.Path(path).read_text())["slug"]
    path=f"reel-packages/{slug}.json"
with open(os.environ["GITHUB_ENV"],"a") as f:
    f.write(f"PACKAGE_PATH={path}\n")
print(path)
