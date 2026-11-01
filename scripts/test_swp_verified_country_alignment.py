#!/usr/bin/env python3
"""Integrity checks for published SWP 2021–2024 country alignment aggregates."""
import json,pathlib,unittest
ROOT=pathlib.Path(__file__).resolve().parents[1]
class VerifiedAlignment(unittest.TestCase):
 def test_annual_coverage_and_rates(self):
  d=json.loads((ROOT/'data/soi-swp-verified-country-vote-alignment-2021-2024.json').read_text())
  self.assertEqual(d['totalRowsScanned'],1996092)
  self.assertEqual([d['annual'][str(y)]['recordedResolutions'] for y in range(2021,2025)],[86,89,88,95])
  for year,row in d['annual'].items():
   self.assertEqual(set(row['pairAgreementPct']),{'USA_CHN','USA_RUS','USA_IND','CHN_RUS','CHN_IND','RUS_IND'})
   self.assertTrue(all(0<=p<=100 for p in row['pairAgreementPct'].values()))
   self.assertTrue(0<=row['euMeanCohesionPct']<=100)
  self.assertEqual(d['annual']['2024']['pairAgreementPct']['USA_CHN'],18.28)
  self.assertEqual(d['annual']['2024']['pairAgreementPct']['CHN_RUS'],67.02)
  self.assertFalse(d['influenceScoreAuthorized'])
 def test_2024_vote_totals(self):
  d=json.loads((ROOT/'data/soi-swp-verified-country-vote-alignment-2021-2024.json').read_text())['annual']['2024']
  for a,r in d['actorVotes'].items():self.assertEqual(r['recorded'],r['yes']+r['no']+r['abstain'])
if __name__=='__main__':unittest.main()
