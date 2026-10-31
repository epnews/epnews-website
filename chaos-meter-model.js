/* Pure scoring gate shared by the UI and regression checks. */
(function(root){'use strict';
const weights={Economic:.30,Strategic:.30,Diplomatic:.20,'Energy and resources':.20};
// A scored dimension requires a reviewed outcome assessment, never a raw proxy.
function dimensionScore(r){
 if(!r||r.kind!=='Influence assessment'||!['Moderate','High'].includes(r.confidence)||!r.editorialReview||!r.baseline||!r.costAccounting||!r.counterfactual||!r.normalizationRationale||!r.targetFixedBeforeAssessment)return null;
 const outcomes=r.outcomes;
 if(!Array.isArray(outcomes)||outcomes.length<2||outcomes.some(x=>x.stage!=='Measured outcome'||!x.source||!x.independenceGroup||!x.period))return null;
 if(new Set(outcomes.map(x=>x.independenceGroup)).size<2)return null;
 if(!Number.isFinite(r.netChange)||!Number.isFinite(r.materialityTarget)||r.materialityTarget<=0)return null;
 return Math.max(-100,Math.min(100,100*r.netChange/r.materialityTarget));
}
// Explain missing requirements without mistaking evidence coverage for influence.
function missingRequirements(r){
 const missing=[];
 if(!r||r.kind!=='Influence assessment')missing.push('reviewed influence assessment');
 if(!r||!r.baseline)missing.push('dated baseline');
 const outcomes=r&&r.outcomes;
 if(!Array.isArray(outcomes)||outcomes.filter(x=>x&&x.stage==='Measured outcome'&&x.source&&x.independenceGroup&&x.period).length<2||new Set((outcomes||[]).filter(x=>x&&x.stage==='Measured outcome'&&x.source&&x.independenceGroup&&x.period).map(x=>x.independenceGroup)).size<2)missing.push('two independent measured outcomes');
 if(!r||!r.costAccounting)missing.push('cost and beneficiary accounting');
 if(!r||!r.counterfactual)missing.push('counterfactual');
 if(!r||!r.normalizationRationale||!r.targetFixedBeforeAssessment||!Number.isFinite(r.materialityTarget)||r.materialityTarget<=0)missing.push('predefined normalization target');
 if(!r||!Number.isFinite(r.netChange))missing.push('measured net change');
 if(!r||!['Moderate','High'].includes(r.confidence))missing.push('moderate/high confidence');
 if(!r||!r.editorialReview)missing.push('editorial approval');
 return missing;
}
function assessment(records){
 const scores=Object.fromEntries(Object.keys(weights).map(k=>[k,dimensionScore(records&&records[k])]));
 const ready=Object.values(scores).filter(x=>x!==null).length;
 if(ready!==4)return {score:null,ready,scores,sensitivity:null};
 const total=w=>Object.keys(w).reduce((sum,k)=>sum+w[k]*scores[k],0);
 const variants=[weights,{Economic:.25,Strategic:.25,Diplomatic:.25,'Energy and resources':.25},{Economic:.40,Strategic:.20,Diplomatic:.20,'Energy and resources':.20},{Economic:.20,Strategic:.40,Diplomatic:.20,'Energy and resources':.20}];
 const range=variants.map(total);
 return {score:total(weights),ready,scores,sensitivity:[Math.min(...range),Math.max(...range)]};
}
const api={weights,dimensionScore,missingRequirements,assessment};root.EPChaosModel=api;
if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
