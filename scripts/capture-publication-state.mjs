import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {classify} from './publication-state.mjs';
const repo=process.env.REPO;
const api=(path,paginate=false)=>JSON.parse(execFileSync('gh',['api',...(paginate?['--paginate','--slurp']:[]),path],{encoding:'utf8',maxBuffer:32*1024*1024}));
const report={checkedAt:new Date().toISOString(),repository:repo,records:[],errors:[]};
try {
 const event=JSON.parse(fs.readFileSync(process.env.EVENT_PATH,'utf8'));
 const open=api('repos/'+repo+'/pulls?state=open&per_page=100',true).flat();
 const recent=api('repos/'+repo+'/pulls?state=closed&sort=updated&direction=desc&per_page=30');
 const ids=new Set([...open,...recent,...(event.pull_request?[event.pull_request]:[]),...(event.workflow_run?.pull_requests??[])].map(p=>p.number));
 let required=[];
 try {required=api('repos/'+repo+'/branches/main/protection/required_status_checks').contexts??[];} catch {report.errors.push('Required branch policy unavailable; readiness remains unverified');}
 for(const number of ids){
  try {
   const p=api('repos/'+repo+'/pulls/'+number);
   const files=api('repos/'+repo+'/pulls/'+number+'/files?per_page=100',true).flat();
   p.publication=files.some(f=>/^publication-intake\//.test(f.filename))&&files.some(f=>/^content\/[a-z0-9-]+\.js$/.test(f.filename));
   const checks=p.state==='open'?api('repos/'+repo+'/commits/'+p.head.sha+'/check-runs?per_page=100',true).flatMap(x=>x.check_runs):[];
   const fresh=api('repos/'+repo+'/pulls/'+number);
   const stable=fresh.head.sha===p.head.sha;
   const status=classify({...fresh,publication:stable&&p.publication},stable?checks:[],required,false);
   report.records.push({number,url:fresh.html_url,head:fresh.head.sha,mergedAt:fresh.merged_at,mergeCommit:fresh.merge_commit_sha,checkedAt:new Date().toISOString(),status:!stable&&fresh.state==='open'?'UNVERIFIED':status,checks:checks.map(({name,head_sha,status,conclusion})=>({name,head_sha,status,conclusion})),deployment:'UNVERIFIED'});
  }catch(e){report.records.push({number,status:'UNVERIFIED',error:String(e.message)});}
 }
}catch(e){report.errors.push(String(e.message));process.exitCode=1;}
finally{fs.writeFileSync('publication-state.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
