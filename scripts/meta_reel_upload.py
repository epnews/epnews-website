#!/usr/bin/env python3
"""EP News Meta Reel uploader. Preview by default; draft only on explicit request."""
import json
import os
import pathlib
import sys
import time
from urllib.parse import urlparse
import requests

PAGE_ID = "1229720560233469"
API_VERSION = os.getenv("META_GRAPH_API_VERSION", "v26.0")
MODE = os.environ.get("REEL_MODE", "preview")
TOKEN = os.getenv("FACEBOOK_PAGE_ACCESS_TOKEN", "")
GRAPH = f"https://graph.facebook.com/{API_VERSION}"
VIDEO = pathlib.Path("reel.mp4")

def api(response):
    try:
        response.raise_for_status()
        result = response.json()
        if isinstance(result, dict) and "error" in result:
            raise RuntimeError(str(result["error"]))
        return result
    except requests.HTTPError as exc:
        # Never print token, request headers, or complete URLs.
        raise RuntimeError(f"Meta request failed: HTTP {response.status_code}; check Page token, permissions and API version") from exc

def main():
    title = os.getenv("REEL_TITLE", "").strip()
    description = os.getenv("REEL_DESCRIPTION", "").strip()
    if not title or not description:
        raise SystemExit("A Reel title and news article description are required.")
    if len(description) > 5000:
        raise SystemExit("Description exceeds 5000-character workflow safety limit.")
    if not VIDEO.is_file() or VIDEO.stat().st_size == 0:
        raise SystemExit("Missing generated Reel MP4.")
    if MODE == "preview":
        print("PREVIEW ONLY: no requests to Meta; description is stored in preview artifact.")
        pathlib.Path("reel-description.txt").write_text(description + "\n", encoding="utf-8")
        return
    if MODE not in ("draft", "publish"):
        raise SystemExit("Unknown publishing mode.")
    if MODE == "publish" and (os.getenv("GITHUB_EVENT_NAME") != "workflow_dispatch" or os.getenv("REEL_PUBLISH_APPROVAL") != "PUBLISH_EP_NEWS_REEL"):
        raise SystemExit("Public publishing requires manual dispatch and explicit approval.")
    if not TOKEN:
        raise SystemExit("FACEBOOK_PAGE_ACCESS_TOKEN repository secret is missing.")
    auth = {"Authorization": f"OAuth {TOKEN}"}
    start = api(requests.post(f"{GRAPH}/{PAGE_ID}/video_reels",
        headers=auth, data={"upload_phase": "start"}, timeout=60))
    video_id = start.get("video_id")
    upload_url = start.get("upload_url")
    if not video_id or not upload_url or urlparse(upload_url).hostname != "rupload.facebook.com":
        raise SystemExit("Meta returned an unexpected upload session.")
    print("Meta upload session created.")
    with VIDEO.open("rb") as fh:
        upload = requests.post(upload_url,
            headers={**auth, "offset": "0", "file_size": str(VIDEO.stat().st_size),
                     "Content-Type": "application/octet-stream"},
            data=fh, timeout=240)
    api(upload)
    print("Video uploaded; submitting to Meta in requested mode.")
    result = api(requests.post(f"{GRAPH}/{PAGE_ID}/video_reels", headers=auth,
        data={"upload_phase": "finish", "video_id": video_id,
              "video_state": ("PUBLISHED" if MODE=="publish" else "DRAFT"), "title": title, "description": description}, timeout=90))
    if result.get("success") is not True:
        raise SystemExit("Meta did not confirm draft finish.")
    requested = "PUBLISHED" if MODE=="publish" else "DRAFT"
    print(f"Meta accepted {requested} request for video ID {video_id}.")
    state, permalink = "unknown", None
    if MODE=="publish":
        for attempt in range(12):
            time.sleep(10)
            info = api(requests.get(f"{GRAPH}/{video_id}", headers=auth, params={"fields":"status,permalink_url"}, timeout=45))
            permalink = info.get("permalink_url") or permalink
            raw = info.get("status") or {}
            state = (raw.get("video_status") or "unknown") if isinstance(raw,dict) else str(raw)
            print("Meta processing status:", state)
            if state.lower() in ("error","failed"):
                raise SystemExit("Meta Reel processing failed.")
            if permalink and state.lower() in ("ready","published","complete","completed"):
                break
    pathlib.Path("reel-meta-result.json").write_text(json.dumps({"video_id":video_id,"state_requested":requested,"processing_status":state,"permalink_url":permalink},indent=2))
    if MODE=="publish" and not permalink:
        print("Meta accepted publication request, but live permalink remains unverified.",file=sys.stderr)

if __name__ == "__main__":
    try:
        main()
    except (requests.RequestException, RuntimeError) as exc:
        print(str(exc), file=sys.stderr)
        sys.exit(1)
