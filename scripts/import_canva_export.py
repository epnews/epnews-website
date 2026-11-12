#!/usr/bin/env python3
"""Stage a Canva export without publishing or persisting its signed URL."""
import os, re, hashlib, ipaddress, socket, json, time
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import Request, build_opener, ProxyHandler, HTTPRedirectHandler
from io import BytesIO
from PIL import Image

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs):
        raise ValueError("Redirect blocked")

def validate(payload):
    if len(payload)>8_000_000: raise ValueError("Image exceeds 8MB")
    with Image.open(BytesIO(payload)) as im:
        if im.format!="PNG" or im.size!=(1600,900): raise ValueError("Expected PNG 1600x900")
        im.verify()
    with Image.open(BytesIO(payload)) as im: im.load()
    return hashlib.sha256(payload).hexdigest()

def main():
    url=os.environ["EP_CANVA_EXPORT_URL"]
    slug=os.environ["IMAGE_SLUG"]
    expected=os.environ.get("EXPECTED_SHA256","")
    if not re.fullmatch(r"[a-z0-9-]{1,100}",slug): raise ValueError("Invalid slug")
    u=urlsplit(url)
    if u.scheme!="https" or u.hostname!="export-download.canva.com" or u.port not in (None,443) or u.username or u.password or u.fragment:
        raise ValueError("Only direct Canva HTTPS exports permitted")
    for a in socket.getaddrinfo(u.hostname,443,type=socket.SOCK_STREAM):
        if not ipaddress.ip_address(a[4][0]).is_global: raise ValueError("Nonpublic address")
    opener=build_opener(ProxyHandler({}),NoRedirect())
    for attempt in range(3):
        try:
            with opener.open(Request(url,headers={"User-Agent":"EPNewsImporter/2"}),timeout=25) as response:
                payload=response.read(8_000_001)
            break
        except Exception:
            if attempt==2: raise SystemExit("Canva download failed; refresh export secret")
            time.sleep(5*(attempt+1))
    digest=validate(payload)
    if expected and digest!=expected: raise ValueError("Approved hash mismatch")
    out=Path("external-image-staging")
    out.mkdir(exist_ok=True)
    (out/(slug+".png")).write_bytes(payload)
    (out/"receipt.json").write_text(json.dumps({"path":"assets/images/"+slug+".png","url":"https://export-download.canva.com/","mode":"verified-external","sha256":digest,"width":1600,"height":900},indent=2))
    print("Verified PNG SHA-256:",digest)
    if expected:
        target=Path("assets/images")/(slug+".png")
        if target.exists() and target.read_bytes()!=payload: raise ValueError("Refusing to overwrite existing asset")
        manifest=Path("content/image-imports.json")
        entries=json.loads(manifest.read_text())
        receipt=json.loads((out/"receipt.json").read_text())
        existing=[e for e in entries if e["path"]==receipt["path"]]
        if existing and existing!=[receipt]: raise ValueError("Conflicting manifest entry")
        target.write_bytes(payload)
        if not existing: entries.append(receipt)
        manifest.write_text(json.dumps(entries,indent=2)+"\n")

if __name__=="__main__": main()
