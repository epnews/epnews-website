#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync('chaos-meter-data.js','utf8'),sandbox);
const data=sandbox.window.EP_CHAOS_DATA;
const sprint=data.completionSprint;
assert(sprint&&Array.isArray(sprint.researchGates),'Missing live completionSprint research gates');
const groups=sprint.researchGates.map(g=>({
 id:g.id,title:g.title,nextAction:g.nextAction,
 requirements:g.requirements.map((r,i)=>({
  id:g.id+':'+i,label:r.label,status:r.status,
  source:r.source||null,sourceExists:r.source?Boolean(data.sources[r.source]):false,
  gap:r.status!=='Verified'
 }))
}));
const energy=data.evidenceAudits.us['Energy and resources'];
const findQuestions=(node,seen=new Set())=>{
 if(!node||typeof node!=='object'||seen.has(node))return null;
 seen.add(node);
 if(Array.isArray(node.questions)&&node.questions.length===8&&node.questions.every(q=>q.id&&q.missing&&q.test))return node.questions;
 for(const val of Object.values(node)){const found=findQuestions(val,seen);if(found)return found}
 return null;
};
const questions=findQuestions(energy);
assert(questions,'Eight US LNG research questions not found in production evidence');
const detail=questions.map(q=>({id:q.id,title:q.title,known:q.known,missing:q.missing,test:q.test,
 source:q.source||null,sourceExists:q.source?Boolean(data.sources[q.source]):false,
 status:'open - not automatically closed by source presence'}));
const result={
 asOf:data.reviewed,readiness:data.meterReadiness.percent,
 gateCount:groups.length,requirementCount:groups.reduce((n,g)=>n+g.requirements.length,0),
 verifiedRequirementCount:groups.reduce((n,g)=>n+g.requirements.filter(x=>!x.gap).length,0),
 openRequirementCount:groups.reduce((n,g)=>n+g.requirements.filter(x=>x.gap).length,0),
 eightQuestionCount:detail.length,
 gates:groups,usLngQuestions:detail,
 integrity:'A verified descriptive requirement is not proof of the causal effect. Questions remain open until reviewed causal identification and matched accounting.',
 note:'This is a live data inventory, not a new study or score. No denominator changes or readiness uplift.'
};
fs.writeFileSync(process.argv[2]||'command-meter-nested-gap-inventory.json',JSON.stringify(result,null,2)+'\n');
console.log('Live gates: '+result.gateCount+'; requirements: '+result.requirementCount+'; open: '+result.openRequirementCount+'; LNG questions: '+result.eightQuestionCount);
