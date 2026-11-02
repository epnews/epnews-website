const assert=require('node:assert/strict');
const d=require('../data/soi-bulk-research-gates-20261102.json');
assert.equal(d.caseCount,12);
assert.equal(d.cases.length,12);
assert.equal(d.scoringAuthorized,false);
assert.equal(d.meterChanges,false);
assert.equal(d.gateProgressUnchanged,true);
assert.equal(new Set(d.cases.map(x=>x.id)).size,12);
for(const c of d.cases){assert.equal(c.auditGateCompleted,false);assert.equal(c.scoreAuthorized,false);assert.equal(c.status,'pending-independent-source-verification');}
console.log('12-case research register validated');
