#!/usr/bin/env python3
"""Audit issuer financial changes without mistaking them for causal national benefit."""
import json,sys
from pathlib import Path
def audit(d):
 m=d['measures'];out={'issuer':d['issuer'],'period':d['period'],'financialChange':{},'noNationalBenefitOrInfluenceScore':True}
 for key,rec in m.items():
  a,b=rec['2025'],rec['2026']
  if a is None or b is None:continue
  out['financialChange'][key]={'2025':a,'2026':b,'absolute':b-a,'percent':round((b-a)/abs(a)*100,3) if a else None,'kind':rec['kind']}
 assert out['financialChange']['netIncome']['2026']<0
 assert out['financialChange']['consolidatedAdjustedEbitda']['absolute']==849
 assert d['causation']['shockAttributableIncrementUsd'] is None
 assert d['nationalBenefit']['netNationalEconomicBenefitUsd'] is None
 return out
if __name__=='__main__':
 d=json.loads(Path(sys.argv[1]).read_text());out=audit(d)
 Path(sys.argv[2]).write_text(json.dumps(out,indent=2)+'\n')
 print('Revenue change',out['financialChange']['totalRevenue'],'Adjusted EBITDA change',out['financialChange']['consolidatedAdjustedEbitda'])
