#!/usr/bin/env python3
"""EIA onsystem-sales reconciliation, with explicit evidence gating."""
import json,re,urllib.request
from pathlib import Path
from io import BytesIO
import xlrd
P=Path('data/eia-h1-2025-2026-sector-prices-verified.json')
MONTHS=[f'{y}-{m:02d}' for y in (2025,2026) for m in range(1,7)]
# EIA DNav NG.N3010US1.M and NG.N3035US1.M: monthly volumes of onsystem sales, MMcf.
SERIES={'residential':'n3010us1m','industrial':'n3035us1m'}
def retrieve(stem):
 url='https://www.eia.gov/dnav/ng/hist_xls/'+stem+'.xls'
 with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'EPNews-evidence-audit/1.0'}),timeout=45) as resp:
  blob=resp.read()
 wb=xlrd.open_workbook(file_contents=blob)
 rows={}
 for sh in wb.sheets():
  for i in range(sh.nrows):
   if sh.ncols<2:continue
   d=sh.cell_value(i,0)
   if isinstance(d,(int,float)):
    try:d=xlrd.xldate_as_datetime(d,wb.datemode).strftime('%Y-%m')
    except (ValueError,OverflowError):continue
   else:
    d=str(d).strip()
    m=re.search(r'(20(?:25|26))[-/]?(0[1-9]|1[0-2])',d)
    if m:d=m.group(1)+'-'+m.group(2)
   if d not in MONTHS:continue
   try:v=float(sh.cell_value(i,1))
   except (ValueError,TypeError):continue
   if v>=0:rows[d]=v
 return {'url':url,'observationsMMcf':rows,'missing':[m for m in MONTHS if m not in rows]}
def main():
 prices=json.loads(P.read_text())['sectors']
 out={'description':'EIA onsystem sales volume matched to onsystem average retail prices','sourceSeries':SERIES,'sectors':{},'errors':{},'complete':False,'estimatedActualRetailRevenueUsd':None,'lngCausedDomesticCostUsd':None,'netNationalBenefitUsd':None,'geopoliticalInfluenceScore':None}
 for sector,stem in SERIES.items():
  try:
   v=retrieve(stem)
   if not v['missing']:
    for y in ('2025','2026'):
     # MMcf x $/Mcf = thousand USD, so divide by 1e6 for USD billions.
     pairs=[(v['observationsMMcf'][f'{y}-{m:02d}'],prices[sector][y][m-1]) for m in range(1,7)]
     v[f'h1_{y}_onsystem_volumeMMcf']=round(sum(a for a,b in pairs),3)
     v[f'h1_{y}_priceTimesVolumeMillionUsd']=round(sum(a*b for a,b in pairs)/1000,3)
    v['coverage']='EIA onsystem sales volumes x EIA onsystem average price, nominal estimated gross sales value, not audited utility revenue or customer bills'
   out['sectors'][sector]=v
  except Exception as e:out['errors'][sector]=repr(e)
 out['complete']=len(out['sectors'])==2 and not out['errors'] and all(not s['missing'] for s in out['sectors'].values())
 Path('eia-h1-onsystem-sales-audit.json').write_text(json.dumps(out,indent=2)+'\n')
 print(json.dumps(out,indent=2))
 if not out['complete']:raise SystemExit(2)
if __name__=='__main__':main()
