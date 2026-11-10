// EP News deployed-site smoke test. Read-only; no third-party packages.
const ORIGIN='https://epnews.pages.dev';
const SLUGS=['panama-ports-20261105','schumer-leadership-challenge-20261109','senate-energy-permitting-20261110','china-port-technology-20261110'];
const failures=[];
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function get(url){
 let last;
 for(let attempt=0;attempt<3;attempt++){
  try {
   const res=await fetch(url,{signal:AbortSignal.timeout(15000),headers:{'user-agent':'EPNews-LiveSmoke/1.0'}});
   if(res.status===429||res.status>=500)throw Error('HTTP '+res.status);
   return res;
  }catch(e){last=e;if(attempt<2)await sleep(12000);}
 }
 throw Error(url+': '+last.message);
}
function meta(html,tag,key,value){
 const tags=html.match(new RegExp('<'+tag+'\\b[^>]*>','gi'))||[];
 for(const line of tags){
  const attrs=Object.fromEntries([...line.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)].map(m=>[m[1].toLowerCase(),m[3]]));
  if(attrs[key]===value)return attrs;
 }
 return null;
}
async function check(slug){
 const url=ORIGIN+'/article/'+slug;
 const res=await get(url);
 if(!res.ok)throw Error('Article HTTP '+res.status);
 if(!(res.headers.get('content-type')||'').includes('text/html'))throw Error('Article response not HTML');
 const html=await res.text();
 const title=html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
 if(!title||title==='Epic Perspective News | EP News')throw Error('Article-specific HTML title missing');
 const canonical=meta(html,'link','rel','canonical')?.href;
 if(canonical!==url)throw Error('canonical mismatch: '+canonical);
 const ogUrl=meta(html,'meta','property','og:url')?.content;
 if(ogUrl!==url)throw Error('og:url mismatch: '+ogUrl);
 for(const key of ['og:title','og:description'])if(!meta(html,'meta','property',key)?.content)throw Error(key+' missing');
 const image=meta(html,'meta','property','og:image')?.content;
 if(!image||!image.startsWith(ORIGIN+'/'))throw Error('Invalid og:image '+image);
 const photo=await get(image);
 if(!photo.ok)throw Error('Image HTTP '+photo.status);
 if(!(photo.headers.get('content-type')||'').startsWith('image/'))throw Error('Image response is not an image');
 console.log('PASS '+slug+' — metadata and image available');
}
async function main(){
 try{
  const res=await get(ORIGIN+'/sitemap.xml');
  if(!res.ok||!(await res.text()).includes('<urlset'))failures.push('sitemap.xml failed');
 }catch(e){failures.push('sitemap.xml: '+e.message);}
 for(const slug of SLUGS){
  try{await check(slug);}catch(e){failures.push(slug+': '+e.message);console.error('FAIL '+slug+': '+e.message);}
 }
 if(failures.length){console.error('Live audit failures:\\n'+failures.join('\\n'));process.exitCode=1;}
 else console.log('PASS: sitemap and '+SLUGS.length+' deployed articles, metadata and images');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
