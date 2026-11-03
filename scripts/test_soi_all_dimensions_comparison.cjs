'use strict';
const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const script=fs.readFileSync('soi-comparison-visual.js','utf8');new vm.Script(script);
assert.match(script,/requested==='All dimensions'/);
assert.match(script,/gdp-growth-2025/);assert.match(script,/sipri-real-change-2025/);
assert.match(script,/Number\.isFinite\(x\.number\)/);assert.match(script,/x\.metric===m\.metric&&y\.metric===m\.metric/);
assert.match(script,/2024 net energy imports/);assert.match(script,/\(official Eurostat\)/);assert.doesNotMatch(script,/61\.51735784436232/);
assert.match(script,/not a combined power score/);assert.match(script,/requested==='Energy and resources'/);
assert.match(script,/EPInternationalAlignment/);assert.match(script,/Detailed source evidence table/);
const dataSource=fs.readFileSync('chaos-meter-data.js','utf8');const sandbox={window:{}};vm.runInNewContext(dataSource,sandbox);const actors=sandbox.window.EP_CHAOS_DATA.actors;
for(const id of ['us','china','russia','eu','india']){
 for(const [dim,metric] of [['Economic','gdp-growth-2025'],['Strategic','sipri-real-change-2025']]){
  assert.equal(actors[id][dim].metric,metric,id+' '+dim+' metric');assert.ok(Number.isFinite(actors[id][dim].number),id+' '+dim+' numeric');
 }
}
console.log('All-dimensions comparison source contract and syntax checks passed');
