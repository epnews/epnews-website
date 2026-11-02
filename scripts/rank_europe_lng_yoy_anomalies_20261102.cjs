'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/rank_europe_lng_yoy_anomalies_20261102.cjs <classification.json> [output.json]');
const data=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
assert(Array.isArray(data.rows),'Missing classification rows');
const ranked=data.rows.map(r=>{
 const complete=[r.deltaTotal,r.deltaUSLabel,r.deltaNSPLabel,r.deltaOtherLabels].every(Number.isFinite);
 const components=complete?[Math.abs(r.deltaUSLabel),Math.abs(r.deltaNSPLabel),Math.abs(r.deltaOtherLabels)]:[];
 return {...r,priorityMagnitude:complete?Math.max(...components):null,classificationCompleteness:complete?'complete':'incomplete',physicalOriginVerified:false};
}).sort((a,b)=>(b.priorityMagnitude??-1)-(a.priorityMagnitude??-1)||a.geo.localeCompare(b.geo)||a.month.localeCompare(b.month));
const out={scope:'Prioritization of reporter-label shifts only; not physical cargo attribution',unit:'million m3',rows:ranked,summary:{rows:ranked.length,complete:ranked.filter(x=>x.classificationCompleteness==='complete').length,incomplete:ranked.filter(x=>x.classificationCompleteness==='incomplete').length},scoreAuthorized:false};
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out.summary));
