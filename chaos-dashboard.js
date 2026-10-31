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
// A source-linked evidence coverage meter, NOT an invented geopolitical power index.
// Each cell has one transparent activity/outcome proxy; coverage is never treated as a gain.
const dimensions=['Economic','Strategic','Diplomatic','Energy and resources'];
const gasSource='https://www.consilium.europa.eu/en/infographics/where-does-the-eu-s-gas-come-from/';
const sipriSource='https://www.sipri.org/publications/2026/sipri-fact-sheets/trends-world-military-expenditure-2025';
const worldBankSource='https://databank.worldbank.org/reports.aspx?country=USA%2CEMU%2CEUU%2CRUS%2CCHN%2CIND%2CBRA&series=NY.GDP.MKTP.KD.ZG&source=2';
const diplomacySource='https://datadrivendecisionlab.com/2025-UNGA-report';
const economicGDPGrowth={us:2.2,china:5.0,russia:1.0,eu:1.5,india:7.6};
const militaryExpenditure={us:{spending2025:954,change:-7.5},china:{spending2025:336,change:7.4},russia:{spending2025:190,change:5.9},india:{spending2025:92.1,change:8.9}};
const diplomacyEvidence={us:{change:-16.2,from:16.2,to:0},russia:{change:29.8}};
const gasVolumeEvidence={us:{baseline:18.9,latest:75.6},russia:{baseline:152,latest:36}};
const signed=(n,digits=1)=>(n>0?'+':'')+n.toFixed(digits);
function metricFor(sphere,dimension){
 if(dimension==='Economic'&&typeof economicGDPGrowth[sphere]==='number'){
  const n=economicGDPGrowth[sphere];
  return {label:'Real GDP growth',short:'GDP '+signed(n)+'%',value:signed(n)+'%',numeric:n,unit:'percentage points',key:'gdp-growth',period:'2025',source:worldBankSource,
   detail:'World Bank WDI real GDP annual growth, 2025: '+n+'%.',caveat:'Domestic output growth is not proof of external economic influence, bargaining leverage or net benefit from a particular policy.'};
 }
 if(dimension==='Strategic'&&militaryExpenditure[sphere]){
  const d=militaryExpenditure[sphere];
  return {label:'Real military expenditure change',short:'Spend '+signed(d.change)+'%',value:signed(d.change)+'%',numeric:d.change,unit:'percentage points',key:'real-defense-spending',period:'2024–2025',source:sipriSource,
   detail:'SIPRI April 2026 estimates: '+d.spending2025+' billion USD spent in 2025; inflation-adjusted 2024–2025 change '+signed(d.change)+'%.',
   caveat:'Expenditure is a resource input, not a measured improvement or decline in military capability, deterrence or alliance influence.'};
 }
 if(dimension==='Diplomatic'&&diplomacyEvidence[sphere]){
  const d=diplomacyEvidence[sphere];
  return {label:'UNGA majority-alignment movement',short:'UNGA '+signed(d.change)+' pp',value:signed(d.change)+' percentage points',numeric:d.change,unit:'percentage points',key:'unga-pillar-3',period:'2024–2025',source:diplomacySource,
   detail:'Independent 3DL UN General Assembly Country Alignment Index, Pillar 3: '+signed(d.change)+' percentage points'+(typeof d.from==='number'?' ('+d.from+' in 2024 to '+d.to+' in 2025).':'.'),
   caveat:'Voting similarity to UNGA majorities is not proof of diplomacy succeeding, other states changing policy or influence being exercised. The voting agenda changed markedly in 2025.'};
 }
 if(dimension==='Energy and resources'&&(gasVolumeEvidence[sphere]||sphere==='eu')){
  const d=sphere==='eu'?gasVolumeEvidence.russia:gasVolumeEvidence[sphere],delta=d.latest-d.baseline;
  const isEU=sphere==='eu';
  return {label:isEU?'EU imports of Russian-origin gas':'EU imports of gas from '+(sphere==='us'?'the United States':'Russia'),
   short:(isEU?'Russia gas ':'EU gas ')+signed(delta)+' bcm',value:signed(delta)+' bcm',numeric:delta,unit:'billion cubic metres',key:isEU?'eu-russian-dependency':'eu-supplier-gas-volume',period:'2021–2025',source:gasSource,
   detail:(isEU?'Russian-origin gas received by the EU':'EU gas imports from '+(sphere==='us'?'the United States':'Russia'))+': '+d.baseline+' bcm in 2021 → '+d.latest+' bcm in 2025 ('+signed(delta)+' bcm). European Commission / LSEG / ENTSOG data.',
   caveat:isEU?'Reduced exposure to Russian supply is a documented EU diversification outcome, not a numerical measure of EU geopolitical power. The costs of substitution and other suppliers matter.':'This is one destination market, not the supplier’s total energy exports or its diplomatic leverage. Differences in data providers and EU gas consumption also matter.'};
 }
 return null;
}
function renderAssessment(sphere){
 const available=dimensions.filter(d=>metricFor(sphere,d));
 const count=available.length;
 meter.dataset.state='pending';
 meter.setAttribute('aria-label',sphere.name+': '+count+' of four dimensions have a source-linked proxy; overall geopolitical influence is not scored');
 const status=root.querySelector('#chaos-status-text'),conf=root.querySelector('#chaos-confidence-text');
 if(status)status.textContent=count+' OF 4';
 if(conf)conf.textContent='PROXY COVERAGE · NOT A POWER SCORE';
 if(needle)needle.style.transform='rotate('+(-90+count*45)+'deg)';
 if(confidenceArc)confidenceArc.style.strokeDasharray=(count*25)+' 100';
 const note=root.querySelector('#chaos-needle-note');
 if(note)note.textContent='Needle shows evidence coverage only ('+count+'/4 dimensions). It does not show geopolitical gains or losses.';
 const readiness=root.querySelector('#chaos-readiness-text'),coverage=root.querySelector('#chaos-readiness-coverage');
 if(readiness)readiness.textContent='Overall influence score withheld. Each dimension needs comparable outcome evidence, dated baselines, costs, counterfactuals and editorial verification; these activity proxies cannot be averaged into a power index.';
 if(coverage)coverage.textContent='Source-linked proxy coverage: '+count+' of 4 dimensions. Missing: '+(count===4?'none at the proxy level (outcome validation still pending)':dimensions.filter(d=>!metricFor(sphere,d)).join(', '))+'. Missing evidence is not a zero score.';
 const chips=root.querySelector('#chaos-evidence-chips');
 if(chips){chips.replaceChildren();for(const d of dimensions){const span=document.createElement('span');span.textContent=(d==='Energy and resources'?'Energy':d)+' · '+(metricFor(sphere,d)?'Sourced proxy':'Not measured');chips.append(span);}}
}
function update(){
 const sphere=spheres.find(x=>x.id===select.value)||spheres[0];
 name.textContent=sphere.name;description.textContent=sphere.note;
 renderAssessment(sphere);
 const dim=category.value;
 const e=dim==='Overall change'?null:metricFor(sphere.id,dim);
 const evidence=root.querySelector('#chaos-evidence'),explainer=root.querySelector('#chaos-indicator-explainer');
 evidence.replaceChildren();
 if(e){
  evidence.textContent=e.detail+' '+e.caveat+' ';
  const a=document.createElement('a');a.href=e.source;a.target='_blank';a.rel='noopener noreferrer';a.textContent='View original source ↗';evidence.append(a);
  if(explainer){explainer.hidden=false;explainer.textContent='SOURCE-LINKED '+dim.toUpperCase()+' INDICATOR ('+e.period+'). '+e.label+'. This metric is not an influence score and does not move the coverage needle.';}
 }else{
  evidence.textContent=dim==='Overall change'?'No overall geopolitical influence score has been established for '+sphere.name+'. Select a dimension or a cell in the evidence matrix to inspect sourced data.':'No sufficiently comparable published proxy is yet included for '+sphere.name+' in '+dim+'. Missing data is not evidence of no change.';
  if(explainer)explainer.hidden=true;
 }
}
function renderMatrix(){
 const body=root.querySelector('#chaos-matrix-body'),countLabel=root.querySelector('#chaos-matrix-count');
 if(!body)return;
 body.replaceChildren();
 let measured=0;
 for(const sphere of spheres){
  const tr=document.createElement('tr'),head=document.createElement('th');head.scope='row';head.textContent=sphere.name;tr.append(head);
  for(const d of dimensions){
   const td=document.createElement('td'),e=metricFor(sphere.id,d);
   if(e){
    measured++;
    const button=document.createElement('button');button.type='button';button.className='chaos-matrix-observed';button.textContent=e.short;button.title=e.label+' · '+e.period+' · inspect source';
    button.setAttribute('aria-label','Inspect '+sphere.name+' '+d+': '+e.short);
    button.addEventListener('click',()=>{select.value=sphere.id;category.value=d;update();root.querySelector('.chaos-gauge').scrollIntoView({behavior:'smooth',block:'start'});});
    td.append(button);
   }else{
    const span=document.createElement('span');span.className='chaos-matrix-missing';span.textContent='Not measured';td.append(span);
   }
   tr.append(td);
  }
  body.append(tr);
 }
 if(countLabel)countLabel.textContent=measured+' / '+(spheres.length*dimensions.length)+' PROXY CELLS';
}
select.addEventListener('change',update);category.addEventListener('change',update);
const left=root.querySelector('#chaos-compare-a'),right=root.querySelector('#chaos-compare-b'),compareDimension=root.querySelector('#chaos-compare-dimension'),comparison=root.querySelector('#chaos-comparison-result');
if(left&&right&&comparison&&compareDimension){
 const opts=spheres.map(s=>'<option value="'+s.id+'">'+s.name+'</option>').join('');
 left.innerHTML=opts;right.innerHTML=opts;left.value='us';right.value='india';
 function compare(){
  const a=spheres.find(s=>s.id===left.value),b=spheres.find(s=>s.id===right.value),dim=compareDimension.value;
  comparison.replaceChildren();
  if(a.id===b.id){comparison.textContent='Choose two different spheres to compare.';return;}
  const x=metricFor(a.id,dim),y=metricFor(b.id,dim);
  comparison.textContent=dim+' · '+a.name+': '+(x?x.value+' ('+x.period+')':'no matched proxy')+'; '+b.name+': '+(y?y.value+' ('+y.period+')':'no matched proxy')+'. ';
  if(x&&y&&x.key===y.key&&x.period===y.period){
   comparison.append(document.createTextNode('Difference in this specific indicator (A minus B): '+signed(x.numeric-y.numeric)+' '+x.unit+'. This is not an overall influence ranking. '));
  }else{
   comparison.append(document.createTextNode('No like-for-like numerical comparison is justified for this pair and dimension. '));
  }
  const sources=[...new Set([x?.source,y?.source].filter(Boolean))];
  sources.forEach((url,i)=>{const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Source '+(i+1)+' ↗';comparison.append(link);comparison.append(document.createTextNode(' '));});
  comparison.append(document.createTextNode('Interpretation: '+(x?x.caveat:'Missing source-linked data for '+a.name+'.')+' '+(y&&(!x||x.caveat!==y.caveat)?y.caveat:'')));
 }
 left.addEventListener('change',compare);right.addEventListener('change',compare);compareDimension.addEventListener('change',compare);compare();
}
renderMatrix();
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