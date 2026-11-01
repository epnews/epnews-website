#!/usr/bin/env python3
"""Retrieve US EIA LNG export destination data for EU27 and compare to Eurostat.
EIA departure destination is not Eurostat import-origin; comparisons diagnostic only.
"""
import json,sys,urllib.request
from pathlib import Path
EU27={'AT':'Austria','BE':'Belgium','BG':'Bulgaria','HR':'Croatia','CY':'Cyprus','CZ':'Czech Republic','DK':'Denmark','EE':'Estonia','FI':'Finland','FR':'France','DE':'Germany','EL':'Greece','HU':'Hungary','IE':'Ireland','IT':'Italy','LV':'Latvia','LT':'Lithuania','LU':'Luxembourg','MT':'Malta','NL':'Netherlands','PL':'Poland','PT':'Portugal','RO':'Romania','SK':'Slovakia','SI':'Slovenia','ES':'Spain','SE':'Sweden'}
MONTHS=[f'{y}-{m:02d}' for y in (2025,2026) for m in range(1,7)]
FACTOR=0.000028316846592
def get(country):
 # EIA legacy monthly destination series; dnav CSV returns monthly records, including gaps.
 slug='ngm_epg0_eve_nus-n'+country.lower()+'_mmcfm'
 url='https://www.eia.gov/dnav/ng/hist_xls/'+slug+'.xls'
 # EIA XLS parsing requires xlrd; fail loudly rather than fabricate zero for missing countries.
 import xlrd
 with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'EPNewsResearch/1.0'}),timeout=45) as r:book=xlrd.open_workbook(file_contents=r.read())
 sheet=book.sheet_by_index(1) if book.nsheets>1 else book.sheet_by_index(0)
 vals={}
 for row in range(sheet.nrows):
  d=sheet.cell_value(row,0)
  if not isinstance(d,(int,float)):continue
  try:dt=xlrd.xldate_as_datetime(d,book.datemode).strftime('%Y-%m')
  except (ValueError,OverflowError):continue
  if dt not in MONTHS:continue
  v=sheet.cell_value(row,1)
  vals[dt]=float(v) if isinstance(v,(int,float)) else None
 return {'source':url,'monthly_mmcf':vals,'h1_bcm':{str(y):sum(vals[f'{y}-{m:02d}'] for m in range(1,7))*FACTOR if all(vals.get(f'{y}-{m:02d}') is not None for m in range(1,7)) else None for y in (2025,2026)}}
def main(path):
 out={'unit':'bcm','factor_bcm_per_mmcf':FACTOR,'periods':['2025-H1','2026-H1'],'countries':{},'failures':{},'warning':'EIA declared destination is not physical discharge verification or Eurostat partner attribution; missing country series must not be treated as zero'}
 for c in EU27:
  try:out['countries'][c]=get(c)
  except Exception as e:out['failures'][c]=str(e)
 Path(path).write_text(json.dumps(out,indent=2)+'\n')
 print('success',len(out['countries']),'failures',len(out['failures']))
 if 'FR' not in out['countries'] or 'DE' not in out['countries'] or 'PL' not in out['countries']:
  print('Critical country extraction incomplete; see artifact',file=sys.stderr);sys.exit(1)
if __name__=='__main__':main(sys.argv[1] if len(sys.argv)>1 else 'eia-eu-lng-destinations.json')
