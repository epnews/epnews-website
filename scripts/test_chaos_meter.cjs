const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const {assessment,dimensionScore,missingRequirements,weights}=require('../chaos-meter-model.js');const sandbox={window:{}};vm.runInNewContext(fs.readFileSync('chaos-meter-data.js','utf8'),sandbox);const data=sandbox.window.EP_CHAOS_DATA;
const domestic=data.evidenceAudits.us['Energy and resources'].domesticElectricity2026;
assert.equal(domestic.items.length,8);
assert.equal(new Set(domestic.items.map(x=>x.id)).size,8);
assert.deepEqual(Array.from(domestic.items,x=>x.v2026),[18.19,14.04,9.09,15.64,14.37,192801,64014,403750]);
assert.ok(data.sources[domestic.source]);assert.equal(domestic.netNationalBenefitUsd,null);assert.equal(domestic.influenceScore,null);
const cash=data.evidenceAudits.us['Energy and resources'].q32026SecCashAndCosts;
assert.equal(cash.items.length,8);
assert.equal(new Set(cash.items.map(x=>x.id)).size,8);
assert.deepEqual(Array.from(cash.items,x=>x.v2026),[5124,2685,1967,1100,709,245,664,36]);
assert.deepEqual(Array.from(cash.items,x=>x.v2025),[3484,2263,3010,1100,750,82,640,415]);
assert.ok(data.sources[cash.source]);assert.equal(cash.netNationalBenefitUsd,null);
const q3=data.evidenceAudits.us['Energy and resources'].q32026CompanyOutcomes;
assert.equal(q3.items.length,8);
assert.equal(new Set(q3.items.map(x=>x.id)).size,8);
assert.deepEqual(Array.from(q3.items,x=>x.value2026),[6173,17773,1900,6037,1230,4070,188,2044]);
assert.deepEqual(Array.from(q3.items,x=>x.value2025),[4441,14526,1608,4896,null,null,163,1745]);
assert.ok(data.sources[q3.companySource]&&data.sources[q3.contextSource]);
assert.equal(q3.netNationalBenefitUsd,null);assert.equal(q3.influenceScore,null);
const readiness=data.meterReadiness;
assert.equal(readiness.percent,51);
assert.equal(readiness.previousPercent,49);
assert.equal(readiness.lastEvidencePr,198);
assert.equal(readiness.components.find(c=>c.id==='incidence').percent,45);
assert.equal(readiness.components.find(c=>c.id==='evidence').percent,60);
assert.equal(readiness.components.length,5);
assert.equal(readiness.influenceScore,null);
assert.equal(readiness.netNationalBenefitUsd,null);
assert.match(readiness.changePolicy,/merged PR alone/);
const cross=data.evidenceAudits.us['Energy and resources'].tradeFinancialCrossChecks;
assert.equal(cross.items.length,8);
assert.equal(new Set(cross.items.map(x=>x.id)).size,8);
const expectedCross=[15.1-11.9,Math.round((15.1/11.9-1)*1000)/10,10.3-6.3,2.5-4,4448-3599,2053-1281,1995-1771,2306-1830];
for(let i=0;i<8;i++){assert.ok(Math.abs(cross.items[i].value-expectedCross[i])<1e-9);for(const source of cross.items[i].sources)assert.ok(data.sources[source]);}
assert.equal(cross.newIndependentStudies,0);assert.equal(cross.netBenefitUsd,null);assert.equal(cross.influenceScore,null);
const h1=data.evidenceAudits.us['Energy and resources'].h12026MarketObservations;
assert.equal(h1.items.length,8);
assert.equal(new Set(h1.items.map(x=>x.id)).size,8);
assert.deepEqual(Array.from(h1.items,x=>x.value),[17.4,14.74,15.56,0.1,2.3,0.8,1.7,1.7]);
assert.ok(data.sources[h1.source]);
for(const x of h1.items){assert.ok(x.unit&&x.comparison&&x.caution);}
assert.equal(h1.nationalBenefitUsd,null);assert.equal(h1.influenceScore,null);
const trade=data.evidenceAudits.us['Energy and resources'].observedTradeIndicators;
assert.equal(trade.items.length,8);
assert.equal(new Set(trade.items.map(x=>x.id)).size,8);
assert.deepEqual(Array.from(trade.items,x=>[x.baseline,x.outcome]),[[11.9,15.1],[21,26],[6.3,10.3],[53,68],[4,2.5],[0.6,0],[0.3,1.2],[null,29]]);
for(const item of trade.items){assert.ok(data.sources[item.source]);assert.ok(item.limit&&item.unit);}
assert.equal(trade.netNationalBenefitUsd,null);assert.equal(trade.influenceScore,null);
const quality=data.evidenceAudits.us['Energy and resources'].evidenceQualityGates;
assert.equal(quality.checks.length,8);
assert.equal(new Set(quality.checks.map(c=>c.id)).size,8);
assert.equal(quality.newEmpiricalFindings,0);
for(const c of quality.checks){assert.ok(c.risk&&c.requirement);assert.ok(data.sources[c.baselineSource]);}
assert.equal(quality.netNationalBenefitUsd,null);assert.equal(quality.influenceScore,null);
const gates=data.evidenceAudits.us['Energy and resources'].causalResearchGates;
assert.equal(gates.questions.length,8);
assert.equal(gates.resolvedCount,0);
assert.equal(new Set(gates.questions.map(q=>q.id)).size,8);
for(const q of gates.questions){assert.ok(q.known&&q.missing&&q.test);assert.ok(data.sources[q.source]);}
assert.equal(gates.netBenefitUsd,null);assert.equal(gates.influenceScore,null);
const eight=data.evidenceAudits.us['Energy and resources'].eightPointAudit;
assert.equal(eight.items.length,8);
assert.equal(new Set(eight.items.map(x=>x.id)).size,8);
assert.deepEqual(Array.from(eight.items,x=>[x.baseline,x.outcome]),[[3599/4880,4448/6501],[4880,6501],[1771,1995],[1830,2306],[65,31],[1500,1300],[6.23,8.96],[2.19,3.52]]);
for(const x of eight.items){assert.ok(Number.isFinite(x.baseline));assert.ok(Number.isFinite(x.outcome));assert.ok(data.sources[x.source]);assert.ok(x.method);assert.ok(x.limit);}
for(const k of ['stage3ReturnUsd','publicExposureUsd','domesticExportAttributableCostUsd','netNationalBenefitUsd','influenceScore'])assert.equal(eight[k],null);
const recon=data.evidenceAudits.us['Energy and resources'].accountingReconciliationEvidence;
assert.equal(recon.checks.length,3);
const [rev,interest,coverage]=recon.checks;
for(const period of ['baseline','outcome']){
 assert.equal(rev[period].thirdParty+rev[period].affiliate,rev[period].total);
 assert.equal(interest[period].total-interest[period].capitalized,interest[period].expense);
 assert.ok(coverage[period].operating>0 && coverage[period].investingOutflow>0);
}
assert.equal(Math.round(1000*coverage.baseline.operating/coverage.baseline.investingOutflow)/10,96.8);
assert.equal(Math.round(1000*coverage.outcome.operating/coverage.outcome.investingOutflow)/10,86.5);
for(const c of recon.checks)assert.ok(data.sources[c.source]);
assert.equal(recon.stage3ReturnUsd,null);assert.equal(recon.netNationalBenefitUsd,null);assert.equal(recon.influenceScore,null);
const batch=data.evidenceAudits.us['Energy and resources'].threePartFinancialAudit;
assert.equal(batch.components.length,3);
assert.deepEqual(Array.from(batch.components[0].rows,r=>[r.baseline,r.outcome]),[[3599,4448],[1281,2053],[4880,6501]]);
assert.deepEqual(Array.from(batch.components[1].rows,r=>[r.baseline,r.outcome]),[[239,221],[174,190],[65,31],[140,23]]);
assert.match(batch.components[2].note,/2050/);
assert.match(batch.components[2].note,/4%/);
for(const c of batch.components)assert.ok(data.sources[c.source]);
for(const k of ['stage3ReturnUsd','publicExposureUsd','domesticRealizedCostUsd','netNationalBenefitUsd','influenceScore'])assert.equal(batch[k],null);
const cf=data.evidenceAudits.us['Energy and resources'].subsidiaryCashFlowEvidence;
assert.deepEqual(Array.from(cf.observations,r=>[r.baseline,r.outcome]),[[1771,1995],[1830,2306],[400,515],[415,375],[0,550]]);
assert.match(cf.accountingRules,/do not subtract them again/);
assert.equal(cf.netNationalBenefitUsd,null);
assert.equal(cf.stage3ReturnUsd,null);
assert.equal(cf.influenceScore,null);
for(const r of cf.observations)assert.ok(data.sources[r.source]);
const capital=data.evidenceAudits.us['Energy and resources'].projectCapitalEvidence;
assert.deepEqual(Array.from(capital.observations,r=>[r.baseline,r.outcome]),[[1.5,1.3]]);
assert.deepEqual(Array.from(capital.commitments,r=>r.value),[6,0.7]);
assert.match(capital.boundaries,/Do not sum/);
assert.equal(capital.netNationalBenefitUsd,null);
assert.equal(capital.influenceScore,null);
for(const r of [...capital.observations,...capital.commitments])assert.ok(data.sources[r.source]);
const cap=data.evidenceAudits.us['Energy and resources'].capacityTimelineEvidence;
assert.equal(cap.events.length,3);
assert.equal(cap.events[0].date,'December 2024');
assert.equal(cap.events[2].date,'August 28, 2026');
assert.match(cap.capacity,/1.3 Bcf\/day nominal/);
for(const e of cap.events){assert.ok(data.sources[e.source]);}
assert.equal(data.actors.us['Energy and resources'].score,null);
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
// Audited company accounting does not establish national welfare or Europe cargo margins.
const financial=lngAudit.financialEvidence;
assert.equal(financial.caseId,'cheniere-financials-2024-2025');
assert.match(financial.scope,/worldwide/);assert.match(financial.independence,/one company reporting family/);
for(const field of ['realizedEuropeMarginUsd','netNationalBenefitUsd','taxpayerNetCostUsd','influenceScore'])assert.equal(financial[field],null);
const financialRows=[...financial.observations,...financial.derived];
assert.equal(new Set(financialRows.map(r=>r.id)).size,financialRows.length,'duplicate financial measurements');
for(const row of financialRows){
 assert.equal(row.baselineYear,2024);assert.equal(row.outcomeYear,2025);
 assert.ok(Number.isFinite(row.baseline)&&Number.isFinite(row.outcome));
 assert.ok(row.unit&&row.limitation);assert.equal(row.stage,'Independently measured outcome');assert.ok(data.sources[row.source]);
}
for(const row of financial.observations)assert.equal(row.sourceFamily,financial.sourceFamily);
for(const id of [financial.assuranceSource,...financial.marginSources,...financial.taxSources])assert.ok(data.sources[id]);
const financialById=Object.fromEntries(financialRows.map(r=>[r.id,r]));
for(const period of ['baseline','outcome']){
 assert.equal(financialById.totalRevenue[period]-financialById.totalOperatingCosts[period],financialById.operatingIncome[period]);
 assert.equal(Number((100*financialById.operatingIncome[period]/financialById.totalRevenue[period]).toFixed(1)),financialById.gaapOperatingMargin[period]);
}
assert.equal(financialById.lngCustomerRevenue.baseline,14972);assert.equal(financialById.lngCustomerRevenue.outcome,19091);
assert.equal(financialById.totalInterestCost.baseline,1226);assert.equal(financialById.totalInterestCost.outcome,1197);
assert.equal(financialById.ppeCashOutflow.outcome,3078);assert.match(financialById.ppeCashOutflow.limitation, /net of \$174M/);
assert.equal(financialById.incomeTaxesPaid.baseline,-92);assert.equal(financialById.incomeTaxesPaid.outcome,32);
assert.match(financial.marginCaution,/not a realized LNG cargo netback/);assert.match(financial.accountingRules,/do not subtract those again/);
assert.match(financial.taxContext,/already reflected/);
assert.equal(data.actors.us['Energy and resources'].number,5,'financial evidence must not replace the moving-needle observation');
// Destination prices remain descriptive evidence, separate from company accounts and scoring.
const exportPrices=lngAudit.exportPriceEvidence;
assert.equal(exportPrices.priceBasis,'FOB');assert.equal(exportPrices.unit,'USD/MMBtu');assert.equal(exportPrices.transport,'Vessel');
assert.equal(exportPrices.baselinePeriod,'2024 calendar year');assert.equal(exportPrices.comparisonPeriod,'2025 calendar year');
assert.equal(exportPrices.stage,'Independently measured outcome');assert.match(exportPrices.stageLimitation,/not an independent audit/);
assert.equal(exportPrices.published,'2026-10-22');assert.equal(exportPrices.retrieved,'2026-10-31');
assert.match(exportPrices.definition,/not realized company revenue, cash receipts, profit, or net national economic benefit/);
assert.match(exportPrices.comparability,/Missing or withheld values must stay null/);
assert.match(exportPrices.calculation,/No volume multiplication/);assert.match(exportPrices.independence,/one reporting family/);
assert.match(exportPrices.revenueFinding,/not cargo destination/);
for(const key of ['realizedRevenueUsd','realizedMarginUsd','netNationalBenefitUsd','influenceScore'])assert.equal(exportPrices[key],null);
for(const id of [exportPrices.source,exportPrices.revenueSource,exportPrices.domesticFollowup.source]){assert.ok(data.sources[id]);assert.match(data.sources[id].url,/^https:\/\//);assert.ok(data.sources[id].date);}
// Transcription fixture: DOE Table 15b annual vessel columns (2024, 2025), not adjacent YTD columns.
const destinationFixture={Belgium:[6.23,8.96],Croatia:[5.89,7],Finland:[6.45,6.62],France:[6.26,7.66],Germany:[8.66,8.98],Greece:[6.83,7.83],Italy:[6.05,7.9],Lithuania:[5.87,7.6],Malta:[5.49,6.49],Netherlands:[5.94,7.67],Poland:[6.37,7.14],Portugal:[5.1,6.22],Spain:[6.03,7.45],Turkiye:[6.86,8.13],'United Kingdom':[7.08,8.06]};
assert.equal(exportPrices.observations.length,15);assert.equal(new Set(exportPrices.observations.map(r=>r.destination)).size,15);
for(const row of exportPrices.observations){assert.deepEqual([row.baseline,row.outcome],destinationFixture[row.destination]);assert.equal(row.change,Number((row.outcome-row.baseline).toFixed(2)));}
assert.equal(exportPrices.domesticFollowup.baseline,2.19);assert.equal(exportPrices.domesticFollowup.outcome,3.52);assert.equal(exportPrices.domesticFollowup.unit,'USD/MMBtu');
assert.equal(data.actors.us['Energy and resources'].metric,'lng-export-share-pp');
const prices=lngAudit.domesticPriceEvidence;
assert.equal(prices.observations.length,2);
assert.equal(prices.costEstimateUsd,null);
assert.equal(prices.consumerIncidenceEstimateUsd,null);
assert.match(prices.sourceComparability,/different price data providers/);
for(const o of prices.observations){assert.ok(Number.isFinite(o.valueUsdPerMMBtu));assert.ok(data.sources[o.source]);}
const costLedger=lngAudit.costIncidenceLedger;
assert.equal(costLedger.netBenefitUsd,null);
assert.equal(costLedger.netInfluenceScore,null);
assert.ok(costLedger.beneficiaries.length>=3);
assert.ok(costLedger.payers.length>=3);
for(const entry of [...costLedger.beneficiaries,...costLedger.payers]){
 assert.ok(['Unverified','Partially documented — company accounts only'].includes(entry.state));
 assert.ok(entry.party&&entry.measure&&entry.sourceGap);
}
assert.ok(costLedger.counterfactual&&costLedger.foreignPolicyTest&&costLedger.accountingRule);
assert.equal(lngAudit.score,null);
assert.equal(lngAudit.observations.length,2);
assert.equal(lngAudit.observations[1].value-lngAudit.observations[0].value,lngAudit.derived.value);
assert.equal(new Set(lngAudit.observations.map(x=>x.source)).size,1);
for(const observation of lngAudit.observations){assert.ok(data.sources[observation.source]);assert.ok(Number.isFinite(observation.value));}
assert.ok(lngAudit.unresolved.length>=3);
const deliveries=lngAudit.deliveryEvidence;
assert.equal(Number((deliveries.outcomeBcfPerDay-deliveries.baselineBcfPerDay).toFixed(1)),deliveries.changeBcfPerDay);
assert.ok(deliveries.sourceIds.every(id=>data.sources[id]));
assert.match(deliveries.independenceCaution,/not two independent/);
assert.equal(lngAudit.score,null);
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
const dashboard=fs.readFileSync('chaos-dashboard.js','utf8');
assert.equal((dashboard.match(/function init\(\)/g)||[]).length,1,'duplicate initialization');
assert.equal((dashboard.match(/if\(audit\.financialEvidence\)/g)||[]).length,1,'duplicate financial renderer');
assert.match(dashboard,/if\(audit\.domesticElectricity2026\)/);
assert.match(dashboard,/if\(audit\.q32026SecCashAndCosts\)/);
assert.match(dashboard,/if\(audit\.q32026CompanyOutcomes\)/);
assert.match(dashboard,/chaos-meter-readiness/);
assert.match(dashboard,/readiness\.percent/);
assert.match(dashboard,/if\(audit\.tradeFinancialCrossChecks\)/);
assert.match(dashboard,/if\(audit\.h12026MarketObservations\)/);
assert.match(dashboard,/if\(audit\.observedTradeIndicators\)/);
assert.match(dashboard,/if\(audit\.evidenceQualityGates\)/);
assert.match(dashboard,/if\(audit\.causalResearchGates\)/);
assert.match(dashboard.trimEnd(),/}\)\(\);?$/,'orphaned code after dashboard closure');
assert.equal((dashboard.match(/if\(audit\.exportPriceEvidence\)/g)||[]).length,1,'duplicate export-price renderer');
console.log('PASS: 15 matched FOB destination prices; 20 records; 13 financial rows and sources; accounting reconciliation; null scores; scoring gates; numeric indicators; single initialization and integration.');
