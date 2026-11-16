import argparse, json, subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
W,H=1080,1920
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def font(n): return ImageFont.truetype(FONT,n)
def centered(d,t,y,n,color='white',width=880):
    f=font(n); words=t.split(); lines=[]; line=''
    for word in words:
        test=(line+' '+word).strip()
        if d.textlength(test,font=f)>width and line: lines.append(line); line=word
        else: line=test
    if line: lines.append(line)
    for line in lines:
        d.text((540,y),line,font=f,fill=color,anchor='mt'); y+=int(n*1.22)
    return y

def render(cfg,out):
    with tempfile.TemporaryDirectory() as tmp:
        paths=[]
        for i,(label,key,duration) in enumerate([('THE STORY','hook',3),('THE CONTRADICTION','development',5),('WHY IT MATTERS','impact',4),('EPIC PERSPECTIVE NEWS','cta',3)]):
            im=Image.new('RGB',(W,H),'#091426'); d=ImageDraw.Draw(im)
            d.rounded_rectangle((24,24,1056,1896),radius=42,outline='#bd2334',width=12)
            d.rounded_rectangle((43,43,1037,1877),radius=30,outline='#e7e9ee',width=3)
            d.rectangle((100,120,980,130),fill='#d12b3b'); centered(d,'EP NEWS',165,90)
            centered(d,label,310,40,'#f36b70')
            if i<3:
                pic=Image.open(cfg['image']).convert('RGB')
                if cfg.get('crop'): pic=pic.crop(tuple(cfg['crop']))
                pic=ImageOps.fit(pic,(880,620)); im.paste(pic,(100,410)); d=ImageDraw.Draw(im)
                d.rectangle((100,1030,980,1040),fill='#d12b3b')
                end=centered(d,cfg[key],1100,72)
                if end>1570: raise ValueError('Headline too long; shorten '+key)
            else:
                centered(d,'FOLLOW THE FACTS.',620,94); centered(d,cfg[key],930,64)
            centered(d,'epnews.pages.dev',1600,44,'#cbd5e1')
            d.rectangle((100,1700,980,1710),fill='#35445a'); d.rectangle((100,1700,100+220*(i+1),1710),fill='#d12b3b')
            p=Path(tmp)/f'{i}.png'; im.save(p); v=Path(tmp)/f'{i}.mp4'
            subprocess.run(['ffmpeg','-v','error','-y','-i',str(p),'-vf',f"zoompan=z='1+0.00018*on':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d={duration*30}:s=1080x1920:fps=30",'-t',str(duration),'-c:v','libx264','-threads','2','-preset','fast','-pix_fmt','yuv420p',str(v)],check=True); paths.append(v)
        listing=Path(tmp)/'concat.txt'; listing.write_text('\n'.join(f"file '{p}'" for p in paths))
        subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',str(listing),'-f','lavfi','-i','anullsrc=channel_layout=stereo:sample_rate=48000','-map','0:v:0','-map','1:a:0','-c:v','libx264','-profile:v','main','-level:v','4.1','-pix_fmt','yuv420p','-preset','fast','-threads','2','-c:a','aac','-b:a','128k','-shortest','-movflags','+faststart',out],check=True)
if __name__=='__main__':
    p=argparse.ArgumentParser(); p.add_argument('config'); p.add_argument('output'); a=p.parse_args(); render(json.loads(Path(a.config).read_text()),a.output)
