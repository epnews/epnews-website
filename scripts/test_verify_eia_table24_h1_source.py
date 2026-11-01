import unittest
from scripts.verify_eia_table24_h1_source import verify
class VerificationTests(unittest.TestCase):
 def test_missing_or_mismatched_pdf_rejected(self):
  data={'sectors':{'residential':{'2025':[97.1]*6,'2026':[97.4]*6},'industrial':{'2025':[14.2]*6,'2026':[13.9]*6}}}
  with self.assertRaises(Exception):verify(data,{'2025':b'not a PDF','2026':b'not a PDF'})
 def test_page_month_mapping(self):
  from scripts.verify_eia_table24_h1_source import PAGE_MONTHS,MONTH_NUM
  self.assertEqual(sorted(MONTH_NUM[m] for months in PAGE_MONTHS.values() for m in months if m in MONTH_NUM),list(range(1,7)))
if __name__=='__main__':unittest.main()
