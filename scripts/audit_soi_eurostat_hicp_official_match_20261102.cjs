'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
const official=JSON.parse(fs.readFileSync('data/soi-eu-hicp-2025-verified-index-20261102.json','utf8'));
const provisional=JSON.parse(fs.readFileSync('data/soi-eu-hicp-2025-real-energy-price-comparisons-20261102.json','utf8'));
assert.equal(official.dataset,'prc_hicp_minr');assert.equal(official.geo,'EU27_2020');assert.equal(official.coicop18,'TOTAL');assert.equal(official.unit,'I25');assert.equal(official.observations.length,12);
const comparisons=official.observations.map((x,i)=>{const y=provisional.index.observations[i];assert.equal(x.month,y.month);return {month:x.month,official:x.index,provisional:y.index,difference:Number((x.index-y.index).toFixed(6)),match:Math.abs(x.index-y.index)<0.000001}});
const report={source:official.source,officialUnit:official.unit,provisionalBase:provisional.index.base,allMatch:comparisons.every(x=>x.match),meanOfficialS1:official.meanS1,meanOfficialS2:official.meanS2,meanProvisionalS1:provisional.index.meanS1,meanProvisionalS2:provisional.index.meanS2,comparisons};
fs.writeFileSync('data/soi-eu-hicp-2025-official-comparison-20261102.json',JSON.stringify(report,null,2)+'\n');
if(!report.allMatch){console.error('Eurostat direct values differ from provisional mirror. See artifact. Do not promote real-price findings.');process.exitCode=1}else{console.log('All twelve EU27 HICP observations match direct Eurostat.');}
