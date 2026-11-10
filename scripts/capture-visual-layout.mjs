import { chromium } from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('visual-audit',{recursive:true});
const browser=await chromium.launch({headless:true});
const pages=[
  {name:'desktop',width:1440,height:900},
  {name:'mobile',width:390,height:844}
];
const report=[];
for (const vp of pages){
  const context=await browser.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:1});
  const page=await context.newPage();
  for(const target of [
    {name:'home',url:'https://epnews.pages.dev/'},
    {name:'article',url:'https://epnews.pages.dev/article/senate-energy-permitting-20261110'}
  ]){
    const entry={viewport:vp.name,page:target.name,url:target.url};
    try {
      const response=await page.goto(target.url,{waitUntil:'domcontentloaded',timeout:30000});
      await page.waitForTimeout(2000);
      entry.status=response?.status();
      entry.title=await page.title();
      entry.measurements=await page.evaluate(()=>({
        viewportWidth:document.documentElement.clientWidth,
        bodyScrollWidth:document.body.scrollWidth,
        documentScrollWidth:document.documentElement.scrollWidth,
        masthead:document.querySelector('.epic-brand-art')?.getBoundingClientRect().toJSON(),
        nav:document.querySelector('#main-nav')?.getBoundingClientRect().toJSON()
      }));
      await page.screenshot({path:'visual-audit/'+vp.name+'-'+target.name+'.png',fullPage:false});
      if(target.name==='home'){
        const meter=page.locator('#chaos-meter');
        if(await meter.count()){
          await meter.evaluate(el=>{const d=el.closest('details');if(d)d.open=true;});
          await meter.scrollIntoViewIfNeeded();
          await page.waitForTimeout(700);
          await page.screenshot({path:'visual-audit/'+vp.name+'-meter.png',fullPage:false});
        }
      }
      if(entry.measurements.documentScrollWidth>vp.width+8)entry.warning='Horizontal document overflow detected';
      if(!response?.ok())entry.warning='Page returned non-success HTTP status';
    }catch(error){entry.error=String(error);}
    report.push(entry);
  }
  await context.close();
}
await browser.close();
fs.writeFileSync('visual-audit/report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(report.some(r=>r.error||r.status>=400))process.exitCode=1;
