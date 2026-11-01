#!/usr/bin/env python3
"""Validate EIA EU27 destination extraction; 404 is NOT evidence of zero exports."""
import json,sys
from pathlib import Path
from extract_eia_eu_lng_destinations import EU27,MONTHS,FACTOR
def audit(data):
 countries=data.get('countries',{});failures=data.get('failures',{})
 expected=set(EU27)
 if (set(countries)|set(failures))!=expected:raise ValueError('Every EU27 country must be retrieved or have an explicit failure')
 if set(countries)&set(failures):raise ValueError('Country cannot both succeed and fail')
 years=(2025,2026)
 report={'source':'EIA vessel LNG export destination XLS','country_count':len(countries),'missing_country_count':len(failures),'missing_country_codes':sorted(failures),'country_results':{},'periods':{},'coverage_complete':False,'warning':'Partial destination totals are LOWER BOUNDS of the retrieved destination set, not a reconciled EU27 total; absent EIA series is not zero exports'}
 for c in sorted(expected):
  if c in failures:
   report['country_results'][c]={'status':'unavailable','reason':failures[c],'h1_bcm':{'2025':None,'2026':None}}
   continue
  rec=countries[c];vals=rec.get('monthly_mmcf',{})
  per={}
  for y in years:
   keys=[f'{y}-{m:02d}' for m in range(1,7)]
   complete=all(k in vals and isinstance(vals[k],(float,int)) and vals[k]>=0 for k in keys)
   computed=sum(vals[k] for k in keys)*FACTOR if complete else None
   supplied=rec.get('h1_bcm',{}).get(str(y))
   if computed is not None and supplied is not None and abs(computed-supplied)>1e-7:raise ValueError(f'{c} {y} supplied H1 differs from monthly sum')
   per[str(y)]=computed
  report['country_results'][c]={'status':'retrieved','h1_bcm':per,'months_present':len(vals)}
 for y in years:
  valid={c:r['h1_bcm'][str(y)] for c,r in report['country_results'].items() if r['h1_bcm'][str(y)] is not None}
  report['periods'][str(y)]={'complete_destination_count':len(valid),'partial_retrieved_sum_bcm':round(sum(valid.values()),9),'eu27_total_bcm':round(sum(valid.values()),9) if len(valid)==27 else None,'missing_or_incomplete':sorted(expected-set(valid))}
 report['coverage_complete']=all(report['periods'][str(y)]['eu27_total_bcm'] is not None for y in years)
 return report
def main(source,target):
 data=json.loads(Path(source).read_text());result=audit(data)
 Path(target).write_text(json.dumps(result,indent=2)+'\n')
 print('Countries:',result['country_count'],'Failures:',result['missing_country_count'],'Complete:',result['coverage_complete'])
 for y,v in result['periods'].items():print(y,'partial',v['partial_retrieved_sum_bcm'],'EU27 total',v['eu27_total_bcm'])
if __name__=='__main__':main(sys.argv[1],sys.argv[2])
