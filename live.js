// Publisher-configured sources only. Never load arbitrary iframe URLs.
(async function(){
const title=document.getElementById('event-title'),desc=document.getElementById('event-description'),player=document.getElementById('player'),name=document.getElementById('source-name'),link=document.getElementById('source-link'),choices=document.getElementById('source-choices');
const validId=id=>typeof id==='string'&&/^[A-Za-z0-9_-]{11}$/.test(id);
const validUrl=url=>typeof url==='string'&&/^https:\/\/(www\.)?youtube\.com\//.test(url);
function render(source,button){
 for(const b of choices.querySelectorAll('button')){const active=b===button;b.setAttribute('aria-pressed',String(active));b.classList.toggle('selected',active);}
 name.textContent='Broadcast source: '+source.name;
 link.hidden=!validUrl(source.url);if(!link.hidden)link.href=source.url;
 if(validId(source.youtubeVideoId)){
  const iframe=document.createElement('iframe');iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(source.youtubeVideoId)+'?rel=0';iframe.title='News broadcast from '+source.name;iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';player.replaceChildren(iframe);
 }else{
  const box=document.createElement('div');box.className='empty';const heading=document.createElement('strong');heading.textContent='WATCH ON THE OFFICIAL CHANNEL';const p=document.createElement('p');p.textContent='An embeddable live video has not been verified for '+source.name+'. Use “Watch at source” below.';box.append(heading,p);player.replaceChildren(box);
 }
}
try{
 const response=await fetch('live-config.json',{cache:'no-store'});if(!response.ok)throw Error('Config unavailable');const config=await response.json();if(config.title)title.textContent=config.title;if(config.description)desc.textContent=config.description;
 const sources=Array.isArray(config.sources)?config.sources.filter(s=>s&&typeof s.name==='string'&&validUrl(s.url)):[];
 if(!sources.length)return;
 for(const source of sources){const button=document.createElement('button');button.type='button';button.textContent=source.name;button.addEventListener('click',()=>render(source,button));choices.append(button);}
 const selected=sources.findIndex(s=>s.key===config.defaultSource);const index=selected<0?0:selected;render(sources[index],choices.children[index]);
}catch(error){console.warn('Live coverage configuration could not be loaded',error);}
})();
