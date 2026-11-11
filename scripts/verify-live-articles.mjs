import fs from 'node:fs';
const base='https://epnews.pages.dev';
const index=fs.readFileSync('index.html','utf8');
const paths=[...index.matchAll(/<script\b[^>]*\bsrc=["'](content\/[^"']+\.js)["']/g)].map(m=>m[1]);
const stories=[];
for(const p of paths){
  if(!fs.existsSync(p))continue;
  const source=fs.readFileSync(p,'utf8');
  const id=[...source.matchAll(/\bid\s*:\s*["']([a-z0-9-]+)["']/g)];
  if(id.length!==1)continue;
  const published=source.match(/\bpublishedAt\s*:\s*["'](\d{4}-\d\d-\d\d)["']/)?.[1];
  const status=source.match(/\bstatus\s*:\s*["']published["']/);
  const image=source.match(/\bimage\s*:\s*\{[^}]*?\bsrc\s*:\s*["']([^"']+)["']/s)?.[1];
  if(published&&status&&image)stories.push({id:id[0][1],published,image});
}
stories.sort((a,b)=>b.published.localeCompare(a.published));
const recent=stories.slice(0,3);
if(!recent.length)throw Error('No recent published articles found for live verification');
const checks=[{url:base+'/',kind:'homepage'}];
for(const s of recent){
  checks.push({url:base+'/article/'+s.id,kind:'article'});
  checks.push({url:base+'/share/'+s.id,kind:'share'});
  checks.push({url:base+'/'+s.image,kind:'image'});
}
for(const check of checks){
  let ok=false,last='';
  for(let i=0;i<3;i++){
    try{
      const res=await fetch(check.url,{redirect:'follow',signal:AbortSignal.timeout(15000)});
      const type=res.headers.get('content-type')||'';
      const body=check.kind==='image'?'':await res.text();
      ok=res.ok && (check.kind==='image'?type.startsWith('image/'):body.length>300 && !/404 Not Found/i.test(body.slice(0,200)));
      last='HTTP '+res.status+', content-type '+type;
      if(ok)break;
    }catch(e){last=String(e);}
    await new Promise(resolve=>setTimeout(resolve,5000));
  }
  console.log((ok?'PASS':'FAIL')+' '+check.kind+' '+check.url+' '+last);
  if(!ok)process.exitCode=1;
}
