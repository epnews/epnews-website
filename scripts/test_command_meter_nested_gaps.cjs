const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'ep-nested-'));
try{
 const out=path.join(tmp,'audit.json');
 cp.execFileSync(process.execPath,['scripts/audit_command_meter_nested_gaps.cjs',out]);
 const r=JSON.parse(fs.readFileSync(out,'utf8'));
 assert.equal(r.readiness,53);
 assert.equal(r.eightQuestionCount,8);
 assert.ok(r.gateCount>=4);
 assert.ok(r.openRequirementCount>0);
 assert.equal(r.verifiedRequirementCount+r.openRequirementCount,r.requirementCount);
 assert.equal(new Set(r.usLngQuestions.map(q=>q.id)).size,8);
 for(const q of r.usLngQuestions)assert.ok(q.missing&&q.test&&q.status.startsWith('open'));
 for(const g of r.gates)for(const x of g.requirements){if(x.source)assert.equal(x.sourceExists,true,'Unknown source '+x.source);}
 console.log('Nested gate and eight-question integrity tests passed');
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
