'use strict';
/* Offline exact Eurostat nrg_pc_204 / nrg_pc_202 household price reconciliation.
 * Usage: node scripts/audit_soi_gap12_exact_eurostat_nominal_prices_20261102.cjs /path/to/verified-cells.json
 * Input format: {"cells":[{"geo":"IE","commodity":"electricity","period":"2026-S1","valueEURkWh":0.3871,"dataset":"nrg_pc_204","unit":"KWH","currency":"EUR","consumptionBand":"KWH2500-4999","taxes":"I_TAX","sourceUrl":"https://...","retrievedAt":"..."}]}
 * No network access; exact independently extracted dataset cells required.
 */
const fs=require('node:fs'),assert=require('node:assert/strict');
const source=JSON.parse(fs.readFileSync('data/soi-eu-gap12-household-national-semester-change-2025s2-2026s1-20261102.json','utf8'));
const input=process.argv[2];if(!input){console.error('Supply independently downloaded Eurostat exact cells JSON; no values are inferred from rounded news releases');process.exit(2)}
const data=JSON.parse(fs.readFileSync(input,'utf8'));assert(Array.isArray(data.cells));
const expected=new Map(source.pairs.flatMap(x=>[x.periodStart,x.periodEnd].map(period=>[x.geo+'|'+x.commodity+'|'+period,{pair:x,period}])));
const seen=new Set();const mismatches=[];const flagged=[];const evidence=[];
for(const x of data.cells){
 assert(['electricity','natural gas'].includes(x.commodity));
 const key=x.geo+'|'+x.commodity+'|'+x.period;assert(expected.has(key),'Unexpected cell '+key);assert(!seen.has(key),'Duplicate cell '+key);seen.add(key);
 assert.equal(x.dataset,x.commodity==='electricity'?'nrg_pc_204':'nrg_pc_202');
 assert(['2025-S2','2026-S1'].includes(x.period));assert.equal(x.unit,'KWH');assert.equal(x.currency,'EUR');
 assert.equal(x.consumptionBand,x.commodity==='electricity'?'KWH2500-4999':'GJ20-199');
 assert.equal(x.taxes,'I_TAX');
 assert(typeof x.sourceUrl==='string'&&x.sourceUrl.startsWith('https://ec.europa.eu/eurostat/'));
 assert(typeof x.retrievedAt==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(x.retrievedAt),'Actual ISO 8601 retrieval timestamp required');
 assert(Number.isFinite(x.valueEURkWh)&&x.valueEURkWh>0);\n if(x.sourceStatus!==null&&x.sourceStatus!==undefined&&x.sourceStatus!=='')flagged.push({key,status:x.sourceStatus});
 const normalized=Number((x.valueEURkWh*100).toFixed(4));
 const target=expected.get(key);const original=target.pair;const baseline=target.period===original.periodStart?original.startEUR100kWh:original.endEUR100kWh;const delta=Number((normalized-baseline).toFixed(4));
 const match=Math.abs(delta)<0.005;evidence.push({key,original:baseline,verified:normalized,delta,match,sourceUrl:x.sourceUrl});
 if(!match)mismatches.push(key);
}
const report={status:seen.size===expected.size&&mismatches.length===0&&flagged.length===0?'all-exact-cells-match':'verification-incomplete-or-mismatched',checked:seen.size,expected:expected.size,missing:[...expected.keys()].filter(x=>!seen.has(x)),mismatches,flagged,evidence,scoreAuthorized:false};
console.log(JSON.stringify(report,null,2));
if(report.status!=='all-exact-cells-match')process.exitCode=1;
