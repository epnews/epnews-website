import json
from pathlib import Path
d=json.loads(Path('data/eia-h1-2025-2026-sector-prices-verified.json').read_text())
assert d['domesticCostAttributableToLngExportsUsd'] is None
assert d['netNationalBenefitUsd'] is None and d['geopoliticalInfluenceScore'] is None
out={'sourceRelease':d['sourceRelease'],'unit':d['unit'],'sectorComparisons':{},'weightedH1Price':None,'lngCausalCostUsd':None}
for name,x in d['sectors'].items():
 assert len(x['2025'])==len(x['2026'])==len(x['months'])==6
 assert x['source'].startswith('https://www.eia.gov/')
 delta=[round(b-a,2) for a,b in zip(x['2025'],x['2026'])]
 mean25=sum(x['2025'])/6;mean26=sum(x['2026'])/6
 out['sectorComparisons'][name]={'monthlyDeltaUsdPerMcf':delta,'higherMonths':sum(v>0 for v in delta),'lowerMonths':sum(v<0 for v in delta),'unweightedMonthlyMean2025':round(mean25,4),'unweightedMonthlyMean2026':round(mean26,4),'unweightedMeanChangePct':round((mean26/mean25-1)*100,2)}
assert out['sectorComparisons']['residential']['higherMonths']==6
assert out['sectorComparisons']['industrial']['higherMonths']==2
assert out['sectorComparisons']['industrial']['lowerMonths']==4
Path('eia-h1-sector-price-audit.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps(out,indent=2))
