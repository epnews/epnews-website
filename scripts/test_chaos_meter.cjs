const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const {assessment,dimensionScore,missingRequirements,weights}=require('../chaos-meter-model.js');const sandbox={window:{}};vm.runInNewContext(fs.readFileSync('chaos-meter-data.js','utf8'),sandbox);const data=sandbox.window.EP_CHAOS_DATA;
const evidenceTables=data.evidenceTableRegistry;
assert.equal(evidenceTables.length,29);
assert.equal(new Set(evidenceTables.map(x=>x.id)).size,evidenceTables.length);
assert.equal(new Set(evidenceTables.map(x=>x.auditKey)).size,evidenceTables.length,'duplicate dataset registration');
for(const entry of evidenceTables){assert.match(entry.id,/^[a-z0-9-]+$/);assert.equal(new Set(entry.columns.map(x=>x.key)).size,entry.columns.length,'duplicate column keys');for(const col of entry.columns)assert.ok(col.label&&col.key);}

for(const entry of evidenceTables){assert.ok(entry.id&&entry.auditKey);assert.ok(entry.columns.length);const record=data.evidenceAudits.us['Energy and resources'][entry.auditKey];assert.ok(record&&record.items.length);const sourceIds=[record.source,...record.items.flatMap(item=>[item.source,...(Array.isArray(item.sources)?item.sources:[])])].filter(Boolean);assert.ok(sourceIds.length||record.items.every(item=>item.caveat||item.limit),'dataset must have sources or explicit caveats');for(const id of sourceIds)assert.ok(data.sources[id],'unknown source '+id);for(const column of entry.columns)for(const item of record.items)assert.ok(Object.hasOwn(item,column.key));}
const southernFifteen=data.evidenceAudits.us['Energy and resources'].fifteenSouthernElectricityPrices;
assert.equal(southernFifteen.items.length,15);assert.equal(new Set(southernFifteen.items.map(x=>x.id)).size,15);
assert.deepEqual(Array.from(southernFifteen.items,x=>x.v2026),[14.37,11.73,7.85,14.43,13.45,7.57,16.33,14.98,8.11,13.42,13.13,6.92,13.80,12.09,7.37]);
assert.deepEqual(Array.from(southernFifteen.items,x=>x.v2025),[13.33,10.75,7.32,13.61,12.88,7.38,16.26,14.53,7.76,13.09,12.86,6.85,13.10,11.81,7.01]);
assert.ok(data.sources[southernFifteen.source]);assert.equal(southernFifteen.netNationalBenefitUsd,null);assert.equal(southernFifteen.influenceScore,null);
const gulfRetail=data.evidenceAudits.us['Energy and resources'].tenGulfElectricityConsumerPrices;
assert.equal(gulfRetail.items.length,10);assert.equal(new Set(gulfRetail.items.map(x=>x.id)).size,10);
assert.deepEqual(Array.from(gulfRetail.items,x=>x.v2026),[15.91,8.96,7.21,12.87,11.09,6.10,14.82,10.90,8.16,11.23]);
assert.deepEqual(Array.from(gulfRetail.items,x=>x.v2025),[15.40,8.76,6.42,12.55,10.90,6.29,14.42,10.00,6.64,10.42]);
assert.ok(data.sources[gulfRetail.source]);assert.equal(gulfRetail.netNationalBenefitUsd,null);assert.equal(gulfRetail.influenceScore,null);
const borderPrices=data.evidenceAudits.us['Energy and resources'].tenBorderGasPriceComparisons;
assert.equal(borderPrices.items.length,10);assert.equal(new Set(borderPrices.items.map(x=>x.id)).size,10);
assert.deepEqual(Array.from(borderPrices.items,x=>x.later),[2.15,8.76,3.82,8.59,2.96,6.19,2.75,3.60,6.25,2.79]);
assert.deepEqual(Array.from(borderPrices.items,x=>x.earlier),[2.95,2.13,3.63,6.21,2.80,4.49,1.81,2.23,6.03,1.96]);
assert.ok(data.sources[borderPrices.source]);assert.equal(borderPrices.netNationalBenefitUsd,null);assert.equal(borderPrices.influenceScore,null);
const sabineCash=data.evidenceAudits.us['Energy and resources'].tenSabinePassCashFlows;
assert.equal(sabineCash.items.length,10);assert.equal(new Set(sabineCash.items.map(x=>x.id)).size,10);
assert.deepEqual(Array.from(sabineCash.items,x=>x.v2026),[2550,-526,-531,1903,-1967,-1521,-1616,403,-22,527]);
assert.deepEqual(Array.from(sabineCash.items,x=>x.v2025),[1881,-176,-180,1262,-1617,-1539,-1916,-215,6,575]);
assert.ok(data.sources[sabineCash.source]);assert.equal(sabineCash.netNationalBenefitUsd,null);assert.equal(sabineCash.influenceScore,null);
const sabine=data.evidenceAudits.us['Energy and resources'].tenSabinePassPartnershipCosts;
assert.equal(sabine.items.length,10);assert.equal(new Set(sabine.items.map(x=>x.id)).size,10);
assert.deepEqual(Array.from(sabine.items,x=>x.v2026),[6561,2044,4757,46,692,136,522,546,2516,1986]);
assert.deepEqual(Array.from(sabine.items,x=>x.v2025),[5961,1738,4177,0,683,126,515,567,2237,1700]);
assert.ok(data.sources[sabine.source]);assert.equal(sabine.netNationalBenefitUsd,null);assert.equal(sabine.influenceScore,null);
const companyCosts=data.evidenceAudits.us['Energy and resources'].tenCheniereQ3CostsCapital;
assert.equal(companyCosts.items.length,10);assert.equal(new Set(companyCosts.items.map(x=>x.id)).size,10);
assert.deepEqual(Array.from(companyCosts.items,x=>x.v2026),[6099,17461,3207,11964,540,1598,1170,736,731,740]);
assert.deepEqual(Array.from(companyCosts.items,x=>x.v2025),[4302,14122,1750,6438,447,1479,1049,3028,null,null]);
assert.ok(data.sources[companyCosts.source]);assert.equal(companyCosts.netNationalBenefitUsd,null);assert.equal(companyCosts.influenceScore,null);
const storage=data.evidenceAudits.us['Energy and resources'].tenGasStorageSupplyAudit;
assert.equal(storage.items.length,10);assert.equal(new Set(storage.items.map(x=>x.id)).size,10);
assert.deepEqual(Array.from(storage.items,x=>x.value),[3950,360,9,-123,-59,862,1010,253,299,1076]);
for(const x of storage.items)assert.ok(data.sources[x.source]);
assert.equal(storage.netNationalBenefitUsd,null);assert.equal(storage.influenceScore,null);
const ten=data.evidenceAudits.us['Energy and resources'].aug2026TenDemandDestinationMeasures;
assert.equal(ten.items.length,10);assert.equal(new Set(ten.items.map(x=>x.id)).size,10);
assert.deepEqual(Array.from(ten.items,x=>x.value),[3.32,4.84,22.65,50.19,55.9,53.6,49.1,36.5,35.5,239]);
assert.deepEqual(Array.from(ten.items,x=>x.prior),[3.35,4.87,22.35,45.68,null,null,null,null,null,null]);
for(const x of ten.items)assert.ok(data.sources[x.source]);assert.equal(ten.netNationalBenefitUsd,null);assert.equal(ten.influenceScore,null);
const balance=data.evidenceAudits.us['Energy and resources'].aug2026GasSupplyDemandBalance;
assert.equal(balance.items.length,8);assert.equal(new Set(balance.items.map(x=>x.id)).size,8);
assert.deepEqual(Array.from(balance.items,x=>x.v2026),[115.84,139.03,90.65,19.58,7.55,27.13,16.61,34]);
assert.deepEqual(Array.from(balance.items,x=>x.v2025),[108.65,131.16,85.39,null,7.68,24.58,null,null]);
assert.ok(data.sources[balance.source]);assert.equal(balance.netNationalBenefitUsd,null);assert.equal(balance.influenceScore,null);
const causal=data.evidenceAudits.us['Energy and resources'].lngCausalCounterfactualAudit;
assert.equal(causal.findings.length,8);
assert.equal(causal.researchContrast.length,3);
for(const item of [...causal.findings,...causal.researchContrast])assert.ok(data.sources[item.source]);
assert.equal(causal.netNationalBenefitUsd,null);assert.equal(causal.influenceScore,null);
assert.match(causal.causalVerdict,/Not identified/);
const matched=data.evidenceAudits.us['Energy and resources'].domesticGasMatched2025to2026;
assert.equal(matched.rows.length,4);assert.equal(matched.supplemental.length,4);
assert.deepEqual(Array.from(matched.rows,x=>[x.prior,x.current]),[[26.26,27.05],[12.55,12.87],[4.47,4.34],[7.51,7.92]]);
assert.deepEqual(Array.from(matched.supplemental,x=>[x.prior,x.current]),[[12.44,13.96],[9.88,11.26],[6.03,7.20],[8.51,8.69]]);
for(const x of [...matched.rows,...matched.supplemental])assert.ok(data.sources[x.source]);
assert.equal(matched.netNationalBenefitUsd,null);assert.equal(matched.influenceScore,null);
const gas=data.evidenceAudits.us['Energy and resources'].domesticGasPricesAug2026;
assert.equal(gas.items.length,8);
assert.equal(new Set(gas.items.map(x=>x.id)).size,8);
assert.deepEqual(Array.from(gas.items,x=>x.value),[5.03,27.05,12.87,4.34,3.22,7.92,97.1,13.1]);
assert.equal(gas.items.filter(x=>x.type==='coverage').length,2);
assert.ok(data.sources[gas.source]);assert.equal(gas.netNationalBenefitUsd,null);assert.equal(gas.influenceScore,null);
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
assert.equal(readiness.percent,53);
assert.equal(readiness.previousPercent,51);
assert.equal(readiness.lastEvidencePr,201);
assert.equal(readiness.components.find(c=>c.id==='incidence').percent,50);
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





