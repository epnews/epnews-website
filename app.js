// EP News interface and article rendering. Story content is maintained separately in content/stories.js.
const date=new Date();document.querySelector('#dateline').textContent=new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(date).toUpperCase();document.querySelector('#front-date').textContent=new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric'}).format(date).toUpperCase();const yearElement=document.querySelector('#year');if(yearElement)yearElement.textContent=date.getFullYear();
const byId=id=>STORIES.find(s=>s.id===id);const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function openStory(id){location.assign('/article/'+encodeURIComponent(id))}
function editorPicks(){document.querySelector('#editor-picks').innerHTML=EDITORIAL.editorPicks.filter(id=>byId(id)).map((id,i)=>{let s=byId(id);return `<article class="pick story-open" data-story="${id}" tabindex="0" role="button"><span class="pick-num">0${i+1}</span><div>${imageMarkup(s,"pick-image")}<small>${escapeHtml(s.type)}</small><h3>${escapeHtml(s.title)}</h3></div></article>`}).join('')}
function wireInit(){const list=document.querySelector('#wire-list');let filt='all',limit=10;const render=()=>{let arr=EDITORIAL.wire.map(byId).filter(s=>s&&s.status==='published').filter(s=>filt==='all'||s.category===filt);list.innerHTML=arr.slice(0,limit).map((s,i)=>`<article class="wire-item story-open" data-story="${s.id}" tabindex="0" role="button"><span class="wire-time">DESK ${String(i+1).padStart(2,'0')}</span>${imageMarkup(s,"wire-image")}<div class="wire-copy"><strong>${escapeHtml(s.title)}</strong><small>${escapeHtml(s.deck)}</small></div><span class="wire-type ${s.type.includes('ANALYSIS')?'context':''}">${escapeHtml(s.type)}</span></article>`).join('');document.querySelector('#more-wire').hidden=limit>=arr.length};document.querySelector('#wire-filters').addEventListener('click',e=>{const b=e.target.closest('button[data-filter]');if(!b)return;filt=b.dataset.filter;limit=10;document.querySelectorAll('.wire-filters button').forEach(x=>x.classList.toggle('active',x===b));render()});document.querySelector('#more-wire').addEventListener('click',()=>{limit+=10;render()});render()}
function sidebars(){document.querySelector('#radar-list').innerHTML=RADAR.map((r,i)=>`<div class="radar-item"><b>${String(i+1).padStart(2,'0')}</b><div>${escapeHtml(r)}</div></div>`).join('');document.querySelector('#analysis-list').innerHTML=EDITORIAL.analysis.filter(id=>byId(id)).map(id=>{let s=byId(id);return `<div class="analysis-item story-open" role="button" tabindex="0" data-story="${id}"><small>${escapeHtml(s.type)}</small><strong>${escapeHtml(s.title)}</strong></div>`}).join('')}
function sourceLink(source, inline = false) {
 if (!source || !validUrl(source.url)) return '';
 const host = new URL(source.url).hostname.replace(/^www\./, '');
 const label = String(source.label || '').trim();
 const accessibleName = label && !validUrl(label) ? label : host;
 const link = '<a' + (inline ? ' class="inline-source"' : '') + ' href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Source: ' + escapeHtml(accessibleName) + '" title="' + escapeHtml(accessibleName) + '">Source</a>';
 if (inline) return ' ' + link;
 const name = label.split(/\s+[—–]\s+|:\s+/)[0];
 const publisher = name && name.length <= 48 && !validUrl(label) ? name : host;
 return escapeHtml(publisher) + ' · ' + link;
}
const validUrl=url=>{try{return ['https:','http:'].includes(new URL(url).protocol)}catch{return false}};
const safeImage=s=>{if(typeof s!=='string')return '';const u=s.trim();if(/^https?:\/\//.test(u))return u;if(/^\/?assets\/[a-zA-Z0-9_./-]+$/.test(u)&&!u.includes('..'))return '/'+u.replace(/^\//,'');return '';};
const imageMarkup=(s,cls)=>{const url=safeImage(s.image?.src);return url?`<figure class="${cls}"><img src="${escapeHtml(url)}" alt="${escapeHtml(s.image.alt||s.title)}" loading="${cls==="article-featured"?"eager":"lazy"}" decoding="async"><figcaption>${escapeHtml(s.image.credit||'')}</figcaption></figure>`:''};
const fmtDate=s=>{if(!s)return '';const d=new Date(s+'T12:00:00Z');return isNaN(d.getTime())?'':new Intl.DateTimeFormat('en-US',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(d)};
function investigationBlocks(s) {
 if(!Array.isArray(s.sections)||!s.sections.length) return s.body.map(p=>'<p>'+escapeHtml(p)+'</p>').join('');
 const link=x=>sourceLink(x, true);
 return s.sections.map(b=>{
  if(b.kind==='heading')return '<h2 class="investigation-heading">'+escapeHtml(b.text||'')+'</h2>';
  if(b.kind==='paragraph')return '<p>'+escapeHtml(b.text||'')+link(b.citation)+'</p>';
  if(b.kind==='quote')return '<blockquote class="investigation-quote">'+escapeHtml(b.text||'')+'</blockquote>';
  if(b.kind==='metrics'&&Array.isArray(b.items))return '<section class="investigation-metrics" aria-label="Evidence at a glance">'+b.items.slice(0,6).map(x=>'<div><strong>'+escapeHtml(x.value||'')+'</strong><span>'+escapeHtml(x.label||'')+'</span>'+link(x.citation)+'</div>').join('')+'</section>';
  if(b.kind==='table'&&Array.isArray(b.rows))return '<div class="investigation-table-wrap"><table class="investigation-table"><caption>'+escapeHtml(b.title||'Verification')+'</caption><thead><tr>'+(b.columns||[]).slice(0,5).map(x=>'<th>'+escapeHtml(x)+'</th>').join('')+'</tr></thead><tbody>'+b.rows.slice(0,50).map(row=>'<tr>'+row.slice(0,5).map((x,i)=>'<td data-label="'+escapeHtml((b.columns||[])[i]||'')+'">'+escapeHtml(x)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
  return '';
 }).join('');
}
function chaosReports(){return STORIES.filter(s=>s.status==='published'&&(s.id==='power'||s.seriesId==='chaos')).sort((a,b)=>(b.publishedAt||'').localeCompare(a.publishedAt||''));}
function chaosHub(){const reports=chaosReports(),original=byId('power'),latest=reports.find(s=>s.id!=='power');const card=(s,featured=false)=>'<article class="series-report"><a href="/article/'+encodeURIComponent(s.id)+'" class="series-report-link">'+imageMarkup(s,'series-report-image')+'<div><small>'+escapeHtml(s.id==='power'?'ORIGINAL INVESTIGATION':(featured?'LATEST INSTALLMENT':'INVESTIGATION'))+' · '+escapeHtml(fmtDate(s.publishedAt))+'</small><h3>'+escapeHtml(s.title)+'</h3><p>'+escapeHtml(s.deck)+'</p><span>READ REPORT ↗</span></div></a></article>';return '<section class="series-hub"><a class="article-back" href="#home">← FRONT PAGE</a><div class="series-hub-kicker">EP NEWS · CONTINUING INVESTIGATION</div><h1>Who Benefits From the Chaos?</h1><p class="series-hub-deck">Following the money, measuring American gains, and identifying who bears the costs. New reports preserve earlier findings and document significant updates.</p><div class="series-hub-intro"><strong>What we investigate</strong><p>Which agreements were announced, signed, financed or implemented? What changed in American production, employment, trade and energy? Who benefits, and who pays?</p></div><h2>'+(latest?'Latest installment':'Start with the original investigation')+'</h2>'+card(latest||original,true)+'<h2>Investigation archive</h2><div class="series-report-list">'+reports.filter(s=>s.id!==(latest||original).id).map(s=>card(s)).join('')+'</div><p class="series-hub-note">Each installment has its own permanent article link. Corrections and material updates belong on the affected article with a dated update note.</p></section>';}
// Best-effort analytics: one read per article per browser tab; never block rendering.
function trackArticleRead(slug){
 try{
  const key='ep-article-read:'+slug;
  if(sessionStorage.getItem(key))return;
  const ref=document.referrer?new URL(document.referrer):null;
  const host=ref?.hostname||'';
  const tagged=new URLSearchParams(location.search).get('utm_source')?.toLowerCase();
  const source=tagged==='facebook'||/(^|\.)facebook\.com$|(^|\.)fb\.com$/.test(host)?'facebook':tagged==='google'||/(^|\.)google\.[a-z.]+$/.test(host)?'google':ref?.origin===location.origin?'internal':ref?'other':'direct';
  sessionStorage.setItem(key,'1');
  fetch('/api/article-read',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug,source}),keepalive:true}).catch(()=>{});
 }catch{}
}
function route(){if(location.hash.startsWith('#article/')){const id=decodeURIComponent(location.hash.slice(9));if(/^[a-z0-9-]+$/.test(id)){history.replaceState(null,'','/article/'+encodeURIComponent(id));}}else if(location.pathname.startsWith('/article/')&&location.hash){location.assign('/'+location.hash);return;}const pathname=location.pathname;const articlePath=pathname.match(/^\/article\/([a-z0-9-]+)\/?$/);const hash=articlePath?'article/'+articlePath[1]:(decodeURIComponent(location.hash.slice(1))||'home');const home=document.querySelector('#home-view'),view=document.querySelector('#route-view');document.querySelectorAll('#main-nav a').forEach(a=>a.classList.toggle('selected',a.dataset.nav===hash));document.querySelector('#main-nav').classList.remove('open');document.querySelector('#menu-button').setAttribute('aria-expanded','false');if(hash==='home'||hash==='latest'||hash==='investigations'||hash==='opinion'){home.hidden=false;view.hidden=true;setTimeout(()=>{if(hash!=='home')document.getElementById(hash)?.scrollIntoView({behavior:'smooth',block:'start'});else window.scrollTo(0,0)},20);return}home.hidden=true;view.hidden=false;window.scrollTo(0,0);if(hash==='series/chaos'){view.innerHTML=chaosHub();return}if(hash.startsWith('article/')){let s=byId(hash.slice(8));if(!s||s.status!=='published'){view.innerHTML='<div class="static-page"><h1>Story not found</h1><a href="#home">Return to front page</a></div>';return}trackArticleRead(s.id);view.innerHTML=`<article class="article-shell"><a href="/#home" class="article-back">← BACK TO FRONT PAGE</a><div class="article-category">${escapeHtml(s.type)}</div><h1>${escapeHtml(s.title)}</h1><p class="article-deck">${escapeHtml(s.deck)}</p><div class="article-share"><button type="button" data-share-article="${escapeHtml(s.id)}">SHARE THIS ARTICLE ↗</button> <span role="status" aria-live="polite"></span><input class="article-share-url" aria-label="Article link to copy" readonly hidden></div>${imageMarkup(s,"article-featured")}<div class="article-meta"><span>${escapeHtml(s.author||"EP News")}</span><span>${s.status==="published"&&s.publishedAt?"PUBLISHED "+escapeHtml(fmtDate(s.publishedAt)):"DEMONSTRATION — NOT PUBLISHED"}</span>${s.updatedAt?`<span>UPDATED ${escapeHtml(fmtDate(s.updatedAt))}</span>`:""}</div>${s.status==="published"?"":`<div class="article-notice"><b>DEMO CONTENT:</b> This page is a sample, not a published news report.</div>`}<div class="article-body">${(s.category==='investigations'?investigationBlocks(s):s.body.map(p=>`<p>${escapeHtml(p)}</p>`).join(''))}<h2>Sources and updates</h2>${Array.isArray(s.sources)&&s.sources.length?`<ul>${s.sources.filter(x=>x&&validUrl(x.url)).map(x=>`<li>${sourceLink(x)}</li>`).join("")}</ul>`:"<p>No documented source links included in this sample.</p>"}</div><section class="facebook-discussion"><span class="facebook-discussion-kicker">CONTINUE THE CONVERSATION</span><h2>What do you think?</h2><p>Join readers discussing this story and follow EP News on Facebook for updates.</p><a href="https://www.facebook.com/61593962901875" target="_blank" rel="noopener noreferrer" data-fb-cta="article">JOIN THE DISCUSSION ON FACEBOOK ↗</a></section><a class="article-back" href="#home">← RETURN TO FRONT PAGE</a></article>`;return}
if(['politics','world','economy'].includes(hash)){let names={politics:'U.S. Politics',world:'World Affairs',economy:'Economy & Energy'};view.innerHTML=`<section class="story-list"><a class="article-back" href="#home">← FRONT PAGE</a><h1>${names[hash]}</h1><p>Published EP News reporting in this coverage area.</p>${STORIES.filter(s=>s.category===hash&&s.status==='published').map(s=>`<article class="list-card story-open" data-story="${s.id}" tabindex="0" role="button"><span>${escapeHtml(s.type)}</span><h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.deck)}</p></article>`).join('')}</section>`;return}
let pages={about:['About EP News','EP News (EyePoker News) is an independent digital news project focused on U.S. politics, world affairs, economics, energy, and the decisions shaping society.','Our editorial ambition is to go beyond the initial headline, track evidence, and explain who benefits, who pays, and what can be verified.'],standards:['Editorial Standards','EP News aims to distinguish reported facts, independently sourced links, analysis, and opinion. We label content by type and do not present an unverified claim as established fact.','Primary documents and corroborating sources should accompany consequential claims. Corrections should be clear, dated, and visible. Demonstration content is never a substitute for reporting.'],contact:['Contact EP News','For newsroom inquiries, reach us at eyepokernews@gmail.com.','Please do not send sensitive personal information by ordinary email.'],privacy:['Privacy','EP News does not require visitor accounts. The site counts browser-tab visits, aggregate article reads by UTC hour and broad referral category, and aggregate clicks on Facebook links using Cloudflare D1. These counters do not store visitor names, IP addresses, cookies, or personal identifiers. Cloudflare may process standard connection and security logs.','Any newsletter, advertising, or analytics integration added later will require an updated privacy disclosure.']};const page=pages[hash];if(page){view.innerHTML=`<div class="static-page"><a class="article-back" href="#home">← BACK TO FRONT PAGE</a><h1>${escapeHtml(page[0])}</h1>${page.slice(1).map(t=>`<p>${escapeHtml(t)}</p>`).join('')}</div>`;return}view.innerHTML='<div class="static-page"><h1>Page not found</h1><a href="#home">Return to front page</a></div>'}
function leadPhoto(){const s=byId(EDITORIAL.lead||'power'),v=document.querySelector('.lead-visual'),url=s&&safeImage(s.image?.src);if(!v||!url)return;const art=v.querySelector('.lead-art');if(art)art.hidden=true;const im=document.createElement('img');im.className='lead-photo';im.src=url;im.alt=s.image.alt||s.title;v.prepend(im);if(s.image.credit){const credit=document.createElement('span');credit.className='lead-photo-credit';credit.textContent=s.image.credit;v.append(credit)}}
// Place the lead and headline wire in one independent column, so a tall Editor's Desk never leaves an empty region beneath the lead.
function layoutNewsColumns(){
 const container=document.querySelector('#home-view > .container');
 const feature=container?.querySelector('.feature-section');
 const under=container?.querySelector('.under-hero');
 if(!feature||!under)return;
 const layout=document.createElement('div');
 layout.className='news-columns';
 const primary=document.createElement('div');primary.className='news-primary';
 const secondary=document.createElement('div');secondary.className='news-secondary';
 const eyebrow=feature.querySelector('.eyebrow-row');
 const lead=feature.querySelector('.lead-story');
 const picks=feature.querySelector('.hero-side');
 const feed=under.querySelector('.feed-panel');
 const rail=under.querySelector('.right-rail');
 if(!eyebrow||!lead||!picks||!feed||!rail)return;
 const investigation=container.querySelector('.investigations');
 primary.append(eyebrow,lead,feed);
 // Continue the investigation coverage under the wire rather than leaving an empty desktop column.
 if(investigation) primary.append(investigation);
 secondary.append(picks,rail);
 layout.append(primary,secondary);
 container.insertBefore(layout,feature);
 feature.remove();under.remove();
}
layoutNewsColumns();
editorPicks();wireInit();sidebars();leadPhoto();window.addEventListener('hashchange',route);route();document.addEventListener('click',e=>{let card=e.target.closest('.story-open');if(card)openStory(card.dataset.story)});document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&document.activeElement.classList.contains('story-open')){e.preventDefault();openStory(document.activeElement.dataset.story)}});const menu=document.querySelector('#menu-button');menu.onclick=()=>{let nav=document.querySelector('#main-nav');let state=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(state))};const panel=document.querySelector('#search-panel');document.querySelector('#search-button').onclick=()=>{panel.hidden=!panel.hidden;if(!panel.hidden)document.querySelector('#search-input').focus()};document.querySelector('#search-close').onclick=()=>panel.hidden=true;document.querySelector('#search-input').oninput=e=>{let term=e.target.value.trim().toLowerCase();if(!term)return;let matched=STORIES.filter(s=>s.status==='published'&&(s.title+' '+s.deck+' '+s.category).toLowerCase().includes(term));document.querySelector('#home-view').hidden=true;let v=document.querySelector('#route-view');v.hidden=false;v.innerHTML=`<section class="story-list"><h1>Search results</h1><p>${matched.length} articles match “${escapeHtml(term)}”</p>${matched.map(s=>`<article class="list-card story-open" role="button" tabindex="0" data-story="${s.id}"><span>${escapeHtml(s.type)}</span><h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.deck)}</p></article>`).join('')}</section>`};document.querySelector('#subscribe-button').onclick=()=>location.hash='#contact';document.querySelector('#briefing-action').onclick=()=>location.hash='#contact';if(document.querySelector('#dismiss-demo'))document.querySelector('#dismiss-demo').onclick=()=>document.querySelector('.demo-banner')?.remove();
// Public count of browser-tab sessions since the counter was activated.
// The footer shows a dash if the database has not yet been configured.
(async function initVisitCounter(){
 const display=document.getElementById('site-visit-count');
 if(!display)return;
 try{
  const key='epnews-visit-counted-v1';
  let counted=false;
  try{counted=sessionStorage.getItem(key)==='yes';}catch{}
  let response=await fetch('/api/visits',{method:counted?'GET':'POST',cache:'no-store',headers:{'Accept':'application/json'}});
  const registered=!counted&&response.ok;
  // If registering a new session fails, still display the readable public count.
  if(!response.ok&&!counted)response=await fetch('/api/visits',{method:'GET',cache:'no-store',headers:{'Accept':'application/json'}});
  if(!response.ok)throw new Error('Counter backend unavailable');
  const data=await response.json();
  if(!Number.isSafeInteger(data.total)||data.total<0)throw new Error('Invalid visit count');
  display.textContent=new Intl.NumberFormat('en-US').format(data.total);
  display.title='Website visits since counter activation (not unique visitors)';
  if(registered){try{sessionStorage.setItem(key,'yes');}catch{}}
 }catch{display.textContent='—';display.title='Visit counter not yet configured';}
})();



// Article sharing: keep readers in place and share the permanent preview-enabled URL.
async function shareArticle(button) {
 const story = byId(button.dataset.shareArticle);
 if (!story) return;
 const container = button.closest('.article-share');
 const status = container.querySelector('[role="status"]');
 const input = container.querySelector('input');
 const url = 'https://epnews.pages.dev/article/' + encodeURIComponent(story.id);
 button.disabled = true;
 status.textContent = '';
 input.hidden = true;
 try {
  if (typeof navigator.share === 'function') {
   try {
    await navigator.share({title: story.title, url});
    return;
   } catch (error) {
    if (error.name === 'AbortError') return;
   }
  }
  try {
   await navigator.clipboard.writeText(url);
   status.textContent = 'Link copied — paste it to share.';
  } catch {
   input.value = url;
   input.hidden = false;
   input.focus();
   input.select();
   status.textContent = 'Copy this link to share the article.';
  }
 } finally {
  button.disabled = false;
 }
}
document.addEventListener('click', event => {
 const button = event.target.closest('[data-share-article]');
 if (!button) return;
 event.preventDefault();
 if (!button.disabled) shareArticle(button);
});
