import {createHash} from 'node:crypto';
export function alertFor(r){
 if(!r.head||!Number.isInteger(r.number))return null;
 const d=r.deployment?.status;
 const kind=r.status==='MERGED'&&d==='BROWSER_RUN_FAILED'?'PRODUCTION_BROWSER_FAILED':r.status==='BLOCKED'?'CHECKS_BLOCKED':null;
 if(!kind)return null;
 const key=createHash('sha256').update(JSON.stringify([r.number,r.head,kind,r.mergeCommit,d,r.deployment?.runId])).digest('hex');
 return {kind,key,number:r.number,head:r.head,merge:r.mergeCommit,run:r.deployment?.runId};
}
export function alreadySent(comments,key){return comments.some(c=>c.user?.login==='github-actions[bot]'&&c.body?.includes('<!-- epnews-alert:'+key+' -->'));}
