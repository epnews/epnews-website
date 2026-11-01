#!/usr/bin/env python3
"""Stream original SWP country-position ZIP; never unpack 4GB CSV to disk."""
import argparse,collections,csv,io,json,zipfile,pathlib
EU=set('AUT BEL BGR HRV CYP CZE DNK EST FIN FRA DEU GRC HUN IRL ITA LVA LTU LUX MLT NLD POL PRT ROU SVK SVN ESP SWE'.split())
ACTORS=('USA','CHN','RUS','IND')
YEARS={'2021','2022','2023','2024'}

def build(zip_path):
 positions=collections.defaultdict(dict);stats=collections.Counter()
 with zipfile.ZipFile(zip_path) as archive:
  names=[n for n in archive.namelist() if n.lower().endswith('.csv')]
  if len(names)!=1:raise ValueError('Expected exactly one positions CSV in archive')
  with archive.open(names[0]) as stream:
   reader=csv.reader(io.TextIOWrapper(stream,encoding='utf-8-sig',newline=''))
   header=next(reader);required=['unres','iso_alpha3_code','year','position','adopted_without_vote'];idx={c:header.index(c) for c in required}
   for row in reader:
    if len(row)!=len(header):raise ValueError('Malformed CSV row')
    year=row[idx['year']]
    if year not in YEARS:continue
    stats['year_rows_'+year]+=1
    if row[idx['adopted_without_vote']]!='0':stats['consensus_excluded']+=1;continue
    pos=row[idx['position']]
    if pos not in ('y','n','a'):stats['nonvoting_excluded']+=1;continue
    country=row[idx['iso_alpha3_code']]
    if country not in EU and country not in ACTORS:continue
    key=(year,row[idx['unres']]);bucket=positions[key]
    if country in bucket:raise ValueError('Duplicate country-resolution vote '+str(key)+' '+country)
    bucket[country]=pos;stats['actor_votes']+=1
 out={}
 for year in sorted(YEARS):
  votes=[v for (y,_),v in positions.items() if y==year];record={'resolutions_with_target_votes':len(votes),'actors':{},'pairwise':{}}
  for actor in ACTORS:
   arr=[v[actor] for v in votes if actor in v];record['actors'][actor]={'recorded':len(arr),'yes':arr.count('y'),'no':arr.count('n'),'abstain':arr.count('a')}
  for i,a in enumerate(ACTORS):
   for b in ACTORS[i+1:]:
    both=[(v[a],v[b]) for v in votes if a in v and b in v];same=sum(x==y for x,y in both);record['pairwise'][a+'_'+b]={'both_recorded':len(both),'same':same,'agreement_pct':round(100*same/len(both),2) if both else None}
  eu=[]
  for v in votes:
   member=[v[c] for c in EU if c in v]
   if len(member)<14:continue
   majority,n=collections.Counter(member).most_common(1)[0]
   if n>=14 and n>len(member)/2:eu.append((v,majority,n,len(member)))
  record['eu_majority']={'eligible_resolutions':len(eu),'mean_cohesion_pct':round(100*sum(n/total for _,_,n,total in eu)/len(eu),2) if eu else None,'alignment':{}}
  for actor in ACTORS:
   both=[(v[actor],p) for v,p,_,_ in eu if actor in v];same=sum(x==p for x,p in both);record['eu_majority']['alignment'][actor]={'both_recorded':len(both),'same':same,'agreement_pct':round(100*same/len(both),2) if both else None}
  out[year]=record
 return {'methodology':'Actual y/n/a votes only, excluding adopted_without_vote and nonvoting. Pairwise equality includes abstentions. EU proxy is strict majority of >=14 EU member recorded votes; EU does not cast a UNGA vote. No influence inference.','scan_stats':dict(stats),'annual':out,'influence_score_authorized':False}
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('source_zip');parser.add_argument('output_json');a=parser.parse_args();pathlib.Path(a.output_json).write_text(json.dumps(build(a.source_zip),indent=2)+'\n')
