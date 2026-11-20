import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {classify} from './publication-state.mjs';
import {deploymentEvidence,changes,publicationSlugs} from './publication-state-evidence.mjs';
const repo=process.env.REPO;
const api=(path,paginate=false)=>JSON.parse(execFileSync('gh',['api',...(paginate?['--paginate','--slurp']:[]),path],{encoding:'utf8',maxBuffer:32*1024*1024}));
const report={checkedAt:new Date().toISOString(),repository:repo,records:[],errors:[]};
try {
 const event=JSON.parse(fs.readFileSync(process.env.EVENT_PATH,'utf8'));
 const open=api('repos/'+repo+'/pulls?state=open&per_page=100',true).flat();
 const recent=api('repos/'+repo+'/pulls?state=closed&sort=updated&direction=desc&per_page=30');
 const recheckRuns=[];
 try {
  const candidates=api('repos/'+repo+'/actions/workflows/publication-browser-recheck.yml/runs?per_page=30').workflow_runs.filter(r=>r.status==='completed'&&r.conclusion==='success'&&['pull_request','workflow_dispatch'].includes(r.event));
  for(const r of candidates){
   const dir='recheck-evidence/'+r.id;
   try {
    fs.mkdirSync(dir,{recursive:true});
    execFileSync('gh',['run','download',String(r.id),'-n','targeted-publication-visual','-D',dir,'-R',repo],{stdio:'pipe',timeout:45000});
    const report=JSON.parse(fs.readFileSync(path.join(dir,'report.json'),'utf8'));
    if(!Array.isArray(report))throw Error('Invalid report');
    recheckRuns.push({id:r.id,head_sha:r.head_sha,html_url:r.html_url,status:r.status,conclusion:r.conclusion,report});
   }catch(e){report.errors.push('Recheck artifact '+r.id+' unavailable: '+String(e.message));}
  }
 }catch(e){report.errors.push('Recheck discovery unavailable: '+String(e.message));}
 const ancestry=new Map();
 const ids=new Set([...open,...recent,...(event.pull_request?[event.pull_request]:[]),...(event.workflow_run?.pull_requests??[])].map(p=>p.number));
 let required=[];
 try {required=api('repos/'+repo+'/branches/main/protection/required_status_checks').contexts??[];} catch {try {required=api('repos/'+repo+'/rules/branches/main').filter(r=>r.type==='required_status_checks').flatMap(r=>r.parameters.required_status_checks.map(c=>c.context));} catch {} report.errors.push('Classic branch policy unavailable; ruleset contexts are advisory only; readiness remains unverified');}
 for(const number of ids){
  try {
   const p=api('repos/'+repo+'/pulls/'+number);
   const files=api('repos/'+repo+'/pulls/'+number+'/files?per_page=100',true).flat();
   const slugs=publicationSlugs(files);
   p.publication=slugs.length>0;
   const checks=p.state==='open'?api('repos/'+repo+'/commits/'+p.head.sha+'/check-runs?per_page=100',true).flatMap(x=>x.check_runs):[];
   const fresh=api('repos/'+repo+'/pulls/'+number);
   const stable=fresh.head.sha===p.head.sha;
   const status=classify({...fresh,publication:stable&&p.publication},stable?checks:[],required,false);
   let deployment={status:'UNVERIFIED'};
   if(fresh.merged&&stable&&p.publication){
    const baseline=api('repos/'+repo+'/actions/workflows/browser-publication-verification.yml/runs?head_sha='+fresh.merge_commit_sha+'&event=push').workflow_runs;
    const compatible=[];
    for(const run of recheckRuns){
     const key=fresh.merge_commit_sha+':'+run.head_sha;
     if(!ancestry.has(key)){
      try{const comparison=api('repos/'+repo+'/compare/'+fresh.merge_commit_sha+'...'+run.head_sha);ancestry.set(key,['ahead','identical'].includes(comparison.status));}
      catch(e){ancestry.set(key,false);report.errors.push('Recheck ancestry unavailable for #'+number+' run '+run.id+': '+String(e.message));}
     }
     compatible.push({...run,ancestorVerified:ancestry.get(key)});
    }
    deployment=deploymentEvidence(baseline,fresh.merge_commit_sha,compatible,slugs);
   }
   report.records.push({number,slugs,url:fresh.html_url,head:fresh.head.sha,mergedAt:fresh.merged_at,mergeCommit:fresh.merge_commit_sha,checkedAt:new Date().toISOString(),status:!stable&&fresh.state==='open'?'UNVERIFIED':status,checks:checks.map(({name,head_sha,status,conclusion})=>({name,head_sha,status,conclusion})),deployment});
  }catch(e){report.records.push({number,status:'UNVERIFIED',error:String(e.message)});}
 }
}catch(e){report.errors.push(String(e.message));process.exitCode=1;}
finally{let previous=[];try{previous=JSON.parse(fs.readFileSync('previous-state/publication-state.json','utf8')).records;}catch{} report.transitions=changes(previous,report.records);fs.writeFileSync('publication-state.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
