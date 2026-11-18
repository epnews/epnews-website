import hashlib, os, re, subprocess
from pathlib import Path

TRACKS = {
    'sweaty-staredown': ('EP News - Sweaty Staredown - The Soundings.mp3', '9efa97e63ccd26e5f2d8e5b27f821183654f3bd9c16c9cc92ffa035a1e34eaac', 6, .60, 127.84),
    'news-theme': ('News Theme - Kevin MacLeod.mp3', '9bd077411b80abce5f2c9ab9ad061e98ee40f75af9633e408a97bff84894de52', 6, .65, 26.07),
    'stranger-danger': ('Stranger Danger - Francis Preve.mp3', 'b57d6d67dcf68f7563c3d312e0968a3f1044dac5c77fd827062d5d8b8eca7b8a', 8, .57, 113.50),
    'epic-unease': ('Epic Unease - Kevin MacLeod.mp3', '8c2bec0a9259f088dbeaedd6ed0c6f96be11f074d49148c53a90266d9e2bc9af', 6, .65, 37.53),
}
def choose(cfg, total):
    tone = cfg.get('music_tone', '').lower()
    key = cfg.get('soundtrack') or {'breaking-news':'news-theme','investigation':'stranger-danger','economic':'stranger-danger','technology':'stranger-danger','military':'epic-unease','global-power':'epic-unease','confrontation':'sweaty-staredown'}.get(tone,'sweaty-staredown')
    if key not in TRACKS: raise ValueError('Unknown soundtrack')
    name, digest, gain, limit, length = TRACKS[key]
    if total > length:
        if cfg.get('soundtrack'): raise ValueError('Selected soundtrack too short; choose another')
        key='sweaty-staredown'
        name,digest,gain,limit,length=TRACKS[key]
    if total > length: raise ValueError('Soundtrack too short')
    path=Path(cfg.get('music') or Path(os.environ.get('EP_NEWS_SOUNDTRACK_DIR','.'))/name)
    if hashlib.sha256(path.read_bytes()).hexdigest()!=digest: raise ValueError('Soundtrack hash mismatch')
    if cfg.get('music_rights_verified') is not True: raise ValueError('Soundtrack rights must be confirmed')
    if key in ('news-theme','epic-unease') and not cfg.get('music_attribution'): raise ValueError('Include verified artist attribution in YouTube description')
    print('Selected soundtrack:',key)
    af=f'highpass=f=90,equalizer=f=1800:t=q:w=1:g=3,acompressor=threshold=0.06:ratio=8:attack=5:release=100:makeup=4,volume={gain}dB,aresample=192000,alimiter=limit={limit}:level=false:attack=5:release=50,aresample=44100,afade=t=out:st={total-1}:d=1'
    return str(path),af

def verify_audio(path):
    p=subprocess.run(['ffmpeg','-hide_banner','-i',str(path),'-vn','-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True,check=True)
    summary=p.stderr.rsplit('Summary:',1)[-1]
    loud=float(re.search(r'I:\s+(-?[\d.]+)',summary)[1])
    peak=float(re.search(r'Peak:\s+(-?[\d.]+)',summary)[1])
    print(f'Encoded audio: {loud} LUFS, {peak} dBTP')
    if abs(loud+10.5)>0.5 or peak>-2.6: raise ValueError('Audio outside proposed tolerance; adjust and remeasure before approval')
