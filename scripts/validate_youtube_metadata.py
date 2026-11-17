import json, re, sys
from urllib.parse import urlsplit

def validate(m):
    for k in ('article_url','title','description'):
        if not isinstance(m.get(k),str) or not m[k].strip(): raise ValueError('Missing '+k)
    u=urlsplit(m['article_url'])
    if u.scheme!='https' or u.netloc!='epnews.pages.dev' or not re.fullmatch(r'/article/[a-z0-9-]{1,120}',u.path) or u.query or u.fragment: raise ValueError('Canonical article URL required')
    if len(m['title'])>100 or len(m['description'])>5000: raise ValueError('Metadata length exceeds limit')
    if m['article_url'] not in m['description']: raise ValueError('Missing article URL')
    hashtags=set(re.findall(r'(?<!\w)#\w+',m['description']))
    if not 3<=len(hashtags)<=5: raise ValueError('Provide 3–5 distinct hashtags')
    tags=m.get('tags')
    if not isinstance(tags,list) or not tags or any(not isinstance(t,str) or not t.strip() for t in tags): raise ValueError('Search tags required')
    if sum(len(t) for t in tags)+len(tags)-1>500: raise ValueError('Tags exceed 500 characters')
    for k in ('madeForKids','isAiGeneratedContent'):
        if type(m.get(k)) is not bool: raise ValueError('Explicit boolean required: '+k)
    return m

if __name__=='__main__':
    validate(json.load(open(sys.argv[1],encoding='utf-8')))
    print('YouTube metadata checks passed; editorial review still required')
