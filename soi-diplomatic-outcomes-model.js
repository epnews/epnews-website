'use strict';
// Descriptive diplomatic outcome engine. No numeric geopolitical influence is inferred.
const SPHERES=['us','china','russia','eu','india'];
const OBSERVATION_CLASSES={
 us:'operational-system-use',
 china:'reciprocal-embassy-reopening',
 russia:'treaty-legal-force',
 eu:'mission-resource-commitment',
 india:'preferential-trade-certificate-issuance'
};
function compileDiplomaticOutcomes(worklist){
 if(!worklist||!Array.isArray(worklist.items))throw new TypeError('Invalid diplomatic worklist');
 const rows=SPHERES.map(sphere=>{
  const item=worklist.items.find(x=>x.sphere===sphere);
  if(!item)throw new Error('Missing sphere '+sphere);
  const observed=item.additionalOperationalEvidence||item.directPolicyUptake||item.implementationObservation||null;
  const sources=observed?[...(Array.isArray(observed.sources)?observed.sources:[]),...(observed.source?[observed.source]:[])]:[];
  const completed=item.priorityTasks.filter(x=>x.complete).length;
  return {sphere,caseId:item.caseId,title:item.title,observationClass:OBSERVATION_CLASSES[sphere],
   observation:observed,sourceUrls:[...new Set(sources)],
   checksCompleted:completed,checksRequired:item.priorityTasks.length,
   independentlyAuditedPerformance:false,attributedInfluence:null,
   influenceScore:null,comparableInfluenceScore:false,
   limitation:'Different observed outcome types cannot be aggregated into a common influence score.'};
 });
 return {schemaVersion:1,kind:'descriptive-diplomatic-outcomes',scoringAuthorized:false,
  rows,checksCompleted:rows.reduce((s,x)=>s+x.checksCompleted,0),
  checksRequired:rows.reduce((s,x)=>s+x.checksRequired,0),
  outcomeClassesComparable:false};
}
module.exports={compileDiplomaticOutcomes,SPHERES};
