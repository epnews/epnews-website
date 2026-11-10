// EP News single-article preflight. Run: node scripts/preflight-article.mjs content/slug.js
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root=process.cwd();
const errors=[];
const fail=x=>errors.push(x);
const exists=p=>fs.existsSync(path.join(root,p))&&fs.statSync(path.join(root,p)).isFile();
const article=process.argv[2];
if(!article||!/^content\/[a-z0-9-]+\.js$/.test(article)||!exists(article)){console.error('Usage: node scripts/preflight-article.mjs content/slug.js');process.exit(2);}
const src=fs.readFileSync(article,'utf8');
const syntax=spawnSync(process.execPath,['--check',article],{encoding:'utf8'});
if(syntax.status!==0)fail('JavaScript syntax invalid: '+(syntax.stderr||syntax.stdout||'node --check failed').trim());
const slug=path.basename(article,'.js');
const field=name=>new RegExp('(?:["\\x27]?'+name+'["\\x27]?)\\s*:\\s*["\\x27]([^"\\x27]+)["\\x27]').exec(src)?.[1];
const id=field('id');
if(id!==slug)fail('Article id must equal filename slug');
if(field('status')!=='published')fail('Missing published status');
for(const name of ['title','deck','publishedAt'])if(!field(name))fail('Missing '+name);
const image=src.match(/\bimage\s*:\s*\{[^}]*?\bsrc\s*:\s*["']([^"']+)["']/s)?.[1];
if(!image)fail('Missing image.src with supported unquoted property keys');
else {
 if(!/^assets\/images\/[a-zA-Z0-9_.-]+\.(png|jpe?g|webp)$/i.test(image))fail('Hero image must be a local raster asset');
 else {
  const manifest=JSON.parse(fs.readFileSync('content/image-imports.json','utf8'));
  if(!manifest.some(x=>x.path===image&&/^https:\/\/drive\.google\.com\/uc\?/.test(x.url)&&/[?&]id=/.test(x.url)))fail('Image missing from Google Drive import manifest');
  if(!exists(image))fail('Image not yet imported into GitHub: '+image);
 }
}
const index=fs.readFileSync('index.html','utf8');
if(!index.includes('src="'+article+'"')&&!index.includes("src='"+article+"'"))fail('Article script missing from index.html');
const sitemap=fs.readFileSync('sitemap.xml','utf8');
if(!sitemap.includes('https://epnews.pages.dev/article/'+slug+'</loc>'))fail('Article missing from sitemap.xml');
if(!/\bsources\s*:|["']sources["']\s*:/.test(src))fail('Missing sources field');
if(errors.length){console.error('EP News article preflight FAILED:\n'+errors.map(e=>' - '+e).join('\n'));process.exit(1);}
console.log('EP News article preflight PASSED: '+slug);
