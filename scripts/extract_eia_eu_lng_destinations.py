#!/usr/bin/env python3
"""Audit EIA LNG vessel-export destinations. Missing series never become zero."""
import json,sys,urllib.request,urllib.error,re
from pathlib import Path
EU27={'AT':'Austria','BE':'Belgium','BG':'Bulgaria','HR':'Croatia','CY':'Cyprus','CZ':'Czech Republic','DK':'Denmark','EE':'Estonia','FI':'Finland','FR':'France','DE':'Germany','EL':'Greece','HU':'Hungary','IE':'Ireland','IT':'Italy','LV':'Latvia','LT':'Lithuania','LU':'Luxembourg','MT':'Malta','NL':'Netherlands','PL':'Poland','PT':'Portugal','RO':'Romania','SK':'Slovakia','SI':'Slovenia','ES':'Spain','SE':'Sweden'}
MONTHS=[f'{y}-{m:02d}' for y in (2025,2026) for m in range(1,7)]
FACTOR=0.000028316846592
def month(value,book):
 import xlrd
 if isinstance(value,(int,float)):
  try:return xlrd.xldate_as_datetime(value,book.datemode).strftime('%Y-%m')
  except (ValueError,OverflowError):return None
 if isinstance(value,str):
  m=re.search(r'(20(?:25|26))[-/ ](0?[1-9]|1[0-2])',value)
  if m:return f'{m.group(1)}-{int(m.group(2)):02d}'
 return None
def parse_xls(raw):
 import xlrd
 book=xlrd.open_workbook(file_contents=raw)
 vals={}
 for sheet in book.sheets():
  for row in range(sheet.nrows):
   if sheet.ncols<2:continue
   dt=month(sheet.cell_value(row,0),book)
   if dt not in MONTHS:continue
   v=sheet.cell_value(row,1)
   vals[dt]=float(v) if isinstance(v,(int,float)) else None
 return vals
def get(country):
 slug='ngm_epg0_eve_nus-n'+country.lower()+'_mmcfm'
 url='https://www.eia.gov/dnav/ng/hist_xls/'+slug+'.xls'
 with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (compatible; EPNewsResearch/1.0)'}),timeout=45) as r:raw=r.read()
 vals=parse_xls(raw)
 if not vals:raise ValueError(f'No parseable 2025-2026 months in XLS, {len(raw)} bytes')
 return {'source':url,'monthly_mmcf':vals,'h1_bcm':{str(y):sum(vals[f'{y}-{m:02d}'] for m in range(1,7))*FACTOR if all(vals.get(f'{y}-{m:02d}') is not None for m in range(1,7)) else None for y in (2025,2026)}}
def main(path):
 out={'unit':'bcm','factor_bcm_per_mmcf':FACTOR,'periods':['2025-H1','2026-H1'],'countries':{},'failures':{},'warning':'EIA export destination differs from Eurostat import partner; missing/failed country series is not zero'}
 for c in EU27:
  try:out['countries'][c]=get(c)
  except Exception as e:out['failures'][c]=type(e).__name__+': '+str(e)
 out['critical_country_status']={c:('retrieved' if c in out['countries'] else 'failed') for c in ('FR','DE','PL')}
 out['complete_eu27']=len(out['countries'])==len(EU27) and all(all(v is not None for v in rec['h1_bcm'].values()) for rec in out['countries'].values())
 Path(path).write_text(json.dumps(out,indent=2)+'\n')
 print('Retrieved:',len(out['countries']),'Failed:',len(out['failures']),'Critical:',out['critical_country_status'],'Complete EU27:',out['complete_eu27'])
 for c,error in out['failures'].items():print('FAILED',c,error)
 if not out['countries']:print('NO USABLE DATA — artifact is diagnostic only',file=sys.stderr)
if __name__=='__main__':main(sys.argv[1] if len(sys.argv)>1 else 'eia-eu-lng-destinations.json')
