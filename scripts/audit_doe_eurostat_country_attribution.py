#!/usr/bin/env python3
"""Country attribution diagnostics using DOE departures and audited Eurostat partner rows.
Missing Eurostat country/partner values are unknown, NEVER zero.
"""
import json,sys
from pathlib import Path
EUROSTAT={
 '2025':{
  'France':{'US':0.0,'TOTAL':16.441131,'DZ':10.907769,'NG':5.533362},
  'Germany':{'US':0.0,'TOTAL':4.020376,'NSP':4.020376},
  'Poland':{'US':0.0,'TOTAL':4.110640,'NSP':3.187868}
 },
 '2026':{
  'France':{'US':0.0,'TOTAL':13.028502},
  'Germany':{'US':0.0,'TOTAL':6.177744}
 }
}
def build(ledger):
 out={'scope':'DOE departure destination versus Eurostat LNG import partner by reporting country; diagnostics only','countries':{},'cautions':['Not matched cargo arrivals','Country of first arrival, transit and partner definition may differ','A missing partner code is unknown, not zero','Never sum these country gaps as a verified missing-gas quantity']}
 for y in ('2025','2026'):
  out['countries'][y]={}
  for c,eu in EUROSTAT[y].items():
   doe=ledger['periods'][y]['destinations'].get(c,{}).get('exports_bcm')
   us=eu.get('US')
   out['countries'][y][c]={'doe_us_declared_destination_bcm':doe,'eurostat_us_partner_bcm':us,'difference_bcm':round(doe-us,9) if doe is not None and us is not None else None,'eurostat_lng_all_origins_bcm':eu.get('TOTAL'),'eurostat_other_partner_codes_bcm':{k:v for k,v in eu.items() if k not in ('US','TOTAL')},'interpretation':'Attribution discrepancy, not proof of nonarrival'}
 return out
def main(src,dst):
 r=build(json.loads(Path(src).read_text()))
 Path(dst).write_text(json.dumps(r,indent=2)+'\n')
 for y,cs in r['countries'].items():
  for c,v in cs.items():print(y,c,'DOE',v['doe_us_declared_destination_bcm'],'Eurostat US',v['eurostat_us_partner_bcm'],'gap',v['difference_bcm'])
if __name__=='__main__':main(sys.argv[1],sys.argv[2])
