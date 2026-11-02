'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-vintage-'));
const fixture=(v,missing=false)=>({dataset:'nrg_ti_gasm',siec:'G3200',unit:'MIO_M3',geographies:Object.fromEntries(['EU27_2020','FR','DE','PL'].map(g=>[g,{partners:{US:{h1_bcm:{2025:v,2026:missing?null:2}}}}]))});
try{
 const a=path.join(dir,'a.json'),b=path.join(dir,'b.json'),o=path.join(dir,'o.json');
 fs.writeFileSync(a,JSON.stringify(fixture(1)));
 fs.writeFileSync(b,JSON.stringify(fixture(1.25,true)));
 cp.execFileSync(process.execPath,['scripts/compare_europe_lng_partner_vintages_20261102.cjs',a,b,o]);
 const d=JSON.parse(fs.readFileSync(o,'utf8'));
 assert.equal(d.summary.changedCells,4);assert.equal(d.summary.missingnessChanges,4);
 assert(d.changes.every(x=>Math.abs(x.deltaBcm-.25)<1e-12));
 fs.writeFileSync(b,JSON.stringify({...fixture(1),unit:'TWH'}));
 assert.notEqual(cp.spawnSync(process.execPath,['scripts/compare_europe_lng_partner_vintages_20261102.cjs',a,b],{encoding:'utf8'}).status,0);
 console.log('LNG vintage drift tests passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
