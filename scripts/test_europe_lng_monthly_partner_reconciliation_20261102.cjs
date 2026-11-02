'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-monthly-'));
try{
 const a=path.join(dir,'input.json'),o=path.join(dir,'out.json');
 const make=(other)=>({dataset:'nrg_ti_gasm',unit:'MIO_M3',siec:'G3200',geographies:{FR:{months:['2025-01'],partners:{TOTAL:{months_million_m3:{'2025-01':100}},US:{months_million_m3:{'2025-01':30}},NSP:{months_million_m3:{'2025-01':null}},DZ:{months_million_m3:{'2025-01':other}}}}}});
 fs.writeFileSync(a,JSON.stringify(make(70)));cp.execFileSync(process.execPath,['scripts/audit_europe_lng_monthly_partner_reconciliation_20261102.cjs',a,o]);
 const d=JSON.parse(fs.readFileSync(o,'utf8'));assert.equal(d.summary.monthReporterObservations,1);assert.equal(d.months[0].difference,0);assert.equal(d.months[0].missingPartnerCount,1);
 fs.writeFileSync(a,JSON.stringify(make(50)));assert.notEqual(cp.spawnSync(process.execPath,['scripts/audit_europe_lng_monthly_partner_reconciliation_20261102.cjs',a],{encoding:'utf8'}).status,0);
 console.log('Monthly reconciliation positive and negative tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
