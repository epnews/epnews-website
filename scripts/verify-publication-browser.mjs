import fs from 'node:fs';
import vm from 'node:vm';
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
const origin='https://epnews.pages.dev';
const slugs=process.argv.slice(2);
const norm=s=>String(s??'').normalize('NFKC').replace(/\s+/g,' ').trim();
const hash=b=>createHash('sha256').update(b).digest('hex');
fs.mkdirSync('publication-visual',{recursive:true});
const report=[];
const browser=await chromium.launch();
try {
 for(const slug of slugs){
  if(!/^[a-z0-9-]+$/.test(slug))throw Error('Invalid slug');
  const sandbox={STORIES:[]};
  vm.runInNewContext(fs.readFileSync('content/'+slug+'.js','utf8'),sandbox,{timeout:1000});
  const story=sandbox.STORIES.find(s=>s.id===slug&&s.status==='published');
  if(!story)continue;
  const url=origin+'/article/'+slug;
  for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
   const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
   const page=await context.newPage();
   const entry={slug,viewport:name,url,attempts:[]};
   for(let attempt=1;attempt<=5;attempt++){
    try{
     const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
     await page.getByText(story.title,{exact:true}).first().waitFor({state:'visible',timeout:15000});
     await page.evaluate(async()=>{await document.fonts.ready;});
     const actual=await page.evaluate(()=>({text:document.body.innerText,canonical:document.querySelector('link[rel=canonical]')?.href,meta:Object.fromEntries([...document.querySelectorAll('meta[property^="og:"]')].map(x=>[x.getAttribute('property'),x.content])),width:document.documentElement.scrollWidth}));
     const imageUrl=new URL(story.image.src,origin+'/').href;
     const image=page.locator('img').filter({visible:true});
     let found=false;
     for(const el of await image.all()){
      if(await el.evaluate((e,u)=>e.src===u||e.currentSrc===u,imageUrl)){
       await el.scrollIntoViewIfNeeded();
       await el.evaluate(e=>e.decode());
       found=await el.evaluate(e=>e.naturalWidth>0&&e.naturalHeight>0);
       if(found)break;
      }
     }
     const photo=await context.request.get(imageUrl);
     const share=await context.request.get(origin+'/share/'+slug);
     const shareHtml=await share.text();
     const checks={http:response?.ok()===true,headline:norm(actual.text).includes(norm(story.title)),body:story.body.every(p=>norm(actual.text).includes(norm(typeof p==='string'?p:p.text??p.content??''))),graphic:found&&photo.ok()&&hash(await photo.body())===hash(fs.readFileSync(story.image.src)),canonical:actual.canonical===url,ogTitle:!!actual.meta['og:title']&&norm(actual.meta['og:title']).includes(norm(story.title)),ogImage:actual.meta['og:image']===imageUrl,share:share.ok()&&shareHtml.includes('og:image')&&shareHtml.includes(slug),overflow:actual.width<=width+8};
     entry.attempts.push({attempt,checks,status:response?.status()});
     await page.evaluate(()=>window.scrollTo(0,0));
     await page.screenshot({path:'publication-visual/'+slug+'-'+name+'.png',fullPage:true,timeout:30000});
     if(Object.values(checks).every(Boolean)){entry.passed=true;break;}
    }catch(e){entry.attempts.push({attempt,error:String(e)});try{await page.screenshot({path:'publication-visual/'+slug+'-'+name+'.png',fullPage:true,timeout:10000});}catch{}}
    if(attempt<5)await new Promise(r=>setTimeout(r,20000));
   }
   report.push(entry);
   await context.close();
  }
 }
}finally{await browser.close();fs.writeFileSync('publication-visual/report.json',JSON.stringify(report,null,2));}
console.log(JSON.stringify(report,null,2));
if(!report.length||report.some(r=>!r.passed))process.exitCode=1;
