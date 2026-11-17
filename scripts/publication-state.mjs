export function classify(p, checks, required, preview) {
 if (!p || typeof p.merged !== 'boolean') return 'UNVERIFIED';
 if (p.merged) return 'MERGED';
 if (p.state === 'closed') return 'CLOSED';
 if (p.draft || !p.publication) return 'TEST/DO NOT MERGE';
 if (p.mergeable === false) return 'BLOCKED';
 if (p.mergeable !== true || !required?.length) return 'UNVERIFIED';
 const current=checks.filter(c=>c.head_sha===p.head.sha);
 const latest=new Map();
 for(const c of current.sort((a,b)=>a.id-b.id)) latest.set(c.name,c);
 const selected=required.map(n=>latest.get(n));
 if(selected.some(c=>c?.status==='completed' && c.conclusion!=='success')) return 'BLOCKED';
 if(selected.some(c=>!c || c.status!=='completed')) return 'RUNNING';
 return preview===true?'READY':'RUNNING';
}
