import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {alertFor,alreadySent} from './publication-alerts.mjs';
const repo=process.env.REPO;
const api=(args)=>JSON.parse(execFileSync('gh',['api',...args],{encoding:'utf8',maxBuffer:32*1024*1024}));
const report=JSON.parse(fs.readFileSync('publication-state.json','utf8'));
for(const r of report.records){
 const a=alertFor(r);if(!a)continue;
 const p=api(['repos/'+repo+'/pulls/'+a.number]);
 if(p.head.sha!==a.head||p.draft||p.head.repo?.full_name!==repo)continue;
 if(a.kind==='CHECKS_BLOCKED'&&(p.state!=='open'||p.merged))continue;
 if(a.kind==='PRODUCTION_BROWSER_FAILED'&&(!p.merged||p.merge_commit_sha!==a.merge))continue;
 const endpoint='repos/'+repo+'/issues/'+a.number+'/comments';
 const comments=api([endpoint+'?per_page=100','--paginate','--slurp']).flat();
 if(alreadySent(comments,a.key))continue;
 const body='<!-- epnews-alert:'+a.key+' -->\n**EP News monitoring: '+a.kind+'**\nExact head: `'+a.head+'`\n'+(a.run?'[Production verification run](https://github.com/'+repo+'/actions/runs/'+a.run+')\n':'[PR checks]('+p.html_url+'/checks)\n')+'Publisher review required. No merge or code change was performed.';
 api([endpoint,'-X','POST','-f','body='+body]);
}
