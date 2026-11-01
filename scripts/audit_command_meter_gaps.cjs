#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {dimensionScore,missingRequirements}=require('../chaos-meter-model.js');
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync('chaos-meter-data.js','utf8'),sandbox);
const data=sandbox.window.EP_CHAOS_DATA;
const actors=['us','china','russia','eu','india'];
const dimensions=['Economic','Strategic','Diplomatic','Energy and resources'];
const audit=data.evidenceAudits||{};
const readiness=data.meterReadiness;
assert.equal(readiness.percent,53,'Readiness must not be silently changed');
const ledger=[];
for(const actor of actors){
  for(const dimension of dimensions){
    const record=(audit[actor]||{})[dimension]||null;
    const rawScore=dimensionScore(record);
    const missing=missingRequirements(record);
    const observations=Array.isArray(record?.observations)?record.observations:[];
    const numeric=observations.filter(o=>Number.isFinite(o?.value));
    const hasSource=numeric.some(o=>o.source&&data.sources?.[o.source]);
    // Evidence-only labels do not claim influence or change score.
    const category=rawScore!==null?'verified-scored':hasSource?'verified-observation':
      record?'researchable':'missing-record';
    ledger.push({actor,dimension,category,scoredInfluence:rawScore,
      numericSourceBackedObservations:numeric.filter(o=>o.source&&data.sources?.[o.source]).length,
      missingRequirements:missing});
  }
}
assert.equal(ledger.length,20);
const tally=Object.fromEntries([...new Set(ledger.map(x=>x.category))].map(k=>[k,ledger.filter(x=>x.category===k).length]));
const output={asOf:data.reviewed,readiness:{percent:readiness.percent,kind:readiness.kind,
  lastEvidencePr:readiness.lastEvidencePr,changeReason:readiness.changeReason,
  components:readiness.components,warning:'Editorial estimate, not a formula. LastEvidencePr is historical; do not infer current verification from it.'},
  scope:'20 actor/dimension slots; not a census of all dashboard research gates',
  tally,ledger,
  unidentifiablePolicy:'No automatic unidentifiable classification: requires an explicit reviewed impossibility/identification analysis. Never remove gates from denominator or assign a score automatically.',
  decision:'No readiness uplift or influence activation based on presence of numeric observations alone.'};
const filename=process.argv[2]||'command-meter-gap-closure-audit.json';
fs.writeFileSync(filename,JSON.stringify(output,null,2)+'\n');
console.log('Audited '+ledger.length+' slots; '+JSON.stringify(tally)+'; readiness unchanged at '+readiness.percent+'%.');
