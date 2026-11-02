'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const worklist=JSON.parse(fs.readFileSync(path.join(root,'data/soi-diplomatic-audit-worklist.json'),'utf8'));
const {compileDiplomaticOutcomes,SPHERES}=require(path.join(root,'soi-diplomatic-outcomes-model.js'));
const GATES=['verify-primary','verify-counterpart','match-baseline','match-followup','attribute','costs'];
assert.deepEqual(worklist.items.map(x=>x.sphere),SPHERES);
assert.equal(worklist.scoringAuthorized,false);
let total=0,reviewed=0;
for(const item of worklist.items){
 assert.deepEqual(item.priorityTasks.map(t=>t.id),GATES,item.sphere+' gate order');
 const completed=item.priorityTasks.filter(t=>t.complete);
 for(const t of completed){
  assert.match(t.evidence||'',/^https:\/\//,item.sphere+'/'+t.id+' evidence must be URL');
  assert.ok(typeof t.scope==='string'&&t.scope.length>=25,item.sphere+'/'+t.id+' scope required');
 }
 assert.equal(item.auditProgress.completedScopedChecks,completed.length,item.sphere+' count');
 assert.deepEqual(item.auditProgress.remainingChecks,item.priorityTasks.filter(t=>!t.complete).map(t=>t.id),item.sphere+' remaining');
 assert.equal(item.influenceScore,null);
 assert.equal(item.priorityTasks.find(t=>t.id==='attribute').complete,false);
 assert.equal(item.priorityTasks.find(t=>t.id==='costs').complete,false);
 assert.equal(item.baselineFollowupAssessment.causallyAttributable,false);
 total+=completed.length;
 if(GATES.slice(0,4).every(id=>item.priorityTasks.find(t=>t.id===id).complete))reviewed++;
}
assert.equal(worklist.auditProgressSummary.completedScopedChecks,total);
assert.equal(worklist.auditProgressSummary.requiredChecks,SPHERES.length*GATES.length);
assert.equal(worklist.auditProgressSummary.scoreAuthorized,false);
const model=compileDiplomaticOutcomes(worklist);
assert.equal(model.checksCompleted,total);
assert.equal(model.checksRequired,SPHERES.length*GATES.length);
assert.equal(model.fullySourceReviewedCases,reviewed);
assert.equal(model.rows.reduce((n,r)=>n+r.verifiedGateCount,0),total);
assert.equal(model.scoringAuthorized,false);
for(const row of model.rows){assert.equal(row.influenceScore,null);assert.equal(row.verification.attribution,false);assert.equal(row.verification.costs,false);}
console.log('PASS SOI preflight: '+total+'/'+(SPHERES.length*GATES.length)+' scoped checks; '+reviewed+' source-reviewed cases; scoring blocked.');
