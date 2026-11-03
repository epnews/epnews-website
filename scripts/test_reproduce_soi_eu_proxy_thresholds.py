import unittest, tempfile, pathlib, csv, zipfile, json, sys
sys.path.insert(0,'scripts')
from reproduce_soi_eu_proxy_thresholds import reproduce,EU
class ProxyTests(unittest.TestCase):
 def test_thresholds_and_frozen_cohort(self):
  with tempfile.TemporaryDirectory() as td:
   p=pathlib.Path(td)/'votes.zip'
   partners=['P'+str(i).zfill(2) for i in range(160)]
   with zipfile.ZipFile(p,'w') as z:
    with z.open('positions.csv','w') as raw:
     import io
     text=io.TextIOWrapper(raw,encoding='utf-8',newline='')
     writer=csv.DictWriter(text,fieldnames=['unres','iso_alpha3_code','year','position','adopted_without_vote']);writer.writeheader()
     for year in range(2021,2025):
      for c in EU:writer.writerow({'unres':'R/'+str(year),'iso_alpha3_code':c,'year':year,'position':'y','adopted_without_vote':'0'})
      for c in partners:writer.writerow({'unres':'R/'+str(year),'iso_alpha3_code':c,'year':year,'position':'y','adopted_without_vote':'0'})
     text.flush()
   d=reproduce(p)
   self.assertEqual(d['frozenExternalPartners'],160)
   for year in map(str,range(2021,2025)):
    for variant in d['years'][year].values():
     self.assertEqual(variant['eligibleResolutions'],1)
     self.assertEqual(variant['agreementPercent'],100)
 def test_missing_member_threshold(self):
  self.assertEqual(len(EU),27)
if __name__=='__main__':unittest.main()
