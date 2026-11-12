#!/usr/bin/env python3
"""Import only HTTPS image assets listed in a reviewed repository manifest."""
import json
from pathlib import Path
from urllib.request import Request, build_opener, HTTPRedirectHandler, ProxyHandler
from urllib.parse import urlparse
import socket
import ipaddress
import time
import hashlib
import re
from io import BytesIO
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
MANIFEST=ROOT/'content/image-imports.json'
MAX_BYTES=8_000_000
class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise ValueError('External redirects are blocked; use the final HTTPS URL')

def verify_exact(payload, extension, entry):
    expected=entry.get('sha256')
    if not isinstance(expected,str) or not re.fullmatch(r'[a-f0-9]{64}',expected):
        raise ValueError('External import requires approved SHA-256')
    if hashlib.sha256(payload).hexdigest()!=expected:
        raise ValueError('Approved SHA-256 mismatch')
    if len(payload)>MAX_BYTES: raise ValueError('Image exceeds 8MB')
    with Image.open(BytesIO(payload)) as im:
        if im.format != {'.png':'PNG','.jpg':'JPEG','.jpeg':'JPEG','.webp':'WEBP'}[extension]:
            raise ValueError('Image format mismatch')
        if im.size!=(1600,900): raise ValueError('Website graphic must be 1600x900')
        im.verify()
    with Image.open(BytesIO(payload)) as im: im.load()

if not MANIFEST.exists():
    raise SystemExit('No image import manifest')
data=json.loads(MANIFEST.read_text())
if not isinstance(data,list) or len(data)>1000: raise ValueError('Expected 0-1000 images')
for entry in data:
    source=entry['url']
    dest=entry['path']
    parsed=urlparse(source)
    if parsed.scheme!='https' or not parsed.hostname or parsed.username or parsed.password:
        raise ValueError('Only public HTTPS URLs permitted')
    if dest.count('/')!=2 or not dest.startswith('assets/images/') or '..' in dest or chr(92) in dest:
        raise ValueError('Path must be a single filename in assets/images/')
    extension=Path(dest).suffix.lower()
    if extension not in ('.png','.jpg','.jpeg','.webp'): raise ValueError('Unsupported extension')
    exact=entry.get('mode')=='verified-external'
    if exact and (parsed.hostname not in ('export-download.canva.com',) or parsed.port not in (None,443)):
        raise ValueError('External source host not approved')
    if (ROOT/dest).is_file():
        if exact: verify_exact((ROOT/dest).read_bytes(),extension,entry)
        with Image.open(ROOT/dest) as existing:
            if existing.width < 1 or existing.height < 1:
                raise ValueError(f'Invalid image dimensions for {dest}')
        print(f'Already imported and dimension-verified: {dest}')
        continue
    # Do not allow fetching local/private-network endpoints.
    addresses=socket.getaddrinfo(parsed.hostname,443,type=socket.SOCK_STREAM)
    for addr in addresses:
        ip=ipaddress.ip_address(addr[4][0])
        if not ip.is_global: raise ValueError('Private or special-use image source blocked')
    if parsed.hostname == 'drive.google.com' and parsed.path == '/uc':
        from urllib.parse import parse_qs
        ids=parse_qs(parsed.query).get('id',[])
        if len(ids)!=1 or not ids[0].replace('-','').replace('_','').isalnum():
            raise ValueError('Invalid Google Drive ID')
        import gdown
        import tempfile
        with tempfile.TemporaryDirectory() as folder:
            downloaded=None
            last_error=None
            for attempt in range(1, 5):
                try:
                    downloaded=gdown.download(id=ids[0],output=str(Path(folder)/'image'),quiet=True)
                    if downloaded and Path(downloaded).is_file() and Path(downloaded).stat().st_size:
                        break
                    downloaded=None
                    last_error='No nonempty file returned'
                except Exception as exc:
                    last_error=str(exc)
                    downloaded=None
                if attempt < 4:
                    delay=15 * attempt
                    print(f'Google Drive download not ready for {ids[0]} (attempt {attempt}/4); retrying in {delay}s',flush=True)
                    time.sleep(delay)
            if not downloaded:
                raise ValueError(
                    f'Google Drive file {ids[0]} was not downloadable after four attempts. '
                    'Check file-level Anyone with the link — Viewer access and verify the Drive ID. '
                    f'Last error: {last_error}'
                )
            payload=Path(downloaded).read_bytes()
        if len(payload)>MAX_BYTES:raise ValueError('Image exceeds 8MB')
        signatures={'.png':payload.startswith(bytes.fromhex('89504e470d0a1a0a')),'.jpg':payload.startswith(bytes.fromhex('ffd8ff')),'.jpeg':payload.startswith(bytes.fromhex('ffd8ff')),'.webp':payload.startswith(b'RIFF') and payload[8:12]==b'WEBP'}
        if not signatures[extension]:raise ValueError('Image file signature mismatch')
        target=ROOT/dest
        target.parent.mkdir(parents=True,exist_ok=True)
        picture=Image.open(BytesIO(payload)).convert('RGB')
        if picture.width > 1600 or picture.height > 1600:
            picture.thumbnail((1600,1600),Image.Resampling.LANCZOS)
        buffer=BytesIO()
        if extension in ('.jpg','.jpeg'):
            picture.save(buffer,format='JPEG',quality=90)
        elif extension == '.webp':
            picture.save(buffer,format='WEBP',quality=90)
        else:
            picture.save(buffer,format='PNG',optimize=True)
        payload=buffer.getvalue()
        if Image.open(BytesIO(payload)).size != picture.size:
            raise ValueError(f'Failed to preserve dimensions for {dest}')
        target.write_bytes(payload)
        print(f'Imported Google Drive image {dest} ({len(payload)} bytes)')
        continue
    if exact:
        # Signed URLs are supplied via an Actions secret, never committed.
        raise ValueError('Verified external asset missing; use the secure import workflow')
    req=Request(source,headers={'User-Agent':'EPNewsImageImporter/1.0'})
    with build_opener(ProxyHandler({}),NoRedirect()).open(req,timeout=25) as res:
        if res.url != source: raise ValueError('Redirects are not supported; use the final URL')
        content_type=res.headers.get('Content-Type','').split(';')[0].strip().lower()
        if content_type not in ('image/png','image/jpeg','image/webp'):
            raise ValueError('Source is not a supported raster image')
        payload=res.read(MAX_BYTES+1)
    if len(payload)>MAX_BYTES: raise ValueError('Image exceeds 8MB')
    signatures={'.png':payload.startswith(bytes.fromhex('89504e470d0a1a0a')),'.jpg':payload.startswith(bytes.fromhex('ffd8ff')),'.jpeg':payload.startswith(bytes.fromhex('ffd8ff')),'.webp':payload.startswith(b'RIFF') and payload[8:12]==b'WEBP'}
    if not signatures[extension]:raise ValueError('Image file signature mismatch')
    target=ROOT/dest
    target.parent.mkdir(parents=True,exist_ok=True)
    picture=Image.open(BytesIO(payload)).convert('RGB')
    if picture.width > 1600 or picture.height > 1600:
        picture.thumbnail((1600,1600),Image.Resampling.LANCZOS)
    buffer=BytesIO()
    if extension in ('.jpg','.jpeg'):
        picture.save(buffer,format='JPEG',quality=90)
    elif extension == '.webp':
        picture.save(buffer,format='WEBP',quality=90)
    else:
        picture.save(buffer,format='PNG',optimize=True)
    payload=buffer.getvalue()
    target.write_bytes(payload)
    print(f'Imported {dest} ({len(payload)} bytes)')
