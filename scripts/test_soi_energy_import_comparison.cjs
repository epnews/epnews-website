'use strict';
const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const source=fs.readFileSync('soi-comparison-visual.js','utf8');new vm.Script(source);
assert.match(source,/requested==='Energy and resources'/);
for(const value of ['-9.78127421443322','24.0191966181448','-70.7306703064017','36.0305276064275','57.3'])assert.ok(source.includes(value),'Missing source observation '+value);
assert.match(source,/Official Eurostat EU27 2024/);assert.doesNotMatch(source,/61\.51735784436232|historical calibration|modeled estimate/);assert.match(source,/not a published IEA observation/);assert.match(source,/percentage-point gap, not a winner/);
assert.match(source,/World Bank source data/);assert.match(source,/Eurostat EU27 source/);
assert.match(source,/EPInternationalAlignment/);assert.match(source,/Detailed source evidence table/);
console.log('Side-by-side energy provenance and script syntax checks passed');
