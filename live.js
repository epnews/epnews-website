// Publisher-configured official destinations; no unverified embeds.
(async function(){
const title=document.getElementById('event-title'),desc=document.getElementById('event-description'),player=document.getElementById('player'),name=document.getElementById('source-name'),link=document.getElementById('source-link'),choices=document.getElementById('source-choices');
const allowed=new Set(['www.livenowfox.com','livenowfox.com','www.youtube.com','youtube.com','stream.skynews.com.au']);
function validUrl(url){try{const u=new URL(url);return u.protocol==='https:'&&allowed.has(u.hostname);}catch{return false;}}
function render(source,button){
 for(const b of choices.querySelectorAll('button')){const active=b===button;b.setAttribute('aria-pressed',String(active));b.classList.toggle('selected',active);}
 name.textContent='Selected provider: '+source.name;
 link.hidden=false;link.href=source.url;link.textContent='Open '+source.name+' at official source ↗';
 const box=document.createElement('div');box.className='empty';const heading=document.createElement('strong');heading.textContent='OPEN OFFICIAL NEWS SOURCE';const p=document.createElement('p');p.textContent='The previous video was unavailable. Open '+source.name+' using the verified provider link below. Live playback on the provider site is subject to availability.';box.append(heading,p);player.replaceChildren(box);
}
try{
 const response=await fetch('live-config.json',{cache:'no-store'});if(!response.ok)throw Error('Config unavailable');const config=await response.json();if(config.title)title.textContent=config.title;if(config.description)desc.textContent=config.description;
 const sources=Array.isArray(config.sources)?config.sources.filter(s=>s&&typeof s.name==='string'&&validUrl(s.url)):[];
 if(!sources.length)return;
 for(const source of sources){const button=document.createElement('button');button.type='button';button.textContent=source.name;button.addEventListener('click',()=>render(source,button));choices.append(button);}
 const selected=sources.findIndex(s=>s.key===config.defaultSource);const index=selected<0?0:selected;render(sources[index],choices.children[index]);
}catch(error){console.warn('Live coverage configuration could not be loaded',error);}
})();
