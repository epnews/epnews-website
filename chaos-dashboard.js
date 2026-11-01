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
const element=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
const readiness=data.meterReadiness;
if(readiness){const section=element('section');section.id='chaos-meter-readiness';section.setAttribute('aria-label','Command Meter readiness, not influence score');
 section.append(element('h4',readiness.label+' · '+readiness.percent+'%'),element('p',readiness.kind));
 const progress=element('progress');progress.max=100;progress.value=readiness.percent;progress.setAttribute('aria-label','Editorial meter readiness');section.append(progress);
 for(const part of readiness.components){section.append(element('p',part.label+': '+part.percent+'%'));}
 if(readiness.previousPercent!==null){section.append(element('p','Previous readiness: '+readiness.previousPercent+'% · Current: '+readiness.percent+'% · Change: '+(readiness.percent-readiness.previousPercent)+' percentage points'));if(readiness.changeReason)section.append(element('p','Reason: '+readiness.changeReason));}
 section.append(element('p','Change rule: '+readiness.changePolicy),element('p','Next evidence needed: '+readiness.nextEvidenceGate));
 section.append(element('p','Influence score: NOT SCORED · National net benefit: NOT ESTABLISHED'));
 root.prepend(section);
}
const sprint=data.completionSprint,completionModel=window.EPCompletionModel;
if(sprint&&completionModel){
 const section=element('section',undefined,'chaos-completion');
 section.id='chaos-completion-status';section.setAttribute('aria-label','Completion and evidence sufficiency');
 section.append(element('h4','Command meter completion tracker'));
 section.append(element('p',sprint.technicalDefinition));
 section.append(element('p','Technical readiness: '+(readiness.components.find(c=>c.id==='technical')||{}).percent+'% · Investigation readiness: '+readiness.percent+'% (editorial estimate)'));
 section.append(element('p',sprint.publicationRule));
 const list=element('div',undefined,'chaos-completion-gates');
 for(const gate of completionModel.audit(sprint.researchGates)){
  const detail=element('details',undefined,'chaos-completion-gate');
  const summary=element('summary',gate.title+' — '+gate.status);
  detail.append(summary);
  const ul=element('ul');
  for(const req of gate.requirements){const li=element('li',req.status+': '+req.label);if(req.source&&data.sources[req.source]){const a=element('a',' Source ↗');a.href=data.sources[req.source].url;a.target='_blank';a.rel='noopener noreferrer';li.append(a);}ul.append(li);}
  detail.append(ul,element('p','Next evidence: '+gate.nextAction));
  if(gate.caveat)detail.append(element('p',gate.caveat));
  list.append(detail);
 }
 section.append(list);
 root.prepend(section);
}
// Progressive disclosure: the public meter leads; research administration stays available on demand.
const makeDrawer=(title,description,cls)=>{
 const drawer=element('details',undefined,'chaos-clean-drawer '+cls);
 const summary=element('summary',title);
 const hint=element('span',description,'chaos-clean-hint');
 summary.append(hint);drawer.append(summary);return drawer;
};
const technicalDrawer=makeDrawer('RESEARCH PROGRESS & METHODOLOGY','Readiness, scoring gates, source checks and unresolved questions','chaos-research-drawer');
for(const id of ['chaos-completion-status','chaos-meter-readiness']){
 const section=root.querySelector('#'+id);if(section)technicalDrawer.append(section);
}
if(technicalDrawer.children.length>1)root.append(technicalDrawer);
const assessment=root.querySelector('#chaos-assessment-readiness');
if(assessment){
 const assessmentDrawer=makeDrawer('WHY IS INFLUENCE NOT SCORED?','Review the evidence and scoring requirements','chaos-assessment-drawer');
 assessment.parentNode.insertBefore(assessmentDrawer,assessment);
 assessmentDrawer.append(assessment);
}
const explorationDrawer=makeDrawer('EXPLORE COMPARISONS & SUPPORTING EVIDENCE','Country matrix, indicator sources and side-by-side comparisons','chaos-exploration-drawer');
for(const cls of ['chaos-matrix','chaos-indicators','chaos-compare']){
 const section=root.querySelector('.'+cls);if(section)explorationDrawer.append(section);
}
if(explorationDrawer.children.length>1){
 const archive=root.querySelector('.chaos-research-archive');
 if(archive)root.insertBefore(explorationDrawer,archive);else root.append(explorationDrawer);
}
const dimensions=data.dimensions,cards=root.querySelector('#chaos-indicator-cards');
function sourceLinks(parent,ids){
 const line=element('p',undefined,'chaos-source-links');
 for(const id of ids){const src=data.sources[id];const a=element('a',src.label+' ↗');a.href=src.url;a.target='_blank';a.rel='noopener noreferrer';line.append(a,element('small','Source date: '+src.date));}
 parent.append(line);
}
let diplomaticCandidates=null;
fetch('data/soi-diplomatic-source-candidates.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('candidate evidence unavailable');return r.json();}).then(d=>{if(!d||!Array.isArray(d.cases)||d.cases.some(x=>x.influenceScore!==null))throw Error('invalid candidate evidence');diplomaticCandidates=d;const a=root.querySelector('#chaos-sphere'),dim=root.querySelector('#chaos-dimension');if(a&&dim&&a.value&&dim.value)renderCards(a.value,dim.value);}).catch(()=>{});
let influenceFramework=null;
fetch('data/soi-diplomatic-influence-framework.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('framework unavailable');return r.json();}).then(d=>{if(!d||d.influenceScoreAuthorized!==false||!Array.isArray(d.dimensions))throw Error('invalid framework');influenceFramework=d;const a=root.querySelector('#chaos-sphere'),dim=root.querySelector('#chaos-dimension');if(a&&dim&&a.value&&dim.value)renderCards(a.value,dim.value);}).catch(()=>{});
let votingEvidence=null;
const voteActor={us:'USA',china:'CHN',russia:'RUS',india:'IND'};
const voteNames={USA:'United States',CHN:'China',RUS:'Russia',IND:'India'};
function appendVotingEvidence(actor,dimension){
 if(dimension!=='Diplomatic'&&dimension!=='Overall change')return;
 const panel=element('section',undefined,'chaos-indicator-card chaos-voting-evidence');
 panel.append(element('h4','UN voting agreement · recorded votes (2021–2024)'),element('p','Measured voting agreement, not diplomatic influence. Abstentions count as positions; consensus and nonvoting excluded.'));
 if(!votingEvidence){panel.append(element('p','Country voting evidence is loading or unavailable.'));cards.append(panel);return;}
 if(diplomaticCandidates){
  const entries=diplomaticCandidates.cases.filter(x=>x.sphere===actor);
  if(entries.length){const drawer=element('details');drawer.append(element('summary','Source-backed diplomatic cases to investigate ('+entries.length+')'));
   drawer.append(element('p','Primary-source event reviews only. External influence remains unverified; excluded internal policy events are clearly identified. No influence score.'));
   for(const item of entries){const p=element('p');p.append(element('strong',item.title+' · '+item.stage+' ('+item.eventDate+')'),element('span',' · '+item.caveat));const a=element('a',' Source ↗');a.href=item.sourceUrl;a.target='_blank';a.rel='noopener noreferrer';p.append(a);drawer.append(p);
    const status=element('p','Eligibility: '+item.eligibility+' · Event finding: '+item.verifiedObservation);drawer.append(status);
    if(item.additionalSource){const extra=element('a','Supporting source ↗');extra.href=item.additionalSource;extra.target='_blank';extra.rel='noopener noreferrer';drawer.append(extra);}
    const gaps=element('p','Still needed: '+item.missingEvidence.join('; '));drawer.append(gaps);
    if(item.measurementQuality){const q=item.measurementQuality;const box=element('details');box.append(element('summary','Measurement quality · '+q.qualityStatus));const labels=[['Outcome defined',q.outcomeDefined],['Baseline documented',q.baselineDocumented],['Follow-up documented',q.followupDocumented],['Matched definitions',q.matchedDefinitions],['Confounders addressed',q.confoundersAddressed],['Independent corroboration',q.independentOutcomeCorroborated]];for(const [name,yes] of labels)box.append(element('p',name+': '+(yes?'documented':'not established')));box.append(element('p',q.reason));box.append(element('p','Not authorized for influence scoring.'));drawer.append(box);}
    if(item.observedEvidence){const obs=item.observedEvidence;const box=element('details');box.append(element('summary','Observed baseline / follow-up evidence · not influence'));
     if(obs.type==='matched-before-after'){box.append(element('p',obs.metric+': '+obs.baseline.value+' '+obs.unit+' ('+obs.baseline.period+') → '+obs.followup.value+' '+obs.unit+' ('+obs.followup.period+'). Change: '+(obs.followup.value-obs.baseline.value).toFixed(1)+' '+obs.unit+'.'));}
     else box.append(element('p',obs.finding));box.append(element('p','Limit: '+obs.caveat));const urls=obs.sources||[obs.source];for(const url of urls){const a=element('a','Evidence source ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';box.append(a);}drawer.append(box);}
    if(item.researchPlan){const plan=element('details');plan.append(element('summary','Next verification tasks · research plan'));const fields=[['Outcome question',item.researchPlan.outcomeQuestion],['Baseline',item.researchPlan.baselineRequirement],['Follow-up evidence',item.researchPlan.followupRequirement],['Alternative explanations',item.researchPlan.attributionAlternatives],['Costs',item.researchPlan.costRequirement]];for(const [label,value] of fields){const p=element('p');p.append(element('strong',label+': '),element('span',value));plan.append(p);}plan.append(element('p','Status: planned, not measured.'));drawer.append(plan);}
    if(item.evidenceGateCoverage){const coverage=element('details');coverage.append(element('summary','Six-gate evidence coverage (not an influence score)'));const table=element('table');for(const [name,g] of Object.entries(item.evidenceGateCoverage)){const tr=element('tr');tr.append(element('th',name),element('td',g.status),element('td',g.note));table.append(tr);}coverage.append(table);drawer.append(coverage);}}panel.append(drawer);
  }
 }
 if(influenceFramework){
  const guide=element('details');guide.append(element('summary','How diplomatic influence will be verified · 6 evidence gates'));
  guide.append(element('p','A diplomatic event is not an influence outcome. This framework applies identically to all five spheres and does not produce a score.'));
  const list=element('ol');for(const gate of influenceFramework.dimensions){const li=element('li');li.append(element('strong',gate.question),element('p',gate.note));list.append(li);}guide.append(list,element('p','Evidence stages: '+influenceFramework.stages.join(' → ')+'. No calibrated influence score is authorized.'),element('p','Auditable case register: '+influenceFramework.caseFiles.filter(item=>item.sphere===actor).length+' verified entries for this sphere. Empty means no case has passed source review, not zero diplomatic activity.'));panel.append(guide);
 }
 const code=voteActor[actor];
 const coverage=element('p',undefined,'chaos-voting-coverage');
 const annualYears=['2021','2022','2023','2024'];
 const present=annualYears.filter(year=>votingEvidence.annual[year]);
 const recorded=present.map(year=>votingEvidence.annual[year].recordedResolutions).filter(Number.isFinite);
 coverage.textContent='Evidence coverage: '+present.length+'/4 years (2021–2024) · recorded resolutions by year: '+recorded.join(', ')+'. Pair percentages use recorded votes and may reflect changing issue mixes; they are not comparable influence scores.';
 panel.append(coverage);
 if(actor==='eu')panel.append(element('p','EU majority-alignment comparisons cover 2021–2024, calculated from member-state recorded votes. EU member cohesion is a distinct measure.'));
 else panel.append(element('p','EU majority proxy covers 2021–2024 using at least 14 EU27 recorded votes per resolution. Agreement is not diplomatic influence.'));
 const peerCodes=['USA','CHN','RUS','IND'];
 const pairKey=(a,b)=>[a,b].sort((x,y)=>peerCodes.indexOf(x)-peerCodes.indexOf(y)).join('_');
 const peers=code?peerCodes.filter(other=>other!==code).map(other=>({label:voteNames[other],value:year=>votingEvidence.annual[year]?.pairAgreementPct?.[pairKey(code,other)]})).concat([{label:'EU27 majority proxy',value:year=>votingEvidence.annual[year]?.euMajorityAlignmentPct?.[code]}]):peerCodes.map(other=>({label:voteNames[other],value:year=>votingEvidence.annual[year]?.euMajorityAlignmentPct?.[other]}));
 // Four equal counterpart relationships, identical four-year window for every sphere.
 // This is a descriptive agreement profile, not an influence index or a meter input.
 const profile=element('details');profile.append(element('summary','Compare standardized diplomatic voting profile (4 counterparts)'));
 const profileTable=element('table'),profileHead=element('tr');for(const label of ['Year',...peers.map(p=>p.label),'Mean of 4 (%)'])profileHead.append(element('th',label));profileTable.append(profileHead);
 for(const year of ['2021','2022','2023','2024']){
  const values=peers.map(p=>p.value(year));const row=element('tr');
  const complete=values.length===4&&values.every(Number.isFinite);
  for(const value of [year,...values.map(v=>Number.isFinite(v)?v.toFixed(2)+'%':'Unavailable'),complete?(values.reduce((a,b)=>a+b,0)/4).toFixed(2)+'%':'Unavailable'])row.append(element('td',value));
  profileTable.append(row);
 }
 profile.append(element('p','Each sphere is compared against the other four spheres using the same years and four equally weighted counterpart relationships. EU27 is represented by member-state majority, not an EU vote. The mean is descriptive, not calibrated influence; issue mix and eligible resolution counts can differ across relationships and years. No meter needle or score uses this calculation.'),profileTable);panel.append(profile);
 const years=['2021','2022','2023','2024'];
 const trendKey=code==='USA'?'USA_CHN':code==='CHN'?'USA_CHN':code==='RUS'?'USA_RUS':code==='IND'?'USA_IND':null;
 if(trendKey){const first=votingEvidence.annual['2021']?.pairAgreementPct?.[trendKey],last=votingEvidence.annual['2024']?.pairAgreementPct?.[trendKey];if(Number.isFinite(first)&&Number.isFinite(last))panel.append(element('p','Standardized reference trend ('+trendKey.replace('_',' / ')+'): '+first.toFixed(2)+'% (2021) → '+last.toFixed(2)+'% (2024); change '+(last-first).toFixed(2)+' percentage points. Descriptive agreement only; not an influence score.'));}
 if(actor==='eu'){const first=votingEvidence.annual['2021']?.euMeanCohesionPct,last=votingEvidence.annual['2024']?.euMeanCohesionPct;if(Number.isFinite(first)&&Number.isFinite(last))panel.append(element('p','EU27 member cohesion: '+first.toFixed(2)+'% (2021) → '+last.toFixed(2)+'% (2024); change '+(last-first).toFixed(2)+' percentage points. Cohesion is not external influence.'));}
 const base=votingEvidence.annual['2021'],recent=votingEvidence.annual['2024'];
 if(base&&recent){
  const trendTable=element('table'),trendHead=element('tr');for(const name of ['Relationship','2021','2024','Change (pp)'])trendHead.append(element('th',name));trendTable.append(trendHead);
  const relationships=[];
  if(code){for(const other of Object.keys(voteNames)){if(other===code)continue;const key=[code,other].sort((a,b)=>['USA','CHN','RUS','IND'].indexOf(a)-['USA','CHN','RUS','IND'].indexOf(b)).join('_');relationships.push([voteNames[other],base.pairAgreementPct?.[key],recent.pairAgreementPct?.[key]]);}relationships.push(['EU majority proxy',base.euMajorityAlignmentPct?.[code],recent.euMajorityAlignmentPct?.[code]]);}
  else if(actor==='eu'){for(const other of Object.keys(voteNames))relationships.push([voteNames[other],base.euMajorityAlignmentPct?.[other],recent.euMajorityAlignmentPct?.[other]]);relationships.push(['EU member cohesion',base.euMeanCohesionPct,recent.euMeanCohesionPct]);}
  let available=0;for(const [name,first,last] of relationships){if(!Number.isFinite(first)||!Number.isFinite(last))continue;const row=element('tr');for(const value of [name,first.toFixed(2)+'%',last.toFixed(2)+'%',(last-first>0?'+':'')+(last-first).toFixed(2)])row.append(element('td',value));trendTable.append(row);available++;}
  if(available){const detail=element('details');detail.append(element('summary','View matched 2021–2024 relationships ('+available+')'),trendTable);panel.append(detail);}else panel.append(element('p','No matched 2021 and 2024 relationship comparison available; missing EU proxy years are not estimated.'));
 }
 const table=element('table');const head=element('tr');for(const name of ['Year','Comparison','Agreement'])head.append(element('th',name));table.append(head);
 for(const year of ['2021','2022','2023','2024']){
  const annual=votingEvidence.annual[year];if(!annual)continue;
  const pairs=[];
  if(code){for(const other of Object.keys(voteNames)){if(other===code)continue;const key=[code,other].sort((a,b)=>['USA','CHN','RUS','IND'].indexOf(a)-['USA','CHN','RUS','IND'].indexOf(b)).join('_');pairs.push([voteNames[other],annual.pairAgreementPct[key]]);}
   pairs.push(['EU majority proxy',annual.euMajorityAlignmentPct?.[code]]);
  }else if(actor==='eu'){
   for(const other of Object.keys(voteNames))pairs.push([voteNames[other],annual.euMajorityAlignmentPct?.[other]]);
   pairs.push(['EU member cohesion',annual.euMeanCohesionPct]);
  }
  for(const [name,value] of pairs){if(typeof value!=='number')continue;const tr=element('tr');for(const cell of [year,name,value.toFixed(2)+'%'])tr.append(element('td',cell));table.append(tr);}
 }
 const annualDetail=element('details');annualDetail.append(element('summary','View annual voting evidence (2021–2024)'),table);panel.append(annualDetail);
 const source=element('a','Source: SWP/GESIS UNGA-RES (DOI 10.7802/2855) ↗');source.href='https://doi.org/10.7802/2855';source.target='_blank';source.rel='noopener noreferrer';panel.append(source,element('p','EU is a proxy from recorded member-state votes, not an EU vote. Issue mix and vote coverage affect percentages. Influence score remains NOT CALIBRATED.'));
 cards.append(panel);
}
fetch('data/soi-swp-verified-country-vote-alignment-2021-2024.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('voting data unavailable');return r.json();}).then(d=>{if(!d||!d.annual||d.influenceScoreAuthorized!==false)throw Error('invalid voting evidence');votingEvidence=d;const actor=root.querySelector('#chaos-sphere'),dim=root.querySelector('#chaos-dimension');if(actor&&dim&&actor.value&&dim.value)renderCards(actor.value,dim.value);}).catch(()=>{});
function renderCards(actor,dimension){
 cards.replaceChildren();
 appendVotingEvidence(actor,dimension);
 if(dimension==='Diplomatic'||dimension==='Overall change'){
  const updates=(data.soiDiplomaticUpdates||{})[actor]||[];
  if(updates.length){const section=element('section',undefined,'chaos-soi-evidence');section.append(element('h4','Recent SOI diplomatic evidence · not an influence score'));
   for(const item of updates){const detail=element('details'),summary=element('summary',item.title+' — '+item.stage);detail.append(summary,element('p',item.finding),element('p','Measurement limit: '+item.limit));const link=element('a','Official source ↗');link.href=item.source;link.target='_blank';link.rel='noopener noreferrer';detail.append(link);section.append(detail);}cards.append(section);
  }
 }

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
 const selectedScore=dim==='Diplomatic'?null:(dim==='Overall change'?result.score:result.scores[dim]);
 const observation=dim!=='Overall change'?records[dim]:null;
 // Restore indicator movement only for genuine numeric, signed percentage-point observations.
 // This is NOT the reviewed geopolitical influence scale.
 const supportedUnits={'gdp-growth-2025':{label:'Real GDP growth (%)',range:10},'sipri-real-change-2025':{label:'Real military spending change (%)',range:10},'lng-export-share-pp':{label:'LNG export-share change (percentage points)',range:10},'nato-membership-change':{label:'NATO member-country change',range:5},'defence-spending-change-pct':{label:'EU defence spending change (%)',range:25},'eu-russian-gas-import-share-pp':{label:'Russian share of EU gas imports (percentage-point change)',range:50},'india-crude-import-dependence-pp':{label:'India crude oil import dependence (percentage-point change)',range:5},'eu-nz-bilateral-trade-growth-pct':{label:'EU–NZ nominal bilateral trade growth (%)',range:25},'china-crude-import-qoq-pct':{label:'China crude import change Q1 to Q2 2026 (%)',range:50},'russia-fossil-export-revenue-eur-mn-day':{label:'Estimated Russian fossil export sales (EUR million/day)',range:1000},'china-mediated-embassies-reopened-count':{label:'Saudi and Iranian embassies reopened (count)',range:2},'russia-dprk-treaties-in-force-count':{label:'Russia–DPRK treaty in force (count)',range:1},'india-efta-tariff-lines-covered-pct':{label:'EFTA tariff lines covered by TEPA commitments (%)',range:100}};
 const indicator=dim!=='Diplomatic'&&selectedScore===null&&observation&&Object.prototype.hasOwnProperty.call(supportedUnits,observation.metric)&&Number.isFinite(observation.number)?observation:null;
 const indicatorValue=indicator?indicator.number:null;
 const indicatorUnit=indicator?supportedUnits[indicator.metric].label:null;
 const indicatorRange=indicator?supportedUnits[indicator.metric].range:null;
 const indicatorAngle=indicator?Math.max(-90,Math.min(90,indicatorValue/indicatorRange*90)):null; // metric-specific symmetric reference range, not influence.
 // Provisional descriptive display index, not verified geopolitical influence.
 const provisionalParts=dimensions.map(key=>{
  const record=records[key],unit=record&&supportedUnits[record.metric];
  if(!unit||!Number.isFinite(record.number))return null;
  return {key,value:Math.max(-100,Math.min(100,100*record.number/unit.range)),weight:model.weights[key]};
 }).filter(Boolean);
 const provisionalWeight=provisionalParts.reduce((sum,p)=>sum+p.weight,0);
 const provisional=dim==='Overall change'&&result.score===null&&provisionalParts.length?
  provisionalParts.reduce((sum,p)=>sum+p.weight*p.value,0)/provisionalWeight:null;
 meter.dataset.state=selectedScore!==null?'scored':provisional!==null||indicator?'observed':'pending';
 status.textContent=selectedScore!==null?selectedScore.toFixed(1):provisional!==null?(provisional>0?'+':'')+provisional.toFixed(1):indicator?(indicatorValue>0?'+':'')+indicatorValue.toFixed(1):'NOT SCORED';
 conf.textContent=selectedScore!==null?(dim==='Overall change'?'OVERALL':'DIMENSION')+' · REVIEWED INFLUENCE CHANGE':provisional!==null?'PROVISIONAL DESCRIPTIVE INDEX · NOT INFLUENCE':indicator?'OBSERVED INDICATOR · NOT INFLUENCE':dim==='Overall change'?'OVERALL INFLUENCE · AWAITING REVIEW':dim.toUpperCase()+' · AWAITING REVIEW';
 if(needle){needle.style.visibility=selectedScore!==null||provisional!==null||indicator?'visible':'hidden';if(selectedScore!==null)needle.style.transform='rotate('+(selectedScore*.9)+'deg)';else if(provisional!==null)needle.style.transform='rotate('+(provisional*.9)+'deg)';else if(indicator)needle.style.transform='rotate('+indicatorAngle+'deg)';}
 if(confidenceArc)confidenceArc.style.strokeDasharray='0 100';
 if(dim==='Diplomatic'){meter.dataset.state='pending';status.textContent='NOT CALIBRATED';conf.textContent='COMMON 2021 BASELINE · FIVE SPHERES';if(needle)needle.style.visibility='hidden';}

 if(dim==='Diplomatic'){const note=root.querySelector('#chaos-needle-note');note.textContent='Standard diplomatic index: 2021 baseline; UN voting alignment 25%, implemented agreements 25%, institutional leadership 20%, formal diplomatic relations 15%, implemented mediation 15%. Same rules for all five spheres. No calibrated scores yet; prior isolated indicators remain in the evidence records, not the dial.';}
  root.querySelector('#chaos-needle-note').textContent=selectedScore!==null?'Reviewed '+(dim==='Overall change'?'overall influence':dim+' influence')+' change: '+selectedScore.toFixed(1)+' on a −100 to +100 scale.':provisional!==null?'Provisional descriptive index: '+provisional.toFixed(1)+' on a −100 to +100 display scale, based on '+provisionalParts.length+'/4 supported observations. Missing: '+(dimensions.filter(key=>!provisionalParts.some(p=>p.key===key)).join(', ')||'none')+'. Existing 30/30/20/20 weights are renormalized across available observations. This is NOT verified geopolitical influence or causal national benefit.':indicator?indicatorUnit+': '+(indicatorValue>0?'+':'')+indicatorValue.toFixed(1)+'. Needle displays this source-backed observation on a fixed −'+indicatorRange+' to +'+indicatorRange+' '+indicatorUnit+' reference window (values outside it are visually capped). It is NOT a geopolitical influence score. '+(indicator.measurementCaveat||''): 'No comparable numeric indicator for this selection; influence remains unscored. Evidence coverage: '+count+' of 4.';
 if(dim==='Diplomatic')root.querySelector('#chaos-needle-note').textContent='Diplomatic index (2021 baseline): alignment 25%; implemented agreements 25%; institutional leadership 20%; formal relations 15%; implemented mediation 15%. Same rules for every sphere. No calibrated scores yet; historical one-off indicators remain in evidence panels only.';
 meter.setAttribute('aria-label',actor.name+', '+dim+': '+(selectedScore!==null?selectedScore.toFixed(1)+' reviewed influence change':provisional!==null?'provisional descriptive index '+provisional.toFixed(1)+' from '+provisionalParts.length+' of 4 observations, not influence':indicator?indicatorUnit+' '+indicatorValue+'; observed indicator, not influence score':'influence not yet scored')+'; '+count+' of 4 evidence categories documented');
 root.querySelector('#chaos-readiness-text').textContent=result.ready+' of 4 dimensions meet the influence scoring gate. '+count+' of 4 categories have cited evidence. Evidence coverage is not influence.';
 let readiness=root.querySelector('#chaos-dimension-readiness');if(!readiness){readiness=document.createElement('div');readiness.id='chaos-dimension-readiness';readiness.setAttribute('aria-live','polite');root.querySelector('#chaos-assessment-readiness').append(readiness);}readiness.replaceChildren();for(const key of dimensions){const record=records[key],score=result.scores[key],line=element('p',key+': '+(score===null?'Not scored — missing: '+model.missingRequirements(record).join('; ')+'.':'Reviewed change '+score.toFixed(1)),'chaos-readiness-dimension');line.style.cssText='font-size:12px;line-height:1.5;margin:7px 0';readiness.append(line);}
 root.querySelector('#chaos-readiness-coverage').textContent='Reviewed '+data.reviewed+' · Sources have their own observation periods. No automatic live-data feed.';
 root.querySelector('#chaos-evidence-chips').replaceChildren(...dimensions.map(key=>element('span',key+' · Evidence recorded · '+(result.scores[key]===null?'Unscored':'Scored'))));
 const e=root.querySelector('#chaos-evidence');e.textContent=dim==='Overall change'?'Provisional descriptive index uses available numeric observations. Select a dimension to inspect its evidence. All four dimensions must pass before a verified influence composite is calculated.':'Selected evidence: '+records[dim].title+'. Missing to score: '+(model.missingRequirements(records[dim]).join('; ')||'none')+'. See the measurement, source and limits below.';
 const label=root.querySelector('#chaos-indicator-explainer');label.hidden=false;label.textContent='Evidence coverage: '+count+' of 4. The needle can display a dated numeric observation when one exists; this is NOT a geopolitical influence score. The verified overall influence score remains inactive until independently reviewed outcomes qualify. The provisional overall needle is descriptive only. GDP, spending, gas flows and treaty events are not interchangeable.';
 renderCards(actor.id,dim);
 let worksheet=root.querySelector('#chaos-research-worksheet');if(!worksheet){worksheet=element('section',undefined,'chaos-indicator-card');worksheet.id='chaos-research-worksheet';worksheet.setAttribute('aria-label','Influence assessment research worksheet');cards.parentNode.insertBefore(worksheet,cards);}
 worksheet.replaceChildren();const sheet=data.researchWorksheets&&data.researchWorksheets[actor.id]&&data.researchWorksheets[actor.id][dim];
 if(sheet){worksheet.hidden=false;worksheet.append(element('h4','Research worksheet · '+dim),element('strong',sheet.status));for(const [heading,key] of [['Baseline','candidateBaseline'],['Observed outcome','candidateOutcome'],['Interpretation','interpretation'],['Missing independent outcomes','additionalOutcomesNeeded'],['Costs and beneficiaries','costAccountingNeeded'],['Counterfactual','counterfactualNeeded'],['Calibration','calibrationNeeded'],['Editorial status','editorialReview']]){worksheet.append(element('h5',heading),element('p',sheet[key]));}sourceLinks(worksheet,sheet.sources);
 const audit=data.evidenceAudits&&data.evidenceAudits[actor.id]&&data.evidenceAudits[actor.id][dim];
 if(audit){
  worksheet.append(element('h4','Evidence audit · '+audit.caseId),element('strong',audit.status));
  for(const o of audit.observations)worksheet.append(element('p',o.period+': '+o.value+' '+o.unit+' · '+o.measure));
  worksheet.append(element('p','Observed change: '+(audit.derived.value>0?'+':'')+audit.derived.value+' '+audit.derived.unit+' ('+audit.derived.formula+'). '+audit.derived.note),element('p','Source independence: '+audit.evidenceIndependence),element('p','Attribution: '+audit.chronology));
  worksheet.append(element('h5','Evidence required before scoring'));
  const list=element('ul');for(const item of audit.unresolved)list.append(element('li',item));worksheet.append(list);
  sourceLinks(worksheet,[...new Set(audit.observations.map(o=>o.source))]);
  if(audit.financialEvidence){const f=audit.financialEvidence;
   const panel=element('section');panel.id='chaos-lng-financial-evidence';panel.setAttribute('aria-label','U.S. LNG financial evidence');
   panel.append(element('h5',f.title),element('strong',f.status),element('p',f.scope),element('p','Evidence independence: '+f.independence));sourceLinks(panel,[f.assuranceSource]);
   const scroll=element('div',undefined,'chaos-table-scroll');scroll.tabIndex=0;scroll.setAttribute('aria-label','LNG financial evidence table; scroll horizontally on small screens');
   const table=element('table'),caption=element('caption','Matched annual company accounts · monetary figures in USD millions unless stated'),head=element('thead'),header=element('tr');
   for(const text of ['Measurement','2024 baseline','2025 outcome','Evidence and limits']){const th=element('th',text);th.scope='col';header.append(th);}head.append(header);table.append(caption,head);const body=element('tbody');
   const format=value=>new Intl.NumberFormat('en-US',{maximumFractionDigits:1}).format(value);
   for(const r of [...f.observations,...f.derived]){const row=element('tr'),label=element('th',r.label);label.scope='row';row.append(label,element('td',format(r.baseline)+' '+r.unit),element('td',format(r.outcome)+' '+r.unit));const note=element('td');note.append(element('p',r.stage+' · '+(r.basis||'Derived annual accounting ratio')+'. '+r.limitation));if(r.formula)note.append(element('p','Formula: '+r.formula));sourceLinks(note,[r.source]);row.append(note);body.append(row);}
   table.append(body);scroll.append(table);panel.append(scroll,element('p',f.marginCaution));sourceLinks(panel,f.marginSources);
   panel.append(element('p','Public-cost evidence: '+f.taxContext));sourceLinks(panel,f.taxSources);
   panel.append(element('p','Accounting boundaries: '+f.accountingRules),element('p','Still unresolved: '+f.remaining),element('p','Realized Europe-only margin: NOT ESTABLISHED · Net U.S. benefit: NOT ESTABLISHED · Influence score: NOT SCORED'));
   worksheet.append(panel);
  }
  // Data-driven evidence renderer: additional vetted datasets need only registry entries.
  const evidenceRegistry=data.evidenceTableRegistry;
  if(actor.id==='us'&&dim==='Energy and resources'&&Array.isArray(evidenceRegistry)){
   for(const entry of evidenceRegistry){
    const record=audit[entry.auditKey];if(!record||!Array.isArray(record.items))continue;
    const panel=element('section');panel.id='chaos-evidence-'+entry.id;panel.setAttribute('aria-label',record.title);
    panel.append(element('h5',record.title),element('p',(record.period||'')+(record.unit?' · '+record.unit:'')));
    const wrap=element('div',undefined,'chaos-table-scroll');wrap.tabIndex=0;
    const table=element('table'),thead=element('thead'),head=element('tr');
    for(const column of entry.columns){const th=element('th',column.label);th.scope='col';head.append(th);}thead.append(head);table.append(thead);
    const tbody=element('tbody');for(const item of record.items){const tr=element('tr');for(const column of entry.columns){const value=item[column.key];const td=element('td',value===null||value===undefined?'—':String(value));tr.append(td);}tbody.append(tr);}table.append(tbody);wrap.append(table);panel.append(wrap);
    for(const item of record.items){const notes=[item.note,item.caution,item.caveat,item.limit,item.meaning].filter(Boolean);if(notes.length)panel.append(element('p',(item.label||item.title||'Observation')+': '+notes.join(' · ')));}
    const sourceIds=[...new Set([record.source,...record.items.flatMap(item=>[item.source,...(Array.isArray(item.sources)?item.sources:[])])].filter(id=>id&&data.sources[id]))];if(sourceIds.length)sourceLinks(panel,sourceIds);
    if(record.methodology)panel.append(element('p',record.methodology));
    if(record.causalStatus)panel.append(element('p',record.causalStatus));
    panel.append(element('p','National net benefit: NOT ESTABLISHED · Influence score: NOT SCORED'));worksheet.append(panel);
   }
  }




  if(audit.lngCausalCounterfactualAudit){const a=audit.lngCausalCounterfactualAudit;const panel=element('section');panel.id='chaos-lng-causal-audit';panel.setAttribute('aria-label','LNG price causal counterfactual evidence');
   panel.append(element('h5',a.title));for(const c of a.findings){const item=element('div');item.append(element('strong',c.label+': '+c.value),element('p',c.type+' — '+c.interpretation));sourceLinks(item,[c.source]);panel.append(item);}
   panel.append(element('h6','Research comparison'));for(const c of a.researchContrast){const item=element('p',c.finding);panel.append(item);sourceLinks(panel,[c.source]);}
   panel.append(element('p',a.causalVerdict),element('p','National net benefit: NOT ESTABLISHED · Influence score: NOT SCORED'));worksheet.append(panel);
  }
  if(audit.domesticGasMatched2025to2026){const a=audit.domesticGasMatched2025to2026;const panel=element('section');panel.id='chaos-matched-gas-2025-2026';panel.setAttribute('aria-label','Matched 2025 and 2026 domestic gas prices');
   panel.append(element('h5',a.title),element('p',a.period));const wrap=element('div',undefined,'chaos-table-scroll');wrap.tabIndex=0;const table=element('table'),head=element('thead'),hr=element('tr');
   for(const label of ['Sector and month','2025','2026','Change']){const th=element('th',label);th.scope='col';hr.append(th);}head.append(hr);table.append(head);const body=element('tbody');
   for(const c of [...a.rows,...a.supplemental]){const tr=element('tr'),th=element('th',c.label);th.scope='row';const change=((c.current/c.prior-1)*100).toFixed(1);tr.append(th,element('td',c.prior.toFixed(2)),element('td',c.current.toFixed(2)),element('td',(Number(change)>0?'+':'')+change+'%'));body.append(tr);}
   table.append(body);wrap.append(table);panel.append(wrap);
   for(const c of [...a.rows,...a.supplemental])panel.append(element('p',c.label+': '+c.note));
   sourceLinks(panel,[...new Set([...a.rows,...a.supplemental].map(c=>c.source))]);panel.append(element('p',a.methodology),element('p',a.causalStatus),element('p','Net U.S. benefit: NOT ESTABLISHED · Influence score: NOT SCORED'));worksheet.append(panel);
  }





  if(audit.evidenceQualityGates){const a=audit.evidenceQualityGates;
   const panel=element('section');panel.id='chaos-lng-evidence-quality';panel.setAttribute('aria-label','Eight LNG evidence quality safeguards');
   panel.append(element('h5',a.title),element('strong',a.status),element('p','Reviewed '+a.reviewed+' · '+a.newEmpiricalFindings+' new empirical findings'));
   for(const c of a.checks){const sec=element('section');sec.append(element('h5',c.title),element('p','Risk: '+c.risk),element('p','Required evidence: '+c.requirement));sourceLinks(sec,[c.baselineSource]);panel.append(sec);}
   panel.append(element('p',a.interpretation),element('p','Net U.S. benefit: NOT ESTABLISHED · Geopolitical influence: NOT SCORED'));worksheet.append(panel);
  }
  if(audit.causalResearchGates){const a=audit.causalResearchGates;
   const panel=element('section');panel.id='chaos-causality-research-gates';panel.setAttribute('aria-label','Eight unresolved causal research questions');
   panel.append(element('h5',a.title),element('strong',a.status),element('p','Reviewed '+a.asOf+' · '+a.resolvedCount+' of '+a.questions.length+' research questions resolved'));
   for(const q of a.questions){const section=element('section');section.append(element('h5',q.title),element('p','Established so far: '+q.known),element('p','Still needed: '+q.missing),element('p','Verification test: '+q.test));sourceLinks(section,[q.source]);panel.append(section);}
   panel.append(element('p',a.rule),element('p','Net American benefit: NOT ESTABLISHED · Geopolitical influence: NOT SCORED'));worksheet.append(panel);
  }

  if(audit.accountingReconciliationEvidence){const a=audit.accountingReconciliationEvidence;
   const panel=element('section');panel.id='chaos-lng-reconciliations';panel.setAttribute('aria-label','LNG accounting reconciliation checkpoints');
   panel.append(element('h5',a.title),element('strong',a.status),element('p',a.unit));
   const pct=n=>(100*n).toFixed(1)+'%';
   for(const c of a.checks){const section=element('section');section.append(element('h5',c.title));
    if(c.baseline.thirdParty!==undefined){const b=c.baseline,o=c.outcome;section.append(element('p','2024: '+b.thirdParty.toLocaleString('en-US')+' + '+b.affiliate.toLocaleString('en-US')+' = '+b.total.toLocaleString('en-US')+' · third-party share '+pct(b.thirdParty/b.total)),element('p','2025: '+o.thirdParty.toLocaleString('en-US')+' + '+o.affiliate.toLocaleString('en-US')+' = '+o.total.toLocaleString('en-US')+' · third-party share '+pct(o.thirdParty/o.total)));}
    else if(c.baseline.capitalized!==undefined){const b=c.baseline,o=c.outcome;section.append(element('p','2024: '+b.total+' − '+b.capitalized+' = '+b.expense),element('p','2025: '+o.total+' − '+o.capitalized+' = '+o.expense));}
    else{const b=c.baseline,o=c.outcome;section.append(element('p','2024 operating/investing outflow: '+b.operating.toLocaleString('en-US')+' / '+b.investingOutflow.toLocaleString('en-US')+' = '+pct(b.operating/b.investingOutflow)),element('p','2025 operating/investing outflow: '+o.operating.toLocaleString('en-US')+' / '+o.investingOutflow.toLocaleString('en-US')+' = '+pct(o.operating/o.investingOutflow)));}
    section.append(element('p','Method: '+c.method),element('p','Limit: '+c.limitation));sourceLinks(section,[c.source]);panel.append(section);
   }
   panel.append(element('p',a.conclusion),element('p','Stage 3 return: NOT ESTABLISHED · Net U.S. benefit: NOT ESTABLISHED · Influence score: NOT SCORED'));worksheet.append(panel);
  }
  if(audit.threePartFinancialAudit){const a=audit.threePartFinancialAudit;
   const panel=element('section');panel.id='chaos-lng-three-part-audit';panel.setAttribute('aria-label','LNG three-part financial and consumer audit');
   panel.append(element('h5',a.title),element('strong',a.status));
   for(const c of a.components){const section=element('section');section.append(element('h5',c.title));
    if(c.rows.length){const scroll=element('div',undefined,'chaos-table-scroll');scroll.tabIndex=0;scroll.setAttribute('aria-label',c.title+' comparison table');const table=element('table'),head=element('thead'),hr=element('tr');
     for(const h of ['Measure','2024','2025']){const th=element('th',h);th.scope='col';hr.append(th);}head.append(hr);table.append(head);const body=element('tbody');
     for(const r of c.rows){const tr=element('tr'),th=element('th',r.label);th.scope='row';tr.append(th,element('td',r.baseline.toLocaleString('en-US')),element('td',r.outcome.toLocaleString('en-US')));body.append(tr);}
     table.append(body);scroll.append(table);section.append(element('p','USD millions · calendar years'),scroll);}
    section.append(element('p',c.note));sourceLinks(section,[c.source]);panel.append(section);
   }
   panel.append(element('p','Accounting and causal limitations: '+a.limitations),element('p','Stage 3 return, public exposure, realized domestic cost, net U.S. benefit: NOT ESTABLISHED · Influence score: NOT SCORED'));worksheet.append(panel);
  }
  if(audit.subsidiaryCashFlowEvidence){const c=audit.subsidiaryCashFlowEvidence;
   const panel=element('section');panel.id='chaos-lng-cch-cashflow';panel.setAttribute('aria-label','LNG subsidiary operating and financing cash flows');
   panel.append(element('h5',c.title),element('strong',c.status),element('p',c.scope));
   const scroll=element('div',undefined,'chaos-table-scroll');scroll.tabIndex=0;scroll.setAttribute('aria-label','Subsidiary cash-flow comparison; scroll horizontally on small screens');
   const table=element('table'),head=element('thead'),header=element('tr');table.append(element('caption','CCH consolidated cash flows · USD millions · annual'));
   for(const t of ['Measure','2024','2025','Change']){const th=element('th',t);th.scope='col';header.append(th);}head.append(header);table.append(head);const body=element('tbody');
   for(const r of c.observations){const tr=element('tr'),th=element('th',r.label);th.scope='row';const diff=r.outcome-r.baseline;tr.append(th,element('td',r.baseline.toLocaleString('en-US')),element('td',r.outcome.toLocaleString('en-US')),element('td',(diff>0?'+':'')+diff.toLocaleString('en-US')));body.append(tr);}
   table.append(body);scroll.append(table);panel.append(scroll);sourceLinks(panel,[c.observations[0].source]);
   panel.append(element('p',c.interpretation),element('p','Accounting boundaries: '+c.accountingRules),element('p','Still unresolved: '+c.remaining),element('p','Stage 3 return: NOT ESTABLISHED · Net U.S. benefit: NOT ESTABLISHED · Influence score: NOT SCORED'));
   worksheet.append(panel);
  }
  if(audit.projectCapitalEvidence){const c=audit.projectCapitalEvidence;
   const panel=element('section');panel.id='chaos-lng-project-capital';panel.setAttribute('aria-label','LNG project construction costs and commitments');
   panel.append(element('h5',c.title),element('strong',c.status),element('p',c.scope));
   for(const r of c.observations){panel.append(element('p',r.label+' · '+r.period+': '+r.baseline.toFixed(1)+' → '+r.outcome.toFixed(1)+' '+r.unit));sourceLinks(panel,[r.source]);}
   for(const r of c.commitments){panel.append(element('p',r.label+' · '+r.asOf+': approximately '+r.value.toFixed(1)+' '+r.unit));sourceLinks(panel,[r.source]);}
   panel.append(element('p','Accounting boundaries: '+c.boundaries),element('p','Still unresolved: '+c.remaining),element('p','Net U.S. benefit: NOT ESTABLISHED · Influence score: NOT SCORED'));
   worksheet.append(panel);
  }
  if(audit.capacityTimelineEvidence){const c=audit.capacityTimelineEvidence;
   const panel=element('section');panel.id='chaos-lng-capacity-timeline';panel.setAttribute('aria-label','LNG capacity project timeline');
   panel.append(element('h5',c.title),element('strong',c.status),element('p',c.scope));
   for(const e of c.events){panel.append(element('p',e.date+' · '+e.event));sourceLinks(panel,[e.source]);}
   panel.append(element('p',c.capacity),element('p',c.interpretation),element('p','Still unresolved: '+c.remaining));
   worksheet.append(panel);
  }
  if(audit.exportPriceEvidence){const p=audit.exportPriceEvidence;
   const panel=element('section');panel.id='chaos-lng-export-prices';panel.setAttribute('aria-label','DOE destination FOB export prices');
   panel.append(element('h5',p.title),element('strong',p.status),element('p',p.scope),element('p',p.definition),element('p',p.stage+' · '+p.stageLimitation),element('p','Source: '+p.table+' · Published '+p.published+' · Retrieved '+p.retrieved));sourceLinks(panel,[p.source]);
   const scroll=element('div',undefined,'chaos-table-scroll');scroll.tabIndex=0;scroll.setAttribute('aria-label','Destination FOB prices; scroll horizontally on small screens');
   const table=element('table'),head=element('thead'),header=element('tr');table.append(element('caption','LNG by vessel · FOB USD/MMBtu · matching calendar years'));
   for(const text of ['Destination','2024 baseline','2025 outcome','Change (USD/MMBtu)']){const th=element('th',text);th.scope='col';header.append(th);}head.append(header);table.append(head);const body=element('tbody');
   const format=value=>value===null?'Not available':value.toFixed(2);
   for(const r of p.observations){const row=element('tr'),label=element('th',r.destination);label.scope='row';row.append(label,element('td',format(r.baseline)),element('td',format(r.outcome)),element('td',r.change===null?'Not available':(r.change>0?'+':'')+format(r.change)));body.append(row);}
   table.append(body);scroll.append(table);panel.append(scroll,element('p',p.comparability),element('p',p.calculation),element('p','Source independence: '+p.independence),element('p','Revenue investigation: '+p.revenueFinding));sourceLinks(panel,[p.revenueSource]);
   panel.append(element('p','Costs investigation: '+p.costFinding),element('p','Domestic-price follow-up: '+p.domesticFollowup.text));sourceLinks(panel,[p.domesticFollowup.source]);
   panel.append(element('p','Realized receipts and margins: NOT ESTABLISHED · Net U.S. benefit: NOT ESTABLISHED · Influence score: NOT SCORED'));worksheet.append(panel);
  }
  if(audit.domesticPriceEvidence){const p=audit.domesticPriceEvidence;
   worksheet.append(element('h5','Domestic natural gas price context'),element('p',p.status));
   for(const o of p.observations)worksheet.append(element('p',o.year+' '+o.hub+': $'+o.valueUsdPerMMBtu.toFixed(2)+'/MMBtu ('+o.method+')'));
   worksheet.append(element('p','Comparability: '+p.sourceComparability),element('p','Attribution: '+p.causality),element('p','Cost evidence needed: '+p.verificationNeeded),element('p','Export-attributable household cost: NOT ESTABLISHED'));
   sourceLinks(worksheet,p.observations.map(o=>o.source));
  }
  if(audit.costIncidenceLedger){const ledger=audit.costIncidenceLedger;
   worksheet.append(element('h5','Who benefits and who pays?'),element('p',ledger.status),element('p',ledger.scope));
   for(const [heading,entries] of [['Potential beneficiaries',ledger.beneficiaries],['Potential payers and costs',ledger.payers]]){
    worksheet.append(element('h5',heading));const items=element('ul');
    for(const item of entries)items.append(element('li',item.party+' — '+item.measure+'. '+item.state+'; evidence needed: '+item.sourceGap+'.'));
    worksheet.append(items);
   }
   worksheet.append(element('h5','Net benefit calculation'),element('p',ledger.accountingRule),element('p','Counterfactual: '+ledger.counterfactual),element('p','Foreign-policy test: '+ledger.foreignPolicyTest),element('p','Net U.S. benefit: NOT ESTABLISHED · Influence score: NOT SCORED'));
  }
  if(audit.deliveryEvidence){const d=audit.deliveryEvidence;
   worksheet.append(element('h5','Verified destination deliveries'),element('p',d.region+' · '+d.period+': '+d.baselineBcfPerDay+' → '+d.outcomeBcfPerDay+' billion cubic feet per day (+'+d.changeBcfPerDay+' Bcf/d).'),element('p',d.interpretation),element('p','Source independence: '+d.independenceCaution),element('p','Still unresolved: '+d.remaining));sourceLinks(worksheet,d.sourceIds);
  }
 }
 }else{worksheet.hidden=true;}

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
})()