// Validate article discovery consistency across all scripts loaded by the homepage.
import fs from 'node:fs';
import path from 'node:path';
const errors=[];
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const isFile=p=>fs.existsSync(path.join(root,p))&&fs.statSync(path.join(root,p)).isFile();
const page=read('index.html'),site=read('sitemap.xml');
const scripts=[...page.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)]
 .map(m=>m[1].split('?')[0].replace(/^\//,'')).filter(p=>p.startsWith('content/')&&p.endsWith('.js'));
const registered=new Map(),imagePaths=new Set();
for(const file of scripts){
 if(!isFile(file)){errors.push('Missing loaded script: '+file);continue;}
 const source=read(file);
 // Match both quoted and unquoted id keys; keep legacy multi-story files.
 for(const m of source.matchAll(/(?:["']id["']|\bid)\s*:\s*["']([a-z0-9-]+)["']/g)){
  const id=m[1];
  if(registered.has(id))errors.push('Duplicate article ID '+id+' in '+file+' and '+registered.get(id));
  else registered.set(id,file);
 }
 // Only check declared local image assets; remote imagery needs runtime verification.
 for(const m of source.matchAll(/\bsrc\s*:\s*["']([^"']+)["']/g)){
  const asset=m[1].split('?')[0];
  if(!/^(?:https?:|data:|\/\/)/i.test(asset))imagePaths.add(asset.replace(/^\//,''));
 }
}
const sitemapIds=[...site.matchAll(/<loc>https:\/\/epnews\.pages\.dev\/article\/([^<]+)<\/loc>/g)].map(m=>m[1]);
const sitemapSet=new Set(sitemapIds);
for(const id of sitemapIds){
 if(!registered.has(id))errors.push('Sitemap article not registered in index scripts: '+id);
}
for(const [id,file] of registered){
 if(!sitemapSet.has(id))errors.push('Registered article missing from sitemap: '+id+' ('+file+')');
}
if(sitemapSet.size!==sitemapIds.length)errors.push('Duplicate article URL in sitemap');
for(const asset of imagePaths)if(!isFile(asset))errors.push('Referenced local story image missing: '+asset);
if(errors.length){
 console.error('All-article integrity audit FAILED:\n'+errors.map(x=>' - '+x).join('\n'));
 process.exit(1);
}
console.log('All-article integrity audit passed: '+registered.size+' IDs, '+sitemapIds.length+' article sitemap URLs, '+imagePaths.size+' local images.');
