#!/usr/bin/env python3
"""Convert audited SWP/GESIS original positions ZIP to topic-standardizer rows.

Usage: python scripts/extract_soi_swp_vote_rows.py positions.zip data/soi-unga-source-topics-2021-2024.json output.json
Does not invent or silently discard recorded-vote positions.
"""
import csv,hashlib,json,re,sys,zipfile
from collections import Counter
from pathlib import Path
SHA='04e2a0df74df61ca07e157871578e53effe4f130932d71a3298852b7c5180522'
PREFIX=re.compile(rb'^R/[^,]+,(?:"(?:[^"]|"")*"|[^,]*),[A-Z]{3},[^,]*,(20(?:21|22|23|24)),')
MAP={'y':'Y','n':'N','a':'A','non-voting.a':'X'}
def convert(archive_path,metadata_path):
 if hashlib.sha256(Path(archive_path).read_bytes()).hexdigest()!=SHA:raise ValueError('Source ZIP checksum mismatch')
 meta=json.loads(Path(metadata_path).read_text())
 if meta['schema']!='soi-unga-source-topics-v1' or meta['influenceScoreAuthorized'] is not False:raise ValueError('Invalid metadata')
 wanted={(str(r['year']),r['resolution']) for r in meta['resolutions']}
 rows=[];seen=set();tallies=Counter();counts=Counter()
 with zipfile.ZipFile(archive_path) as z:
  names=[n for n in z.namelist() if n.endswith('.csv')]
  if len(names)!=1:raise ValueError('Expected one positions CSV')
  with z.open(names[0]) as fh:
   header=next(fh).decode('utf-8-sig').strip().split(',')
   for name,index in [('unres',0),('iso_alpha3_code',2),('year',4),('position',12),('adopted_without_vote',14)]:
    if header[index]!=name:raise ValueError('Unexpected column order '+name)
   for line in fh:
    if not PREFIX.match(line):continue
    fields=next(csv.reader([line.decode('utf-8')]))
    year,resolution,country,position,flag=fields[4],fields[0],fields[2],fields[12],fields[14]
    key=(year,resolution)
    if key not in wanted:continue
    if flag!='0' or position not in MAP:raise ValueError('Unexpected source status '+str(key))
    unique=(year,resolution,country)
    if unique in seen:raise ValueError('Duplicate country vote '+str(unique))
    seen.add(unique);counts[key]+=1;tallies[(key,position)]+=1
    rows.append({'year':int(year),'resolution':resolution,'country':country,'vote':MAP[position]})
 for key in wanted:
  if counts[key]!=193:raise ValueError('Expected 193 country rows for '+str(key)+', got '+str(counts[key]))
 if len(rows)!=193*len(wanted):raise ValueError('Incomplete source coverage')
 return {'schema':'soi-unga-source-votes-v1','sourceArchiveSha256':SHA,'sourceTopicCsvSha256':meta['sourceCsvSha256'],'recordedResolutions':len(wanted),'rows':rows,'influenceScoreAuthorized':False}
if __name__=='__main__':
 if len(sys.argv)!=4:raise SystemExit(__doc__)
 data=convert(sys.argv[1],sys.argv[2]);Path(sys.argv[3]).write_text(json.dumps(data,separators=(',',':'))+'\n')
 print('Validated',data['recordedResolutions'],'resolutions and',len(data['rows']),'country-position rows')
