import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {chromium} from 'playwright';
import {createHash} from 'node:crypto';
const slug=process.argv[2];
assert(/^[a-z0-9-]{1,120}$/.test(slug||''),'Invalid slug');
const context={STORIES:[]};
vm.runInNewContext(readFileSync('content/'+slug+'.js','utf8'),context,{timeout:1000});
const story=context.STORIES.find(s=>s.id===slug&&s.status==='published');
assert(story,'Published story missing');
const base='https://epnews.pages.dev';
const norm=s=>String(s).normalize('NFKC').replace(/\s+/g,' ').trim();
const normalize=s=>s.replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/&#8211;|&ndash;/g,'–').replace(/&#8217;|&rsquo;/g,'’');
async function get(path){const r=await fetch(base+path,{signal:AbortSignal.timeout(15000),cache:'no-store'});assert.equal(r.status,200,path+' HTTP '+r.status);return r;}
async function verify(){
 const browser=await chromium.launch();
 let article;
 try{
  const page=await browser.newPage();
  const response=await page.goto(base+'/article/'+slug,{waitUntil:'domcontentloaded',timeout:30000});
  assert(response?.ok(),'Article route failed');
  await page.getByText(story.title,{exact:true}).first().waitFor({state:'visible',timeout:15000});
  article=norm(await page.locator('body').innerText());
 }finally{await browser.close();}
 const share=normalize(await (await get('/share/'+slug)).text());
 assert(article.includes(norm(story.title)),'Article title missing');
 assert(story.body.length&&story.body.every(p=>{const t=typeof p==='string'?p:p.text??p.content;return typeof t==='string'&&norm(t).length>0&&article.includes(norm(t));}),'Article body missing or incomplete');
 assert(share.includes(story.title)&&share.includes('og:image')&&share.includes(story.image.src),'Share metadata mismatch');
 const image=await get('/'+story.image.src);
 assert(/^image\//.test(image.headers.get('content-type')||''),'Hero is not an image');
 const hash=b=>createHash('sha256').update(b).digest('hex');
 assert.equal(hash(Buffer.from(await image.arrayBuffer())),hash(readFileSync(story.image.src)),'Hero hash mismatch');
 const home=await (await get('/')).text();
 assert(home.includes('content/'+slug+'.js'),'Homepage registration missing');
 console.log('LIVE VERIFIED '+slug);
}
// Wait for the exact merged article asset, not merely an HTTP 200 from the SPA fallback.
// GitHub push events can precede the Cloudflare Pages production deployment.
async function waitForProductionAsset(){
 const expected=readFileSync('content/'+slug+'.js','utf8');
 const url=base+'/content/'+slug+'.js';
 const deadline=Date.now()+10*60*1000;
 let last='not checked';
 for(let attempt=1;Date.now()<deadline;attempt++){
  try{
   const response=await fetch(url+'?ep_verify='+Date.now(),{cache:'no-store',signal:AbortSignal.timeout(15000)});
   const actual=await response.text();
   if(response.ok&&actual===expected){
    console.log('DEPLOYMENT READY '+slug+' (exact article asset matches repository)');
    return;
   }
   last='HTTP '+response.status+', bytes '+actual.length+'/'+expected.length+', exactMatch='+String(actual===expected);
  }catch(e){last=String(e);}
  console.log('Waiting for Cloudflare production asset, attempt '+attempt+': '+last);
  await new Promise(resolve=>setTimeout(resolve,15000));
 }
 throw Error('Cloudflare deployment not ready after 10 minutes: '+url+'; last observation: '+last);
}
await waitForProductionAsset();
for(let attempt=1;attempt<=6;attempt++){try{await verify();break;}catch(e){console.error('Attempt '+attempt+': '+e.message);if(attempt===6)throw e;await new Promise(r=>setTimeout(r,20000));}}
