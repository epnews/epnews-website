import json
from pathlib import Path
d=json.loads(Path('data/lng-peer-financial-incidence-h1.json').read_text())
assert len(d['issuers'])==2
for x in d['issuers']:
 assert x['source'].startswith('https://')
 assert all(x[k]['2025'] is not None and x[k]['2026'] is not None for k in ('revenue','adjustedEbitda','netIncome','volumeTbtu'))
assert all(d[k] is None for k in ('shockAttributableEarningsUsd','netNationalBenefitUsd','geopoliticalInfluenceScore'))
assert all(v is None for k,v in d['domesticIncidence'].items() if k.endswith('Usd'))
out={'scope':'two listed issuers, not industry or national benefit','issuers':{},'combinedDescriptiveOnly':{}}
for x in d['issuers']:
 out['issuers'][x['name']]={k:{'2025':x[k]['2025'],'2026':x[k]['2026'],'delta':round(x[k]['2026']-x[k]['2025'],3)} for k in ('revenue','adjustedEbitda','netIncome','volumeTbtu')}
for k in ('revenue','adjustedEbitda','netIncome'):
 out['combinedDescriptiveOnly'][k]={str(y):sum(x[k][str(y)] for x in d['issuers']) for y in (2025,2026)}
 out['combinedDescriptiveOnly'][k]['delta']=out['combinedDescriptiveOnly'][k]['2026']-out['combinedDescriptiveOnly'][k]['2025']
assert out['combinedDescriptiveOnly']['adjustedEbitda']['delta']==1973
Path('lng-peer-financial-incidence-audit.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps(out['combinedDescriptiveOnly'],indent=2))
