import datetime,unittest
from scripts.build_doe_lng_h1_ledger import ledger,HEADERS
class TestLedger(unittest.TestCase):
 def test_separate_exports_reexports_and_modes(self):
  def row(date,activity,mode,country,volume):
   d={'Arrival/Departure Date':date,'Activity':activity,'Gas Type':'LNG','Mode of Transport':mode,'Country':country,'Volume (MMCF)':volume}
   return [d[h] for h in HEADERS]
  rows=[HEADERS,row(datetime.datetime(2025,1,2),'Exports','Vessel','Germany',100),row(datetime.datetime(2025,2,2),'Re-Exports','Vessel','Germany',20),row(datetime.datetime(2025,2,2),'Exports','ISO Container','Germany',900),row(datetime.datetime(2025,7,2),'Exports','Vessel','Germany',900)]
  out,counts=ledger(rows)
  self.assertEqual(out['2025']['Germany']['exports'],100)
  self.assertEqual(out['2025']['Germany']['reexports'],20)
  self.assertEqual(counts[('2025','exports')],1)
 def test_bad_volume_fails(self):
  with self.assertRaises(ValueError):ledger([HEADERS,[datetime.datetime(2026,3,1),'Exports','LNG','Vessel','France','bad']])
if __name__=='__main__':unittest.main()
