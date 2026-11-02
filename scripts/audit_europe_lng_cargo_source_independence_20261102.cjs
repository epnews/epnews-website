'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/audit_europe_lng_cargo_source_independence_20261102.cjs <cases.json> [output.json]');
const d=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert(Array.isArray(d.items));
const items=d.items.map(item=>{
 const sources=Array.isArray(item.sources)?item.sources:[];
 const domains=[...new Set(sources.map(s=>{try{return new URL(s.url).hostname.toLowerCase().replace(/^www\./,'')}catch{return null}}).filter(Boolean))];
 const types=[...new Set(sources.map(s=>s.type).filter(x=>typeof x==='string'&&x.trim()))];
 const hasTerminal=sources.some(s=>s.type==='terminal-discharge'&&s.url);
 const hasIndependent=sources.some(s=>s.type==='vessel-tracking'&&s.url);
 const candidates=hasTerminal&&hasIndependent&&domains.length>=2;
 return {...item,sourceAudit:{distinctDomains:domains.length,sourceTypes:types,terminalSourcePresent:hasTerminal,vesselSourcePresent:hasIndependent,independentReviewCandidate:candidates},physicalOriginVerified:false,verificationStatus:candidates?'human-independence-review-required':'insufficient-independent-source-types'};
});
const out={items,summary:{total:items.length,candidates:items.filter(x=>x.sourceAudit.independentReviewCandidate).length},scoreAuthorized:false,warning:'Distinct domains and source types do not prove independent provenance, vessel identity, physical origin, or causal influence.'};
assert(items.every(x=>x.physicalOriginVerified===false));
if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out.summary));
