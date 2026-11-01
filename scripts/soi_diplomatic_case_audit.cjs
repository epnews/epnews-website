'use strict';
function auditCase(framework,record){
 const errors=[];
 if(!framework.scope.includes(record.sphere))errors.push('Unknown sphere');
 if(!framework.stages.includes(record.stage))errors.push('Unknown stage');
 for(const key of ['id','counterpart','title','lastReviewed'])if(typeof record[key]!=='string'||!record[key].trim())errors.push('Missing '+key);
 const fields=record.fields&&typeof record.fields==='object'&&!Array.isArray(record.fields)?record.fields:{};
 const gates=framework.dimensions.map(gate=>{
  const missing=gate.required.filter(key=>typeof fields[key]!=='string'||!fields[key].trim());
  return {id:gate.id,status:missing.length?'missing-evidence':'documented-not-independently-verified',missing};
 });
 return {id:record.id||null,sphere:record.sphere||null,valid:errors.length===0,errors,gates,score:null,influenceScoreAuthorized:false};
}
function auditAll(framework){return framework.caseFiles.map(record=>auditCase(framework,record));}
module.exports={auditCase,auditAll};