assert.doesNotMatch(dashboard,/if\(audit\.tenCheniereQ3CostsCapital\)/);
assert.doesNotMatch(dashboard,/if\(audit\.tenGasStorageSupplyAudit\)/);
assert.doesNotMatch(dashboard,/if\(audit\.aug2026TenDemandDestinationMeasures\)/);
assert.doesNotMatch(dashboard,/if\(audit\.aug2026GasSupplyDemandBalance\)/);
assert.match(dashboard,/if\(audit\.lngCausalCounterfactualAudit\)/);
assert.match(dashboard,/if\(audit\.domesticGasMatched2025to2026\)/);
assert.doesNotMatch(dashboard,/if\(audit\.domesticGasPricesAug2026\)/);

assert.doesNotMatch(dashboard,/if\(audit\.q32026SecCashAndCosts\)/);
assert.doesNotMatch(dashboard,/if\(audit\.q32026CompanyOutcomes\)/);
assert.match(dashboard,/chaos-meter-readiness/);
assert.ok(dashboard.indexOf('const element=(tag,text,cls)=>')<dashboard.indexOf('const readiness=data.meterReadiness;'),'DOM helper must be initialized before readiness panel uses it');
assert.equal((dashboard.match(/const element=\(tag,text,cls\)=>/g)||[]).length,1,'DOM helper must be declared exactly once');
assert.match(dashboard,/readiness\.percent/);
assert.doesNotMatch(dashboard,/if\(audit\.tradeFinancialCrossChecks\)/);
assert.doesNotMatch(dashboard,/if\(audit\.h12026MarketObservations\)/);
assert.doesNotMatch(dashboard,/if\(audit\.observedTradeIndicators\)/);
assert.match(dashboard,/if\(audit\.evidenceQualityGates\)/);
assert.match(dashboard,/if\(audit\.causalResearchGates\)/);
assert.match(dashboard.trimEnd(),/}\)\(\);?$/,'orphaned code after dashboard closure');
assert.equal((dashboard.match(/if\(audit\.exportPriceEvidence\)/g)||[]).length,1,'duplicate export-price renderer');
console.log('PASS: 15 matched FOB destination prices; 20 records; 13 financial rows and sources; accounting reconciliation; null scores; scoring gates; numeric indicators; single initialization and integration.');

