'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/audit_europe_lng_source_provenance_20261102.cjs <cases.json> [output.json]');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert(Array.isArray(d.items));
const items=d.items.map(item=>{
 const sources=Array.isArray(item.sources)?item.sources:[];
 const tagged=sources.filter(s=>typeof s.upstreamProvider==='string'&&s.upstreamProvider.trim());
 const providers=[...new Set(tagged.map(s=>s.upstreamProvider.trim().toLowerCase()))];
 const unknown=sources.length-tagged.length;
 const terminal=sources.some(s=>s.type==='terminal-discharge');
 const vessel=sources.some(s=>s.type==='vessel-tracking');
 const candidate=terminal&&vessel&&providers.length>=2&&unknown===0;
 return {...item,provenanceAudit:{sources:sources.length,upstreamProviders:providers,unknownProvenanceSources:unknown,distinctUpstreamProviders:providers.length,candidateForManualReview:candidate},physicalOriginVerified:false,verificationStatus:candidate?'manual-provenance-review-required':'provenance-not-established'};
});
const out={items,summary:{total:items.length,manualReviewCandidates:items.filter(x=>x.provenanceAudit.candidateForManualReview).length},scoreAuthorized:false,warning:'Self-reported upstream labels do not prove independence or physical cargo origin.'};
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out.summary));
