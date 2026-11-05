#!/usr/bin/env node
// Enforce Facebook preview support for every newly published or updated EP News article.
const fs=require('fs'),path=require('path'),cp=require('child_process');
const assert=(ok,message)=>{if(!ok)throw Error(message)};
const index=fs.readFileSync('index.html','utf8');
const modules=[...index.matchAll(/<script[^>]+src="(content\/[a-z0-9-]+\.js)"/g)].map(m=>m[1]);
const share=fs.readFileSync('functions/share/[slug].js','utf8');
const base=process.env.GITHUB_BASE_REF||'main';
const changed=cp.execFileSync('git',['diff','--name-only','origin/'+base+'...HEAD'],{encoding:'utf8'}).trim().split('\n');
assert(share.includes("'/share/'")||share.includes("+'/share/'"),'Facebook share URL route missing');
assert(share.includes('og:image')&&share.includes('og:title')&&share.includes('og:description'),'Missing required Open Graph tags');
const contentFiles=changed.filter(p=>/^content\/[a-z0-9-]+\.js$/.test(p)&&p!=='content/editorial.js');
for(const file of contentFiles){
  const text=fs.readFileSync(file,'utf8');
  if(!/status\s*:\s*['"]published['"]|["']status["']\s*:\s*["']published["']/.test(text))continue;
  assert(modules.includes(file),file+': published story module is not loaded by homepage and cannot be shared');
  assert(/(?:["']id["']|\bid)\s*:\s*["'][a-z0-9-]+["']/.test(text)||file==='content/chaos-investigation.js',file+': missing shareable article ID');
  assert(/(?:["']title["']|\btitle)\s*:\s*["']/.test(text),file+': missing article title');
  assert(/(?:["']deck["']|\bdeck)\s*:\s*["']/.test(text),file+': missing Facebook preview description');
  assert(/(?:["']image["']|\bimage)\s*:\s*\{/.test(text),file+': missing preview image');
}
assert(fs.existsSync('assets/images/chaos-flagship-hero-approved-20261031.jpg'),'Approved flagship preview graphic missing');
assert(share.includes("id==='power'"),'Flagship sharing exception missing');
console.log('Facebook share publishing checks passed ('+contentFiles.length+' changed content modules).');
