import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import {onRequestPost} from '../functions/api/reading-engagement.js';
const code=fs.readFileSync('reading-engagement.js','utf8');
function harness(gpc=false){
 const storage=new Map(), sent=[], events={}, docEvents={};let clock=0,tick,focus=true,visible='visible',top=0;
 const node=()=>({children:[],style:{},append(...x){this.children.push(...x)}});
 const host=node(), body={getBoundingClientRect:()=>({top,bottom:top+2000,height:2000})};
 const document={readyState:'complete',body:host,createElement:node,querySelector:()=>body,hasFocus:()=>focus,get visibilityState(){return visible},get hidden(){return visible!=='visible'},addEventListener:(n,f)=>docEvents[n]=f};
 vm.runInNewContext(code,{document,navigator:{globalPrivacyControl:gpc},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},location:{pathname:'/article/test-story',search:'?utm_source=youtube&utm_content=test-angle'},URLSearchParams,crypto:{randomUUID:()=> '12345678-1234-4234-8234-123456789abc'},performance:{now:()=>clock},innerHeight:500,fetch:(u,o)=>{sent.push(JSON.parse(o.body));return Promise.resolve()},setInterval:f=>tick=f,addEventListener:(n,f)=>events[n]=f});
 const panel=host.children[0].children[1];
 return {sent,yes:panel.children[1],no:panel.children[2],advance(n){for(let i=0;i<n;i++){clock+=1000;tick()}},hide(){visible='hidden';docEvents.visibilitychange()},show(){visible='visible'},blur(){focus=false},scroll(){top=-1500},exit(){events.pagehide()}};
}
let h=harness();h.advance(40);h.exit();assert.equal(h.sent.length,0);
h.yes.onclick();h.advance(15);assert.equal(h.sent.at(-1).seconds,15);assert.equal(h.sent.at(-1).depth,25);assert.equal(h.sent.at(-1).source,'youtube');assert.equal(h.sent.at(-1).campaign,'test-angle');
h.hide();h.advance(30);h.show();h.scroll();h.advance(15);assert.equal(h.sent.at(-1).seconds,30);assert.equal(h.sent.at(-1).depth,100);
h.blur();h.advance(20);h.exit();assert.equal(h.sent.at(-1).seconds,30);
h.no.onclick();let count=h.sent.length;h.advance(40);h.exit();assert.equal(h.sent.length,count);
h=harness(true);assert.equal(h.yes.disabled,true);h.yes.onclick();h.advance(40);h.exit();assert.equal(h.sent.length,0);
const valid={id:'12345678-1234-4234-8234-123456789abc',slug:'test-story',source:'youtube',campaign:'test-angle',seconds:30,depth:100};
let writes=[];const db={prepare(sql){return {sql,bind(...args){this.args=args;return this}}},async batch(x){writes=x}};
async function post(data,headers={}){return (await onRequestPost({request:new Request('https://example.com/api/reading-engagement',{method:'POST',headers:{Origin:'https://example.com',...headers},body:JSON.stringify(data)}),env:{EP_VISITS_DB:db}})).status}
assert.equal(await post(valid),204);assert.equal(writes.length,4);assert.match(writes[3].sql,/ON CONFLICT\(id\) DO UPDATE/);assert.deepEqual(writes[3].args,[valid.id,valid.slug,valid.source,valid.campaign,30,100]);
assert.equal(await post({...valid,seconds:1801}),400);assert.equal(await post({...valid,depth:101}),400);assert.equal(await post({...valid,campaign:'diagnostic-test'}),204);assert.equal(await post(valid,{Origin:'https://other.example'}),403);writes=[];assert.equal(await post(valid,{'Sec-GPC':'1'}),204);assert.equal(writes.length,0);assert.equal(await post(valid,{DNT:'1'}),204);assert.equal(writes.length,0);
console.log('Reading engagement consent, visibility, depth and API contract passed');
