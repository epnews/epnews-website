from pathlib import Path
from io import BytesIO
from urllib.parse import quote
import requests
from PIL import Image,ImageDraw,ImageFont,ImageOps
root=Path(__file__).resolve().parents[1]
name="The Egyptian Parliament building.jpg"
url="https://commons.wikimedia.org/wiki/Special:FilePath/"+quote(name)
res=requests.get(url,headers={"User-Agent":"EPNewsEditorial/1.0 (https://epnews.pages.dev)"},timeout=60)
res.raise_for_status()
base=ImageOps.fit(Image.open(BytesIO(res.content)).convert("RGB"),(1600,900),method=Image.Resampling.LANCZOS)
layer=Image.new("RGBA",(1600,900))
d=ImageDraw.Draw(layer)
for x in range(1600):
    a=int(238*(1-x/1500)**1.6) if x<1500 else 0
    d.line([(x,0),(x,900)],fill=(5,12,23,a))
d.rectangle((0,0,1600,140),fill=(8,17,30,150))
d.rectangle((0,775,1600,900),fill=(5,12,22,220))
font="/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf"
normal="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def bold(size):return ImageFont.truetype(font,size)
d.rectangle((55,52,70,121),fill="#d82832")
d.text((92,64),"EP NEWS   /   WORLD",font=bold(45),fill="white")
d.text((60,307),"EGYPT AUTHORIZES",font=bold(78),fill="white",stroke_width=2,stroke_fill="#0b1420")
d.text((60,414),"MILITARY SUPPORT",font=bold(78),fill="#ff545b",stroke_width=2,stroke_fill="#0b1420")
d.rectangle((60,548,1040,556),fill="#d82832")
d.text((60,580),"FOR SAUDI ARABIA — IF REQUESTED",font=bold(44),fill="white",stroke_width=1,stroke_fill="#0b1420")
d.text((60,671),"AUTHORIZATION IS NOT A DEPLOYMENT",font=bold(32),fill="#ffe5dc")
d.text((60,790),"ARCHIVAL PHOTO OF EGYPTIAN PARLIAMENT — NOT THE 2026 SESSION",font=bold(25),fill="#fff")
d.text((60,839),"Photo: Abdelrhman 1990 / Wikimedia Commons, CC BY 4.0. EP News graphic.",font=ImageFont.truetype(normal,20),fill="#e2e2e2")
base=Image.alpha_composite(base.convert("RGBA"),layer).convert("RGB")
out=root/"assets/images/egypt-saudi-approved-photo.jpg"
base.save(out,quality=91,optimize=True)
print(out,out.stat().st_size)
