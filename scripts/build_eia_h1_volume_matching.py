#!/usr/bin/env python3
"""Build matched H1 US gas supply/demand observations from official EIA DNav tables.

The source series IDs are the legacy EIA DNav monthly series identifiers.
Each source must contain 12 monthly observations. Missing is not zero.
"""
import argparse,csv,io,json,re,urllib.request,zipfile
from pathlib import Path
SERIES={
 'dry_production':('NG.N9070US2.M','Bcf','https://www.eia.gov/dnav/ng/hist/n9070us2m.htm'),
 'residential_deliveries':('NG.N3010US2.M','Bcf','https://www.eia.gov/dnav/ng/hist/n3010us2m.htm'),
 'industrial_deliveries':('NG.N3035US2.M','Bcf','https://www.eia.gov/dnav/ng/hist/n3035us2m.htm'),
 'lng_exports':('NG.N9133US2.M','Bcf','https://www.eia.gov/dnav/ng/hist/n9133us2m.htm')
}
MONTHS=[f'{y}-{m:02d}' for y in (2025,2026) for m in range(1,7)]
def fetch_legacy(series_id):
 url='https://www.eia.gov/dnav/ng/hist_xls/'+series_id.split('.')[1].lower()+'m.xls'
 req=urllib.request.Request(url,headers={'User-Agent':'EPNews-research/1.0'})
 with urllib.request.urlopen(req,timeout=45) as f: blob=f.read()
 import xlrd
 wb=xlrd.open_workbook(file_contents=blob)
 sh=wb.sheet_by_index(1 if wb.nsheets>1 else 0)
 rows={}
 for i in range(sh.nrows):
  date=sh.cell_value(i,0)
  if isinstance(date,float):
   try: date=xlrd.xldate_as_datetime(date,wb.datemode).strftime('%Y-%m')
   except Exception:continue
  else:
   date=str(date).strip()
   match=re.search(r'(20(?:25|26))[-/]?(0[1-9]|1[0-2])',date)
   if match:date=match.group(1)+'-'+match.group(2)
  if date not in MONTHS:continue
  val=sh.cell_value(i,1)
  try:rows[date]=float(val)
  except (TypeError,ValueError):pass
 return {'sourceXls':url,'observations':rows}
def build():
 out={'source':'EIA Natural Gas Monthly DNav','periods':MONTHS,'series':{},'errors':{},'complete':False,'lngExportCausalConsumerCostUsd':None,'netNationalBenefitUsd':None,'geopoliticalInfluenceScore':None}
 for name,(series_id,units,page) in SERIES.items():
  try:
   item=fetch_legacy(series_id)
   item.update({'seriesId':series_id,'unit':units,'sourcePage':page,'missingMonths':[m for m in MONTHS if m not in item['observations']]})
   out['series'][name]=item
  except Exception as exc:out['errors'][name]=str(exc)
 out['complete']=len(out['series'])==len(SERIES) and all(not x['missingMonths'] for x in out['series'].values())
 return out
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--out',default='eia-h1-volume-matching.json');a=p.parse_args()
 d=build();Path(a.out).write_text(json.dumps(d,indent=2)+'\n')
 print('Complete:',d['complete'],'Errors:',d['errors'])
 for k,v in d['series'].items():print(k,len(v['observations']),'missing',v['missingMonths'])
 if not d['complete']:raise SystemExit(2)
