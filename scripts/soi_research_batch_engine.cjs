#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const load=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const {dimensionScore,missingRequirements}=require('../chaos-meter-model.js');
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'chaos-meter-data.js'),'utf8'),sandbox);
const meter=sandbox.window.EP_CHAOS_DATA;
const countries=['us','china','russia','eu','india'],dimensions=['Economic','Strategic','Diplomatic','Energy and resources'];
const countryAliases={'United States':'us',Europe:'eu',China:'china',Russia:'russia',India:'india'};
const register=load('data/command-meter-cross-country-research-gates.json');
const bulk=load('data/soi-bulk-research-gates-20261102.json');
const five=load('data/soi-five-sphere-measurement-gates.json');
const config=load('config/soi-research-batch-policy.json');
assert.equal(config.schemaVersion,1);
assert.equal(register.scorePolicy.geopoliticalInfluenceScore,null);
assert.equal(register.scorePolicy.netNationalBenefitUsd,null);
assert.equal(bulk.scoringAuthorized,false);
assert.equal(bulk.meterChanges,false);
assert.equal(five.measuredInfluence,null);
assert.equal(new Set(bulk.cases.map(x=>x.id)).size,bulk.cases.length);
const tasks=[],ids=new Set();
function add(t){assert(t.id&&!ids.has(t.id),'Duplicate task: '+t.id);ids.add(t.id);tasks.push(t)}
for(const country of countries)for(const dimension of dimensions){
 const record=meter.evidenceAudits?.[country]?.[dimension]||null;
 const score=dimensionScore(record),missing=missingRequirements(record);
 const numeric=(record?.observations||[]).filter(o=>Number.isFinite(o?.value)&&o.source&&meter.sources?.[o.source]);
 add({id:'slot:'+country+':'+dimension.toLowerCase().replace(/[^a-z0-9]+/g,'-'),kind:'meter-slot',country,dimension,priority:score===null?100:20,activation:'blocked-until-scoring-gates-met',scored:score!==null,sourceBackedObservations:numeric.length,missingRequirements:missing,requiredAction:score===null?'Acquire independent measured outcomes, attribution, costs, and normalization':'Maintain source validity and regression coverage'});
}
for(const c of register.countries)for(const q of c.research){
 const country=countryAliases[c.country];assert(country,'Unknown country '+c.country);
 add({id:'cross:'+q.id,kind:'cross-country-gap',country,priority:config.priorities.crossCountry,question:q.question,existingEvidence:q.evidence,status:q.status,requiredAction:'Verify primary measured outcome and counterfactual'});
}
for(const c of bulk.cases){
 assert.equal(c.scoreAuthorized,false,'Unreviewed case may not authorize score');
 add({id:'case:'+c.id,kind:'research-case',priority:config.priorities.independentCases,status:c.status,sourceCandidates:c.candidateSources,requiredOutcome:c.requiredOutcome,definitionRisk:c.definitionRisk,baseline:c.baseline,alternativeExplanation:c.alternativeExplanation,costAndBenefit:c.costAndBenefit,requiredAction:'Retrieve and verify independent source; preserve definition and attribution'});
}
for(const c of five.countries)for(const next of c.next){
 add({id:'five:'+c.id+':'+c.next.indexOf(next),kind:'implementation-gap',country:c.id,priority:config.priorities.implementation,requiredAction:next});
}
tasks.sort((a,b)=>b.priority-a.priority||a.id.localeCompare(b.id));
const report={schemaVersion:1,generatedFrom:'repository evidence (no network acquisition)',readinessEditorialEstimatePercent:register.readinessEditorialEstimatePercent,scoreChangesAuthorized:false,needleChangesAuthorized:false,sourceEvidenceAcquired:false,counts:{total:tasks.length,meterSlots:20,inactiveMeterSlots:tasks.filter(x=>x.kind==='meter-slot'&&!x.scored).length,crossCountryGaps:tasks.filter(x=>x.kind==='cross-country-gap').length,researchCases:bulk.cases.length,implementationGaps:tasks.filter(x=>x.kind==='implementation-gap').length},batchSize:config.batchSize,queue:tasks,selectedBatch:tasks.slice(0,config.batchSize).map(x=>x.id)};
assert.equal(tasks.filter(x=>x.kind==='meter-slot').length,20);
assert.equal(report.counts.total,20+report.counts.crossCountryGaps+bulk.cases.length+report.counts.implementationGaps);
const out=process.argv[2];
if(out){fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');console.log('Wrote '+out)}
else console.log(JSON.stringify(report,null,2));
