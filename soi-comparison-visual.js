/* Read-only visual comparisons: descriptive agreement, never an influence score. */
(()=>{'use strict';
const ids=['us','china','russia','eu','india'];
const names={us:'United States',china:'China',russia:'Russia',eu:'European Union',india:'India'};
const pct=v=>Number(v).toFixed(1)+'%';
const pp=v=>(v>0?'+':'')+v.toFixed(1)+' pp';
function init(){
 const host=document.getElementById('chaos-comparison-table');
 const a=document.getElementById('chaos-compare-a'),b=document.getElementById('chaos-compare-b'),dim=document.getElementById('chaos-compare-dimension');
 if(!host||!a||!b||!dim)return;
 const visual=document.createElement('section');visual.id='chaos-comparison-visual';visual.setAttribute('aria-label','Visual evidence comparison');
 host.parentNode.insertBefore(visual,host);
 const archive=document.createElement('details');archive.className='chaos-comparison-archive';
 const summary=document.createElement('summary');summary.textContent='Detailed source evidence table';archive.append(summary);
 host.parentNode.insertBefore(archive,host);archive.append(host);
 const el=(tag,content,cls)=>{const node=document.createElement(tag);if(content!==undefined)node.textContent=content;if(cls)node.className=cls;return node;};
 let source=null;
 function render(){
  visual.replaceChildren();
  if(a.value===b.value){visual.append(el('p','Choose two different spheres to compare.'));return;}
  visual.append(el('h4',names[a.value]+' vs '+names[b.value]));
  const requested=dim.value;
  if(requested==='Economic'||requested==='Strategic'){
   const spec=requested==='Economic'?{metric:'gdp-growth-2025',label:'2025 real GDP growth',unit:'%',source:'World Bank'}:{metric:'sipri-real-change-2025',label:'2025 real military spending change',unit:'%',source:'SIPRI'};
   const actors=window.EP_CHAOS_DATA&&window.EP_CHAOS_DATA.actors;
   const x=actors&&actors[a.value]&&actors[a.value][requested],y=actors&&actors[b.value]&&actors[b.value][requested];
   if(!x||!y||x.metric!==spec.metric||y.metric!==spec.metric||!Number.isFinite(x.number)||!Number.isFinite(y.number)){
    visual.append(el('p','Matching source observations are unavailable for this pair. Consult the detailed evidence table.'));return;
   }
   visual.append(el('h5',spec.label));
   const cards=el('div',undefined,'chaos-visual-comparison-cards');
   for(const [name,item] of [[names[a.value],x],[names[b.value],y]]){
    const card=el('div',undefined,'chaos-visual-comparison-card');
    card.append(el('strong',name),el('div',(item.number>0?'+':'')+item.number.toFixed(2)+spec.unit,'chaos-visual-big'),el('small',item.period||'2025'));
    cards.append(card);
   }
   visual.append(cards,el('p','Difference ('+names[a.value]+' minus '+names[b.value]+'): '+pp(x.number-y.number)+'. Both figures are rates of change, not absolute GDP or military spending levels.'));
   visual.append(el('p','Source: '+spec.source+' as documented in each sphere’s original evidence record. The difference is not a geopolitical influence score or an overall winner.'));
   return;
  }
  if(requested==='All dimensions'){
   const actors=window.EP_CHAOS_DATA&&window.EP_CHAOS_DATA.actors;
   const left=actors&&actors[a.value],right=actors&&actors[b.value];
   if(!left||!right){visual.append(el('p','Comparable observations are unavailable. Open the detailed evidence table below.'));return;}
   visual.append(el('p','Matched observations for the selected spheres. Each row uses its own units and year; differences are descriptive, not a combined power score.'));
   const table=el('table');const head=el('thead');const header=el('tr');
   for(const label of ['Measure',names[a.value],names[b.value],'Difference (A − B)'])header.append(el('th',label));head.append(header);table.append(head);
   const body=el('tbody');
   const measures=[
    {label:'Economic · 2025 real GDP growth',key:'Economic',metric:'gdp-growth-2025',unit:'%',diff:'pp'},
    {label:'Strategic · 2025 real military spending change',key:'Strategic',metric:'sipri-real-change-2025',unit:'%',diff:'pp'}
   ];
   for(const m of measures){
    const x=left[m.key],y=right[m.key],matched=x&&y&&x.metric===m.metric&&y.metric===m.metric&&Number.isFinite(x.number)&&Number.isFinite(y.number);
    const row=el('tr');row.append(el('th',m.label));
    row.append(el('td',matched?x.number.toFixed(2)+m.unit:'Not comparable'));
    row.append(el('td',matched?y.number.toFixed(2)+m.unit:'Not comparable'));
    row.append(el('td',matched?pp(x.number-y.number):'—'));body.append(row);
   }
   const energy={us:-9.78127421443322,china:24.0191966181448,russia:-70.7306703064017,india:36.0305276064275,eu:61.51735784436232};
   const eA=energy[a.value],eB=energy[b.value];
   const row=el('tr');row.append(el('th','Energy · 2024 net energy imports (% of use)'));
   row.append(el('td',eA.toFixed(2)+'%'+(a.value==='eu'?' (modeled)':'')));
   row.append(el('td',eB.toFixed(2)+'%'+(b.value==='eu'?' (modeled)':'')));
   row.append(el('td',pp(eA-eB)));body.append(row);table.append(body);
   const wrap=el('div',undefined,'chaos-table-scroll');wrap.append(table);visual.append(wrap);
   visual.append(el('p','Energy: negative = net exporter; positive = net importer. EU-27 is an EP News calibrated estimate, not an official 2024 IEA observation. The other four are IEA-sourced World Bank figures.'));
   visual.append(el('p','Economic and strategic observations are matched 2025 indicators from the existing meter evidence; growth rates and military spending changes are not equivalent to geopolitical influence. The separate Energy and resources selection provides source links and full provenance.'));
   return;
  }
  if(requested==='Energy and resources'){
   const rows={
    us:{value:-9.78127421443322,code:'USA',status:'Official IEA-sourced WDI'},
    china:{value:24.0191966181448,code:'CHN',status:'Official IEA-sourced WDI'},
    russia:{value:-70.7306703064017,code:'RUS',status:'Official IEA-sourced WDI'},
    india:{value:36.0305276064275,code:'IND',status:'Official IEA-sourced WDI'},
    eu:{value:61.51735784436232,code:'EUU',status:'Modeled Eurostat + four-year historical calibration'}
   };
   const left=rows[a.value],right=rows[b.value];
   if(!left||!right){visual.append(el('p','Energy import-dependence observations are unavailable for this selection.'));return;}
   visual.append(el('h5','2024 net energy imports · % of energy use'));
   visual.append(el('p','Positive values mean net energy imports; negative values mean net energy exports. This measures energy trade dependence, not geopolitical power or a command-meter score.'));
   const cards=el('div',undefined,'chaos-visual-comparison-cards');
   for(const [name,item] of [[names[a.value],left],[names[b.value],right]]){
    const card=el('div',undefined,'chaos-visual-comparison-card');
    card.append(el('strong',name),el('div',(item.value>0?'+':'')+item.value.toFixed(2)+'%','chaos-visual-big'),el('small',item.status));
    card.append(el('p',item.value<0?'Net exporter':'Net importer'));
    cards.append(card);
   }
   visual.append(cards,el('p','Signed difference ('+names[a.value]+' minus '+names[b.value]+'): '+pp(left.value-right.value)+'. This is a descriptive percentage-point gap, not a winner or ranking.'));
   const note=el('p','EU-27 2024 is an EP News modeled estimate (Eurostat direct TES ratio 61.035% + historical adjustment 0.482 pp = 61.52%); not a published IEA observation. The other four values are World Bank WDI EG.IMP.CONS.ZS observations sourced to IEA.');visual.append(note);
   const link=el('a','World Bank source data');link.href='https://api.worldbank.org/v2/country/RUS;USA;CHN;IND;EUU/indicator/EG.IMP.CONS.ZS?format=json&date=2024';link.target='_blank';link.rel='noopener noreferrer';visual.append(link);
   const euLink=el('a',' · Eurostat EU27 source');euLink.href='https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_bal_s?geo=EU27_2020&freq=A&siec=TOTAL&unit=KTOE&time=2024&nrg_bal=IMP&nrg_bal=EXP&nrg_bal=NRGSUP';euLink.target='_blank';euLink.rel='noopener noreferrer';visual.append(euLink);
   return;
  }
  if(requested!=='All dimensions'&&requested!=='Diplomatic'){
   visual.append(el('p','This dimension currently has different indicators, periods or units. The detailed evidence table below shows each side; a numerical winner cannot be calculated responsibly.'));
   return;
  }
  if(!source||!window.EPInternationalAlignment){visual.append(el('p','Verified voting-alignment comparisons are loading or unavailable. The source evidence table remains accessible.'));return;}
  let x,y;try{x=window.EPInternationalAlignment.build(source,a.value);y=window.EPInternationalAlignment.build(source,b.value);}catch(e){visual.append(el('p','Alignment data failed validation. No comparison shown.'));return;}
  visual.append(el('p','International Alignment · UN recorded-vote agreement with the same fixed 160-country external cohort. This is not diplomatic influence, an overall score or a geopolitical ranking.'));
  const lastX=x.years[3],lastY=y.years[3],delta=lastX.percentage-lastY.percentage;
  const cards=el('div',undefined,'chaos-visual-comparison-cards');
  for(const [label,item] of [[names[a.value],lastX],[names[b.value],lastY]]){
   const card=el('div',undefined,'chaos-visual-comparison-card');
   card.append(el('strong',label),el('div',pct(item.percentage),'chaos-visual-big'),el('small','2024 agreement · '+item.agreements.toLocaleString()+' / '+item.denominator.toLocaleString()+' matched vote pairs'));
   const track=el('div',undefined,'chaos-visual-bar-track');track.setAttribute('role','img');track.setAttribute('aria-label',label+' '+pct(item.percentage));
   const fill=el('div',undefined,'chaos-visual-bar-fill');fill.style.width=Math.max(0,Math.min(100,item.percentage))+'%';track.append(fill);card.append(track);cards.append(card);
  }
  visual.append(cards,el('p','2024 difference: '+pp(delta)+' ('+names[a.value]+' minus '+names[b.value]+'). This describes vote agreement only, not which sphere is more influential.'));
  const trend=el('div',undefined,'chaos-visual-trend');
  trend.append(el('h5','Historical agreement · 2021–2024'));
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 560 245');svg.setAttribute('role','img');svg.setAttribute('aria-label','2021 through 2024 voting agreement trend for '+names[a.value]+' and '+names[b.value]);svg.style.maxWidth='100%';
  const node=(tag,attrs,text)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));if(text!==undefined)n.textContent=text;svg.append(n);return n;};
  for(const tick of [0,25,50,75,100]){const yy=195-tick*1.55;node('line',{x1:50,y1:yy,x2:535,y2:yy,stroke:'currentColor','stroke-opacity':'.2'});node('text',{x:8,y:yy+4,fill:'currentColor','font-size':12},tick+'%');}
  const xx=i=>60+i*150,yy=v=>195-v*1.55;
  for(let i=0;i<4;i++)node('text',{x:xx(i)-14,y:225,fill:'currentColor','font-size':13},String(x.years[i].year));
  for(const [series,color,label] of [[x,'#2c80d3',names[a.value]],[y,'#e59b33',names[b.value]]]){
   node('polyline',{points:series.years.map((r,i)=>xx(i)+','+yy(r.percentage)).join(' '),fill:'none',stroke:color,'stroke-width':4,'stroke-linejoin':'round'});
   series.years.forEach((r,i)=>node('circle',{cx:xx(i),cy:yy(r.percentage),r:5,fill:color}));
  }
  trend.append(svg,el('p',names[a.value]+': '+pct(x.years[0].percentage)+' → '+pct(lastX.percentage)+' ('+pp(lastX.percentage-x.years[0].percentage)+'). '+names[b.value]+': '+pct(y.years[0].percentage)+' → '+pct(lastY.percentage)+' ('+pp(lastY.percentage-y.years[0].percentage)+').'));
  const legend=el('p',undefined,'chaos-visual-legend');legend.append(el('span','● '+names[a.value]+'  ', 'chaos-visual-legend-a'),el('span','● '+names[b.value],'chaos-visual-legend-b'));trend.append(legend);visual.append(trend);
  visual.append(el('p','Methodology: fixed 160-country external partner universe; only recorded Y/N/A vote pairs count. EU uses a member-state majority proxy. Changing UN agendas and missing votes limit year-to-year interpretation. Percentages are descriptive and must not be added to the command meter.'));
 }
 for(const control of [a,b,dim])control.addEventListener('change',render);
 fetch('data/soi-international-alignment-original-archive-reproduction-20261102.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('unavailable');return r.json();}).then(d=>{if(!window.EPInternationalAlignment)throw Error('adapter missing');for(const id of ids)window.EPInternationalAlignment.build(d,id);source=d;render();}).catch(()=>render());
 render();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