for(const key of ["tenCheniereQ3CostsCapital","tenGasStorageSupplyAudit","aug2026TenDemandDestinationMeasures"]){assert.equal(evidenceTables.filter(x=>x.auditKey===key).length,1);}

for(const key of ["aug2026GasSupplyDemandBalance","domesticGasPricesAug2026","q32026SecCashAndCosts","h12026MarketObservations"])assert.equal(evidenceTables.filter(x=>x.auditKey===key).length,1);

for(const key of ["q32026CompanyOutcomes","tradeFinancialCrossChecks","observedTradeIndicators","eightPointAudit"])assert.equal(evidenceTables.filter(x=>x.auditKey===key).length,1);

const liquidity2026=data.evidenceAudits.us['Energy and resources'].q32026LiquidityOwnership2026;
assert.equal(liquidity2026.items.length,5);
assert.deepEqual(Array.from(liquidity2026.items,x=>x.value),[1663,393,6023,569,48.6]);
assert.equal(evidenceTables.filter(x=>x.auditKey==='q32026LiquidityOwnership2026').length,1);

const earningsReconciliation=data.evidenceAudits.us['Energy and resources'].q32026EarningsReconciliation;
assert.equal(earningsReconciliation.items.length,3);
assert.deepEqual(Array.from(earningsReconciliation.items,x=>x.v2026),[17773,736,2390]);
assert.equal(evidenceTables.filter(x=>x.auditKey==='q32026EarningsReconciliation').length,1);

