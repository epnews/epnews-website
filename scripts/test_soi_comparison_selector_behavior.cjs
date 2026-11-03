'use strict';
const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
class Node{
 constructor(tag='div'){this.tag=tag;this.children=[];this.attributes={};this.listeners={};this.style={};this.textContent='';this.parentNode=null;this.value='';}
 append(...nodes){for(const n of nodes){this.children.push(n);if(n&&typeof n==='object')n.parentNode=this;}return this;}
 replaceChildren(...nodes){this.children=[];this.textContent='';this.append(...nodes);}
 insertBefore(node,before){const i=this.children.indexOf(before);this.children.splice(i<0?this.children.length:i,0,node);node.parentNode=this;}
 setAttribute(k,v){this.attributes[k]=v;}
 addEventListener(k,fn){this.listeners[k]=fn;}
 dispatch(k){assert.ok(this.listeners[k],k+' listener');this.listeners[k]();}
 get text(){return this.textContent+' '+this.children.map(x=>x.text||x.textContent||'').join(' ');}
}
const parent=new Node('section'),host=new Node('div');parent.append(host);
const a=new Node('select'),b=new Node('select'),dim=new Node('select');a.value='us';b.value='china';dim.value='All dimensions';
const elements={'chaos-comparison-table':host,'chaos-compare-a':a,'chaos-compare-b':b,'chaos-compare-dimension':dim};
const document={readyState:'complete',getElementById:id=>elements[id],createElement:tag=>new Node(tag),createElementNS:(ns,tag)=>new Node(tag),addEventListener:()=>{}};
const context={document,window:{},fetch:()=>Promise.reject(new Error('offline fixture'))};
vm.runInNewContext(fs.readFileSync('chaos-meter-data.js','utf8'),context);
vm.runInNewContext(fs.readFileSync('soi-comparison-visual.js','utf8'),context);
const visual=parent.children.find(n=>n.id==='chaos-comparison-visual');
assert.ok(visual,'visual inserted');
function check(dimension,expected){dim.value=dimension;dim.dispatch('change');assert.match(visual.text,expected,dimension+' content');}
check('All dimensions',/2025 real GDP growth/);
assert.match(visual.text,/2025 real military spending change/);assert.match(visual.text,/2024 net energy imports/);
check('Economic',/2025 real GDP growth/);assert.match(visual.text,/Difference/);
check('Strategic',/2025 real military spending change/);assert.match(visual.text,/SIPRI/);
check('Energy and resources',/2024 net energy imports/);assert.match(visual.text,/World Bank source data/);
a.value='eu';a.dispatch('change');assert.match(visual.text,/Modeled Eurostat/);
a.value='china';b.value='china';b.dispatch('change');assert.match(visual.text,/Choose two different spheres/);
b.value='india';b.dispatch('change');assert.match(visual.text,/2024 net energy imports/);
assert.ok(parent.children.some(n=>n.tag==='details'),'evidence archive remains present');
console.log('Comparison selector behavior smoke test passed');
