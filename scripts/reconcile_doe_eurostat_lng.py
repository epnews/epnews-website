#!/usr/bin/env python3
"""Reproducible H1 DOE versus Eurostat attribution comparison; NOT a flow identity."""
import json,sys
from pathlib import Path
EUROSTAT_US={'2025':25.838331,'2026':29.181938}
NUPI_EEA_US={'2025':41.0,'2026':44.0}
EIA_CHECKS={'France':{'2025':8.9520878816,'2026':6.0895661765},'Germany':{'2025':4.1877,'2026':5.3848},'Poland':{'2025':3.34,'2026':3.65}}
def reconcile(ledger):
 report={'methodology':'DOE vessel LNG export departures by declared EU27 destination vs Eurostat nrg_ti_gasm G3200 MIO_M3 EU27 imports partner=US; NUPI EEA comparator is rounded','source_doe':ledger['source'],'source_eurostat':'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_ti_gasm?freq=M&siec=G3200&unit=MIO_M3&geo=EU27_2020&partner=US&sinceTimePeriod=2025-01&untilTimePeriod=2026-06&lang=EN','periods':{},'limitations':['Departure versus arrival month','Declared export destination versus import partner attribution','EU27 versus EEA geography for NUPI','Possible rerouting, transit and customs classification','Rounded NUPI estimates are not exact monthly customs totals','No causal attribution, company profit or geopolitical influence inference']}
 for y in ('2025','2026'):
  p=ledger['periods'][y];doe=p['eu27_exports_bcm'];eu=EUROSTAT_US[y]
  countries=p['destinations']
  report['periods'][y]={'doe_eu27_departure_bcm':doe,'eurostat_eu27_us_partner_arrival_bcm':eu,'doe_minus_eurostat_bcm':round(doe-eu,9),'nupi_eea_us_lng_rounded_bcm':NUPI_EEA_US[y],'doe_minus_nupi_rounded_bcm':round(doe-NUPI_EEA_US[y],9),'doe_reexports_bcm':p['eu27_reexports_bcm'],'doe_country_exports_bcm':{c:v['exports_bcm'] for c,v in countries.items() if v['exports_bcm']>0 and c in ('France','Germany','Poland','Netherlands','Belgium','Italy')}}
 return report
def main(src,dst):
 ledger=json.loads(Path(src).read_text());report=reconcile(ledger)
 Path(dst).write_text(json.dumps(report,indent=2)+'\n')
 for y,p in report['periods'].items():print(y,'DOE',p['doe_eu27_departure_bcm'],'Eurostat',p['eurostat_eu27_us_partner_arrival_bcm'],'gap',p['doe_minus_eurostat_bcm'])
if __name__=='__main__':main(sys.argv[1],sys.argv[2])
