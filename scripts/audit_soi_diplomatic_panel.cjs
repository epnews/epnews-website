const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const dataJs=fs.readFileSync('chaos-meter-data.js','utf8');const dashboard=fs.readFileSync('chaos-dashboard.js','utf8');const ctx={window:{}};vm.runInNewContext(dataJs,ctx);const data=ctx.window.EP_CHAOS_DATA;
assert.equal(data.soiDiplomaticUpdates.us.length,2);assert.equal(data.soiDiplomaticUpdates.india.length,1);
for(const [country,items] of Object.entries(data.soiDiplomaticUpdates)){for(const item of items){assert.ok(item.title&&item.stage&&item.finding&&item.limit&&item.source.startsWith('https://'));assert.equal(item.influenceScore,undefined);}}
assert.ok(dashboard.includes('Recent SOI diplomatic evidence'));assert.ok(dashboard.includes("dimension==='Diplomatic'||dimension==='Overall change'"));
assert.ok(dashboard.includes("select.addEventListener('change',update)"));assert.ok(dashboard.includes("category.addEventListener('change',update)"));
console.log('SOI diplomatic UI regression checks passed');
