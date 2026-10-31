const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const {assessment,dimensionScore,missingRequirements,weights}=require('../chaos-meter-model.js');const sandbox={window:{}};vm.runInNewContext(fs.readFileSync('chaos-meter-data.js','utf8'),sandbox);const data=sandbox.window.EP_CHAOS_DATA;
assert.equal(Object.keys(data.actors).length,5);assert.equal(Object.values(weights).reduce((a,b)=>a+b,0),1);
for(const records of Object.values(data.actors)){
 assert.equal(Object.keys(records).length,4);assert.equal(assessment(records).score,null);
 for(const r of Object.values(records)){
  assert.equal(r.score,null);assert.equal(dimensionScore(r),null);
  for(const field of ['title','value','period','stage','kind','meaning','costs','gap','confidence'])assert.ok(r[field],field);
  assert.ok(r.sources.length);for(const id of r.sources){assert.ok(data.sources[id],id);assert.match(data.sources[id].url,/^https:\/\//);assert.ok(data.sources[id].date);}
 }
}
// All five actors now have energy worksheets, but none are an approved influence assessment.
for(const actor of Object.keys(data.actors))for(const dimension of data.dimensions)assert.ok(data.researchWorksheets[actor][dimension],actor+' '+dimension);
// Research worksheets may display candidate outcomes but never unlock a score.
for(const [actor,worksheets] of Object.entries(data.researchWorksheets))for(const [dim,sheet] of Object.entries(worksheets)){
 assert.ok(data.actors[actor][dim]);assert.equal(dimensionScore(data.actors[actor][dim]),null);
 assert.match(sheet.editorialReview,/Pending/);assert.ok(sheet.candidateBaseline&&sheet.candidateOutcome&&sheet.counterfactualNeeded&&sheet.costAccountingNeeded);
 for(const id of sheet.sources)assert.ok(data.sources[id]);
}
// Audited LNG observations are one source family, not two independent influence outcomes.
const lngAudit=data.evidenceAudits.us['Energy and resources'];
assert.equal(lngAudit.score,null);
assert.equal(lngAudit.observations.length,2);
assert.equal(lngAudit.observations[1].value-lngAudit.observations[0].value,lngAudit.derived.value);
assert.equal(new Set(lngAudit.observations.map(x=>x.source)).size,1);
for(const observation of lngAudit.observations){assert.ok(data.sources[observation.source]);assert.ok(Number.isFinite(observation.value));}
assert.ok(lngAudit.unresolved.length>=3);
// Synthetic fixtures test the gate; these are not published evidence or scores.
const valid={kind:'Influence assessment',confidence:'Moderate',editorialReview:'review-id',baseline:'dated baseline',costAccounting:'cost ledger',counterfactual:'alternative explanation',normalizationRationale:'predefined materiality',targetFixedBeforeAssessment:true,netChange:10,materialityTarget:20,outcomes:[{stage:'Measured outcome',source:'a',independenceGroup:'a',period:'2024–25'},{stage:'Measured outcome',source:'b',independenceGroup:'b',period:'2024–25'}]};
assert.deepEqual(missingRequirements(valid),[]);assert.ok(missingRequirements(data.actors.us.Economic).includes('two independent measured outcomes'));assert.ok(missingRequirements(data.actors.us.Economic).includes('editorial approval'));assert.equal(dimensionScore(valid),50);assert.equal(dimensionScore({...valid,netChange:0}),0);assert.equal(dimensionScore({...valid,netChange:-40}),-100);
for(const patch of [{confidence:'Low'},{editorialReview:null},{costAccounting:null},{counterfactual:null},{targetFixedBeforeAssessment:false},{materialityTarget:0},{netChange:NaN},{outcomes:[valid.outcomes[0]]},{outcomes:[valid.outcomes[0],valid.outcomes[0]]},{kind:'Resource input'}])assert.equal(dimensionScore({...valid,...patch}),null);
// Malformed imported outcome payloads must never crash the dashboard or produce a score.
for(const malformed of [null,{},'bad',42,[null],['bad'],[{stage:'Measured outcome'}]]){
 const candidate={...valid,outcomes:malformed};
 assert.equal(dimensionScore(candidate),null);
 assert.doesNotThrow(()=>missingRequirements(candidate));
 assert.ok(missingRequirements(candidate).includes('two independent measured outcomes'));
}
// Regression: the source-backed indicator values that drive the restored needle stay numeric.
const supported={'gdp-growth-2025':1,'sipri-real-change-2025':1,'lng-export-share-pp':1};
let observed=0;
for(const records of Object.values(data.actors))for(const record of Object.values(records)){
 if(Object.hasOwn(supported,record.metric)){assert.ok(Number.isFinite(record.number));observed++;}
}
assert.ok(observed>=5,'expected multiple numeric observations for the moving needle');
const complete=Object.fromEntries(data.dimensions.map(k=>[k,valid]));assert.equal(assessment(complete).score,50);assert.deepEqual(assessment(complete).sensitivity,[50,50]);delete complete.Strategic;assert.equal(assessment(complete).score,null);assert.equal(assessment(complete).scores.Economic,50);assert.equal(assessment(complete).scores.Strategic,null);
const html=fs.readFileSync('index.html','utf8');const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'duplicate HTML IDs');for(const file of ['chaos-meter-data.js','chaos-meter-model.js','chaos-dashboard.js'])assert.ok(html.includes(file));
console.log('PASS: 20 sourced records, missing-evidence gate, true zero, bounds, independent sources, composite, sensitivity and integration.');
