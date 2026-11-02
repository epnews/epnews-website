#!/usr/bin/env python3
"""Audit SWP/GESIS resolutions CSV; export compact, provenance-bound topic metadata."""
import csv,hashlib,json,sys
from collections import Counter
from pathlib import Path
def extract(path):
 p=Path(path); digest=hashlib.sha256(p.read_bytes()).hexdigest()
 if digest!='3d31e9835d5561df124772c573563202f64aa5c00ea7b7830b90c680305c40cd': raise ValueError('Unexpected source checksum')
 records=[];seen=set()
 with p.open(newline='',encoding='utf-8-sig') as fh:
  for row in csv.DictReader(fh):
   if row['year'] not in ('2021','2022','2023','2024') or row['adopted_without_vote']!='0':continue
   key=(row['year'],row['unres'])
   if key in seen:raise ValueError('Duplicate resolution '+str(key))
   seen.add(key)
   categories=sorted(set(s.strip() for s in row['main_category'].split(',') if s.strip()))
   if not categories:raise ValueError('Unclassified resolution '+str(key))
   records.append({'year':int(row['year']),'resolution':row['unres'],'categories':categories,'symbol':row['symbol_resolution']})
 counts=Counter(r['year'] for r in records)
 if [counts[y] for y in (2021,2022,2023,2024)]!=[86,89,88,95]:raise ValueError('Resolution year counts changed')
 if sum(len(r['categories'])>1 for r in records)!=314:raise ValueError('Multi-label source count changed')
 return {'schema':'soi-unga-source-topics-v1','sourceCsvSha256':digest,'multiLabelResolutionCount':314,'recordedResolutions':len(records),'resolutions':records,'influenceScoreAuthorized':False}
if __name__=='__main__':
 if len(sys.argv)!=3:raise SystemExit('Usage: python scripts/extract_soi_unga_topic_metadata.py original.csv output.json')
 Path(sys.argv[2]).write_text(json.dumps(extract(sys.argv[1]),indent=2)+'\n')
 print('Validated and extracted 358 resolution topic records')
