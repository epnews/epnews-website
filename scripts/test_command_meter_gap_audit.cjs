const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'ep-meter-'));
try{
 const file=path.join(tmp,'audit.json');
 cp.execFileSync(process.execPath,['scripts/audit_command_meter_gaps.cjs',file],{stdio:'pipe'});
 const d=JSON.parse(fs.readFileSync(file,'utf8'));
 assert.equal(d.ledger.length,20);
 assert.equal(d.readiness.percent,53);
 assert.equal(d.ledger.filter(x=>x.actor==='eu').length,4);
 assert.equal(d.ledger.filter(x=>x.actor==='india').length,4);
 for(const x of d.ledger){
   assert.ok(['verified-scored','verified-observation','researchable','missing-record'].includes(x.category));
   assert.ok(Array.isArray(x.missingRequirements));
   if(x.category==='verified-observation')assert.equal(x.scoredInfluence,null);
 }
 assert.match(d.unidentifiablePolicy,/Never remove gates/);
 assert.equal(d.readiness.lastEvidencePr,201,'Expose stale readiness provenance; do not silently rewrite history');
 console.log('20-slot gap audit, null score and historical readiness provenance checks passed');
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
