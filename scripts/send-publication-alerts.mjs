import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {alertFor,alreadySent} from './publication-alerts.mjs';
const repo=process.env.REPO;
const api=(args)=>JSON.parse(execFileSync('gh',['api',...args],{encoding:'utf8',maxBuffer:32*1024*1024,stdio:['ignore','pipe','pipe']}));
const report=JSON.parse(fs.readFileSync('publication-state.json','utf8'));
const delivery={checkedAt:new Date().toISOString(),repository:repo,results:[]};
const summary=process.env.GITHUB_STEP_SUMMARY;
for(const r of report.transitions||[]){
 const a=alertFor(r);if(!a)continue;
 const item={number:a.number,kind:a.kind,key:a.key,delivery:'NOT_DELIVERED'};
 delivery.results.push(item);
 try{
  const p=api(['repos/'+repo+'/pulls/'+a.number]);
  if(p.head.sha!==a.head||p.draft||p.head.repo?.full_name!==repo){item.delivery='SUPPRESSED_STALE';continue;}
  if(a.kind==='CHECKS_BLOCKED'&&(p.state!=='open'||p.merged)){item.delivery='SUPPRESSED_STALE';continue;}
  if(a.kind==='PRODUCTION_BROWSER_FAILED'&&(!p.merged||p.merge_commit_sha!==a.merge)){item.delivery='SUPPRESSED_STALE';continue;}
  const endpoint='repos/'+repo+'/issues/'+a.number+'/comments';
  const comments=api([endpoint+'?per_page=100','--paginate','--slurp']).flat();
  if(alreadySent(comments,a.key)){item.delivery='ALREADY_DELIVERED';continue;}
  const body='<!-- epnews-alert:'+a.key+' -->\n**EP News monitoring: '+a.kind+'**\nExact head: \\x60'+a.head+'\\x60\n'+(a.run?'[Production verification run](https://github.com/'+repo+'/actions/runs/'+a.run+')\n':'[PR checks]('+p.html_url+'/checks)\n')+'Publisher review required. No merge or code change was performed.';
  api([endpoint,'-X','POST','-f','body='+body]);
  item.delivery='COMMENT_DELIVERED';
 }catch(e){
  item.delivery='NOT_DELIVERED';
  item.error=String(e.stderr?.toString()||e.message).slice(0,600);
 }
}
fs.writeFileSync('publication-alert-delivery.json',JSON.stringify(delivery,null,2));
const lines=['## Publication alert delivery',...delivery.results.map(x=>'- #'+x.number+' '+x.kind+': **'+x.delivery+'**'+(x.error?' ('+x.error.replace(/\n/g,' ').replace(/\\r/g,' ')+')':''))];
if(!delivery.results.length)lines.push('- No new actionable alerts');
if(summary)fs.appendFileSync(summary,lines.join('\n')+'\n');
console.log(JSON.stringify(delivery,null,2));
if(delivery.results.some(x=>x.delivery==='NOT_DELIVERED'))console.error('Alert delivery unavailable; no notification delivery is claimed. Review publication-alert-delivery artifact.');
