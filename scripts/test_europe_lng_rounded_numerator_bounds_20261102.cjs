'use strict';
const assert=require('node:assert/strict');
const eurostat={2025:25.838331,2026:29.181938};
const nupi={2025:41,2026:44};
for(const year of [2025,2026]){
 const min=nupi[year]-0.5-eurostat[year],max=nupi[year]+0.5-eurostat[year];
 assert(min>14,'Rounding cannot eliminate the >14 bcm mismatch');
 assert(max-min===1||Math.abs(max-min-1)<1e-9);
 console.log(year+': conditional US discrepancy ['+min.toFixed(6)+', '+max.toFixed(6)+') bcm');
}
