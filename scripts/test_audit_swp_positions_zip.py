import csv,io,json,os,tempfile,unittest,zipfile,sys,pathlib
sys.path.insert(0,str(pathlib.Path(__file__).parent))
from audit_swp_positions_zip import audit
class SWPZipTests(unittest.TestCase):
 def make(self,rows):
  d=tempfile.TemporaryDirectory();p=pathlib.Path(d.name)/'positions.zip'
  b=io.StringIO();w=csv.DictWriter(b,fieldnames=['unres','iso_alpha3_code','vote_date','position','adopted_without_vote','main_category']);w.writeheader();w.writerows(rows)
  with zipfile.ZipFile(p,'w') as z:z.writestr('unga-res_positions.csv',b.getvalue())
  return d,p
 def test_counts_and_consensus(self):
  base={'unres':'R/76/1','vote_date':'2021-11-01','position':'y','adopted_without_vote':'0','main_category':'security'}
  rows=[dict(base,iso_alpha3_code='USA'),dict(base,iso_alpha3_code='CHN',position='n'),dict(base,unres='R/76/2',iso_alpha3_code='IND',adopted_without_vote='1'),dict(base,unres='R/76/3',iso_alpha3_code='FRA',position='non-voting.a'),dict(base,unres='R/79/1',vote_date='2025-01-01',iso_alpha3_code='BRA')]
  d,p=self.make(rows)
  try:
   r=audit(p);self.assertEqual(r['counts']['all_rows'],5);self.assertEqual(r['counts']['recorded_votes'],2);self.assertEqual(r['counts']['consensus_excluded'],1);self.assertEqual(r['counts']['nonvoting_excluded'],1);self.assertEqual(r['distinct_recorded_resolutions'],1);self.assertFalse(r['eligible_for_influence_score'])
  finally:d.cleanup()
 def test_duplicate_rejected(self):
  row={'unres':'R/76/1','iso_alpha3_code':'USA','vote_date':'2021-11-01','position':'y','adopted_without_vote':'0','main_category':'security'}
  d,p=self.make([row,row])
  try:
   with self.assertRaisesRegex(ValueError,'Duplicate'):audit(p)
  finally:d.cleanup()
if __name__=='__main__':unittest.main()
