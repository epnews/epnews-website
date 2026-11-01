import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location("extract",Path(__file__).with_name("extract_eurostat_eu27_lng.py"))
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

class EurostatExtractorTests(unittest.TestCase):
    def test_jsonstat_index(self):
        ids=["freq","siec","unit","geo","partner","time"]
        data={"id":ids,"size":[1,1,1,1,1,2],
              "dimension":{name:{"category":{"index":{value:0} if name!="time" else {"2025-01":0,"2025-02":1}}} for name,value in zip(ids,["M","G3200","MIO_M3","EU27_2020","US",""])},
              "value":{"0":123.4,"1":200.0}}
        cell, _ = mod.decode(data)
        base={"freq":"M","siec":"G3200","unit":"MIO_M3","geo":"EU27_2020","partner":"US"}
        self.assertEqual(cell({**base,"time":"2025-01"}),123.4)
        self.assertEqual(cell({**base,"time":"2025-02"}),200.0)
        with self.assertRaises(ValueError): cell({**base,"time":"2026-01"})
    def test_periods(self):
        self.assertEqual(len(mod.MONTHS),12)
        self.assertEqual(mod.MONTHS[0],"2025-01")
        self.assertEqual(mod.MONTHS[-1],"2026-06")
        self.assertEqual(mod.PARTNERS,("US","RU","TOTAL"))

if __name__=="__main__":unittest.main()
