"""Validate live Gaspeil October API classifications without promoting inferred origins."""
import json
import unittest
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path
from urllib.request import urlopen

URL = "https://www.gaspeil.nl/api/v1/lng/lossingen?terminal=gate&from=2026-10-01&to=2026-10-31"
DOC = Path(__file__).resolve().parents[1] / "data/europe-lng-gaspeil-gate-october-api-audit-20261102.md"

def audit(payload):
    assert payload.get("ok") is True
    records = payload["lossingen"]
    statuses = Counter(v["status"] for v in records)
    days = defaultdict(list)
    for v in records:
        assert v["terminal"] == "gate"
        assert "2026-10-01" <= v["arrivedAt"][:10] <= "2026-10-31"
        if v.get("measuredGasDay"):
            days[v["measuredGasDay"]].append(v)
    return {"records": len(records), "statuses": dict(statuses),
            "duplicate_measured_days": {k: [v["imo"] for v in vs] for k,vs in days.items() if len(vs)>1},
            "chronology_conflicts": [{"imo":v["imo"],"arrival":v["arrivedAt"],"measuredGasDay":v["measuredGasDay"]}
                for v in records if v.get("measuredGasDay") and v["measuredGasDay"] < v["arrivedAt"][:10]]}

class AuditTest(unittest.TestCase):
    def test_document_preserves_quality_and_conflicts(self):
        s = DOC.read_text(encoding="utf-8")
        for term in ("22", "16", "6", "0 `bevestigd`", "VIVIT AMERICAS LNG", "BW NIVALIS",
                     "VENTURE GATOR", "MINERVA LIMNOS", "not realized company revenue", "Influence score unchanged"):
            self.assertIn(term, s)

    def test_local_fixture_quality(self):
        fixture = {"ok": True, "lossingen": [
            {"imo":"1","terminal":"gate","arrivedAt":"2026-10-01T01:00:00Z","status":"gemeten","measuredGasDay":"2026-10-01"},
            {"imo":"2","terminal":"gate","arrivedAt":"2026-10-01T22:00:00Z","status":"gemeten","measuredGasDay":"2026-10-01"},
            {"imo":"3","terminal":"gate","arrivedAt":"2026-10-30T20:00:00Z","status":"geschat","measuredGasDay":None}
        ]}
        result = audit(fixture)
        self.assertEqual(result["statuses"], {"gemeten":2,"geschat":1})
        self.assertEqual(result["duplicate_measured_days"]["2026-10-01"], ["1","2"])

if __name__ == "__main__":
    import sys
    if "--live" in sys.argv:
        with urlopen(URL, timeout=20) as response: print(json.dumps(audit(json.load(response)),indent=2))
    else:
        unittest.main()
