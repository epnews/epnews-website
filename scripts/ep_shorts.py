import argparse, json, subprocess, tempfile, math
from pathlib import Path
from validate_ep_short import validate, check_duration
from PIL import Image, ImageDraw, ImageFont, ImageOps

W,H,FPS=1080,1920,30
ROOT=Path(__file__).resolve().parents[1]
MASTHEAD=ROOT/'assets/images/ep-news-official-horizontal-masthead-20261105.png'
BG='#0c1c2d'
RED='#ef6269'
def font(n,bold=False):
    return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans'+('-Bold' if bold else '')+'.ttf',n)
def fit_image(path, size):
    with Image.open(path) as im:
        return ImageOps.contain(im.convert('RGB'),size,Image.Resampling.LANCZOS)
def centered(d,text,y,n,color='white',bold=False,width=900):
    f=font(n,bold); lines=[]; line=''
    for word in text.split():
        if d.textlength(word,font=f)>width: raise ValueError('Word exceeds safe width')
        test=(line+' '+word).strip()
        if line and d.textlength(test,font=f)>width: lines.append(line); line=word
        else: line=test
    if line: lines.append(line)
    for line in lines:
        d.text((540,y),line,font=f,fill=color,anchor='mt'); y+=int(n*1.4)
    return y
def render(cfg,out):
    durations=cfg.get('durations')
    if not isinstance(durations,list) or len(durations)!=4 or any(type(d) is not int or d<2 for d in durations):
        raise ValueError('Provide four integer scene durations of at least two seconds')
    total=sum(durations); check_duration(total,total)
    fixture=cfg.get('test_fixture') is True
    if not fixture and (not cfg.get('music') or cfg.get('music_rights_verified') is not True):
        raise ValueError('Approved soundtrack file and rights confirmation required')
    masthead=fit_image(cfg.get('masthead',MASTHEAD),(1080,330))
    artwork=fit_image(cfg['image'],(1000,563))
    base=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(base)
    base.paste(masthead,((W-masthead.width)//2,74))
    base.paste(artwork,((W-artwork.width)//2,380))
    d.rectangle((40,956,1040,962),fill=RED)
    d.rectangle((0,1640,W,H),fill='#0a1728')
    centered(d,'EP NEWS  •  '+cfg.get('category','WORLD').upper(),1680,32,'#b9cbe0',True)
    d.rectangle((40,1752,1040,1758),fill='#35445a')
    centered(d,'epnews.pages.dev',1790,36)
    panels=[]
    for label,key in [('THE STORY','hook'),(cfg.get('development_label','WHAT HAPPENED'),'development'),(cfg.get('impact_label','WHY IT MATTERS'),'impact'),('FOLLOW THE FACTS','cta')]:
        panel=Image.new('RGB',(W,660),BG); pd=ImageDraw.Draw(panel)
        centered(pd,label,38,34,RED,True)
        end=centered(pd,cfg[key],135,58,'white',False,880)
        if end>610: raise ValueError('Text too long for approved layout: '+key)
        panels.append(panel)
    audio=['-f','lavfi','-i','anullsrc=channel_layout=stereo:sample_rate=44100'] if fixture else ['-stream_loop','-1','-i',str(cfg['music'])]
    cmd=['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1080x1920','-r','30','-i','pipe:0']+audio+['-map','0:v:0','-map','1:a:0','-t',str(total),'-c:v','libx264','-profile:v','main','-level:v','4.1','-pix_fmt','yuv420p','-preset','fast','-threads','2','-c:a','aac','-profile:a','aac_low','-ar','44100','-ac','2','-b:a','128k','-af',f'volume=0.65,afade=t=out:st={total-1}:d=1','-movflags','+faststart',str(out)]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    try:
        frame_no=0
        for i,duration in enumerate(durations):
            for j in range(duration*FPS):
                frame=base.copy()
                region=Image.new('RGB',(W,660),BG)
                transition=18
                if i and j<transition:
                    offset=round(660*(j+1)/transition)
                    region.paste(panels[i-1],(0,-offset))
                    region.paste(panels[i],(0,660-offset))
                else: region.paste(panels[i],(0,0))
                frame.paste(region,(0,970))
                ImageDraw.Draw(frame).rectangle((40,1752,40+round(1000*(frame_no+1)/(total*FPS)),1758),fill=RED)
                proc.stdin.write(frame.tobytes()); frame_no+=1
        proc.stdin.close()
        if proc.wait(): raise RuntimeError('FFmpeg failed')
    except BaseException:
        proc.kill(); proc.wait(); raise
    validate(out,total)

if __name__=='__main__':
    p=argparse.ArgumentParser(); p.add_argument('config'); p.add_argument('output'); a=p.parse_args()
    render(json.loads(Path(a.config).read_text()),a.output)
