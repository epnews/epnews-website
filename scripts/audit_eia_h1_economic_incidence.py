#!/usr/bin/env python3
"""H1 price/volume incidence: explicitly hypothetical until sales coverage is reconciled."""
import json
from pathlib import Path
p=json.loads(Path('data/eia-h1-2025-2026-sector-prices-verified.json').read_text())
v=json.loads(Path('data/eia-h1-verified-gas-volumes-summary.json').read_text())
out={'period':'Jan–Jun 2025 vs Jan–Jun 2026','sectors':{},'priceVolumeCoverageAligned':False,'actualConsumerExpenditureUsd':None,'lngCausedDomesticCostUsd':None,'netNationalBenefitUsd':None,'geopoliticalInfluenceScore':None,'interpretation':'H1 total-deliveries x unweighted price is an illustrative gross-value proxy, not actual receipts or causal LNG-export incidence.'}
for sector in ('residential','industrial'):
 x=p['sectors'][sector]; q=v['series'][sector+'_deliveries']
 avg={y:sum(x[y])/6 for y in ('2025','2026')}
 # Bcf * $/Mcf = $ millions, because 1 Bcf = 1 million Mcf.
 q25=q['h1_2025_bcf'];q26=q['h1_2026_bcf'];p25=avg['2025'];p26=avg['2026']
 base=q25*p25; current=q26*p26
 price=(p26-p25)*q25
 volume=(q26-q25)*p25
 interaction=(p26-p25)*(q26-q25)
 assert abs((current-base)-(price+volume+interaction))<1e-6
 out['sectors'][sector]={'meanMonthlyPrice2025UsdPerMcf':round(p25,4),'meanMonthlyPrice2026UsdPerMcf':round(p26,4),'h1Deliveries2025Bcf':q25,'h1Deliveries2026Bcf':q26,'hypotheticalGrossValue2025MillionUsd':round(base,3),'hypotheticalGrossValue2026MillionUsd':round(current,3),'hypotheticalGrossValueChangeMillionUsd':round(current-base,3),'priceComponentMillionUsd':round(price,3),'volumeComponentMillionUsd':round(volume,3),'interactionComponentMillionUsd':round(interaction,3),'caveat':'Illustrative only: EIA prices cover onsystem sales while deliveries include transportation-only and marketer-supplied gas; arithmetic monthly mean is not delivery-weighted.'}
Path('eia-h1-economic-incidence-audit.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps(out,indent=2))
