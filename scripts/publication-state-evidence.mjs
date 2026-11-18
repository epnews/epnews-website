export function deploymentEvidence(runs,sha){
 const matching=runs.filter(r=>r.head_sha===sha&&r.event==='push'&&r.name==='EP News browser publication verification').sort((a,b)=>b.id-a.id);
 const r=matching[0];
 if(!r)return {status:'UNVERIFIED'};
 return {status:r.status!=='completed'?'RUNNING':r.conclusion==='success'?'BROWSER_RUN_PASSED':r.conclusion==='failure'?'BROWSER_RUN_FAILED':'UNVERIFIED',runId:r.id,url:r.html_url};
}
export function transitionKey(r){return JSON.stringify([r.number,r.head,r.status,r.mergeCommit,r.deployment?.status,r.deployment?.runId]);}
export function changes(previous,current){
 const old=new Map(previous.map(r=>[r.number,transitionKey(r)]));
 return current.filter(r=>old.get(r.number)!==transitionKey(r)&&['MERGED','BLOCKED','READY','CLOSED'].includes(r.status));
}

export function publicationSlugs(files){
 const paths=new Set(files.map(f=>f.filename));
 return [...paths].filter(p=>/^content\/[a-z0-9-]+\.js$/.test(p)).map(p=>p.slice(8,-3)).filter(slug=>paths.has('editorial-evidence/'+slug+'.json')||paths.has('publication-intake/'+slug+'.json'));
}
