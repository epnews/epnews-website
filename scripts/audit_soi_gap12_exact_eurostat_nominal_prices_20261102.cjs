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
const expected=new Map(source.pairs.map(x=>[x.geo+'|'+x.commodity+'|2026-S1',x]));
const seen=new Set();const mismatches=[];const evidence=[];
for(const x of data.cells){
 assert(['electricity','natural gas'].includes(x.commodity));
 const key=x.geo+'|'+x.commodity+'|'+x.period;assert(expected.has(key),'Unexpected cell '+key);assert(!seen.has(key),'Duplicate cell '+key);seen.add(key);
 assert.equal(x.dataset,x.commodity==='electricity'?'nrg_pc_204':'nrg_pc_202');
 assert.equal(x.period,'2026-S1');assert.equal(x.unit,'KWH');assert.equal(x.currency,'EUR');
 assert.equal(x.consumptionBand,x.commodity==='electricity'?'KWH2500-4999':'GJ20-199');
 assert.equal(x.taxes,'I_TAX');
 assert(typeof x.sourceUrl==='string'&&x.sourceUrl.startsWith('https://ec.europa.eu/eurostat/'));
 assert(typeof x.retrievedAt==='string'&&x.retrievedAt.length>=10);
 assert(Number.isFinite(x.valueEURkWh)&&x.valueEURkWh>0);\n const normalized=Number((x.valueEURkWh*100).toFixed(4));
 const original=expected.get(key);const delta=Number((normalized-original.endEUR100kWh).toFixed(4));
 const match=Math.abs(delta)<0.005;evidence.push({key,original:original.endEUR100kWh,verified:normalized,delta,match,sourceUrl:x.sourceUrl});
 if(!match)mismatches.push(key);
}
const report={status:seen.size===expected.size&&mismatches.length===0?'all-exact-cells-match':'verification-incomplete-or-mismatched',checked:seen.size,expected:expected.size,missing:[...expected.keys()].filter(x=>!seen.has(x)),mismatches,evidence,scoreAuthorized:false};
console.log(JSON.stringify(report,null,2));
if(report.status!=='all-exact-cells-match')process.exitCode=1;
