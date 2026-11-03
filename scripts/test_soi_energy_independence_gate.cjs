'use strict';
const assert=require('node:assert/strict');
const {audit,SOIS}=require('../soi-energy-independence-gate.js');
const rows=SOIS.map(soi=>({soi,geography:soi==='eu'?'EU27_2020':soi,value:soi==='russia'?-70:20,metric:'hypothetical-matched-net-imports',year:'2024',unit:'%',source:'hypothetical-same-source',denominator:'hypothetical-same-denominator'}));
assert.equal(audit(rows).comparable,true);
for(const [label,mutate] of [
 ['missing actor',r=>r.pop()],['duplicate actor',r=>r[4].soi='us'],['wrong geography',r=>r[3].geography='Europe'],
 ['mixed source',r=>r[3].source='Eurostat'],['mixed denominator',r=>r[3].denominator='gross available energy'],
 ['mixed year',r=>r[3].year='2025'],['mixed unit',r=>r[3].unit='EJ'],['mixed metric',r=>r[3].metric='fuel-specific'],
 ['null',r=>r[3].value=null],['NaN',r=>r[3].value=NaN],['Infinity',r=>r[3].value=Infinity]
]){const r=rows.map(x=>({...x}));mutate(r);assert.equal(audit(r).comparable,false,label);}
const actual=rows.map(x=>({...x}));actual[3].source='Eurostat';actual[3].denominator='gross available energy';
assert.equal(audit(actual).comparable,false,'World Bank + Eurostat may not masquerade as one measure');
assert.equal(audit([]).comparable,false);
console.log('Energy independence research gate passed');
