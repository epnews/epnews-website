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
assert.match(dashboard.trimEnd(),/}\)\(\);?$/,'orphaned code after dashboard closure');
console.log('PASS: 20 records; 13 financial rows and sources; accounting reconciliation; null scores; scoring gates; numeric indicators; single initialization and integration.');
