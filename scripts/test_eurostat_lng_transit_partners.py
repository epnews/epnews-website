import unittest
from scripts.extract_eurostat_lng_transit_partners import decode,MONTHS,GEO,PARTNERS
class Tests(unittest.TestCase):
 def test_months(self):
  self.assertEqual(len(MONTHS),12)
  self.assertEqual(MONTHS[0],'2025-01')
  self.assertEqual(MONTHS[-1],'2026-06')
 def test_no_imputation(self):
  d={'id':['geo','partner','time'],'size':[1,1,2],
   'dimension':{'geo':{'category':{'index':{'EU27_2020':0}}},
                'partner':{'category':{'index':{'US':0}}},
                'time':{'category':{'index':{'2025-01':0,'2025-02':1}}}},
   'value':{'0':12.5}}
  get=decode(d)
  self.assertEqual(get({'geo':'EU27_2020','partner':'US','time':'2025-01'}),12.5)
  self.assertIsNone(get({'geo':'EU27_2020','partner':'US','time':'2025-02'}))
 def test_transit_partners(self):
  self.assertIn('NL',PARTNERS);self.assertIn('BE',PARTNERS)
  self.assertIn('EU27_2020',GEO)
if __name__=='__main__':unittest.main()
