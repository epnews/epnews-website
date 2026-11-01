const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-compare-'));
try{
 const f=path.join(dir,'result.json');
 cp.execFileSync(process.execPath,['scripts/reconcile_europe_lng_sources.cjs',f]);
 const x=JSON.parse(fs.readFileSync(f,'utf8'));
 assert.equal(x.comparisons.length,2);
 assert.equal(x.status,'unreconciled');
 assert.equal(x.externalCrossCheck.euCouncilUsLNGBcm,82.9);
 for(const c of x.comparisons){
  assert.ok(c.differenceBcm.us>10);
  assert.ok(c.usShare.gapPercentagePoints>15);
  assert.ok(Math.abs(c.differenceBcm.total)<5,'Similar total with radically different supplier numerators is the central discrepancy');
 }
 assert.match(x.meterPolicy,/No supplier-dependence/);
 console.log('Source mismatch diagnostic and fail-closed meter checks passed');
}finally{fs.rmSync(dir,{recursive:true,force:true})}
