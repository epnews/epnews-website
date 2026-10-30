#!/usr/bin/env python3
"""Create photo-based Netanyahu EP News Reel card from an authentic licensed photograph."""
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import requests
URL="https://commons.wikimedia.org/wiki/Special:Redirect/file/Netanyahu_official_portrait.jpg"
resp=requests.get(URL,timeout=45,headers={"User-Agent":"EPNewsGraphics/1.0 (editorial graphics)"})
resp.raise_for_status()
photo=Image.open(BytesIO(resp.content)).convert("RGB")
W,H=1080,1920
canvas=Image.new("RGB",(W,H),"#0b1527")
# Crop photograph, without inventing any visual content.
ratio=max(W/photo.width,1340/photo.height)
p=photo.resize((round(photo.width*ratio),round(photo.height*ratio)),Image.Resampling.LANCZOS)
canvas.paste(p,((W-p.width)//2,130))
draw=ImageDraw.Draw(canvas,"RGBA")
draw.rectangle((0,0,W,170),fill=(9,19,38,255))
draw.rectangle((0,1260,W,H),fill=(9,19,38,242))
draw.rectangle((0,1250,W,1263),fill=(203,35,48,255))
def font(size,bold=True):
    path="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    return ImageFont.truetype(path,size)
draw.text((60,48),"EP NEWS",font=font(74),fill="white")
draw.rectangle((60,1320,490,1402),fill=(195,32,46,255))
draw.text((85,1330),"WORLD NEWS",font=font(48),fill="white")
for i,line in enumerate(["NETANYAHU BLOC","SHORT OF MAJORITY"]):
    draw.text((56,1450+i*115),line,font=font(66),fill="white")
draw.text((60,1710),"53 OF 120 SEATS  |  61 NEEDED",font=font(39),fill="#f0e6df")
draw.text((60,1818),"ARCHIVE PHOTO: Avi Ohayon / Israel GPO",font=font(25,False),fill="#cbd5e1")
out=Path("artifacts/netanyahu-photo-reel-1080x1920.jpg")
out.parent.mkdir(parents=True,exist_ok=True)
canvas.save(out,quality=92,optimize=True)
assert Image.open(out).size==(1080,1920)
print(out)
