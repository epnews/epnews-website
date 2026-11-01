import unittest
from scripts.extract_eurostat_lng_all_partners import decode,MONTHS,GEOS
class Tests(unittest.TestCase):
 def test_scope(self):
  self.assertEqual(len(MONTHS),12)
  self.assertIn('FR',GEOS);self.assertIn('DE',GEOS);self.assertIn('PL',GEOS)
 def test_missing_is_not_zero(self):
  d={'id':['geo','partner','time'],'size':[1,1,2],
  'dimension':{'geo':{'category':{'index':{'FR':0}}},'partner':{'category':{'index':{'US':0}}},'time':{'category':{'index':{'2025-01':0,'2025-02':1}}}},'value':{'0':2.5}}
  self.assertEqual(decode(d,{'geo':'FR','partner':'US','time':'2025-01'}),2.5)
  self.assertIsNone(decode(d,{'geo':'FR','partner':'US','time':'2025-02'}))
if __name__=='__main__':unittest.main()
