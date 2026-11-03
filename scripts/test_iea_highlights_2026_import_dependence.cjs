'use strict';
const assert = require('node:assert/strict');
// IEA World Energy Balances Highlights 2026, TimeSeries_1971-2025,
// Total product, 2024, PJ. Exports are signed negative in source.
// Research-only fixture: no meter or public score activation.
const observations = [
  {actor:'US', imports:21493.393274, exports:-30479.379067, supply:91869.278589, wdi:-9.78127421443322},
  {actor:'China', imports:45594.436454, exports:-3840.667639, supply:173834.994958, wdi:24.0191966181448},
  {actor:'India', imports:20026.581438, exports:-3029.933619, supply:47172.909257, wdi:36.0305276064275}
];
function importDependence({imports,exports,supply}) {
  if (![imports,exports,supply].every(Number.isFinite) || supply<=0) throw Error('invalid balance');
  if (exports>0) throw Error('expected signed negative exports');
  return (imports+exports)/supply*100;
}
for(const row of observations) {
  const computed=importDependence(row);
  assert.ok(Math.abs(computed-row.wdi)<0.00001, row.actor+' disagrees with WDI');
}
assert.throws(()=>importDependence({imports:1,exports:1,supply:2}));
assert.throws(()=>importDependence({imports:1,exports:-1,supply:0}));
assert.throws(()=>importDependence({imports:NaN,exports:-1,supply:2}));
assert.equal(observations.length,3,'The free extract does not provide Russia or EU27');
console.log('IEA Highlights 2026: 3 matched 2024 import-dependence observations; Russia/EU27 blocked.');
