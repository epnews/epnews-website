'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-identity-'));
try{
 const a=path.join(dir,'in.json'),b=path.join(dir,'out.json'),e=ids=>ids.map(vesselIMO=>({vesselIMO}));
 fs.writeFileSync(a,JSON.stringify({items:[{id:'consistent',identityEvidence:e(['9074729','IMO 9074729'])},{id:'conflict',identityEvidence:e(['9074729','1234567'])},{id:'missing',identityEvidence:e([])}]}));
 cp.execFileSync(process.execPath,['scripts/audit_europe_lng_cargo_identity_consistency_20261102.cjs',a,b]);
 const d=JSON.parse(fs.readFileSync(b,'utf8'));assert.equal(d.summary.manualReviewCandidates,1);
 assert(d.items[1].identityAudit.issues.includes('conflicting-vessel-identifiers'));
 assert(d.items[2].identityAudit.issues.includes('fewer-than-two-identity-observations'));
 assert(d.items.every(x=>x.physicalOriginVerified===false));assert.equal(d.scoreAuthorized,false);
 console.log('Cargo vessel identity consistency tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
