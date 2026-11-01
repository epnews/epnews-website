const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const viewport of [{width:1365,height:900},{width:390,height:844}]){
   const page=await browser.newPage({viewport});
   const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(process.env.EPNEWS_TEST_URL||'http://127.0.0.1:8765/',{waitUntil:'domcontentloaded',timeout:45000});
   await page.locator('#chaos-hub > summary').click();
   await page.locator('#chaos-dashboard').waitFor({state:'visible'});
   await page.locator('#chaos-meter').waitFor({state:'visible'});
   assert.equal(await page.locator('.chaos-research-drawer').evaluate(el=>el.open),false,'Research drawer should start collapsed');
   await page.locator('.chaos-research-drawer > summary').click();
   await page.locator('#chaos-completion-status').waitFor({state:'visible'});
   assert.match(await page.locator('#chaos-completion-status').innerText(),/Technical readiness: 90%/);
   assert.equal(await page.locator('.chaos-completion-gate').count(),4);
   await page.locator('.chaos-completion-gate').first().locator('summary').click();
   assert.ok(await page.locator('.chaos-completion-gate').first().locator('li').count()>=2);
   assert.ok(await page.locator('#chaos-sphere option').count()>=5);
   for (const country of ['china','russia','india']) {
    await page.locator('#chaos-sphere').selectOption(country);
    await page.locator('#chaos-dimension').selectOption('Diplomatic');
    assert.equal(await page.locator('#chaos-meter').getAttribute('data-state'),'observed',country+' diplomatic needle should be active');
    assert.ok((await page.locator('#chaos-needle-note').innerText()).length>25);
   }
   await page.locator('#chaos-sphere').selectOption('china');
   await page.locator('#chaos-dimension').selectOption('Energy and resources');
   assert.equal(await page.locator('#chaos-meter').getAttribute('data-state'),'observed');
   assert.match(await page.locator('#chaos-needle-note').innerText(),/matched consecutive quarters/);
   await page.locator('#chaos-sphere').selectOption('us');
   await page.locator('#chaos-dimension').selectOption('Diplomatic');
   assert.equal(await page.locator('#chaos-meter').getAttribute('data-state'),'observed');
   assert.match(await page.locator('#chaos-needle-note').innerText(),/NATO member-country change/);
   await page.locator('#chaos-sphere').selectOption('eu');
   await page.locator('#chaos-dimension').selectOption('Strategic');
   assert.equal(await page.locator('#chaos-meter').getAttribute('data-state'),'observed');
   await page.locator('#chaos-dimension').selectOption('Energy and resources');
   assert.equal(await page.locator('#chaos-meter').getAttribute('data-state'),'observed');
   assert.match(await page.locator('#chaos-needle-note').innerText(),/−33 percentage-point needle/);
   await page.locator('#chaos-dimension').selectOption('Diplomatic');
   assert.equal(await page.locator('#chaos-meter').getAttribute('data-state'),'observed');
   assert.match(await page.locator('#chaos-needle-note').innerText(),/NOT the FTA's causal effect/);
   await page.locator('#chaos-sphere').selectOption('china');
   await page.locator('#chaos-dimension').selectOption('Energy and resources');
   assert.equal(await page.locator('#chaos-meter').getAttribute('data-state'),'observed');
   assert.match(await page.locator('#chaos-needle-note').innerText(),/matched consecutive quarters/);
   await page.locator('#chaos-sphere').selectOption('russia');
   assert.equal(await page.locator('#chaos-meter').getAttribute('data-state'),'observed');
   assert.match(await page.locator('#chaos-needle-note').innerText(),/MODEL-ESTIMATED/);
   await page.locator('#chaos-sphere').selectOption('india');
   await page.locator('#chaos-dimension').selectOption('Energy and resources');
   assert.equal(await page.locator('#chaos-meter').getAttribute('data-state'),'observed');
   assert.match(await page.locator('#chaos-needle-note').innerText(),/provisional/);
   await page.locator('#chaos-sphere').selectOption('us');
   await page.locator('#chaos-dimension').selectOption('Energy and resources');
   await page.locator('#chaos-meter').waitFor({state:'visible'});
   assert.ok(await page.locator('#chaos-needle-group').count());
   assert.ok(await page.locator('[id^="chaos-evidence-"]').count()>=20,'Evidence tables missing');
   assert.equal(await page.locator('.chaos-exploration-drawer').evaluate(el=>el.open),false,'Comparisons should start collapsed');
   await page.locator('.chaos-exploration-drawer > summary').click();
   assert.ok(await page.locator('#chaos-compare-a option').count()>=2);
   await page.locator('#chaos-compare-a').selectOption('us');
   await page.locator('#chaos-compare-b').selectOption('eu');
   assert.ok(await page.locator('#chaos-comparison-result').count());
   assert.ok(await page.locator('#chaos-comparison-table').count());
   assert.equal(errors.length,0,'JavaScript errors: '+errors.join('; '));
   const width=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(width.document<=width.viewport+4,'Horizontal page overflow at '+viewport.width+': '+JSON.stringify(width));
   await page.close();
  }
 }finally{await browser.close();}
 console.log('Desktop and mobile meter smoke tests passed');
})().catch(e=>{console.error(e);process.exitCode=1;});
