/* EP News Global Power Shift dashboard. No unverified numerical claims. */
(()=>{'use strict';
const spheres=[
 {id:'us',name:'United States',note:'American economic and strategic influence; allied gains are assessed separately where interests diverge.'},
 {id:'china',name:'China',note:'Trade, manufacturing, strategic minerals, infrastructure and diplomatic leverage.'},
 {id:'russia',name:'Russia',note:'Energy, security partnerships and diplomatic influence.'},
 {id:'eu',name:'European Union',note:'EU trade, regulation, economic integration and diplomacy; the broader European security sphere includes non-EU states.'},
 {id:'india',name:'India',note:'Independent Indian economic, technological, diplomatic and strategic influence.'}
];
function init(){
const root=document.getElementById('chaos-dashboard');if(!root)return;
const hub=document.getElementById('chaos-hub');
if(hub){
 const label=hub.querySelector('.chaos-expand');
 const helper=hub.querySelector('.chaos-expand-helper');
 const sync=()=>{if(label)label.textContent=hub.open?'COLLAPSE INVESTIGATION ↑':'EXPAND INVESTIGATION ↓';if(helper)helper.textContent=hub.open?'Hide the investigation dashboard':'Open the tracker, comparison tools, and latest updates';};
 hub.addEventListener('toggle',sync);sync();
}
const select=root.querySelector('#chaos-sphere'),meter=root.querySelector('#chaos-meter'),name=root.querySelector('#chaos-sphere-name'),description=root.querySelector('#chaos-sphere-description');
const category=root.querySelector('#chaos-dimension');
select.innerHTML=spheres.map(s=>'<option value="'+s.id+'">'+s.name+'</option>').join('');
const svgNS='http://www.w3.org/2000/svg';
const segmentRoot=root.querySelector('#chaos-dial-segments'),tickRoot=root.querySelector('#chaos-dial-ticks');
const needle=root.querySelector('#chaos-needle-group'),confidenceArc=root.querySelector('#chaos-confidence-value');
const palette=['#c06369','#cf8b6b','#8393a7','#53a9a0','#2ba77d'];
const point=(deg,r)=>({x:160+r*Math.cos((180-deg)*Math.PI/180),y:174-r*Math.sin((180-deg)*Math.PI/180)});
function arc(d1,d2,r){const p1=point(d1,r),p2=point(d2,r);return 'M '+p1.x.toFixed(2)+' '+p1.y.toFixed(2)+' A '+r+' '+r+' 0 0 1 '+p2.x.toFixed(2)+' '+p2.y.toFixed(2);}
if(segmentRoot&&tickRoot){
 for(let i=0;i<5;i++){const el=document.createElementNS(svgNS,'path');el.setAttribute('d',arc(i*36+2,(i+1)*36-2,128));el.setAttribute('stroke',palette[i]);el.setAttribute('class','chaos-dial-segment');segmentRoot.append(el);}
 for(let i=0;i<=30;i++){const a=i*6,p1=point(a,i%5===0?109:114),p2=point(a,118);const line=document.createElementNS(svgNS,'line');line.setAttribute('x1',p1.x);line.setAttribute('y1',p1.y);line.setAttribute('x2',p2.x);line.setAttribute('y2',p2.y);if(i%5===0)line.setAttribute('class','major');tickRoot.append(line);}
}
const data=window.EP_CHAOS_DATA,model=window.EPChaosModel;
if(!data||!model){const e=root.querySelector('#chaos-evidence');if(e)e.textContent='Evidence could not load. Reload this page; scores remain withheld.';return;}
const dimensions=data.dimensions,cards=root.querySelector('#chaos-indicator-cards');
const element=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
function sourceLinks(parent,ids){
 const line=element('p',undefined,'chaos-source-links');
 for(const id of ids){const src=data.sources[id];const a=element('a',src.label+' ↗');a.href=src.url;a.target='_blank';a.rel='noopener noreferrer';line.append(a,element('small','Source date: '+src.date));}
 parent.append(line);
}
function renderCards(actor,dimension){
 cards.replaceChildren();
 for(const key of dimension==='Overall change'?dimensions:[dimension]){
  const r=data.actors[actor][key],card=element('article',undefined,'chaos-indicator-card');
  card.append(element('span',key+' · '+r.kind,'chaos-tag'),element('h4',r.title),element('strong',r.value,'chaos-metric-value'),element('p',r.period,'chaos-period'),element('span',r.stage+' · '+r.confidence+' fact confidence','chaos-record-stage'),element('p',r.meaning));
  const details=element('details'),summary=element('summary','Who pays / what remains unresolved');details.append(summary,element('p','Costs and beneficiaries: '+r.costs),element('p','Scoring limit: '+r.gap));card.append(details);sourceLinks(card,r.sources);cards.append(card);
 }
}
function update(){
 const actor=spheres.find(x=>x.id===select.value)||spheres[0],records=data.actors[actor.id],result=model.assessment(records),dim=category.value;
 name.textContent=actor.name;description.textContent=actor.note;
 // The dial exclusively represents reviewed influence assessments, never mixed proxy units.
 const count=dimensions.filter(key=>records[key]&&records[key].sources.length).length;
 const status=root.querySelector('#chaos-status-text'),conf=root.querySelector('#chaos-confidence-text');
 meter.dataset.state='coverage';status.textContent=count+' OF 4';conf.textContent='CITED CATEGORIES · NOT A POWER SCORE';
 if(needle)needle.style.transform='rotate('+(-90+count*45)+'deg)';
 if(confidenceArc)confidenceArc.style.strokeDasharray='0 100';
 root.querySelector('#chaos-needle-note').textContent='Needle counts cited categories only. Influence score remains withheld.';
 meter.setAttribute('aria-label',actor.name+': '+count+' of 4 categories documented; influence score withheld');
 root.querySelector('#chaos-readiness-text').textContent=result.ready+' of 4 dimensions meet the influence scoring gate. All four have cited evidence records; a record is not a complete national influence assessment.';
 root.querySelector('#chaos-readiness-coverage').textContent='Reviewed '+data.reviewed+' · Sources have their own observation periods. No automatic live-data feed.';
 root.querySelector('#chaos-evidence-chips').replaceChildren(...dimensions.map(key=>element('span',key+' · Evidence recorded')));
 const e=root.querySelector('#chaos-evidence');e.textContent=dim==='Overall change'?'Select a dimension to inspect its evidence. All four dimensions must pass before a composite is calculated.':'Selected evidence: '+records[dim].title+'. See the measurement, source and limits below.';
 const label=root.querySelector('#chaos-indicator-explainer');label.hidden=false;label.textContent='Coverage is not scoring readiness. GDP, spending, gas flows and treaty events remain in their own units and are never averaged together.';
 renderCards(actor.id,dim);
}
select.addEventListener('change',update);category.addEventListener('change',update);
const left=root.querySelector('#chaos-compare-a'),right=root.querySelector('#chaos-compare-b'),comparison=root.querySelector('#chaos-comparison-result');
const compareDimension=root.querySelector('#chaos-compare-dimension');
if(left&&right&&comparison&&compareDimension){
 const opts=spheres.map(s=>'<option value="'+s.id+'">'+s.name+'</option>').join('');left.innerHTML=opts;right.innerHTML=opts;left.value='us';right.value='india';
 function compare(){
  const a=spheres.find(s=>s.id===left.value),b=spheres.find(s=>s.id===right.value),host=root.querySelector('#chaos-comparison-table');host.replaceChildren();
  if(a.id===b.id){comparison.textContent='Choose two different spheres to compare.';return;}
  comparison.textContent='Evidence comparison: '+a.name+' / '+b.name+'. No overall winner is assigned. Periods and units differ; only matching measures support arithmetic comparisons.';
  const table=element('table'),caption=element('caption','Source-backed evidence, not a ranking'),head=element('thead'),row=element('tr');row.append(...['Dimension',a.name,b.name,'Comparison limit'].map(t=>element('th',t)));head.append(row);table.append(caption,head);const body=element('tbody');
  for(const dim of (compareDimension.value==='All dimensions'?dimensions:[compareDimension.value])){const ra=data.actors[a.id][dim],rb=data.actors[b.id][dim],tr=element('tr');const label=element('th',dim);label.scope='row';tr.append(label);
   for(const r of [ra,rb]){const td=element('td');td.append(element('strong',r.value),element('p',r.title+' · '+r.period+' · '+r.stage));sourceLinks(td,r.sources);tr.append(td);}
   const matching=ra.metric&&ra.metric===rb.metric&&ra.period===rb.period&&Number.isFinite(ra.number)&&Number.isFinite(rb.number);
   tr.append(element('td',matching?'A minus B: '+(ra.number-rb.number).toFixed(1)+' percentage points for this proxy only. No causal or influence ranking.':'Different measures, scope or periods. No numeric difference calculated.'));body.append(tr);
  }table.append(body);host.append(table);
 }
 left.addEventListener('change',compare);right.addEventListener('change',compare);compareDimension.addEventListener('change',compare);compare();
}
const matrix=root.querySelector('#chaos-matrix-body');
if(matrix){for(const actor of spheres){const row=element('tr'),head=element('th',actor.name);head.scope='row';row.append(head);for(const dim of dimensions){const r=data.actors[actor.id][dim],td=element('td'),button=element('button',r.value,'chaos-matrix-button');button.type='button';button.setAttribute('aria-label','Inspect '+actor.name+' '+dim);button.addEventListener('click',()=>{select.value=actor.id;category.value=dim;update();cards.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});td.append(button);row.append(td);}matrix.append(row);}}
update();
const localGroups={
 subspheres:[
  {name:'North American Integration Zone',area:'North America · Canada · Mexico · United States',actors:'Canada · Mexico · United States',question:'How do USMCA trade, energy, manufacturing and defense dependencies alter each country’s bargaining power?'},
  {name:'Gulf regional influence',area:'Persian Gulf',actors:'Saudi Arabia · UAE · Iran',question:'Which energy, security and trade relationships are changing?'},
  {name:'Eastern Mediterranean influence',area:'Eastern Mediterranean',actors:'Türkiye · Greece · Cyprus',question:'How are maritime access, energy and defense partnerships shifting?'},
  {name:'South American influence networks',area:'South America',actors:'Brazil · Argentina · neighboring states',question:'Who gains from changing mineral, trade and infrastructure ties?'},
  {name:'Southeast Asian influence networks',area:'Southeast Asia',actors:'Indonesia · Vietnam · ASEAN partners',question:'How are manufacturing, maritime security and investment relationships evolving?'}
 ],
 autonomy:[
  {name:'Canada',area:'North American Integration Zone',actors:'United States · European and Indo-Pacific trade partners',question:'Can Canada diversify trade, strengthen Arctic sovereignty and retain continental security cooperation without sacrificing economic leverage?'},
  {name:'Mexico',area:'North American Integration Zone',actors:'United States · other international investors and trading partners',question:'How do USMCA production chains, investment diversification and energy policy affect Mexican policy autonomy?'},
  {name:'South Korea',area:'Indo-Pacific allied autonomy',actors:'United States security relationship · China-linked trade · Japan',question:'How do semiconductor exports, defense commitments and market diversification affect Seoul’s strategic options?'},
  {name:'Japan',area:'Indo-Pacific allied autonomy',actors:'United States security relationship · China-linked trade · regional partners',question:'How do supply-chain security, defense investment and energy imports affect Japanese autonomy?'},
  {name:'Australia',area:'Indo-Pacific allied autonomy',actors:'United States security and investment · China-linked trade · Pacific partners',question:'How do resource exports, trade exposure and security agreements affect Australian leverage?'}
 ],
 seams:[
  {name:'Türkiye',area:'Europe / Black Sea / Middle East',actors:'NATO · Russia · regional relationships',question:'Where do its independent objectives diverge from partners?'},
  {name:'Saudi Arabia',area:'Gulf / global energy markets',actors:'U.S. · China · regional relationships',question:'How is leverage changing across security and energy?'},
  {name:'Kazakhstan',area:'Central Asia',actors:'Russia · China · EU and other relationships',question:'How do competing transport and resource partnerships affect autonomy?'},
  {name:'Serbia',area:'Balkans',actors:'EU · Russia · China relationships',question:'How are trade, investment and diplomatic alignments changing?'}
 ]};
const panel=root.querySelector('#chaos-local-tracker'),mode=root.querySelector('#chaos-local-mode'),localList=root.querySelector('#chaos-local-list');
if(panel&&mode&&localList){
function renderLocal(){
 localList.replaceChildren();
 for(const item of localGroups[mode.value]||[]){
  const card=document.createElement('article');card.className='chaos-local-card';
  const h=document.createElement('h4');h.textContent=item.name;
  const area=document.createElement('small');area.textContent=item.area;
  const p=document.createElement('p');p.textContent='Relevant relationships: '+item.actors;
  const q=document.createElement('p');q.textContent='Tracking question: '+item.question;
  const state=document.createElement('span');state.className='chaos-local-pending';state.textContent='Evidence review pending';
  card.append(h,area,p,q,state);localList.append(card);
 }
}
mode.addEventListener('change',renderLocal);renderLocal();
}
const list=root.querySelector('#chaos-updates');
const articles=(typeof STORIES!=='undefined'?STORIES:[]).filter(s=>s&&s.status==='published'&&s.id!=='power'&&(s.category==='investigations'||/investigat|energy dependency|supply.chain|tariff|resource/i.test(s.type||''))).sort((a,b)=>String(b.publishedAt||b.updatedAt||'').localeCompare(String(a.publishedAt||a.updatedAt||''))).slice(0,10);
if(!list)return;
list.replaceChildren();
const counter=root.querySelector('#chaos-update-count');if(counter)counter.textContent='('+articles.length+' OF UP TO 10)';
if(!articles.length){const p=document.createElement('p');p.textContent='No separately classified investigation updates are available yet. Read the flagship report or browse the investigations archive.';list.append(p);}
for(const s of articles){const a=document.createElement('a');a.className='chaos-update';a.href='#article/'+encodeURIComponent(s.id);const title=document.createElement('strong');title.textContent=s.title||'Investigation update';const d=document.createElement('small');d.textContent=(s.publishedAt||s.updatedAt||'')+' · '+(s.type||'INVESTIGATION');a.append(title,d);list.append(a);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();