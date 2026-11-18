import argparse, json, subprocess, tempfile, math, os, re
from urllib.parse import urlsplit
from pathlib import Path
from validate_ep_short import validate, check_duration
from ep_soundtracks import choose, verify_audio, apply_credit
from validate_youtube_metadata import validate as validate_metadata
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
def centered(d,text,y,n,color='white',bold=False,width=780):
    f=font(n,bold); lines=[]; line=''
    for word in text.split():
        if d.textlength(word,font=f)>width: raise ValueError('Word exceeds safe width')
        test=(line+' '+word).strip()
        if line and d.textlength(test,font=f)>width: lines.append(line); line=word
        else: line=test
    if line: lines.append(line)
    for line in lines:
        d.text((465,y),line,font=f,fill=color,anchor='mt'); y+=int(n*1.28)
    return y
def resolve_article(url):
    u=urlsplit(url)
    if u.scheme!='https' or u.netloc!='epnews.pages.dev' or u.query or u.fragment:
        raise ValueError('Use canonical EP News article URL')
    m=re.fullmatch(r'/article/([a-z0-9-]{1,120})/?',u.path)
    if not m: raise ValueError('Invalid article URL')
    slug=m.group(1)
    source=ROOT/'content'/f'{slug}.js'
    # Evaluate only trusted repository content in a separate Node process.
    js="const fs=require('fs'),vm=require('vm');const ctx={STORIES:[]};vm.runInNewContext(fs.readFileSync(process.argv[1],'utf8'),ctx,{timeout:1000});process.stdout.write(JSON.stringify(ctx.STORIES));"
    stories=json.loads(subprocess.check_output(['node','-e',js,str(source)],timeout=5))
    matches=[s for s in stories if s.get('id')==slug and s.get('status')=='published']
    if len(matches)!=1: raise ValueError('Expected one published story')
    story=matches[0]
    path=(ROOT/story['image']['src']).resolve()
    if not path.is_relative_to((ROOT/'assets/images').resolve()) or not path.is_file():
        raise ValueError('Original article artwork missing or outside asset directory')
    return str(path),story.get('categoryLabel','WORLD')

def render(cfg,out):
    cfg=dict(cfg)
    if cfg.get('article_url'):
        cfg['image'],cfg['category']=resolve_article(cfg['article_url'])

    durations=cfg.get('durations')
    if not isinstance(durations,list) or len(durations)!=4 or any(type(d) is not int or d<2 for d in durations):
        raise ValueError('Provide four integer scene durations of at least two seconds')
    total=sum(durations); check_duration(total,total)
    fixture=cfg.get('test_fixture') is True
    if not fixture:
        if not cfg.get('music') and not cfg.get('soundtrack') and not cfg.get('music_tone') and os.environ.get('EP_NEWS_SOUNDTRACK'):
            cfg['music']=os.environ['EP_NEWS_SOUNDTRACK']
        cfg['music'],audio_filter=choose(cfg,total)
    else:
        audio_filter='anull'
    masthead=fit_image(cfg.get('masthead',MASTHEAD),(1080,330))
    artwork=fit_image(cfg['image'],(1000,563))
    base=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(base)
    base.paste(masthead,((W-masthead.width)//2,74))
    base.paste(artwork,((W-artwork.width)//2,380))
    d.rectangle((40,956,1040,962),fill=RED)
    d.rectangle((0,970,W,H),fill=BG)
    centered(d,'EP NEWS  •  '+cfg.get('category','WORLD').upper(),1375,28,'#b9cbe0',True)
    d.rectangle((65,1475,865,1481),fill='#35445a')
    centered(d,'epnews.pages.dev',1420,32)
    panels=[]
    for label,key in [('THE STORY','hook'),(cfg.get('development_label','WHAT HAPPENED'),'development'),(cfg.get('impact_label','WHY IT MATTERS'),'impact'),('FOLLOW THE FACTS','cta')]:
        panel=Image.new('RGB',(W,390),BG); pd=ImageDraw.Draw(panel)
        centered(pd,label,16,32,RED,True)
        end=centered(pd,cfg[key],76,52,'white',False,780)
        if end>=380: raise ValueError('Text too long for approved layout: '+key)
        panels.append(panel)
    audio=['-f','lavfi','-i','anullsrc=channel_layout=stereo:sample_rate=44100'] if fixture else ['-i',str(cfg['music'])]
    cmd=['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s','1080x1920','-r','30','-i','pipe:0']+audio+['-map','0:v:0','-map','1:a:0','-t',str(total),'-c:v','libx264','-profile:v','main','-level:v','4.1','-pix_fmt','yuv420p','-preset','fast','-threads','2','-c:a','aac','-profile:a','aac_low','-ar','44100','-ac','2','-b:a','192k','-af',audio_filter,'-movflags','+faststart',str(out)]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    try:
        frame_no=0
        for i,duration in enumerate(durations):
            for j in range(duration*FPS):
                frame=base.copy()
                region=Image.new('RGB',(W,390),BG)
                transition=18
                if i and j<transition:
                    offset=round(390*(j+1)/transition)
                    region.paste(panels[i-1],(0,-offset))
                    region.paste(panels[i],(0,390-offset))
                else: region.paste(panels[i],(0,0))
                frame.paste(region,(0,975))
                ImageDraw.Draw(frame).rectangle((65,1475,65+round(800*(frame_no+1)/(total*FPS)),1481),fill=RED)
                proc.stdin.write(frame.tobytes()); frame_no+=1
        proc.stdin.close()
        if proc.wait(): raise RuntimeError('FFmpeg failed')
    except BaseException:
        proc.kill(); proc.wait(); raise
    validate(out,total)
    if not fixture: verify_audio(out)

if __name__=='__main__':
    p=argparse.ArgumentParser(); p.add_argument('config'); p.add_argument('output'); p.add_argument('--metadata'); a=p.parse_args()
    cfg=json.loads(Path(a.config).read_text())
    if cfg.get('test_fixture') is True:
        render(cfg,a.output)
    else:
        if not a.metadata: p.error('--metadata is required for production')
        metadata=json.loads(Path(a.metadata).read_text())
        if cfg.get('article_url') != metadata.get('article_url'): raise ValueError('Article URL mismatch')
        durations=cfg.get('durations')
        if not isinstance(durations,list) or len(durations)!=4 or any(type(d) is not int or d<2 for d in durations): raise ValueError('Four planned scene durations required')
        apply_credit(cfg,sum(durations),metadata)
        validate_metadata(metadata)
        render(cfg,a.output)
        Path(a.metadata).write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+'\n')
