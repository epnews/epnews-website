const assert=require('node:assert/strict');const fs=require('node:fs');
const s=fs.readFileSync('docs/us-lng-domestic-price-model-evidence.md','utf8');
const r=fs.readFileSync('docs/us-lng-source-reuse-register.md','utf8');
const near=(a,b,t=0.01)=>assert.ok(Math.abs(a-b)<t,JSON.stringify({a,b}));
near(56.3-23.7,32.6);near(4.62-3.53,1.09);near(100*1.09/3.53,31,0.2);near(31/32.6,0.95,0.01);
assert.ok(2.5/(31/32.6)>2);
for(const p of ['+$0.94','+$2.30','+$0.50','+$0.78','+$0.64','2050','not* a 2026','Readiness 53%'])assert.ok(s.includes(p),p);
for(const p of ['Already covered elsewhere','PRs #252–254','Modeled, not realized 2026','Research reuse rule'])assert.ok(r.includes(p),p);
console.log('DOE/RFF model comparison and no-duplication checks passed');
