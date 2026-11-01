#!/usr/bin/env python3
import csv,json,collections,argparse,pathlib
EU=set('AUT BEL BGR HRV CYP CZE DNK EST FIN FRA DEU GRC HUN IRL ITA LVA LTU LUX MLT NLD POL PRT ROU SVK SVN ESP SWE'.split())
def build(path):
 out={};seen=set()
 with open(path,encoding='utf-8-sig',newline='') as f:
  r=csv.DictReader(f)
  for row in r:
   y=int(row['year']);rid=row['unres']
   if y not in range(2021,2025):continue
   if rid in seen:raise ValueError('Duplicate '+rid)
   seen.add(rid);d=out.setdefault(y,dict(total=0,unknown=0,usa=0,china=0,russia=0,india=0,euAny=0,euMajority=0,euAll27=0));d['total']+=1
   raw=row['author_iso'].strip();s={v.strip().upper() for v in raw.split(';') if v.strip()} if raw and raw!='NA' else set()
   if not s:d['unknown']+=1
   for field,code in [('usa','USA'),('china','CHN'),('russia','RUS'),('india','IND')]:d[field]+=int(code in s)
   n=len(s&EU);d['euAny']+=int(n>0);d['euMajority']+=int(n>=14);d['euAll27']+=int(n==27)
 return {str(k):out[k] for k in sorted(out)}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('csv');p.add_argument('json');a=p.parse_args();pathlib.Path(a.json).write_text(json.dumps(build(a.csv),indent=2)+'\n')
