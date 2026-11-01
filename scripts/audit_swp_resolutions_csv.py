#!/usr/bin/env python3
"""Audit SWP UNGA-RES resolution-level CSV and generate public aggregate counts."""
import argparse,csv,hashlib,json,collections,pathlib

def audit(path):
 p=pathlib.Path(path);years=collections.Counter();voted=collections.Counter();consensus=collections.Counter();ids=set();categories=0;duplicates=0;total=0
 with p.open(encoding='utf-8-sig',newline='') as f:
  r=csv.DictReader(f);required={'unres','year','vote_date','adopted_without_vote','main_category','yes','no','abstentions'}
  if not required.issubset(r.fieldnames or []):raise ValueError('Missing resolution-level columns '+repr(required-set(r.fieldnames or [])))
  for row in r:
   total+=1;id=row['unres'];year=int(row['year']);flag=row['adopted_without_vote'];
   if id in ids:duplicates+=1
   ids.add(id)
   if flag not in ('0','1'):raise ValueError('Invalid adopted_without_vote')
   if row['main_category'].strip():categories+=1
   years[year]+=1
   if flag=='0':voted[year]+=1
   else:consensus[year]+=1
   if row['vote_date'][:4]!=str(year):raise ValueError('Year/date mismatch')
 if duplicates:raise ValueError('Duplicate resolution IDs '+str(duplicates))
 with p.open('rb') as f:checksum=hashlib.file_digest(f,'sha256').hexdigest()
 return {'source_file':p.name,'source_sha256':checksum,'total_resolutions':total,'categorized_resolutions':categories,'unique_resolution_ids':len(ids),'annual':[{'year':y,'total':years[y],'recorded_vote':voted[y],'without_vote':consensus[y]} for y in range(2021,2025)],'total_recorded_vote_resolutions':sum(voted.values()),'total_without_vote_resolutions':sum(consensus.values()),'country_alignment_calculable':False,'influence_score_authorized':False}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('csv');a.add_argument('output_json');x=a.parse_args();pathlib.Path(x.output_json).write_text(json.dumps(audit(x.csv),indent=2)+'\n')
