import unittest
from scripts.build_eia_h1_volume_matching import SERIES,MONTHS
from unittest.mock import patch
from scripts.build_eia_h1_volume_matching import fetch_legacy
class TestSeries(unittest.TestCase):
 def test_four_distinct_series(self):
  self.assertEqual(len(SERIES),4)
  self.assertEqual(len({x[0] for x in SERIES.values()}),4)
 def test_months(self):
  self.assertEqual(len(MONTHS),12)
  self.assertEqual(MONTHS[0],'2025-01')
  self.assertEqual(MONTHS[-1],'2026-06')
 def test_xls_filename(self):
  from unittest.mock import MagicMock
  import io
  response=MagicMock()
  response.__enter__.return_value.read.return_value=b'fake'
  with patch('urllib.request.urlopen',return_value=response) as open_url, patch('xlrd.open_workbook',side_effect=RuntimeError('stop')):
   with self.assertRaisesRegex(RuntimeError,'stop'):
    fetch_legacy('NG.N9070US2.M')
   self.assertEqual(open_url.call_args.args[0].full_url,'https://www.eia.gov/dnav/ng/hist_xls/n9070us2m.xls')
 def test_source_pages(self):
  self.assertTrue(all(x[2].startswith('https://www.eia.gov/dnav/ng/') for x in SERIES.values()))
if __name__=='__main__':unittest.main()
