/* EP News Global Power Shift dashboard. No unverified numerical claims. */
(()=>{'use strict';
const spheres=[
 {id:'us',name:'U.S.-aligned sphere',note:'U.S. and allied economic, security and diplomatic influence'},
 {id:'china',name:'China-aligned sphere',note:'China-centered trade, infrastructure and diplomatic influence'},
 {id:'russia',name:'Russia-aligned sphere',note:'Russia-centered military, energy and diplomatic leverage'},
 {id:'regional',name:'Independent / regional powers',note:'Regional leverage that does not fit an exclusive bloc'}
];
function init(){
const root=document.getElementById('chaos-dashboard');if(!root)return;
const select=root.querySelector('#chaos-sphere'),meter=root.querySelector('#chaos-meter'),name=root.querySelector('#chaos-sphere-name'),description=root.querySelector('#chaos-sphere-description');
const category=root.querySelector('#chaos-dimension');
select.innerHTML=spheres.map(s=>'<option value="'+s.id+'">'+s.name+'</option>').join('');
function update(){let s=spheres.find(x=>x.id===select.value)||spheres[0];name.textContent=s.name;description.textContent=s.note;meter.setAttribute('aria-label',s.name+': influence score pending evidence review');root.querySelector('#chaos-evidence').textContent='Assessment pending — no verified composite score published for '+s.name+'. '+category.options[category.selectedIndex].text+' requires documented indicators, a baseline and dated evidence.';}
select.addEventListener('change',update);category.addEventListener('change',update);update();
const list=root.querySelector('#chaos-updates');
const articles=(typeof STORIES!=='undefined'?STORIES:[]).filter(s=>s&&s.status==='published'&&s.id!=='power'&&(s.category==='investigations'||/investigat|energy dependency|supply.chain|tariff|resource/i.test(s.type||''))).sort((a,b)=>String(b.publishedAt||b.updatedAt||'').localeCompare(String(a.publishedAt||a.updatedAt||''))).slice(0,10);
list.replaceChildren();
if(!articles.length){const p=document.createElement('p');p.textContent='No separately classified investigation updates are available yet. Read the flagship report or browse the investigations archive.';list.append(p);}
for(const s of articles){const a=document.createElement('a');a.className='chaos-update';a.href='#article/'+encodeURIComponent(s.id);const title=document.createElement('strong');title.textContent=s.title||'Investigation update';const d=document.createElement('small');d.textContent=(s.publishedAt||s.updatedAt||'')+' · '+(s.type||'INVESTIGATION');a.append(title,d);list.append(a);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();