const cashBridge=data.evidenceAudits.us['Energy and resources'].q32026CashFlowBridge;
assert.deepEqual(Array.from(cashBridge.items,x=>x.v2026),[2439,472,2261]);
assert.deepEqual(Array.from(cashBridge.items,x=>x.v2025),[1221,-1789,null]);
assert.equal(evidenceTables.filter(x=>x.auditKey==='q32026CashFlowBridge').length,1);

const cashDrivers=data.evidenceAudits.us['Energy and resources'].q32026WorkingCapitalDrivers;
assert.equal(cashDrivers.items.length,4);
assert.deepEqual(Array.from(cashDrivers.items,x=>x.v2026),[-659,-50,-219,279]);
assert.deepEqual(Array.from(cashDrivers.items,x=>x.v2025),[286,-587,42,-672]);
assert.equal(evidenceTables.filter(x=>x.auditKey==='q32026WorkingCapitalDrivers').length,1);

const causalGate=data.evidenceAudits.us['Energy and resources'].causalGatePrecommittedCapacity;
assert.equal(causalGate.items.length,5);
assert.deepEqual(Array.from(causalGate.items,x=>x.value),[2022,17.4,23,410,4]);
assert.equal(evidenceTables.filter(x=>x.auditKey==='causalGatePrecommittedCapacity').length,1);
for(const item of causalGate.items)assert.ok(data.sources[item.source],'Missing source '+item.source);
assert.equal(data.meterReadiness.influenceScore,null);
assert.equal(data.meterReadiness.netNationalBenefitUsd,null);

const euDependence=data.evidenceAudits.us['Energy and resources'].euLNGDependence2026;
assert.equal(euDependence.items.length,6);
assert.deepEqual(Array.from(euDependence.items,x=>x.value),[57.4,63.2,17.3,-5.6,4.1,58]);
for(const item of euDependence.items)assert.ok(data.sources[item.source],'Missing source '+item.source);
assert.equal(evidenceTables.filter(x=>x.auditKey==='euLNGDependence2026').length,1);
assert.equal(data.meterReadiness.influenceScore,null);

const euPolicy=data.evidenceAudits.us['Energy and resources'].euTradeCommitmentVsImplementation;
assert.equal(euPolicy.items.length,5);
assert.equal(euPolicy.items[0].value,750);
assert.equal(euPolicy.items[3].value,'2026-07-01');
for(const item of euPolicy.items)assert.ok(data.sources[item.source],'Missing source '+item.source);
assert.equal(evidenceTables.filter(x=>x.auditKey==='euTradeCommitmentVsImplementation').length,1);
assert.equal(data.meterReadiness.influenceScore,null);

const incidence=data.evidenceAudits.us['Energy and resources'].aug2026DomesticSupplyDemandIncidence;
assert.equal(incidence.items.length,9);
assert.deepEqual(Array.from(incidence.items,x=>x.value),[115.84,6.6,90.65,6.2,16.61,14.2,9.9,1.3,19.58]);
assert.ok(data.sources[incidence.source]);
assert.equal(evidenceTables.filter(x=>x.auditKey==='aug2026DomesticSupplyDemandIncidence').length,1);
assert.equal(data.meterReadiness.netNationalBenefitUsd,null);


