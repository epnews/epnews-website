#!/usr/bin/env python3
"""Verify a published EP News article is live before generating its Reel manifest."""
import argparse, json, pathlib, re, sys, time, urllib.error, urllib.request
p=argparse.ArgumentParser()
p.add_argument("payload",type=pathlib.Path)
p.add_argument("--base-url",default="https://epnews.pages.dev")
p.add_argument("--attempts",type=int,default=8)
p.add_argument("--delay",type=int,default=30)
a=p.parse_args()
d=json.loads(a.payload.read_text(encoding="utf-8"))
slug=d.get("slug","")
script=d.get("article_script","")
if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*",slug):
    p.error("Invalid article slug")
if not re.fullmatch(r"content/[a-z0-9-]+\.js",script):
    p.error("article_script must be a single content/<slug>.js file")
if d.get("approved_for_reel") is not True or d.get("automatic_reel") is not True:
    p.error("Reel approval and opt-in required")
if d.get("fact_checked") is not True or d.get("image_verified") is not True:
    p.error("Editorial and Drive graphic verification required")
if d.get("website_published") is True:
    p.error("website_published is set by live verification, not by editorial input")
if a.base_url!="https://epnews.pages.dev":
    p.error("Production origin is fixed")
if not 1<=a.attempts<=20 or not 0<=a.delay<=120:
    p.error("Invalid retry configuration")
def get(path):
    req=urllib.request.Request(a.base_url+"/"+path,headers={"User-Agent":"EPNews-Reel-Handoff/1.0","Cache-Control":"no-cache"})
    with urllib.request.urlopen(req,timeout=20) as resp:
        if resp.status!=200: raise ValueError("HTTP "+str(resp.status))
        return resp.read(2_000_000).decode("utf-8")
for attempt in range(a.attempts):
    try:
        index=get("")
        article=get(script)
        if not re.search(r'<script\s+src=["\\']'+re.escape(script)+r'(?:\?[^"\\']*)?["\\']',index):
            raise ValueError("Article script not registered in live homepage")
        if not re.search(r'\bid\s*:\s*["\\']'+re.escape(slug)+r'["\\']',article):
            raise ValueError("Article ID absent from live script")
        if not re.search(r'\bstatus\s*:\s*["\\']published["\\']',article):
            raise ValueError("Live article is not marked published")
        break
    except (urllib.error.URLError,TimeoutError,ValueError) as e:
        print(f"Live verification pending ({attempt+1}/{a.attempts}): {e}",file=sys.stderr)
        if attempt+1==a.attempts: raise SystemExit("Live website publication could not be verified")
        time.sleep(a.delay)
d["website_published"]=True
output=pathlib.Path("verified-reel-story.json")
output.write_text(json.dumps(d,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("Verified live EP News story: "+slug)
