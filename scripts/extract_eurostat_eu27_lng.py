#!/usr/bin/env python3
"""Reproducible Eurostat EU27 LNG origin audit. Stdlib only; never claim EEA equivalence."""
import argparse
import json
import sys
import urllib.parse
import urllib.request

BASE = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_ti_gasm"
MONTHS = [f"{year}-{month:02d}" for year in (2025, 2026) for month in range(1, 7)]
PARTNERS = ("US", "RU", "TOTAL")

def decode(data):
    ids = data["id"]
    sizes = data["size"]
    index = {name: data["dimension"][name]["category"]["index"] for name in ids}
    def position(dim, value):
        ix = index[dim]
        if value not in ix:
            raise ValueError(f"Missing dimension {dim}={value}")
        return ix[value]
    def cell(filters):
        offset = 0
        for i, name in enumerate(ids):
            offset = offset * sizes[i] + position(name, filters[name])
        values = data.get("value", {})
        return values.get(str(offset), None) if isinstance(values, dict) else values[offset]
    return cell, index

def request(partner):
    params = dict(freq="M", siec="G3200", unit="MIO_M3", geo="EU27_2020",
                  partner=partner, sinceTimePeriod="2025-01", untilTimePeriod="2026-06", lang="EN")
    url = BASE + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent":"EPNewsResearch/1.0"})
    with urllib.request.urlopen(req, timeout=35) as resp:
        return json.load(resp), url

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--output", default="europe-eurostat-eu27-lng-observations.json")
    args = p.parse_args()
    totals = {}
    source_urls = {}
    observations = {}
    for partner in PARTNERS:
        data, url = request(partner)
        source_urls[partner] = url
        cell, index = decode(data)
        months = set(index["time"])
        if not set(MONTHS).issubset(months):
            raise ValueError(f"{partner}: incomplete 2025/2026 first-half coverage")
        vals = {}
        for month in MONTHS:
            filters = {"freq":"M","siec":"G3200","unit":"MIO_M3",
                       "geo":"EU27_2020","partner":partner,"time":month}
            value = cell(filters)
            if value is None:
                raise ValueError(f"{partner} {month}: missing value; no partial sum")
            if value < 0:
                raise ValueError(f"{partner} {month}: negative quantity")
            vals[month] = value
        observations[partner] = vals
        totals[partner] = {str(y):sum(v for m,v in vals.items() if m.startswith(str(y)))/1000 for y in (2025,2026)}
    shares = {}
    for y in ("2025","2026"):
        denominator = totals["TOTAL"][y]
        if denominator <= 0: raise ValueError("nonpositive denominator")
        if totals["US"][y] + totals["RU"][y] > denominator * 1.001:
            raise ValueError("US+Russia exceeds reported total; investigate coverage")
        shares[y] = {p: 100*totals[p][y]/denominator for p in ("US","RU")}
    result = {"dataset":"nrg_ti_gasm","geography":"EU27_2020 (NOT EEA)",
              "classification":"G3200 LNG","unit":"million cubic metres; totals bcm",
              "period":"January–June 2025 and 2026","source_urls":source_urls,
              "observations_million_m3":observations,"h1_totals_bcm":totals,
              "eu27_supplier_shares_pct":shares,
              "comparison_warning":"EU27 Eurostat is independent cross-check, NOT Bruegel EEA reproduction."}
    with open(args.output,"w",encoding="utf-8") as f: json.dump(result,f,indent=2,sort_keys=True)
    print(json.dumps({"eu27_supplier_shares_pct":shares,"h1_totals_bcm":totals},indent=2))

if __name__=="__main__":
    try: main()
    except Exception as exc:
        print(f"FAILED CLOSED: {exc}",file=sys.stderr)
        sys.exit(1)
