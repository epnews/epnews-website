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
