#!/usr/bin/env python3
"""Fetch official EIA monthly gas data; fail closed on incomplete H1 panels.

Supply --series NAME=SERIES_ID for EIA API v2 series IDs verified against EIA
metadata. No guessed series IDs are embedded. EIA API key optional.
"""
import argparse,json,os,sys,urllib.parse,urllib.request
from collections import defaultdict
from pathlib import Path

PERIODS=[f'{year}-{month:02d}' for year in (2025,2026) for month in range(1,7)]
REQUIRED=('residential_price','industrial_price','residential_deliveries','industrial_deliveries','dry_production','lng_exports')
BASE='https://api.eia.gov/v2/seriesid/'

def fetch_series(series_id):
 params={'api_key':os.environ.get('EIA_API_KEY',''),'frequency':'monthly','data[0]':'value','start':'2025-01','end':'2026-06','offset':'0','length':'5000'}
 url=BASE+urllib.parse.quote(series_id,safe='')+'?'+urllib.parse.urlencode(params)
 req=urllib.request.Request(url,headers={'User-Agent':'EPNews-evidence-audit/1.0'})
 with urllib.request.urlopen(req,timeout=40) as res: raw=json.load(res)
 if 'error' in raw: raise ValueError(str(raw['error']))
 response=raw.get('response',{})
 records=response.get('data',[])
 if not records: raise ValueError('No records returned')
 result={}
 for item in records:
  period=item.get('period')
  if period not in PERIODS: continue
  value=item.get('value')
  if value in (None,'','--'): continue
  result[period]=float(value)
 return {'seriesId':series_id,'units':response.get('units'),'description':response.get('description'),'observations':result}

def audit(series):
 status={}
 for name in REQUIRED:
  rec=series.get(name)
  missing=[p for p in PERIODS if rec is None or p not in rec['observations']]
  status[name]={'complete':not missing,'missingMonths':missing,'units':rec.get('units') if rec else None}
 return {'periods':PERIODS,'status':status,'complete':all(x['complete'] for x in status.values()),
  'warning':'No causal LNG export price effect, consumer cost or net national benefit inferred from this panel.'}

def main():
 p=argparse.ArgumentParser()
 p.add_argument('--series',action='append',default=[],help='metric=EIA_API_V2_SERIES_ID')
 p.add_argument('--out',default='eia-h1-domestic-gas-panel.json')
 a=p.parse_args()
 config={}
 for item in a.series:
  key,sep,val=item.partition('=')
  if not sep or key not in REQUIRED or not val: p.error('Use required_metric=verified_EIA_series_id')
  config[key]=val
 data={'source':'https://api.eia.gov/v2/','requestedSeries':config,'series':{},'errors':{},'attributableConsumerCostUsd':None,'netNationalBenefitUsd':None,'geopoliticalInfluenceScore':None}
 for name,series_id in config.items():
  try:data['series'][name]=fetch_series(series_id)
  except Exception as exc:data['errors'][name]=str(exc)
 data['audit']=audit(data['series'])
 Path(a.out).write_text(json.dumps(data,indent=2,sort_keys=True)+'\n')
 print(json.dumps(data['audit'],indent=2))
 if not data['audit']['complete']: sys.exit(2)
if __name__=='__main__':main()
