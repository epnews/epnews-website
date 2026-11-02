'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-provenance-'));
try{
 const a=path.join(dir,'in.json'),b=path.join(dir,'out.json');
 const pair=(p,q)=>[{type:'terminal-discharge',upstreamProvider:p},{type:'vessel-tracking',upstreamProvider:q}];
 fs.writeFileSync(a,JSON.stringify({items:[{id:'same',sources:pair('Feed A','feed a')},{id:'different',sources:pair('Terminal Authority','Vessel Registry')},{id:'unknown',sources:[{type:'terminal-discharge'},{type:'vessel-tracking',upstreamProvider:'Vessel Registry'}]}]}));
 cp.execFileSync(process.execPath,['scripts/audit_europe_lng_source_provenance_20261102.cjs',a,b]);
 const d=JSON.parse(fs.readFileSync(b,'utf8'));assert.equal(d.summary.manualReviewCandidates,1);
 assert.equal(d.items[0].provenanceAudit.distinctUpstreamProviders,1);
 assert.equal(d.items[2].provenanceAudit.unknownProvenanceSources,1);
 assert(d.items.every(x=>x.physicalOriginVerified===false));assert.equal(d.scoreAuthorized,false);
 console.log('Provenance deduplication tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
