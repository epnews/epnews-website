import csv,tempfile,pathlib,zipfile,unittest,sys
sys.path.insert(0,str(pathlib.Path(__file__).parent))
from build_swp_country_alignment_zip import build
class AlignmentTest(unittest.TestCase):
 def test_exclude_consensus_and_nonvotes(self):
  with tempfile.TemporaryDirectory() as d:
   p=pathlib.Path(d)/'positions.zip'
   with zipfile.ZipFile(p,'w') as z:
    with z.open('positions.csv','w') as f:
     data='unres,iso_alpha3_code,year,position,adopted_without_vote\\nR/76/1,USA,2021,y,0\\nR/76/1,CHN,2021,n,0\\nR/76/2,USA,2021,y,1\\nR/76/2,CHN,2021,y,1\\nR/76/3,USA,2021,non-voting.a,0\\nR/76/3,CHN,2021,y,0\\n'.replace('\\n','\n');f.write(data.encode())
   r=build(p);pair=r['annual']['2021']['pairwise']['USA_CHN'];self.assertEqual(pair['both_recorded'],1);self.assertEqual(pair['agreement_pct'],0);self.assertFalse(r['influence_score_authorized'])
if __name__=='__main__':unittest.main()
