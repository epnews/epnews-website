import json, subprocess, sys, struct
def validate(path):
    p=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)]))
    v=[s for s in p['streams'] if s['codec_type']=='video']; a=[s for s in p['streams'] if s['codec_type']=='audio']
    if len(v)!=1 or len(a)!=1: raise ValueError('Expected one video and one audio stream')
    for stream, expected in [(v[0],{'codec_name':'h264','profile':'Main','level':41,'pix_fmt':'yuv420p','width':1080,'height':1920,'r_frame_rate':'30/1','codec_tag_string':'avc1'}),(a[0],{'codec_name':'aac','profile':'LC','sample_rate':'44100','channels':2,'codec_tag_string':'mp4a'})]:
        for k,val in expected.items():
            if stream.get(k)!=val: raise ValueError(f'{k}: expected {val}, got {stream.get(k)}')
    if abs(float(p['format']['duration'])-15)>0.15: raise ValueError('Duration must be 15 seconds')
    with open(path,'rb') as f:
        atoms=[]
        while True:
            h=f.read(8)
            if len(h)<8: break
            size,kind=struct.unpack('>I4s',h); header=8
            if size==1: size=struct.unpack('>Q',f.read(8))[0]; header=16
            atoms.append(kind)
            if size==0: break
            if size<header: raise ValueError('Invalid MP4 atom')
            f.seek(size-header,1)
        if b'moov' not in atoms or b'mdat' not in atoms or atoms.index(b'moov')>atoms.index(b'mdat'): raise ValueError('MP4 faststart required')
    subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(path),'-map','0:v:0','-map','0:a:0','-f','null','-'],check=True)
    print('Short encoding and full decode PASS')
if __name__=='__main__': validate(sys.argv[1])
