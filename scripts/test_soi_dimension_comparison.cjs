'use strict';
const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const s=fs.readFileSync('soi-comparison-visual.js','utf8');new vm.Script(s);
assert.match(s,/requested==='Economic'\|\|requested==='Strategic'/);
assert.match(s,/gdp-growth-2025/);assert.match(s,/sipri-real-change-2025/);
assert.match(s,/x\.metric!==spec\.metric\|\|y\.metric!==spec\.metric/);
assert.match(s,/Number\.isFinite\(x\.number\)/);assert.match(s,/not a geopolitical influence score/);
assert.match(s,/requested==='All dimensions'/);assert.match(s,/requested==='Energy and resources'/);
assert.match(s,/EPInternationalAlignment/);
const context={window:{}};vm.runInNewContext(fs.readFileSync('chaos-meter-data.js','utf8'),context);
for(const id of ['us','china','russia','eu','india'])for(const [dimension,metric] of [['Economic','gdp-growth-2025'],['Strategic','sipri-real-change-2025']]){
 const row=context.window.EP_CHAOS_DATA.actors[id][dimension];assert.equal(row.metric,metric);assert.ok(Number.isFinite(row.number));
}
console.log('Economic and strategic comparison regression checks passed');
