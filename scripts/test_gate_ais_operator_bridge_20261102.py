"""Regression guard: AIS vessel leads must never be promoted to certified unloading."""
from pathlib import Path
import json
import unittest

ROOT = Path(__file__).resolve().parents[1]

class GateBridgeEvidenceTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bridge = (ROOT / "data/europe-lng-gate-ais-operator-bridge-20261102.md").read_text()
        cls.ais = json.loads((ROOT / "data/europe-lng-gate-october-ais-port-calls-20261102.json").read_text())

    def test_every_archived_vessel_accounted_for(self):
        for record in self.ais["records"]:
            self.assertIn(record["imo"], self.bridge)
            self.assertIn(record["vessel"], self.bridge)

    def test_no_unloading_attribution(self):
        for phrase in ("Certified discharge: missing", "Voyage-specific origin: missing", "US-origin October unloaded volume: not established", "Correlation is not attribution"):
            self.assertIn(phrase, self.bridge)

    def test_short_geofence_events_flagged(self):
        durations = {v["imo"]: v["duration_minutes"] for v in self.ais["records"]}
        self.assertEqual(durations["9956599"], 15)
        self.assertEqual(durations["9477593"], 3)
        self.assertIn("Brief geofence crossing", self.bridge)

if __name__ == "__main__":
    unittest.main()
