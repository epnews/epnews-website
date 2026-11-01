#!/usr/bin/env python3
"""Extract EU27 and member-level monthly LNG partner attribution for transit-hub hypothesis. Stdlib only."""
import json,sys,urllib.parse,urllib.request
from pathlib import Path
BASE='https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_ti_gasm'
MONTHS=[f'{y}-{m:02d}' for y in (2025,2026) for m in range(1,7)]
GEO=('EU27_2020','NL','BE','FR','ES','DE','IT','PL','LT','HR','PT','EL')
PARTNERS=('US','RU','NL','BE','FR','ES','TOTAL')
def decode(d):
 ids=d['id'];sizes=d['size'];indexes={k:d['dimension'][k]['category']['index'] for k in ids}
 def get(sel):
  n=0
  for k,size in zip(ids,sizes):
   if sel[k] not in indexes[k]:return None
   n=n*size+indexes[k][sel[k]]
  v=d.get('value',{})
  return v.get(str(n)) if isinstance(v,dict) else v[n]
 return get
def fetch(geo,partner):
 params=dict(freq='M',siec='G3200',unit='MIO_M3',geo=geo,partner=partner,
  sinceTimePeriod='2025-01',untilTimePeriod='2026-06',lang='EN')
 url=BASE+'?'+urllib.parse.urlencode(params)
 with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'EPNewsResearch/1.0'}),timeout=45) as r:return json.load(r),url
def run(output):
 results={};failures=[]
 for geo in GEO:
  results[geo]={}
  for partner in PARTNERS:
   try:
    d,url=fetch(geo,partner);cell=decode(d);vals={}
    for month in MONTHS:
     value=cell(dict(freq='M',siec='G3200',unit='MIO_M3',geo=geo,partner=partner,time=month))
     vals[month]=value
    results[geo][partner]={'months_million_m3':vals,'h1_bcm':{
      str(y):sum(vals[m] for m in MONTHS if m.startswith(str(y)))/1000
      if all(vals[m] is not None for m in MONTHS if m.startswith(str(y))) else None
      for y in (2025,2026)},'source_url':url}
   except Exception as e:
    failures.append({'geo':geo,'partner':partner,'error':str(e)})
    results[geo][partner]={'months_million_m3':{},'h1_bcm':{'2025':None,'2026':None}}
 payload={'dataset':'nrg_ti_gasm','product':'G3200','unit':'MIO_M3','geographies':GEO,'partners':PARTNERS,
 'results':results,'failures':failures,'interpretation':'Diagnostic only. Monthly transit attribution not proven for LNG; null cells never converted to zero.'}
 Path(output).write_text(json.dumps(payload,indent=2,sort_keys=True)+'\n')
 if failures:print('WARNING: '+str(len(failures))+' queries failed; see artifact',file=sys.stderr)
 print('Wrote '+output+'; failures '+str(len(failures)))
if __name__=='__main__':run(sys.argv[1] if len(sys.argv)>1 else 'europe-lng-transit-attribution.json')
