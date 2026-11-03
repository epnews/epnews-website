#!/usr/bin/env python3
"""Independently recompute EU proxy threshold sensitivity from original SWP positions ZIP.
Usage: python scripts/reproduce_soi_eu_proxy_thresholds.py positions.zip output.json
Does not infer influence; never silently impute missing positions.
"""
import collections,csv,hashlib,io,json,sys,zipfile
EU=set('AUT BEL BGR HRV CYP CZE DNK EST FIN FRA DEU GRC HUN IRL ITA LVA LTU LUX MLT NLD POL PRT ROU SVK SVN ESP SWE'.split())
ACTORS={'USA','CHN','RUS','IND'}
YEARS={'2021','2022','2023','2024'}
THRESHOLDS={'baseline_20_75':(20,.75),'strict_24_90':(24,.90),'unanimous_27':(27,1.0)}
def reproduce(path):
    sha=hashlib.sha256()
    with open(path,'rb') as f:
        for chunk in iter(lambda:f.read(1048576),b''):sha.update(chunk)
    buckets=collections.defaultdict(dict);partners_by_year=collections.defaultdict(set);stats=collections.Counter()
    with zipfile.ZipFile(path) as z:
        names=[n for n in z.namelist() if n.lower().endswith('.csv') and not n.startswith('__MACOSX')]
        if len(names)!=1:raise ValueError('Expected one CSV')
        with z.open(names[0]) as f:
            reader=csv.DictReader(io.TextIOWrapper(f,encoding='utf-8-sig',newline=''))
            required={'unres','iso_alpha3_code','year','position','adopted_without_vote'}
            if not required.issubset(reader.fieldnames or []):raise ValueError('Missing required source columns')
            for row in reader:
                stats['scanned']+=1
                year=row['year']
                if year not in YEARS or row['adopted_without_vote']!='0':continue
                vote=row['position'];country=row['iso_alpha3_code']
                if vote not in ('y','n','a'):continue
                key=(year,row['unres'])
                if country in buckets[key]:raise ValueError('Duplicate recorded vote '+str((key,country)))
                buckets[key][country]=vote
                if country not in EU and country not in ACTORS:partners_by_year[year].add(country)
                stats['eligible_votes']+=1
    partners=set.intersection(*(partners_by_year[y] for y in YEARS))
    if len(partners)!=160:raise ValueError('Frozen cohort not 160: '+str(len(partners)))
    results={}
    for year in sorted(YEARS):
        year_votes=[v for (y,_),v in buckets.items() if y==year]
        record={}
        for name,(min_members,threshold) in THRESHOLDS.items():
            eligible=matched=agree=0
            for votes in year_votes:
                ev=[votes[c] for c in EU if c in votes]
                if len(ev)<min_members:continue
                top,n=collections.Counter(ev).most_common(1)[0]
                if n/len(ev)<threshold:continue
                eligible+=1
                for c in partners:
                    if c in votes:
                        matched+=1
                        agree+=votes[c]==top
            record[name]={'eligibleResolutions':eligible,'matchedPairs':matched,'agreements':agree,'agreementPercent':round(100*agree/matched,4) if matched else None}
        results[year]=record
    return {'schema':'soi-eu-proxy-four-year-threshold-reproduction-v1','sourceArchiveSha256':sha.hexdigest(),'frozenExternalPartners':len(partners),'thresholds':{k:{'minEU27ValidVotes':v[0],'fractionRequired':v[1]} for k,v in THRESHOLDS.items()},'years':results,'scanStats':dict(stats),'notOfficialEUVote':True,'influenceScoreAuthorized':False,'alignmentNeedleAuthorized':False}
if __name__=='__main__':
    if len(sys.argv)!=3:raise SystemExit('Usage: script positions.zip output.json')
    with open(sys.argv[2],'w') as f:json.dump(reproduce(sys.argv[1]),f,indent=2)
