'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/audit_europe_lng_monthly_yoy_classification_20261102.cjs <monthly-audit.json> [output.json]');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert(Array.isArray(d.months));
const byKey=new Map(d.months.map(x=>[x.geo+'|'+x.month,x]));const rows=[];
for(const a of d.months.filter(x=>x.month.startsWith('2025-'))){
 const b=byKey.get(a.geo+'|2026-'+a.month.slice(5));if(!b)continue;
 const diff=(key)=>Number.isFinite(a[key])&&Number.isFinite(b[key])?b[key]-a[key]:null;
 const us=diff('usLabeled'),nsp=diff('nspLabeled'),total=diff('total');
 rows.push({geo:a.geo,month:a.month.slice(5),total2025:a.total,total2026:b.total,deltaTotal:total,deltaUSLabel:us,deltaNSPLabel:nsp,deltaOtherLabels:total!==null&&us!==null&&nsp!==null?total-us-nsp:null,missingLabelObservation:us===null||nsp===null,warning:'Year-on-year reporting-label changes are not proven physical-origin changes.'});
}
rows.sort((a,b)=>a.geo.localeCompare(b.geo)||a.month.localeCompare(b.month));
const out={source:d.source,scope:'Matched same-month H1 2025 versus H1 2026 reporter-label changes, million m3',rows,summary:{matchedReporterMonths:rows.length,missingLabelPairs:rows.filter(x=>x.missingLabelObservation).length},scoreAuthorized:false};
assert(rows.length>0,'No matched month pairs');
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out.summary));
