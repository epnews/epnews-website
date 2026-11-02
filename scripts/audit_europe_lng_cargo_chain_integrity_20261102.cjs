'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/audit_europe_lng_cargo_chain_integrity_20261102.cjs <cases.json> [output.json]');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert(Array.isArray(d.items));
const items=d.items.map(item=>{
 const e=item.evidence||{},issues=[];
 const dates=['loadingDate','arrivalDate','dischargeDate'];
 const parsed=dates.map(k=>typeof e[k]==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(e[k])&&Number.isFinite(Date.parse(e[k]))?Date.parse(e[k]):null);
 if(parsed.some(x=>x===null))issues.push('missing-or-invalid-chronology');
 else if(!(parsed[0]<=parsed[1]&&parsed[1]<=parsed[2]))issues.push('impossible-date-order');
 const vol=Number(e.dischargeVolume);
 if(e.dischargeVolume===null||e.dischargeVolume===undefined||String(e.dischargeVolume).trim()===''||!Number.isFinite(vol)||vol<=0)issues.push('invalid-discharge-volume');
 if(!['m3 LNG','tonnes LNG','MMBtu'].includes(e.volumeUnit))issues.push('unsupported-or-missing-unit');
 if(!/^\d{7}$/.test(String(e.vesselIMO||'')))issues.push('missing-or-invalid-imo-format');
 return {...item,chainAudit:{issues,readyForManualReview:issues.length===0},physicalOriginVerified:false,verificationStatus:issues.length?'chain-integrity-incomplete':'manual-chain-review-required'};
});
const out={items,summary:{total:items.length,manualReviewCandidates:items.filter(x=>x.chainAudit.readyForManualReview).length},scoreAuthorized:false,warning:'Chronology and unit screening does not authenticate sources or verify LNG origin.'};
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out.summary));
