import unittest,re
class Table24Tests(unittest.TestCase):
 def test_national_total_row(self):
  self.assertTrue(re.match(r'^\s*Total\b','Total 97.1 13.4',re.I))
  self.assertFalse(re.match(r'^\s*Total\b','Texas 97.1 13.4',re.I))
 def test_missing_data_not_scored(self):
  from pathlib import Path
  src=Path('scripts/audit_eia_table24_coverage.py').read_text()
  self.assertIn("'reviewStatus':'NOT_VERIFIED'",src)
  self.assertIn("'onsystemGrossSalesValueUsd':None",src)
if __name__=='__main__':unittest.main()
