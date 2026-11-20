export function deploymentEvidence(runs,sha,rechecks=[],slugs=[]){
 const matching=runs.filter(r=>r.head_sha===sha&&r.event==='push'&&r.name==='EP News browser publication verification').sort((a,b)=>b.id-a.id);
 const r=matching[0];
 const baseline=r?{status:r.status!=='completed'?'RUNNING':r.conclusion==='success'?'BROWSER_RUN_PASSED':r.conclusion==='failure'?'BROWSER_RUN_FAILED':'UNVERIFIED',runId:r.id,url:r.html_url}:{status:'UNVERIFIED'};
 if(baseline.status!=='BROWSER_RUN_FAILED'||!slugs.length)return baseline;
 const verified=rechecks.filter(x=>x.id>r.id&&x.ancestorVerified===true&&x.status==='completed'&&x.conclusion==='success'&&slugs.every(slug=>['desktop','mobile'].every(viewport=>x.report?.some(e=>e.slug===slug&&e.viewport===viewport&&e.passed===true&&e.attempts?.some(a=>a.checks&&Object.values(a.checks).every(v=>v===true)))))).sort((a,b)=>b.id-a.id)[0];
 return verified?{status:'BROWSER_RECHECK_PASSED',runId:verified.id,url:verified.html_url,originalFailureRunId:r.id,verifiedSlugs:slugs}:baseline;
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
