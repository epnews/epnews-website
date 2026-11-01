import json
from pathlib import Path
d=json.loads(Path('data/eia-steo-aug26-quarterly-gas-price-benchmark.json').read_text())
assert d['netNationalBenefitUsd'] is None and d['geopoliticalInfluenceScore'] is None
out={'source':d['source'],'status':d['status'],'unit':d['unit'],'quarterlyChanges':{}}
for x in d['metrics']:
 out['quarterlyChanges'][x['name']]={}
 for q in ('q1','q2'):
  a,b=x[q+'_2025'],x[q+'_2026']
  out['quarterlyChanges'][x['name']][q]={'2025':a,'2026':b,'delta':round(b-a,2),'percent':round(100*(b-a)/a,2)}
assert out['quarterlyChanges']['residential_retail_us']['q1']['delta']==1.72
assert out['quarterlyChanges']['residential_retail_us']['q2']['delta']==1.24
assert out['quarterlyChanges']['henry_hub_spot']['q2']['delta']==-0.24
Path('eia-steo-quarterly-price-audit.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps(out['quarterlyChanges'],indent=2))
