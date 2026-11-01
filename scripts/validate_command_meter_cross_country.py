#!/usr/bin/env python3
"""Validate Command Meter cross-country evidence gates without assigning scores."""
import json,sys
from pathlib import Path
EXPECTED={'United States','Europe','China','Russia','India'}
def validate(data):
 assert set(x['country'] for x in data['countries'])==EXPECTED
 assert data['readinessEditorialEstimatePercent']==53
 policy=data['scorePolicy']
 assert policy['geopoliticalInfluenceScore'] is None
 assert policy['netNationalBenefitUsd'] is None
 assert policy['requiresIndependentMeasuredOutcomes']>=2
 assert all(policy[k] for k in ('noScoreFromTradeVolumeAlone','requiresAttributableCounterfactual','requiresCostsAndIncidence','requiresPrecommittedNormalization'))
 ids=[]
 for country in data['countries']:
  assert country['research']
  for gate in country['research']:
   assert gate['status'] in ('open','verified','blocked')
   assert gate['question'] and gate['evidence']
   ids.append(gate['id'])
 assert len(ids)==len(set(ids))
 return len(ids)
if __name__=='__main__':
 path=Path(sys.argv[1] if len(sys.argv)>1 else 'data/command-meter-cross-country-research-gates.json')
 print('Validated',validate(json.loads(path.read_text())),'research gates')
