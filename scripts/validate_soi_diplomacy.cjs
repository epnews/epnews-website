'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const worklist=JSON.parse(fs.readFileSync(path.join(root,'data/soi-diplomatic-audit-worklist.json'),'utf8'));
const {compileDiplomaticOutcomes,SPHERES}=require(path.join(root,'soi-diplomatic-outcomes-model.js'));
const GATES=['verify-primary','verify-counterpart','match-baseline','match-followup','attribute','costs'];
assert.deepEqual(worklist.items.map(x=>x.sphere),SPHERES);
assert.equal(worklist.scoringAuthorized,false);
const methodology=worklist.evidenceGateMethodology;
assert.equal(methodology.version,'1.0');
assert.equal(methodology.crossSphereNormalization.status,'not-authorized');
for(const gate of ['attribution','costs']){
 assert.ok(methodology[gate].required.length>=5,gate+' evidence checklist');
 assert.ok(methodology[gate].notSufficient.length>=3,gate+' exclusions');
}
assert.ok(methodology.crossSphereNormalization.requirements.length>=5);
const realized=worklist.crossSphereRealizedVsAllocated2026;
assert.equal(realized.records.length,14);
assert.equal(realized.records.length,realized.recordCount);
assert.deepEqual([...new Set(realized.records.map(r=>r.sphere))].sort(),['china','eu','india','russia','us']);
assert.equal(realized.auditGatesCompleted,0);
assert.equal(realized.scoreAuthorized,false);
for(const r of realized.records){assert.ok(r.source.startsWith('https://'));assert.ok(r.limitation.length>40);assert.equal(r.caseSpecificCostVerified,false);assert.equal(r.causalAttributionVerified,false);}
assert.ok(realized.criticalDistinction.includes('not EUPM Moldova mission disbursements'));
const nextBundle=worklist.crossSphereAttributionCostResearchBundle;
assert.equal(nextBundle.records.length,18);
assert.equal(nextBundle.records.length,nextBundle.recordCount);
assert.deepEqual([...new Set(nextBundle.records.map(r=>r.sphere))].sort(),['china','eu','india','russia','us']);
for(const record of nextBundle.records){
  assert.ok(record.source.startsWith('https://'));
  assert.ok(record.interpretation.length>35);
  assert.equal(record.causalAttributionVerified,false);
  assert.equal(record.caseSpecificActualNetCostVerified,false);
}
assert.equal(nextBundle.scoreAuthorized,false);
const batch=worklist.crossSpherePrimaryEvidenceBatch;
assert.equal(batch.records.length,batch.totalRecords);
assert.ok(batch.records.length>=10);
assert.deepEqual([...new Set(batch.records.map(r=>r.sphere))].sort(),['china','eu','india','russia','us']);
for(const record of batch.records){
  assert.ok(record.source.startsWith('https://'));
  assert.ok(record.finding.length>40);
  assert.equal(record.causalAttributionVerified,false);
  assert.equal(record.actualNetCostVerified,false);
}
assert.equal(batch.scoreAuthorized,false);
const materiality=worklist.crossSphereFinancialReconciliationPolicy;
assert.equal(materiality.thresholds[0].relativeDifferencePercentMax,2);
assert.equal(materiality.thresholds[1].relativeDifferencePercentMax,5);
assert.equal(materiality.thresholds[2].disposition,'investigate-if-material');
assert.equal(materiality.comparisonPrerequisites.length,5);
assert.ok(materiality.override.includes('regardless of percentage'));
assert.ok(materiality.notApplicableTo.includes('causal attribution'));
assert.ok(materiality.notApplicableTo.includes('geopolitical influence scoring'));
assert.equal(materiality.scoreAuthorized,false);
const ledger=worklist.unresolvedGateEvidenceLedger;
assert.equal(ledger.totalUnresolved,10);
assert.equal(ledger.items.length,10);
for(const entry of ledger.items){
  const item=worklist.items.find(x=>x.sphere===entry.sphere);
  assert.ok(item);
  assert.equal(item.priorityTasks.find(t=>t.id===entry.gate).complete,entry.complete);
  assert.equal(entry.complete,false);
  assert.equal(entry.scoreAuthorized,false);
  assert.ok(entry.blockingQuestion.length>50);
  assert.ok(entry.primaryResearchEntryPoint.startsWith('https://'));
  assert.equal(entry.minimumEvidence.length,4);
}
const integrity=worklist.influenceMeasurementIntegrity;
assert.equal(integrity.researchReadiness.completedGates,20);
assert.equal(integrity.researchReadiness.requiredGates,30);
assert.equal(integrity.scoringPolicy.authorized,false);
assert.equal(integrity.scoringPolicy.compositeInfluenceScore,null);
assert.equal(integrity.qualityAssurance.neverAutoCompleteAttributionFromMatchedDescriptiveGates,true);
assert.equal(integrity.qualityAssurance.neverAutoCompleteCostsFromAuthorizedBudget,true);
assert.equal(integrity.qualityAssurance.neverAutoScoreFromAuditPercentage,true);
let total=0,reviewed=0;
for(const item of worklist.items){
 assert.deepEqual(item.priorityTasks.map(t=>t.id),GATES,item.sphere+' gate order');
 const completed=item.priorityTasks.filter(t=>t.complete);
 for(const t of completed){
  assert.match(t.evidence||'',/^https:\/\//,item.sphere+'/'+t.id+' evidence must be URL');
  assert.ok(typeof t.scope==='string'&&t.scope.length>=25,item.sphere+'/'+t.id+' scope required');
 }
 const observation=item.comparableOutcomeObservation;
 assert.equal(observation.status,'measurement-specification-only-not-verified-impact');
 assert.equal(observation.verifiedCausalEffect,null);
 assert.equal(observation.measuredChange,null);
 assert.equal(observation.scoreAuthorized,false);
 assert.ok(observation.alternativeExplanations.length>=3);
 assert.ok(observation.normalizationPolicy.includes('do not aggregate'));
 const gap=item.evidenceGapActionRegister;
 assert.equal(gap.status,'research-required-no-new-gates-completed');
 assert.equal(gap.requiredDeliverables.length,5);
 assert.ok(gap.researchEntryPoints.every(url=>url.startsWith('https://')));
 assert.equal(gap.verification.attributionComplete,false);
 assert.equal(gap.verification.costsComplete,false);
 assert.equal(gap.verification.scoreAuthorized,false);
 const links=item.auditProgress.verifiedEvidenceLinks;
 assert.ok(Array.isArray(links),item.sphere+' verified evidence links must be array');
 for(const t of completed){
  assert.ok(links.includes(t.evidence),item.sphere+'/'+t.id+' completed source must be indexed');
  assert.ok(new URL(t.evidence).hostname.includes('.'),item.sphere+'/'+t.id+' source hostname required');
 }
 assert.equal(new Set(links).size,links.length,item.sphere+' duplicate evidence links');
 assert.ok(links.every(x=>typeof x==='string'&&/^https:\/\//.test(x)),item.sphere+' invalid evidence link');
 assert.ok(item.priorityTasks.filter(t=>!t.complete).every(t=>!t.verification||t.verification.attributionVerified!==true),item.sphere+' pending gate cannot claim attribution verified');
 if(item.sphere==='india'){
  const rec=item.tradeSeriesReconciliation;
  assert.equal(rec.baselineFollowupGatesAuthorized,true,'India official HS8 product breadth supports matched indicator gates');
  assert.equal(rec.influenceScoringAuthorized,false,'India influence scoring blocked');
  assert.equal(rec.directDatabase.status.includes('pending'),true,'India revised series requires direct extraction');
  assert.equal(item.priorityTasks.find(t=>t.id==='match-baseline').complete,true);
  assert.equal(item.priorityTasks.find(t=>t.id==='match-followup').complete,true);
  assert.equal(rec.preferenceLineResearch.coveredProductExportsUsdBillion,8.37);
  const breadth=rec.productBreadthObserved;
  assert.equal(breadth.followup-breadth.baseline,breadth.absoluteChange);
  assert.ok(Math.abs((breadth.absoluteChange/breadth.baseline)*100-breadth.percentageChange)<0.02);
  assert.equal(breadth.matchedProductLevelSeriesVerified,false);
  assert.equal(breadth.matchedIndicatorSeriesVerified,true);
  assert.equal(rec.sourceIntegrityPolicy.liveRevisionReconciled,false);
  assert.equal(rec.sourceIntegrityPolicy.preferentialUtilizationVerified,false);
  assert.equal(rec.officialPreferenceUptakeObservations.length,2);
  assert.ok(rec.officialPreferenceUptakeObservations[1].certificatesOfOriginIssuedApprox>rec.officialPreferenceUptakeObservations[0].certificatesOfOriginIssuedApprox);
  assert.equal(item.priorityTasks.find(t=>t.id==='match-baseline').complete,true);
  assert.equal(item.priorityTasks.find(t=>t.id==='match-followup').complete,true);
  const uaetrade=item.uaeCounterpartTradeObservation;
  assert.equal(uaetrade.periods.length,2);
  assert.ok(Math.abs(uaetrade.periods[1].value-uaetrade.periods[0].value-uaetrade.differenceUsdBillion)<0.001);
  assert.equal(uaetrade.tradeDefinitionReconciledWithDgcis,false);
  assert.equal(uaetrade.causalAttributionVerified,false);
  const gold=item.goldTrqUtilizationResearch;
  assert.equal(gold.observation.goldTrqAllocatedTonnes,8.58);
  assert.equal(gold.observation.totalIndiaGoldImportsTonnes,721);
  assert.ok(Math.abs(gold.observation.goldTrqAllocatedTonnes/gold.observation.totalIndiaGoldImportsTonnes*100-gold.observation.ratioOfAllocatedTrqToTotalImportsPercent)<0.01);
  assert.equal(gold.verification.realizedPreferentialImportTonnesVerified,false);
  assert.equal(gold.verification.tariffRevenueEffectAttributableToGoldTrqVerified,false);
  assert.equal(gold.verification.costsGateComplete,false);
  const joint=item.bilateralJointCommitteeEvidence;
  assert.equal(joint.meetingDate,'2024-10-10');
  assert.equal(joint.confirmedImplementation[0].measurement.minimumImporterCountExclusive,800);
  assert.equal(joint.confirmedImplementation.length,3);
  assert.equal(joint.preferenceUtilizationRateVerified,false);
  assert.equal(joint.causalAttributionVerified,false);
  assert.equal(joint.costsGateComplete,false);
  const fiscal=item.costEvidenceResearch.fiscalMateriality;
  for(const y of [fiscal.fy2024_25,fiscal.fy2025_26]){
    assert.ok(Math.abs(y.uaeCepaCrore/y.allAgreementConcessionsCrore*100-y.sharePercent)<0.01);
  }
  assert.equal(fiscal.fy2025_26.dataType,'estimated');
  assert.equal(fiscal.netEconomicBenefitVerified,false);
  const indiaCost=item.costEvidenceResearch;
  assert.equal(indiaCost.observations[0].amountCrore,6231);
  assert.equal(indiaCost.observations[0].classification,'reported actuals');
  assert.equal(indiaCost.observations[1].amountCrore,9267);
  assert.equal(indiaCost.observations[1].classification,'estimated');
  assert.equal(indiaCost.observations[1].amountCrore-indiaCost.observations[0].amountCrore,indiaCost.arithmetic.differenceCrore);
  assert.equal(indiaCost.verification.bilateralCostsComplete,false);
  assert.equal(indiaCost.verification.costsGateComplete,false);
  const hist=rec.officialHistoricalMatchedSeries;
  assert.equal(hist.status,'official-descriptive-aggregate-only');
  assert.equal(hist.periods.length,2);
  for(const period of hist.periods){
   assert.ok(Math.abs(period.exportsUsdMillion+period.importsUsdMillion-period.totalUsdMillion)<0.02,'India historical trade arithmetic');
  }
  assert.ok(hist.derived.totalYearOverYearPercent<0,'India FY2023-24 trade fell versus FY2022-23');
  assert.equal(hist.productLevelGatesSatisfied,false);
  assert.equal(rec.sourceIntegrityPolicy.liveRevisionReconciled,false);
  assert.equal(rec.sourceIntegrityPolicy.preferentialUtilizationVerified,false);
  assert.equal(rec.sourceIntegrityPolicy.causalAttributionVerified,false);
  assert.equal(rec.liveSources.length,3);

  assert.ok(rec.preferenceLineResearch.notMeasure.includes('Preference utilization rate'));
 }
 if(item.sphere==='us'){
  assert.equal(item.newPrimaryOutcomeResearch.length,3);
  assert.ok(item.newPrimaryOutcomeResearch.every(x=>x.source.startsWith('https://')));
 }
 if(item.sphere==='eu'){
  assert.equal(item.newPrimaryOutcomeResearch.length,1);
  const cost=item.costEvidenceResearch;
  assert.equal(cost.primaryLegalConsolidation.periods.length,2);
  assert.equal(cost.primaryLegalConsolidation.periods[0].referenceEuros,cost.evidence[0].amount);
  assert.equal(cost.primaryLegalConsolidation.periods[1].referenceEuros,cost.evidence[1].amount);
  const scale=item.costEvidenceResearch.missionScaleCrosscheck;
  assert.equal(scale.staffCeiling,72);
  assert.equal(scale.estimatedBudgetEuros,item.costEvidenceResearch.evidence[1].amount);
  const seconded=item.costEvidenceResearch.secondedPersonnelAccounting;
  assert.equal(seconded.provision,'Article 6(1)');
  assert.equal(seconded.missionAllInCostVerified,false);
  assert.equal(seconded.secondmentPersonnelCountsAndCostsMatched,false);
  const register=item.costEvidenceResearch.contractRegister;
  assert.equal(register.examples.length,6);
  assert.equal(register.examples[0].amount,2532212.16);
  assert.equal(register.examples[1].amount,1971606);
  assert.equal(register.examples[4].currency,'MDL');
  assert.equal(register.methodology.noCrossCurrencySummation,true);
  assert.equal(register.methodology.noContractToCashInference,true);
  assert.equal(register.actualDisbursementsVerified,false);
  assert.equal(register.costsGateComplete,false);
  const counterpart=item.moldovaIndependentCounterpartImplementation;
  assert.equal(counterpart.observedActivities.length,3);
  assert.equal(counterpart.evidenceType,'counterpart-attested-outputs');
  assert.equal(counterpart.causalAttributionVerified,false);
  assert.equal(counterpart.actualExpenditureVerified,false);
  assert.equal(cost.evidence.length,2);
  assert.ok(Math.abs(cost.evidence[1].amount-cost.evidence[0].amount-cost.arithmetic.differenceEuros)<0.02);
  assert.equal(cost.verification.authorizedBudgetsIdentified,true);
  assert.equal(cost.verification.actualDisbursementsVerified,false);
  assert.equal(cost.verification.costsGateComplete,false);
  assert.equal(item.priorityTasks.find(t=>t.id==='costs').complete,false);
 }
 if(item.sphere==='russia'){
  assert.equal(item.counterpartResearch.influenceScoringAuthorized,false);
  const counterpart=item.priorityTasks.find(t=>t.id==='verify-counterpart');
  assert.equal(counterpart.complete,true,'Belarus counterpart ratification documented');
  assert.equal(counterpart.verification.policyRatificationVerified,true);
  assert.equal(counterpart.verification.operationalImplementationVerified,false,'Treaty ratification does not prove operational change');
  assert.equal(counterpart.verification.attributionVerified,false);
 }
 assert.equal(item.auditProgress.completedScopedChecks,completed.length,item.sphere+' count');
 assert.deepEqual(item.auditProgress.remainingChecks,item.priorityTasks.filter(t=>!t.complete).map(t=>t.id),item.sphere+' remaining');
 assert.equal(item.influenceScore,null);
 assert.equal(item.priorityTasks.find(t=>t.id==='attribute').complete,false);
 assert.equal(item.priorityTasks.find(t=>t.id==='costs').complete,false);
 assert.equal(item.baselineFollowupAssessment.causallyAttributable,false);
 total+=completed.length;
 if(GATES.slice(0,4).every(id=>item.priorityTasks.find(t=>t.id===id).complete))reviewed++;
}
assert.equal(worklist.auditProgressSummary.completedScopedChecks,total);
assert.equal(worklist.auditProgressSummary.requiredChecks,SPHERES.length*GATES.length);
assert.equal(worklist.auditProgressSummary.scoreAuthorized,false);
const model=compileDiplomaticOutcomes(worklist);
assert.equal(model.checksCompleted,total);
assert.equal(model.checksRequired,SPHERES.length*GATES.length);
assert.equal(model.fullySourceReviewedCases,reviewed);
assert.equal(model.rows.reduce((n,r)=>n+r.verifiedGateCount,0),total);
assert.equal(model.scoringAuthorized,false);
for(const row of model.rows){assert.equal(row.influenceScore,null);assert.equal(row.verification.attribution,false);assert.equal(row.verification.costs,false);}
console.log('PASS SOI preflight: '+total+'/'+(SPHERES.length*GATES.length)+' scoped checks; '+reviewed+' source-reviewed cases; scoring blocked.');
