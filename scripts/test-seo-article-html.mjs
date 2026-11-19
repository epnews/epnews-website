import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {onRequestGet} from '../functions/article/[slug].js';

const origin='https://epnews.pages.dev';
const homepage=await fs.readFile('index.html','utf8');
const examples=['ai-chip-contradiction-20261116','canada-china-steel-tariffs-20261117'];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const slug of examples){
 const source=await fs.readFile('content/'+slug+'.js','utf8');
 const sandbox={STORIES:[]};vm.runInNewContext(source,sandbox,{timeout:2000});
 const story=sandbox.STORIES.find(s=>s.id===slug);
 assert.ok(story&&story.status==='published','Published story exists: '+slug);
 const meta='<!doctype html><html><head><title>'+esc(story.title)+'</title><meta name="description" content="'+esc(story.deck)+'"><meta property="og:title" content="'+esc(story.title)+'"><meta property="og:image" content="'+origin+'/'+story.image.src+'"></head><body></body></html>';
 const env={ASSETS:{fetch:async url=>{
  const path=new URL(url).pathname;
  if(path==='/index.html')return new Response(homepage,{status:200});
  if(path==='/content/'+slug+'.js')return new Response(source,{status:200});
  return new Response('missing',{status:404});
 }}};
 // The article function delegates metadata to the share handler, which uses
 // the same mock ASSETS. Stub the share index for legacy metadata lookup.
 const index={};index[slug]={title:story.title,deck:story.deck,image:story.image.src};
 const original=env.ASSETS.fetch;
 env.ASSETS.fetch=async url=>new URL(url).pathname==='/content/share-index.json'?new Response(JSON.stringify(index),{status:200}):original(url);
 const response=await onRequestGet({params:{slug},env,request:new Request(origin+'/article/'+slug)});
 assert.equal(response.status,200);
 const html=await response.text();
 assert.match(html,/<template id="ep-home-template">/);
 assert.match(html,/<article class="article-shell" data-ssr-article=/);
 assert.match(html,/<h1>/);
 assert.ok(html.includes(esc(story.body[0])),'First paragraph present in initial HTML');
 assert.ok(html.includes(esc(story.body.at(-1))),'Last paragraph present in initial HTML');
 assert.ok(html.includes('<link rel="canonical" href="'+origin+'/article/'+slug+'">'));
 assert.ok(html.includes('document.getElementById("ep-home-template").replaceWith'),'SPA restoration exists');
 assert.ok(!html.includes('<main id="home-view">'),'Homepage main is not live initial HTML');
 console.log('PASS crawlable HTML: '+slug+' ('+story.body.length+' paragraphs)');
}
