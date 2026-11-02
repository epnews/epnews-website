const assert=require('node:assert/strict');
const d=require('../data/soi-cross-sphere-source-verification-queue-20261102.json');
assert.equal(d.checkCount,19);
assert.equal(d.checks.length,19);
assert.equal(new Set(d.checks.map(x=>x.id)).size,19);
assert.equal(d.scoringAuthorized,false);
assert.equal(d.gateProgressUnchanged,true);
for(const c of d.checks){
for(const key of ['caseId','sourceTarget','requestedEvidence','matchingDefinition','periodStart','periodEnd']) assert.ok(c[key]);
for(const key of ['sourceOpened','definitionMatched','independentlyCorroborated','attributionEstablished','gateCompleted']) assert.equal(c[key],false);
}
console.log('19 source-verification checks validated; no audit gate promotion');
