"""Finish a silent cloud Short locally using the shared soundtrack library."""
import argparse, json, subprocess
from pathlib import Path
from ep_soundtracks import choose, verify_audio
from validate_ep_short import validate, check_duration
from validate_youtube_metadata import validate as validate_metadata

def mux(cfg, metadata, source, output):
    durations=cfg.get('durations')
    if not isinstance(durations,list) or len(durations)!=4 or any(type(d) is not int or d<2 for d in durations):
        raise ValueError('Four planned scene durations required')
    total=sum(durations)
    check_duration(total,total)
    if Path(source).resolve()==Path(output).resolve(): raise ValueError('Use distinct input and output')
    validate_metadata(metadata)
    if cfg.get('article_url') != metadata['article_url']: raise ValueError('Article URL mismatch')
    credit=cfg.get('music_attribution')
    if credit and credit not in metadata['description']: raise ValueError('Music credit missing from description')
    music,af=choose(cfg,total)
    validate(source,total)
    subprocess.run(['ffmpeg','-v','error','-y','-i',str(source),'-i',music,'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-profile:a','aac_low','-ar','44100','-ac','2','-b:a','192k','-af',af,'-t',str(total),'-movflags','+faststart',str(output)],check=True)
    validate(output,total)
    verify_audio(output)

if __name__=='__main__':
    p=argparse.ArgumentParser()
    for arg in ('config','metadata','source','output'): p.add_argument(arg)
    a=p.parse_args()
    mux(json.loads(Path(a.config).read_text()),json.loads(Path(a.metadata).read_text()),a.source,a.output)