// Completion sprint: evidence sufficiency is separate from meter functionality and influence scoring.
const completionSandbox={window:{}};vm.runInNewContext(fs.readFileSync('chaos-completion-model.js','utf8'),completionSandbox);
const completion=completionSandbox.window.EPCompletionModel;
assert.equal(completion.classify({requirements:[{status:'Verified'},{status:'Verified'}]}),'Verified');
assert.equal(completion.classify({requirements:[{status:'Verified'},{status:'Insufficient evidence'}]}),'Partially verified');
assert.equal(completion.classify({requirements:[{status:'Insufficient evidence'}]}),'Insufficient evidence');
assert.equal(completion.classify({requirements:[]}), 'Insufficient evidence');
assert.equal(data.completionSprint.researchGates.length,4);
assert.deepEqual(Array.from(completion.audit(data.completionSprint.researchGates),g=>g.status),['Partially verified','Partially verified','Partially verified','Partially verified']);
for(const gate of data.completionSprint.researchGates){assert.ok(gate.nextAction);assert.ok(gate.caveat);for(const req of gate.requirements){assert.ok(completion.statuses.includes(req.status));if(req.source)assert.ok(data.sources[req.source], 'Missing gate source: '+req.source);}}
assert.ok(html.includes('chaos-completion-model.js?v='), 'Completion model script and version query must be present');
assert.ok(html.indexOf('chaos-completion-model.js')<html.indexOf('chaos-dashboard.js'));
assert.match(dashboard,/chaos-completion-status/);
assert.match(dashboard,/completionModel\.audit\(sprint\.researchGates\)/);
assert.equal(data.meterReadiness.components.find(c=>c.id==='technical').percent,90);
assert.equal(data.meterReadiness.influenceScore,null);
assert.equal(data.meterReadiness.netNationalBenefitUsd,null);

const weather=data.evidenceAudits.us['Energy and resources'].henryHubWeatherConfounder2026;
assert.equal(weather.items.length,6);
assert.equal(weather.items[0].value,7.72);
assert.equal(weather.items[3].value,weather.items[4].value);
assert.equal(weather.items[5].value,null);
assert.ok(data.sources[weather.source]);
assert.equal(evidenceTables.filter(x=>x.auditKey==='henryHubWeatherConfounder2026').length,1);
assert.equal(data.meterReadiness.netNationalBenefitUsd,null);

const doeHousehold=data.evidenceAudits.us['Energy and resources'].doe2050HouseholdCostCounterfactual;
assert.equal(doeHousehold.items.length,9);
assert.deepEqual(Array.from(doeHousehold.items.slice(0,8),r=>r.value),[5,34,6,47,15,75,20,90]);
assert.equal(doeHousehold.items[8].value,null);
assert.ok(data.sources[doeHousehold.source]);
assert.equal(evidenceTables.filter(x=>x.auditKey==='doe2050HouseholdCostCounterfactual').length,1);
assert.equal(data.meterReadiness.netNationalBenefitUsd,null);

const matchedDOE=data.evidenceAudits.us['Energy and resources'].doeMatchedGDPHouseholdCO22050;
assert.equal(matchedDOE.items.length,8);
assert.deepEqual(Array.from(matchedDOE.items.slice(0,7),x=>x.value),[80,0.2,410,23,46.52,118.37,122.54]);
assert.equal(matchedDOE.items[7].value,null);
assert.ok(data.sources[matchedDOE.source]);
assert.equal(evidenceTables.filter(x=>x.auditKey==='doeMatchedGDPHouseholdCO22050').length,1);
assert.equal(data.meterReadiness.netNationalBenefitUsd,null);

const jobs=data.evidenceAudits.us['Energy and resources'].realizedLNGExportsVsExtractionJobs2026;
assert.equal(jobs.items.length,8);
assert.deepEqual(Array.from(jobs.items.slice(0,7),x=>x.value),[16.61,14.2,115.1,114.6,114.7,114.1,-1]);
assert.equal(jobs.items[7].value,null);
assert.ok(jobs.sources.every(id=>data.sources[id]));
assert.equal(evidenceTables.filter(x=>x.auditKey==='realizedLNGExportsVsExtractionJobs2026').length,1);
assert.equal(data.meterReadiness.netNationalBenefitUsd,null);

