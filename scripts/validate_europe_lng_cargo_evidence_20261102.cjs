'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/validate_europe_lng_cargo_evidence_20261102.cjs <queue.json> [output.json]');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert(Array.isArray(d.items));
const required=['terminal','arrivalDate','vesselIMO','loadPort','dischargeVolume','volumeUnit','sourceURL','retrievedAt','reportingVintage'];
const items=d.items.map(item=>{
 const evidence=item.evidence||{};
 const missing=required.filter(k=>typeof evidence[k]!=='string'||!evidence[k].trim());
 const imo=String(evidence.vesselIMO||'');
 if(imo&&!/^\d{7}$/.test(imo))missing.push('validIMOFormat');
 const url=String(evidence.sourceURL||'');
 if(url&&!/^https?:\/\//.test(url))missing.push('validSourceURL');
 const complete=missing.length===0;
 return {...item,evidenceCompleteness:complete?'fields-present':'incomplete',missingFields:missing,physicalOriginVerified:false,verificationStatus:complete?'manual-source-review-required':'missing-evidence'};
});
const out={items,summary:{total:items.length,fieldsPresent:items.filter(x=>x.evidenceCompleteness==='fields-present').length,manualReviewRequired:items.filter(x=>x.verificationStatus==='manual-source-review-required').length},scoreAuthorized:false,warning:'Fields present does not establish source independence, cargo physical origin, or causation.'};
assert(items.every(x=>x.physicalOriginVerified===false));
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out.summary));
