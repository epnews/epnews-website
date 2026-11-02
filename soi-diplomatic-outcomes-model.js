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
  const taskComplete=id=>item.priorityTasks.some(x=>x.id===id&&x.complete===true);
  const verification={primary:taskComplete('verify-primary'),counterpart:taskComplete('verify-counterpart'),
   baseline:taskComplete('match-baseline'),followup:taskComplete('match-followup'),
   attribution:taskComplete('attribute'),costs:taskComplete('costs')};
  const verifiedGateCount=Object.values(verification).filter(Boolean).length;
  const verificationStage=verification.primary&&verification.counterpart&&verification.baseline&&verification.followup?'matched-source-review':'incomplete-source-review';
  const matched=item.baselineFollowupAssessment||{};
  const comparison={metric:matched.metric||null,baseline:matched.baseline||null,followup:matched.followup||null,
   baselineSource:matched.baselineSource||null,followupSource:matched.followupSource||null,
   descriptivelyComparable:matched.descriptivelyComparable===true,
   causallyAttributable:false,commonCrossSphereUnit:false,
   comparisonClass:'within-case descriptive observation',
   limitation:'Within-case baseline and follow-up only. No shared geopolitical influence unit or causal attribution.'};
  return {sphere,caseId:item.caseId,title:item.title,observationClass:OBSERVATION_CLASSES[sphere],
   observation:observed,comparison,verification,verifiedGateCount,verificationStage,sourceUrls:[...new Set(sources)],
   checksCompleted:completed,checksRequired:item.priorityTasks.length,
   independentlyAuditedPerformance:false,attributedInfluence:null,
   influenceScore:null,comparableInfluenceScore:false,
   limitation:'Different observed outcome types cannot be aggregated into a common influence score.'};
 });
 return {schemaVersion:1,kind:'descriptive-diplomatic-outcomes',scoringAuthorized:false,
  rows,checksCompleted:rows.reduce((s,x)=>s+x.checksCompleted,0),
  checksRequired:rows.reduce((s,x)=>s+x.checksRequired,0),
  outcomeClassesComparable:false,matchedWithinCaseComparisons:rows.filter(x=>x.comparison.descriptivelyComparable).length,
  crossSphereInfluenceComparable:false,fullySourceReviewedCases:rows.filter(x=>x.verificationStage==='matched-source-review').length,
  attributionReviewedCases:rows.filter(x=>x.verification.attribution).length};
}
module.exports={compileDiplomaticOutcomes,SPHERES};