// Public-facing dashboard keeps controls and articles visible while preserving all research nodes.
const dashboardScript=fs.readFileSync('chaos-dashboard.js','utf8');
for(const id of ['chaos-completion-status','chaos-meter-readiness','chaos-assessment-readiness'])assert.ok(dashboardScript.includes(id));
for(const cls of ['chaos-matrix','chaos-indicators','chaos-compare'])assert.ok(dashboardScript.includes(cls));
assert.ok(dashboardScript.includes('chaos-research-drawer'));
assert.ok(dashboardScript.includes('chaos-exploration-drawer'));
assert.ok(dashboardScript.includes('chaos-assessment-drawer'));
assert.match(html, /chaos-dashboard\.js\?v=[A-Za-z0-9._-]+/, 'diplomatic meter script must be cache-busted');

assert.equal(data.actors.us.Diplomatic.metric,'nato-membership-change');
assert.equal(data.actors.us.Diplomatic.number,1);
assert.equal(data.actors.eu.Strategic.metric,'defence-spending-change-pct');
assert.equal(data.actors.eu.Strategic.number,20);
assert.equal(data.actors.china['Energy and resources'].metric,'china-crude-import-qoq-pct');
assert.equal(data.actors.russia['Energy and resources'].metric,'russia-fossil-export-revenue-eur-mn-day');
assert.equal(data.actors.us.Diplomatic.score??null,null);
assert.equal(data.actors.eu.Strategic.score??null,null);

assert.equal(data.actors.china['Energy and resources'].number,-32);
assert.equal(data.actors.russia['Energy and resources'].number,625);
assert.match(data.actors.china['Energy and resources'].measurementCaveat,/matched consecutive quarters/);
assert.match(data.actors.russia['Energy and resources'].measurementCaveat,/MODEL-ESTIMATED/);
assert.equal(data.actors.china['Energy and resources'].score,null);
assert.equal(data.actors.russia['Energy and resources'].score,null);

assert.equal(data.actors.eu['Energy and resources'].metric,'eu-russian-gas-import-share-pp');
assert.equal(data.actors.eu['Energy and resources'].number,-33);
assert.equal(data.actors.eu['Energy and resources'].score,null);
assert.ok(data.sources.euCommissionGasShare2026);
assert.match(data.actors.eu['Energy and resources'].measurementCaveat,/not total gas import dependence/);

assert.equal(data.actors.india['Energy and resources'].metric,'india-crude-import-dependence-pp');
assert.equal(data.actors.india['Energy and resources'].number,0.5);
assert.equal(data.actors.india['Energy and resources'].score,null);
assert.match(data.actors.india['Energy and resources'].measurementCaveat,/provisional/);
assert.ok(data.sources.ppacReadyReckonerFY2026.url.includes('ppac.gov.in'));

