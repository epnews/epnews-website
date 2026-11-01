import csv,tempfile,pathlib,unittest,sys
sys.path.insert(0,str(pathlib.Path(__file__).parent))
from build_swp_empirical_vote_trends import build
class TestTrends(unittest.TestCase):
 def test_multi_label_and_consensus(self):
  with tempfile.TemporaryDirectory() as d:
   p=pathlib.Path(d)/'sample.csv'
   with p.open('w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=['unres','year','adopted_without_vote','main_category','yes','no','abstentions']);w.writeheader();w.writerow({'unres':'R/76/1','year':2021,'adopted_without_vote':0,'main_category':'600, 129','yes':150,'no':20,'abstentions':10});w.writerow({'unres':'R/76/2','year':2021,'adopted_without_vote':1,'main_category':'600','yes':0,'no':0,'abstentions':0})
   r=build(p)[0];self.assertEqual(r['resolutions'],2);self.assertEqual(r['recordedVoteSharePct'],50);self.assertEqual(r['yes'],150);self.assertEqual(dict(r['topVotedIssueCodes']),{'600':1,'129':1})
if __name__=='__main__':unittest.main()
