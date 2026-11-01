import json
from pathlib import Path
d=json.loads(Path('data/us-domestic-gas-price-incidence-july.json').read_text())
assert all(d[k] is None for k in ('exportAttributableHouseholdCostUsd','exportAttributableIndustrialCostUsd','netNationalEconomicBenefitUsd','geopoliticalInfluenceScore'))
rows={}
for o in d['observations']:
 rows.setdefault(o['sector'],{})[o['month']]=o['price']
assert set(rows)=={'industrial','residential'}
out={'period':'July year-over-year; not H1','unit':d['unit'],'sectorPrices':{},'exportCausalAttribution':'not established'}
for sector,prices in rows.items():
 assert set(prices)=={'2025-07','2026-07'}
 a,b=prices['2025-07'],prices['2026-07']
 out['sectorPrices'][sector]={'2025':a,'2026':b,'change':round(b-a,2),'percentChange':round(100*(b-a)/a,2)}
assert out['sectorPrices']['industrial']['change']==-0.06
assert out['sectorPrices']['residential']['change']==1.01
Path('us-domestic-gas-price-incidence-audit.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps(out,indent=2))
