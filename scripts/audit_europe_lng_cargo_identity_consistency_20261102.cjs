'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const {validIMO}=require('./audit_europe_lng_imo_checksum_20261102.cjs');
if(!process.argv[2])throw Error('Usage: node scripts/audit_europe_lng_cargo_identity_consistency_20261102.cjs <cases.json> [output.json]');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert(Array.isArray(d.items));
const items=d.items.map(item=>{
 const ids=(Array.isArray(item.identityEvidence)?item.identityEvidence:[]).map(x=>String(x.vesselIMO??'').trim().replace(/^IMO\s*/i,'')).filter(Boolean);
 const unique=[...new Set(ids)],invalid=unique.filter(x=>!validIMO(x));
 const issues=[];if(ids.length<2)issues.push('fewer-than-two-identity-observations');
 if(unique.length>1)issues.push('conflicting-vessel-identifiers');
 if(invalid.length)issues.push('invalid-imo-checksum');
 return {...item,identityAudit:{observationCount:ids.length,uniqueIMO:unique,issues,readyForHumanReview:issues.length===0},physicalOriginVerified:false,verificationStatus:issues.length?'identity-evidence-incomplete':'manual-identity-review-required'};
});
const out={items,summary:{total:items.length,manualReviewCandidates:items.filter(x=>x.identityAudit.readyForHumanReview).length},scoreAuthorized:false,warning:'Consistent identifiers alone do not establish independent sources or actual vessel movements.'};
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out.summary));
