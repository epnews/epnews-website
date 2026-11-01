#!/usr/bin/env python3
"""Recompute 2021–2024 UNGA voting trends from original SWP resolution CSV."""
import csv,json,collections,argparse,pathlib

def build(path):
 years={y:{'resolutions':0,'recordedVotes':0,'withoutVote':0,'yes':0,'no':0,'abstentions':0,'categories':collections.Counter(),'votedCategories':collections.Counter()} for y in range(2021,2025)}
 with open(path,encoding='utf-8-sig',newline='') as f:
  reader=csv.DictReader(f)
  required={'unres','year','adopted_without_vote','main_category','yes','no','abstentions'}
  if not required.issubset(reader.fieldnames or []):raise ValueError('Missing SWP fields '+str(required-set(reader.fieldnames or [])))
  seen=set()
  for r in reader:
   if r['unres'] in seen:raise ValueError('Duplicate resolution '+r['unres'])
   seen.add(r['unres']);year=int(r['year'])
   if year not in years:continue
   d=years[year];d['resolutions']+=1
   codes={x.strip() for x in r['main_category'].split(',') if x.strip()}
   if not codes:raise ValueError('Missing issue categories '+r['unres'])
   d['categories'].update(codes)
   if r['adopted_without_vote']=='0':
    d['recordedVotes']+=1;d['votedCategories'].update(codes)
    for key in ('yes','no','abstentions'):d[key]+=int(r[key])
   elif r['adopted_without_vote']=='1':d['withoutVote']+=1
   else:raise ValueError('Unknown adoption flag')
 out=[]
 for year,d in years.items():
  out.append({'year':year,'resolutions':d['resolutions'],'recordedVotes':d['recordedVotes'],'withoutVote':d['withoutVote'],'recordedVoteSharePct':round(100*d['recordedVotes']/d['resolutions'],2) if d['resolutions'] else None,'yes':d['yes'],'no':d['no'],'abstentions':d['abstentions'],'topVotedIssueCodes':d['votedCategories'].most_common(3)})
 return out
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('source_csv');a.add_argument('output_json');x=a.parse_args();pathlib.Path(x.output_json).write_text(json.dumps({'years':build(x.source_csv),'countryAlignmentAvailable':False,'influenceScoreAuthorized':False},indent=2)+'\n')
