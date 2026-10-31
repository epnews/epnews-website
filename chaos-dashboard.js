/* EP News Global Power Shift dashboard. No unverified numerical claims. */
(()=>{'use strict';
const spheres=[
 {id:'us',name:'United States / U.S.-aligned',note:'American economic and strategic influence; allied gains are assessed separately where interests diverge.'},
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
// Observed EU gas-import volume change only; NOT a national geopolitical composite score.
// Symmetric change index = 100*(latest-baseline)/(latest+baseline), bounded [-100,100].
// 2021/2025 bcm: EC/LSEG/ENTSOG Council infographic (see source below).
const gasVolumeEvidence={
 us:{baseline:18.9,latest:75.6},russia:{baseline:152,latest:36}
};
const gasSource='https://www.consilium.europa.eu/en/infographics/where-does-the-eu-s-gas-come-from/';
function gasIndicator(sphere){const d=gasVolumeEvidence[sphere];if(!d)return null;const index=Math.round(100*(d.latest-d.baseline)/(d.latest+d.baseline));return {...d,index,source:gasSource};}
// SIPRI April 2026 military expenditure estimates: REAL percentage change 2024–2025.
// This is defense spending momentum, NOT strategic influence or military effectiveness.
const militaryExpenditure={us:{spending2025:954,change:-7.5},china:{spending2025:336,change:7.4},russia:{spending2025:190,change:5.9},india:{spending2025:92.1,change:8.9}};
const sipriSource='https://www.sipri.org/publications/2026/sipri-fact-sheets/trends-world-military-expenditure-2025';
function militaryIndicator(sphere){const d=militaryExpenditure[sphere];return d?{...d,index:d.change,source:sipriSource}:null;}
// World Bank WDI 2025 GDP real annual growth, five geopolitical spheres.
// This is domestic output growth (economic momentum), NOT external economic influence.
const economicGDPGrowth={us:2.2,china:5.0,russia:1.0,eu:1.5,india:7.6};
const worldBankSource='https://databank.worldbank.org/reports.aspx?country=USA%2CEMU%2CEUU%2CRUS%2CCHN%2CIND%2CBRA&series=NY.GDP.MKTP.KD.ZG&source=2';
function economicIndicator(sphere){const g=economicGDPGrowth[sphere];return typeof g==='number'?{index:g,growth:g,source:worldBankSource}:null;}
// 3DL 2025 UNGA Country Alignment Index, Pillar 3, change in majority alignment 2024→2025.
// U.S. exact endpoints 16.2→0.0; Russia published change +29.8 points.
// Proximity to UN voting majorities is NOT diplomatic success, influence, or policy merit.
const diplomacyEvidence={us:{index:-16.2,from:16.2,to:0},russia:{index:29.8}};
const diplomacySource='https://datadrivendecisionlab.com/2025-UNGA-report';
function diplomaticIndicator(sphere){const d=diplomacyEvidence[sphere];return d?{...d,source:diplomacySource}:null;}
function renderAssessment(record){
 const state=record&&['rising','stable','declining','mixed'].includes(record.status)?record.status:'pending';
 meter.dataset.state=state;
 const status=root.querySelector('#chaos-status-text'),conf=root.querySelector('#chaos-confidence-text');
 status.textContent=state==='pending'?'PENDING':state.toUpperCase();
 conf.textContent=record&&record.confidence?record.confidence.toUpperCase()+' CONFIDENCE':'NOT YET ASSESSED';
 const validScore=record&&typeof record.score==='number'&&Number.isFinite(record.score)&&record.score>=-100&&record.score<=100;
 if(needle)needle.style.transform='rotate('+ (validScore ? Math.max(-90,Math.min(90,record.score*.9)) : 0)+'deg)';
 const note=root.querySelector('#chaos-needle-note');if(note)note.textContent=validScore?'Needle reflects the documented editorial change index.':'Needle inactive — no score assigned. Center does not mean neutral.';
 if(confidenceArc)confidenceArc.style.strokeDasharray=(record&&typeof record.confidenceFraction==='number'&&record.confidenceFraction>=0&&record.confidenceFraction<=100?record.confidenceFraction:0)+' 100';
}
function update(){
 const s=spheres.find(x=>x.id===select.value)||spheres[0];
 name.textContent=s.name;description.textContent=s.note;
 const isEnergy=category.value==='Energy and resources';
 const isStrategic=category.value==='Strategic';
 const isEconomic=category.value==='Economic';
 const isDiplomatic=category.value==='Diplomatic';
 const e=isEnergy?gasIndicator(s.id):isStrategic?militaryIndicator(s.id):isEconomic?economicIndicator(s.id):isDiplomatic?diplomaticIndicator(s.id):null;
 const evidence=root.querySelector('#chaos-evidence'),chips=root.querySelector('#chaos-evidence-chips');
 const statusLabel=root.querySelector('.chaos-status-badge span');if(statusLabel)statusLabel.textContent=e?'INDICATOR DIRECTION':'INFLUENCE STATUS';
 const metricName=isEnergy?'EU GAS IMPORT VOLUME':isStrategic?'REAL MILITARY EXPENDITURE':isEconomic?'REAL GDP GROWTH':'UNGA MAJORITY ALIGNMENT';
 if(e){
  meter.setAttribute('aria-label',s.name+': '+metricName+' indicator '+(e.index>0?'+':'')+e.index+'. Not total geopolitical influence.');
  renderAssessment({status:e.index>0?'rising':e.index<0?'declining':'stable',score:e.index,confidence:isDiplomatic?'moderate':'high'});
  if(isEnergy){
   evidence.textContent='EU GAS IMPORT VOLUME INDICATOR (2021–2025): '+e.baseline+' to '+e.latest+' bcm; symmetric change index '+(e.index>0?'+':'')+e.index+'. Formula: 100 × (2025 volume − 2021 volume) ÷ (2025 volume + 2021 volume). This measures EU supply volume, NOT total geopolitical power. ';
  }else if(isStrategic){
   evidence.textContent='STRATEGIC RESOURCE INPUT INDICATOR (2024–2025): '+e.spending2025+' billion USD spent in 2025; SIPRI inflation-adjusted spending change '+(e.change>0?'+':'')+e.change+'%. Needle uses the real percentage change directly (capped to ±100 if necessary), NOT an index of strategic success, capability, or national influence. SIPRI 2025 estimates. ';
  }else if(isEconomic){
   evidence.textContent='ECONOMIC OUTPUT MOMENTUM (2025): World Bank real GDP growth '+e.growth+'%. Needle uses annual real GDP growth in percentage points; this does NOT measure economic influence abroad, bargaining leverage, or net benefit from instability. ';
  }else{
   evidence.textContent='DIPLOMATIC VOTING INDICATOR (2024–2025): change '+(e.index>0?'+':'')+e.index+' percentage points in UN General Assembly majority alignment (3DL Country Alignment Index, Pillar 3). '+(typeof e.from==='number'?'2024: '+e.from+'; 2025: '+e.to+'. ':'')+'This measures vote-pattern similarity to UNGA majorities, NOT geopolitical influence, leadership, favorable outcomes, or vote persuasion. Changes in the resolutions voted on can affect comparability. Independent research estimate, not a UN-issued diplomatic power rating. ';
  }
  const link=document.createElement('a');link.href=e.source;link.target='_blank';link.rel='noopener noreferrer';link.textContent='View source ↗';evidence.appendChild(link);
 }else{
  meter.setAttribute('aria-label',s.name+': national influence assessment pending evidence review');renderAssessment(null);
  evidence.textContent=isEnergy?'Energy indicator pending for '+s.name+'. This EU gas-volume measure does not cover all spheres.':isStrategic?'Strategic resource indicator pending for '+s.name+'. SIPRI regional Europe data includes non-EU countries; it is not a defensible EU-only measure.':isDiplomatic?'Diplomatic voting-alignment indicator pending for '+s.name+'. Comparable 2024–2025 country figures have not yet been independently checked; the EU is not a single UNGA voting member.':'Assessment pending — no verified composite score published for '+s.name+'. '+category.options[category.selectedIndex].text+' requires documented indicators, a baseline and dated evidence.';
 }
 if(chips){chips.querySelectorAll('span').forEach(span=>{span.textContent=span.textContent.split(' · ')[0]+' · Pending';});if(e)chips.querySelectorAll('span').forEach(span=>{if(span.textContent.startsWith(isEnergy?'Energy':isStrategic?'Strategic':isEconomic?'Economic':'Diplomatic'))span.textContent=(isEnergy?'Energy · EU gas volume':isStrategic?'Strategic · military spending':isEconomic?'Economic · real GDP growth':'Diplomatic · UN voting alignment')+' measured';});}
 const label=root.querySelector('#chaos-indicator-explainer');if(label){label.hidden=!e;label.textContent=isEnergy?'Indicator only: needle tracks 2021–2025 EU gas-import volume change, not overall influence.':isStrategic?'Indicator only: needle tracks 2024–2025 inflation-adjusted military-spending change, not strategic influence or performance.':isEconomic?'Indicator only: needle tracks 2025 annual real GDP growth (not 2024–2025 change in influence).':isDiplomatic?'Indicator only: needle tracks 2024–2025 change in UNGA majority-vote alignment, not diplomatic influence.':' ';}
}
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
list.replaceChildren();
const counter=root.querySelector('#chaos-update-count');if(counter)counter.textContent='('+articles.length+' OF UP TO 10)';
if(!articles.length){const p=document.createElement('p');p.textContent='No separately classified investigation updates are available yet. Read the flagship report or browse the investigations archive.';list.append(p);}
for(const s of articles){const a=document.createElement('a');a.className='chaos-update';a.href='#article/'+encodeURIComponent(s.id);const title=document.createElement('strong');title.textContent=s.title||'Investigation update';const d=document.createElement('small');d.textContent=(s.publishedAt||s.updatedAt||'')+' · '+(s.type||'INVESTIGATION');a.append(title,d);list.append(a);}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();