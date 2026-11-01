#!/usr/bin/env python3
"""Download all available Eurostat G3200 partner categories for selected reporters; no invented origins."""
import json,sys,urllib.parse,urllib.request
from pathlib import Path
BASE='https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_ti_gasm'
GEOS=('FR','DE','PL','EU27_2020')
MONTHS=[f'{y}-{m:02d}' for y in (2025,2026) for m in range(1,7)]
def fetch(geo):
 q=urllib.parse.urlencode(dict(freq='M',siec='G3200',unit='MIO_M3',geo=geo,sinceTimePeriod='2025-01',untilTimePeriod='2026-06',lang='EN'))
 with urllib.request.urlopen(urllib.request.Request(BASE+'?'+q,headers={'User-Agent':'EPNewsResearch/1.0'}),timeout=90) as r:return json.load(r)
def decode(d,selection):
 ids=d['id'];sizes=d['size'];indexes={k:d['dimension'][k]['category']['index'] for k in ids};offset=0
 for k,size in zip(ids,sizes):
  if selection[k] not in indexes[k]:return None
  offset=offset*size+indexes[k][selection[k]]
 v=d.get('value',{})
 return v.get(str(offset)) if isinstance(v,dict) else v[offset]
def main(out):
 result={'source':BASE,'dataset':'nrg_ti_gasm','siec':'G3200','unit':'MIO_M3','geographies':{},'warnings':[]}
 for geo in GEOS:
  d=fetch(geo);pidx=d['dimension']['partner']['category']['index'];labels=d['dimension']['partner']['category'].get('label',{})
  partners=list(pidx)
  rec={'partner_count':len(partners),'partners':{},'months':MONTHS}
  for p in partners:
   vals={}
   for m in MONTHS:
    vals[m]=decode(d,dict(freq='M',siec='G3200',unit='MIO_M3',geo=geo,partner=p,time=m))
   rec['partners'][p]={'label':labels.get(p,p),'h1_bcm':{str(y):sum(vals[m] for m in MONTHS if m.startswith(str(y)))/1000 if all(vals[m] is not None for m in MONTHS if m.startswith(str(y))) else None for y in (2025,2026)},'months_million_m3':vals}
  result['geographies'][geo]=rec
 Path(out).write_text(json.dumps(result,indent=2)+'\n')
 print('Full partner extraction:',[(k,v['partner_count']) for k,v in result['geographies'].items()])
if __name__=='__main__':main(sys.argv[1] if len(sys.argv)>1 else 'europe-lng-all-partners.json')
