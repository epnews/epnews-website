#!/usr/bin/env python3
"""Generate 4 real-photography EP News banners from credited Wikimedia Commons sources.
All are archive/context photos, NOT photos of the reported 2026 events."""
from pathlib import Path
from urllib.parse import quote
from io import BytesIO
import requests
import time
from PIL import Image,ImageDraw,ImageFont,ImageOps
ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/"assets/images"
DEST.mkdir(parents=True,exist_ok=True)
ITEMS=[
("chaos-investigation-photo.jpg","Figure 1- LNG Export Facility (15404529106).jpg",["WHO BENEFITS","FROM THE CHAOS?"],"FOLLOW THE MONEY. MEASURE THE GAINS. COUNT THE COSTS.","ARCHIVAL LNG FACILITY IMAGE: U.S. GAO, 2014 · PUBLIC DOMAIN"),
("egypt-saudi-photo.jpg","The Egyptian Parliament building.jpg",["EGYPT AUTHORIZES","SAUDI SUPPORT"],"DEFENSIVE ASSISTANCE REQUIRES A SAUDI REQUEST","EGYPTIAN PARLIAMENT PHOTO: ABDELRHMAN 1990, 2025 · CC BY 4.0"),
("eqt-range-photo.jpg","Marcellus Shale Gas Drilling Tower 1 crop.jpg",["EQT–RANGE","GAS MEGADEAL"],"ALL-STOCK DEAL ANNOUNCED — APPROVALS STILL PENDING","ARCHIVAL PENNSYLVANIA GAS RIG: RUHRFISCH, 2009 · CC BY-SA 3.0"),
("judiciary-report-photo.jpg","House Committee on the Judiciary Hearing (55130232132).jpg",["HOUSE DEMOCRATS","ISSUE REPORT"],"EPSTEIN-RELATED CLAIMS ARE ALLEGATIONS, NOT FINDINGS","ARCHIVAL HOUSE JUDICIARY HEARING (UNRELATED): DHS / MIKAELA MCGEE, 2026 · PUBLIC DOMAIN"),
]
HEADERS={"User-Agent":"EPNews/1.0 (editorial-graphics; github.com/epnews/epnews-website)"}
font_bold="/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf"
font_regular="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def f(sz,bold=True):return ImageFont.truetype(font_bold if bold else font_regular,sz)
for out,name,lines,sub,credit in ITEMS:
    url="https://commons.wikimedia.org/wiki/Special:FilePath/"+quote(name)
    response=None
    for attempt in range(6):
        response=requests.get(url,headers=HEADERS,timeout=45)
        if response.status_code not in (429,503):break
        time.sleep(5*(attempt+1))
    response.raise_for_status()
    time.sleep(3)
    if len(response.content)>10_000_000:raise ValueError("Source too large")
    im=Image.open(BytesIO(response.content)).convert("RGB")
    canvas=ImageOps.fit(im,(1600,900),method=Image.Resampling.LANCZOS,centering=(.5,.5))
    # Semiopaque color veil keeps real photographs legible without implying depicted photo is from the incident.
    layer=Image.new("RGBA",(1600,900),(0,0,0,0))
    d=ImageDraw.Draw(layer)
    for x in range(1110):
        a=int(230*(1-x/1110)**1.4)
        d.line([(x,0),(x,900)],fill=(5,12,23,max(40,a)))
    d.rectangle((0,0,1600,145),fill=(8,15,26,170))
    d.rectangle((0,748,1600,900),fill=(7,15,25,220))
    d.rectangle((60,68,76,137),fill=(224,50,61,255))
    d.text((94,82),"EP NEWS   /   "+("INVESTIGATIONS" if out.startswith("chaos") else "WORLD NEWS" if out.startswith("egypt") else "ECONOMY & ENERGY" if out.startswith("eqt") else "U.S. POLITICS"),font=f(39),fill="white",stroke_width=1)
    for y,title in zip((320,441),lines):
        size=78
        while d.textbbox((0,0),title,font=f(size))[2]>1460:size-=2
        d.text((57,y),title,font=f(size),fill="white" if y==320 else (255,78,82),stroke_width=2,stroke_fill=(0,0,0))
    d.rectangle((63,595,1100,601),fill=(234,54,65))
    size=30
    while d.textbbox((0,0),sub,font=f(size))[2]>1480:size-=1
    d.text((62,631),sub,font=f(size),fill="#f0f2f1")
    d.text((62,783),"EDITORIAL PHOTO / ARCHIVAL CONTEXT — NOT THE 2026 EVENT",font=f(23),fill="white")
    d.text((62,826),credit,font=f(17,False),fill="#d7d9df")
    canvas=Image.alpha_composite(canvas.convert("RGBA"),layer).convert("RGB")
    canvas.save(DEST/out,format="JPEG",quality=87,optimize=True)
    print(out,(DEST/out).stat().st_size,response.url)
