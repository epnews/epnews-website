'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/build_europe_lng_cargo_evidence_queue_20261102.cjs <ranked.json> [output.json]');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert(Array.isArray(d.rows));
const items=d.rows.map((r,i)=>({
 id:[r.geo,r.month].join('-'),geo:r.geo,month:r.month,rank:i+1,
 priorityMagnitude:Number.isFinite(r.priorityMagnitude)?r.priorityMagnitude:null,
 status:'unverified',evidenceRequired:['terminal discharge arrival and date','vessel IMO identifier','load-port and transshipment history','discharged LNG volume and unit','source URL and retrieval date','reporting vintage and partner-code definition'],
 physicalOrigin:null,sourceLinks:[],analystNotes:null,
 caution:'Reporter-label change alone cannot establish cargo origin or geopolitical influence.'
}));
const out={scope:'Research queue only: no verified physical cargo origins',source:d.scope||null,unit:d.unit||'million m3',items,summary:{total:items.length,unverified:items.length},scoreAuthorized:false};
assert(items.every(x=>x.physicalOrigin===null&&x.status==='unverified'));
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out.summary));