assert.equal(data.actors.eu.Diplomatic.number,8);
assert.equal(data.actors.eu.Diplomatic.score,null);
assert.match(data.actors.eu.Diplomatic.measurementCaveat,/NOT the FTA's causal effect/);
assert.ok(data.sources.euNzTradeCommittee2025);

for (const [actor,metric,number] of [['china','china-mediated-embassies-reopened-count',2],['russia','russia-dprk-treaties-in-force-count',1],['india','india-efta-tariff-lines-covered-pct',92.2]]) {
 assert.equal(data.actors[actor].Diplomatic.metric,metric);
 assert.equal(data.actors[actor].Diplomatic.number,number);
 assert.equal(data.actors[actor].Diplomatic.score,null);
 assert.ok(data.actors[actor].Diplomatic.measurementCaveat);
}

assert.match(data.actors.china['Energy and resources'].measurementCaveat,/NOT Q2 2025 vs Q2 2026/);
assert.match(data.actors.china['Energy and resources'].measurementCaveat,/inventory drawdowns/);

assert.match(data.actors.russia['Energy and resources'].measurementCaveat,/NOT cash received/);
assert.match(data.actors.russia['Energy and resources'].measurementCaveat,/September 2026/);

assert.ok(data.actors.russia['Energy and resources'].sources.includes('kseRussianOilTrackerOct2026'));
assert.match(data.actors.russia['Energy and resources'].costs,/688\.3 billion RUB/);
assert.match(data.actors.russia['Energy and resources'].costs,/US\$4.4B/);
assert.match(data.actors.russia['Energy and resources'].measurementCaveat,/do not add or subtract/);

assert.ok(data.actors.russia['Energy and resources'].sources.includes('russiaMinfinSeptember2026'));
assert.match(data.actors.russia['Energy and resources'].costs,/452.4 billion RUB/);
assert.match(data.actors.russia['Energy and resources'].costs,/22\.3% year-over-year/);
assert.match(data.actors.russia['Energy and resources'].measurementCaveat,/Separate fiscal series/);
assert.equal(data.actors.russia['Energy and resources'].number,625);

assert.ok(data.actors.russia['Energy and resources'].sources.includes('russiaUralsFreightSep2026'));
assert.match(data.actors.russia['Energy and resources'].costs,/US\$20\/barrel/);
assert.match(data.actors.russia['Energy and resources'].costs,/US\$24\.8\/barrel/);
assert.match(data.actors.russia['Energy and resources'].measurementCaveat,/NOT additive/);
assert.equal(data.actors.russia['Energy and resources'].score,null);

const lngGate=data.evidenceAudits.us['Energy and resources'].usLNGBenefitGate;
assert.equal(lngGate.issuerCashFlowBridge.operating2026UsdMn-lngGate.issuerCashFlowBridge.investingUsed2026UsdMn,lngGate.issuerCashFlowBridge.operatingLessInvesting2026UsdMn);
assert.equal(lngGate.issuerCashFlowBridge.operating2025UsdMn-lngGate.issuerCashFlowBridge.investingUsed2025UsdMn,lngGate.issuerCashFlowBridge.operatingLessInvesting2025UsdMn);
assert.equal(lngGate.issuerCashFlowBridge.operatingLessInvesting2026UsdMn-lngGate.issuerCashFlowBridge.operatingLessInvesting2025UsdMn,lngGate.issuerCashFlowBridge.changeUsdMn);
assert.equal(lngGate.gates.filter(g=>g.status==='Reconciled').length,1);
assert.equal(lngGate.gates.filter(g=>g.status==='Open').length,5);
assert.equal(lngGate.netNationalBenefitUsd,null);
assert.equal(lngGate.influenceScore,null);
assert.equal(data.meterReadiness.percent,53);


// Verified UN voting data integrity: measured agreement is not geopolitical influence.
const votingEvidence=JSON.parse(fs.readFileSync(__dirname+'/../data/soi-swp-verified-country-vote-alignment-2021-2024.json','utf8'));
assert.equal(votingEvidence.influenceScoreAuthorized,false,'UN voting evidence must not authorize an influence score');
const votingPairs=['USA_CHN','USA_RUS','USA_IND','CHN_RUS','CHN_IND','RUS_IND'];
for(const year of ['2021','2022','2023','2024']){
 const annual=votingEvidence.annual[year];
 assert.ok(annual,'missing verified voting year '+year);
 assert.ok(Number.isInteger(annual.recordedResolutions)&&annual.recordedResolutions>0,'invalid resolution coverage '+year);
 assert.ok(Number.isFinite(annual.euMeanCohesionPct)&&annual.euMeanCohesionPct>=0&&annual.euMeanCohesionPct<=100,'invalid EU cohesion '+year);
 for(const pair of votingPairs)assert.ok(Number.isFinite(annual.pairAgreementPct[pair])&&annual.pairAgreementPct[pair]>=0&&annual.pairAgreementPct[pair]<=100,'invalid pair agreement '+year+' '+pair);
 for(const code of ['USA','CHN','RUS','IND'])assert.ok(Number.isFinite(annual.euMajorityAlignmentPct?.[code])&&annual.euMajorityAlignmentPct[code]>=0&&annual.euMajorityAlignmentPct[code]<=100,'missing verified EU proxy '+year+' '+code);
}
for(const code of ['USA','CHN','RUS','IND'])assert.ok(Number.isFinite(votingEvidence.annual['2024'].euMajorityAlignmentPct[code]),'missing 2024 EU majority proxy '+code);

// 2024 source-file recomputation reproduces the pre-existing published EU alignment values.
assert.deepEqual(votingEvidence.annual['2024'].euMajorityAlignmentPct,{USA:60.87,CHN:39.13,RUS:38.71,IND:44.09});

// Descriptive diplomatic profile must use four counterpart relationships, not an influence score.
const profilePeers=['USA','CHN','RUS','IND','EU'];
for(const year of ['2021','2022','2023','2024']){
 const a=votingEvidence.annual[year];
 for(const actor of profilePeers){
  const counterparts=profilePeers.filter(p=>p!==actor);
  const values=counterparts.map(peer=>actor==='EU'?a.euMajorityAlignmentPct[peer]:peer==='EU'?a.euMajorityAlignmentPct[actor]:a.pairAgreementPct[[actor,peer].sort((x,y)=>profilePeers.indexOf(x)-profilePeers.indexOf(y)).join('_')]);
  assert.equal(values.length,4);
  assert.ok(values.every(Number.isFinite),'incomplete four-counterpart diplomatic profile '+year+' '+actor);
  assert.ok(values.reduce((s,n)=>s+n,0)/4<=100);
 }
}
const dashboardSource=fs.readFileSync(__dirname+'/../chaos-dashboard.js','utf8');
assert.match(dashboardSource,/Compare standardized diplomatic voting profile/);
assert.match(dashboardSource,/No meter needle or score uses this calculation/);

// Diplomatic influence gate framework must remain unscored and comparable across spheres.
const influenceFramework=JSON.parse(fs.readFileSync(__dirname+'/../data/soi-diplomatic-influence-framework.json','utf8'));
assert.equal(influenceFramework.influenceScoreAuthorized,false);
assert.deepEqual(influenceFramework.scope,['us','china','russia','eu','india']);
assert.deepEqual(influenceFramework.dimensions.map(d=>d.id),['activity','commitment','implementation','attribution','durability','costs']);
assert.deepEqual(influenceFramework.stages,['announced','signed','financed','implemented','measured']);
for(const gate of influenceFramework.dimensions){assert.ok(gate.required.length>=2);assert.ok(gate.question&&gate.note);}
assert.deepEqual(influenceFramework.caseFiles,[]);
const dashboardFrameworkSource=fs.readFileSync(__dirname+'/../chaos-dashboard.js','utf8');
assert.match(dashboardFrameworkSource,/How diplomatic influence will be verified/);
assert.match(dashboardFrameworkSource,/d\.influenceScoreAuthorized!==false/);

// Case audit: absent evidence is explicitly missing, never a numerical influence score.
const caseAuditor=require('./soi_diplomatic_case_audit.cjs');
assert.deepEqual(caseAuditor.auditAll(influenceFramework),[]);
const sample={id:'synthetic-test-only',sphere:'us',counterpart:'Test state',title:'Synthetic diplomatic case',stage:'announced',lastReviewed:'2026-11-01',fields:{actor:'US',actionDate:'2026-11-01'}};
const audit=caseAuditor.auditCase(influenceFramework,sample);
assert.equal(audit.valid,true);
assert.equal(audit.score,null);
assert.equal(audit.influenceScoreAuthorized,false);
assert.equal(audit.gates.length,6);
assert.ok(audit.gates.every(g=>g.status==='missing-evidence'));
assert.equal(caseAuditor.auditCase(influenceFramework,{...sample,sphere:'unknown'}).valid,false);
assert.equal(influenceFramework.caseFiles.length,0);

// Five source-backed research candidates are not audited influence outcomes.
const candidateData=JSON.parse(fs.readFileSync(__dirname+'/../data/soi-diplomatic-source-candidates.json','utf8'));
assert.equal(candidateData.cases.length,5);
assert.deepEqual(candidateData.cases.map(x=>x.sphere).sort(),['china','eu','india','russia','us']);
for(const c of candidateData.cases){assert.equal(c.influenceScore,null);assert.equal(c.reviewStatus,'event-stage-reviewed-influence-unverified');assert.ok(c.verifiedObservation.length>30);assert.ok(c.missingEvidence.length>=1);assert.ok(['eligible-for-external-diplomacy-review','excluded-internal-regulation'].includes(c.eligibility));assert.ok(/^https:\/\//.test(c.sourceUrl));assert.ok(influenceFramework.stages.includes(c.stage));assert.ok(c.caveat.length>20);}
assert.equal(influenceFramework.caseFiles.length,0,'research candidates must not be silently promoted to audited case files');

assert.equal(candidateData.cases.filter(c=>c.eligibility==='eligible-for-external-diplomacy-review').length,4);
assert.equal(candidateData.cases.find(c=>c.sphere==='eu').eligibility,'excluded-internal-regulation');
assert.ok(candidateData.cases.every(c=>c.influenceScore===null));
