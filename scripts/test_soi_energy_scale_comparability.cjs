/* Staged Energy Scale comparison contract. No public observations or meter scores. */
'use strict';
const assert=require('node:assert/strict');
const {compare,matchedMetricUnits}=require('../chaos-comparability.js');
assert.equal(matchedMetricUnits['ei-total-energy-supply-2025'],'EJ');
const a={metric:'ei-total-energy-supply-2025',period:'2025',number:162.19};
const b={metric:'ei-total-energy-supply-2025',period:'2025',number:93.83};
assert.deepEqual(compare(a,b),{comparable:true,difference:162.19-93.83,unit:'EJ',metric:a.metric,period:'2025'});
assert.equal(compare(a,{...b,period:'2024'}).comparable,false);
assert.equal(compare(a,{...b,metric:'gdp-growth-2025'}).comparable,false);
assert.equal(compare(a,{...b,number:null}).comparable,false);
assert.equal(compare(a,{...b,number:NaN}).comparable,false);
assert.equal(compare(a,{...b,number:Infinity}).comparable,false);
assert.equal(compare({metric:'unknown',period:'2025',number:1},{metric:'unknown',period:'2025',number:2}).comparable,false);
assert.equal(compare({metric:'gdp-growth-2025',period:'2025',number:5},{metric:'gdp-growth-2025',period:'2025',number:2}).unit,'percentage points');
assert.equal(compare({metric:'sipri-real-change-2025',period:'2025',number:19},{metric:'sipri-real-change-2025',period:'2025',number:10}).unit,'percentage points');
console.log('Staged Energy Scale comparability tests passed');
