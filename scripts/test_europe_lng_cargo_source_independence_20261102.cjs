'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-independence-'));
try{
 const a=path.join(dir,'in.json'),b=path.join(dir,'out.json');
 fs.writeFileSync(a,JSON.stringify({items:[{id:'FR-01',sources:[{type:'terminal-discharge',url:'https://terminal.example/a'},{type:'vessel-tracking',url:'https://vessel.example/b'}]},{id:'DE-02',sources:[{type:'terminal-discharge',url:'https://same.example/a'},{type:'vessel-tracking',url:'https://same.example/b'}]},{id:'PL-03',sources:[]}]}));
 cp.execFileSync(process.execPath,['scripts/audit_europe_lng_cargo_source_independence_20261102.cjs',a,b]);
 const d=JSON.parse(fs.readFileSync(b,'utf8'));assert.equal(d.summary.candidates,1);
 assert.equal(d.items[0].verificationStatus,'human-independence-review-required');
 assert.equal(d.items[1].sourceAudit.independentReviewCandidate,false);
 assert(d.items.every(x=>x.physicalOriginVerified===false));assert.equal(d.scoreAuthorized,false);
 console.log('Independent source screening tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
