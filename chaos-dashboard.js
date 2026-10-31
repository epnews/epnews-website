/* EP News Global Power Shift dashboard. No unverified numerical claims. */
(()=>{'use strict';
const spheres=[
 {id:'us',name:'United States / U.S.-aligned',note:'American economic and strategic influence; allied gains are assessed separately where interests diverge.'},
 {id:'china',name:'China',note:'Trade, manufacturing, strategic minerals, infrastructure and diplomatic leverage.'},
 {id:'russia',name:'Russia',note:'Energy, security partnerships and diplomatic influence.'},
 {id:'eu',name:'European Union',note:'EU trade, regulation, economic integration and diplomacy; the broader European security sphere includes non-EU states.'},
 {id:'india',name:'India',note:'Independent Indian economic, technological, diplomatic and strategic influence.'},
 {id:'middle-east',name:'Middle Eastern regional powers',note:'Saudi Arabia, Iran, Türkiye and the UAE are tracked individually; their interests may conflict.'},
 {id:'regional',name:'Other independent regional powers',note:'Brazil, Indonesia, South Africa and other actors not adequately described by fixed blocs.'}
];
function init(){
const root=document.getElementById('chaos-dashboard');if(!root)return;
const select=root.querySelector('#chaos-sphere'),meter=root.querySelector('#chaos-meter'),name=root.querySelector('#chaos-sphere-name'),description=root.querySelector('#chaos-sphere-description');
const category=root.querySelector('#chaos-dimension');
select.innerHTML=spheres.map(s=>'<option value="'+s.id+'">'+s.name+'</option>').join('');
function update(){let s=spheres.find(x=>x.id===select.value)||spheres[0];name.textContent=s.name;description.textContent=s.note;meter.setAttribute('aria-label',s.name+': influence score pending evidence review');root.querySelector('#chaos-evidence').textContent='Assessment pending — no verified composite score published for '+s.name+'. '+category.options[category.selectedIndex].text+' requires documented indicators, a baseline and dated evidence.';}
select.addEventListener('change',update);category.addEventListener('change',update);
const left=root.querySelector('#chaos-compare-a'),right=root.querySelector('#chaos-compare-b'),comparison=root.querySelector('#chaos-comparison-result');
if(left&&right&&comparison){
const opts=spheres.map(s=>'<option value="'+s.id+'">'+s.name+'</option>').join('');
left.innerHTML=opts;right.innerHTML=opts;left.value='us';right.value='india';
function compare(){
const a=spheres.find(s=>s.id===left.value),b=spheres.find(s=>s.id===right.value);
comparison.textContent=a.id===b.id?'Choose two different spheres to compare.':'Comparing '+a.name+' and '+b.name+': evidence-based influence changes and confidence ratings are pending. No comparative advantage is assumed.';
}
left.addEventListener('change',compare);right.addEventListener('change',compare);compare();
}
update();
const list=root.querySelector('#chaos-updates');
const articles=(typeof STORIES!=='undefined'?STORIES:[]).filter(s=>s&&s.status==='published'&&s.id!=='power'&&(s.category==='investigations'||/investigat|energy dependency|supply.chain|tariff|resource/i.test(s.type||''))).sort((a,b)=>String(b.publishedAt||b.updatedAt||'').localeCompare(String(a.publishedAt||a.updatedAt||''))).slice(0,10);
list.replaceChildren();
const counter=root.querySelector('#chaos-update-count');if(counter)counter.textContent='('+articles.length+' OF UP TO 10)';
if(!articles.length){const p=document.createElement('p');p.textContent='No separately classified investigation updates are available yet. Read the flagship report or browse the investigations archive.';list.append(p);}
for(const s of articles){const a=document.createElement('a');a.className='chaos-update';a.href='#article/'+encodeURIComponent(s.id);const title=document.createElement('strong');title.textContent=s.title||'Investigation update';const d=document.createElement('small');d.textContent=(s.publishedAt||s.updatedAt||'')+' · '+(s.type||'INVESTIGATION');a.append(title,d);list.append(a);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();