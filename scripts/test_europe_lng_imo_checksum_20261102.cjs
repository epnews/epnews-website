'use strict';
const assert=require('node:assert/strict'),{validIMO}=require('./audit_europe_lng_imo_checksum_20261102.cjs');
assert.equal(validIMO('9074729'),true);
assert.equal(validIMO('IMO 9074729'),true);
assert.equal(validIMO('9074728'),false);
assert.equal(validIMO('1234567'),false);
assert.equal(validIMO(null),false);
assert.equal(validIMO(''),false);
console.log('IMO checksum tests passed');
