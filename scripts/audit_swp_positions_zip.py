#!/usr/bin/env python3
"""Stream the published SWP country-position ZIP; emit aggregated verification only."""
import argparse,csv,hashlib,io,json,zipfile,collections,datetime,pathlib
EU={'AUT','BEL','BGR','HRV','CYP','CZE','DNK','EST','FIN','FRA','DEU','GRC','HUN','IRL','ITA','LVA','LTU','LUX','MLT','NLD','POL','PRT','ROU','SVK','SVN','ESP','SWE'}
ACTORS={'USA','CHN','RUS','IND'}
FIELDS={'unres','iso_alpha3_code','vote_date','position','adopted_without_vote','main_category'}
def audit(path):
    digest=hashlib.sha256();p=pathlib.Path(path)
    with p.open('rb') as f:
        for block in iter(lambda:f.read(1024*1024),b''):digest.update(block)
    counts=collections.Counter();by_year=collections.Counter();by_actor=collections.Counter();topics=collections.Counter();seen=set();unique_resolutions=set();errors=[]
    with zipfile.ZipFile(p) as z:
        names=[n for n in z.namelist() if n.lower().endswith('.csv') and not n.startswith('__MACOSX')]
        if len(names)!=1:raise ValueError('Expected exactly one country-positions CSV in ZIP; found '+str(names))
        with z.open(names[0]) as f:
            reader=csv.DictReader(io.TextIOWrapper(f,encoding='utf-8-sig',newline=''))
            missing=FIELDS-set(reader.fieldnames or [])
            if missing:raise ValueError('Missing columns: '+', '.join(sorted(missing)))
            for n,r in enumerate(reader,2):
                counts['all_rows']+=1
                year=int(r['vote_date'][:4]) if r['vote_date'][:4].isdigit() else -1
                if year not in (2021,2022,2023,2024):continue
                counts['window_rows']+=1
                rid=r['unres'].strip();country=r['iso_alpha3_code'].strip().upper();pos=r['position'].strip();topic=r['main_category'].strip()
                if not rid.startswith('R/') or len(country)!=3 or not topic:raise ValueError('Bad resolution/country/category at row '+str(n))
                key=(rid,country)
                if key in seen:raise ValueError('Duplicate resolution-country '+repr(key))
                seen.add(key)
                if r['adopted_without_vote'].strip().lower() in ('1','true'):
                    counts['consensus_excluded']+=1;continue
                if pos in ('non-voting.a','non-voting.b'):
                    counts['nonvoting_excluded']+=1;continue
                if pos not in ('y','n','a'):raise ValueError('Unknown position '+pos+' row '+str(n))
                counts['recorded_votes']+=1;by_year[str(year)]+=1;topics[topic]+=1;unique_resolutions.add(rid)
                if country in ACTORS or country in EU:by_actor[country]+=1
    return {'source_file':p.name,'sha256_zip':digest.hexdigest(),'counts':dict(counts),'by_year':dict(sorted(by_year.items())),'tracked_actor_vote_counts':dict(sorted(by_actor.items())),'topic_counts':dict(topics.most_common()),'distinct_recorded_resolutions':len(unique_resolutions),'limitations':['No individual vote rows published','No diplomatic influence score derived','Counts alone do not establish source completeness','File-level CC BY license and author attribution must be verified'],'eligible_for_influence_score':False}
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('source_zip');ap.add_argument('output_json');a=ap.parse_args()
    report=audit(a.source_zip);pathlib.Path(a.output_json).write_text(json.dumps(report,indent=2)+'\n')
    print('Audited',report['counts']['all_rows'],'rows; 2021-2024 recorded votes:',report['counts'].get('recorded_votes',0))
