#!/usr/bin/env python3
"""Coverage-adjusted EIA H1 on-system gross-value proxy; never actual bills."""
import json
from pathlib import Path
PRICES=Path('data/eia-h1-2025-2026-sector-prices-verified.json')
COVERAGE=Path('data/eia-h1-table24-monthly-coverage.json')
SERIES={'residential':'n3010us2m','industrial':'n3035us2m'}
from scripts.build_eia_h1_volume_matching import fetch_legacy,MONTHS
def read_monthly_deliveries(series):
 # Reuse the proven xlrd parser from the completed H1 volume matching audit.
 # pandas read_excel inferred an incompatible workbook layout in the failed run.
 series_id='NG.'+series.upper().replace('M','')+'.M'
 result=fetch_legacy(series_id)
 raw=result['observations']
 missing=[month for month in MONTHS if month not in raw]
 if missing:raise ValueError(f'{series_id}: missing months {missing}')
 return {key:float(raw[key])/1000 for key in MONTHS},{'url':result['sourceXls'],'seriesId':series_id,'unit':'Bcf'}
def calculate(prices,coverage,deliveries):
 out={'period':'January-June 2025 versus 2026','status':'COVERAGE_ADJUSTED_GROSS_VALUE_PROXY','sectors':{},'actualConsumerExpenditureUsd':None,'lngCausedDomesticCostUsd':None,'netNationalBenefitUsd':None,'geopoliticalInfluenceScore':None,'limitations':['On-system EIA coverage is the share of deliveries represented by price-reporting utility sales, not a causal allocation to LNG exports.','Price times estimated covered volume is a modeled nominal gross sales value, not audited receipts, household bills, profit, or welfare impact.','EIA coverage ratios are rounded; multiply monthly values, not H1 averages.']}
 for sector in ('residential','industrial'):
  annual={}
  for year in ('2025','2026'):
   monthly=[]
   for month in range(1,7):
    key=f'{year}-{month:02d}'
    pct=coverage['sectors'][sector][year][month-1]
    assert isinstance(pct,(int,float)) and 0<pct<=100,(sector,key,pct)
    bcf=deliveries[sector][key]
    assert bcf>0,(sector,key)
    price=prices['sectors'][sector][year][month-1]
    covered=bcf*pct/100
    value=covered*price # Bcf x USD/Mcf = million USD
    monthly.append({'month':key,'totalDeliveriesBcf':round(bcf,6),'onsystemCoveragePct':pct,'estimatedCoveredSalesBcf':round(covered,6),'onsystemPriceUsdPerMcf':price,'estimatedGrossSalesValueMillionUsd':round(value,6)})
   annual[year]={'months':monthly,'estimatedCoveredSalesBcf':round(sum(x['estimatedCoveredSalesBcf'] for x in monthly),6),'estimatedGrossSalesValueMillionUsd':round(sum(x['estimatedGrossSalesValueMillionUsd'] for x in monthly),6)}
  annual['changeMillionUsd']=round(annual['2026']['estimatedGrossSalesValueMillionUsd']-annual['2025']['estimatedGrossSalesValueMillionUsd'],6)
  out['sectors'][sector]=annual
 return out
def main():
 prices=json.loads(PRICES.read_text());coverage=json.loads(COVERAGE.read_text())
 assert coverage['reviewStatus'] in ('PENDING_INDEPENDENT_REVIEW','SOURCE_PDF_MONTHLY_VERIFIED')
 deliveries={};sources={}
 for sector,series in SERIES.items():
  deliveries[sector],sources[sector]=read_monthly_deliveries(series)
  assert len(deliveries[sector])==12,(sector,deliveries[sector])
 out=calculate(prices,coverage,deliveries)
 out['sourceDeliveries']=sources
 out['sourceCoverage']=coverage['sources']
 out['reviewStatus']=coverage['reviewStatus']
 out['publishable']=coverage['reviewStatus']=='SOURCE_PDF_MONTHLY_VERIFIED'
 if not out['publishable']:out['status']='PROVISIONAL_NOT_FOR_PUBLICATION'
 Path('eia-h1-coverage-adjusted-gross-values.json').write_text(json.dumps(out,indent=2)+'\n')
 print(json.dumps({'status':out['status'],'grossValueChangeMillionUsd':{k:v['changeMillionUsd'] for k,v in out['sectors'].items()}},indent=2))
if __name__=='__main__':main()
