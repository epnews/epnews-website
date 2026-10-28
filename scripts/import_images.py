#!/usr/bin/env python3
"""Import only HTTPS image assets listed in a reviewed repository manifest."""
import json
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlparse
import socket
import ipaddress

ROOT=Path(__file__).resolve().parents[1]
MANIFEST=ROOT/'content/image-imports.json'
MAX_BYTES=8_000_000
if not MANIFEST.exists():
    raise SystemExit('No image import manifest')
data=json.loads(MANIFEST.read_text())
if not isinstance(data,list) or len(data)>20: raise ValueError('Expected 0-20 images')
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
            downloaded=gdown.download(id=ids[0],output=str(Path(folder)/'image'),quiet=True)
            if not downloaded: raise ValueError('Google Drive download failed; check anyone-with-link access')
            payload=Path(downloaded).read_bytes()
        if len(payload)>MAX_BYTES:raise ValueError('Image exceeds 8MB')
        signatures={'.png':payload.startswith(bytes.fromhex('89504e470d0a1a0a')),'.jpg':payload.startswith(bytes.fromhex('ffd8ff')),'.jpeg':payload.startswith(bytes.fromhex('ffd8ff')),'.webp':payload.startswith(b'RIFF') and payload[8:12]==b'WEBP'}
        if not signatures[extension]:raise ValueError('Image file signature mismatch')
        target=ROOT/dest
        target.parent.mkdir(parents=True,exist_ok=True)
        if dest == 'assets/images/epnews-venezuela-oil-website-1600x900.png':
            from PIL import Image
            from io import BytesIO
            picture=Image.open(BytesIO(payload)).convert('RGB')
            picture=picture.resize((1600,900),Image.Resampling.LANCZOS)
            buffer=BytesIO()
            picture.save(buffer,format='PNG',optimize=True)
            payload=buffer.getvalue()
            assert Image.open(BytesIO(payload)).size == (1600,900)
        target.write_bytes(payload)
        print(f'Imported Google Drive image {dest} ({len(payload)} bytes)')
        continue
    req=Request(source,headers={'User-Agent':'EPNewsImageImporter/1.0'})
    with urlopen(req,timeout=25) as res:
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
    target.write_bytes(payload)
    print(f'Imported {dest} ({len(payload)} bytes)')
