#!/usr/bin/env python3
"""Generate a Reel manifest from a verified, editor-approved story payload."""
import argparse,json,pathlib,re
p=argparse.ArgumentParser()
p.add_argument("story",type=pathlib.Path)
p.add_argument("--approve-reel",action="store_true")
a=p.parse_args()
d=json.loads(a.story.read_text(encoding="utf-8"))
for k in ("slug","headline","facebook_description","drive_file_id"):
    if not isinstance(d.get(k),str) or not d[k].strip(): p.error("Missing "+k)
if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*",d["slug"]): p.error("Invalid slug")
if not re.fullmatch(r"[A-Za-z0-9_-]{15,}",d["drive_file_id"]): p.error("Invalid Drive ID")
for k in ("image_verified","fact_checked","website_published"):
    if d.get(k) is not True: p.error("Unverified: "+k)
if not a.approve_reel: p.error("Explicit --approve-reel required")
m={k:d[k] for k in ("slug","headline","facebook_description","drive_file_id","image_verified","fact_checked","website_published")}
m.update(approved_for_reel=True,automatic_reel=True,music_category=d.get("music_category","none"),music_track=d.get("music_track",""),duration=str(d.get("duration","15")),custom_seconds=str(d.get("custom_seconds","30")))
f=pathlib.Path("publication-manifests")/(d["slug"]+".json")
if f.exists(): p.error("Refusing overwrite: "+str(f))
f.parent.mkdir(exist_ok=True)
f.write_text(json.dumps(m,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
print(f)
