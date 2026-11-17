import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const slug=process.argv[2];
assert(/^[a-z0-9-]{1,120}$/.test(slug||''),'Invalid slug');
const context={STORIES:[]};
vm.runInNewContext(readFileSync('content/'+slug+'.js','utf8'),context,{timeout:1000});
const story=context.STORIES.find(s=>s.id===slug&&s.status==='published');
assert(story,'Published story missing');
const base='https://epnews.pages.dev';
const normalize=s=>s.replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/&#8211;|&ndash;/g,'–').replace(/&#8217;|&rsquo;/g,'’');
async function get(path){const r=await fetch(base+path,{signal:AbortSignal.timeout(15000),cache:'no-store'});assert.equal(r.status,200,path+' HTTP '+r.status);return r;}
async function verify(){
 const article=normalize(await (await get('/article/'+slug)).text());
 const share=normalize(await (await get('/share/'+slug)).text());
 assert(article.includes(story.title),'Article title missing');
 assert(article.includes(story.body[0].slice(0,80)),'Article body missing');
 assert(share.includes(story.title)&&share.includes('og:image')&&share.includes(story.image.src),'Share metadata mismatch');
 const image=await get('/'+story.image.src);
 assert(/^image\//.test(image.headers.get('content-type')||''),'Hero is not an image');
 assert((await image.arrayBuffer()).byteLength>0,'Empty image');
 const home=await (await get('/')).text();
 assert(home.includes('content/'+slug+'.js'),'Homepage registration missing');
 console.log('LIVE VERIFIED '+slug);
}
for(let attempt=1;attempt<=6;attempt++){try{await verify();break;}catch(e){console.error('Attempt '+attempt+': '+e.message);if(attempt===6)throw e;await new Promise(r=>setTimeout(r,20000));}}
