'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
if(!process.argv[2])throw Error('Usage: node scripts/run_europe_lng_cargo_research_gates_20261102.cjs <cases.json> [output.json]');
const stages=[
 'validate_europe_lng_cargo_evidence_20261102.cjs',
 'audit_europe_lng_cargo_source_independence_20261102.cjs',
 'audit_europe_lng_source_provenance_20261102.cjs',
 'audit_europe_lng_cargo_chain_integrity_20261102.cjs',
 'audit_europe_lng_imo_checksum_20261102.cjs',
 'audit_europe_lng_cargo_identity_consistency_20261102.cjs',
 'summarize_europe_lng_cargo_review_backlog_20261102.cjs'
];
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'lng-gates-'));
try{
 let input=process.argv[2],result;
 for(let i=0;i<stages.length;i++){
  const output=path.join(dir,'stage-'+i+'.json');
  cp.execFileSync(process.execPath,[path.join(__dirname,stages[i]),input,output],{stdio:'pipe'});
  result=JSON.parse(fs.readFileSync(output,'utf8'));
  assert(Array.isArray(result.items)||Array.isArray(result.rows),'Unexpected stage output: '+stages[i]);
  input=output;
 }
 const out={...result,pipelineStages:stages,scoreAuthorized:false,warning:'All gates are research triage only; physical origin requires independent manual verification.'};
 assert(out.rows.every(x=>x.physicalOriginVerified===false&&x.scoreAuthorized===false));
 if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,2)+'\n');
 console.log(JSON.stringify(out.summary));
}finally{fs.rmSync(dir,{recursive:true,force:true})}
