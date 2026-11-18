import fs from 'node:fs';
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
   report.records.push({number,slugs,url:fresh.html_url,head:fresh.head.sha,mergedAt:fresh.merged_at,mergeCommit:fresh.merge_commit_sha,checkedAt:new Date().toISOString(),status:!stable&&fresh.state==='open'?'UNVERIFIED':status,checks:checks.map(({name,head_sha,status,conclusion})=>({name,head_sha,status,conclusion})),deployment:fresh.merged&&stable&&p.publication?deploymentEvidence(api('repos/'+repo+'/actions/workflows/browser-publication-verification.yml/runs?head_sha='+fresh.merge_commit_sha+'&event=push').workflow_runs,fresh.merge_commit_sha):{status:'UNVERIFIED'}});
  }catch(e){report.records.push({number,status:'UNVERIFIED',error:String(e.message)});}
 }
}catch(e){report.errors.push(String(e.message));process.exitCode=1;}
finally{let previous=[];try{previous=JSON.parse(fs.readFileSync('previous-state/publication-state.json','utf8')).records;}catch{} report.transitions=changes(previous,report.records);fs.writeFileSync('publication-state.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
