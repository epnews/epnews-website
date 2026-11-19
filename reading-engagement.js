// Separate opt-in; no persistent browser or session identifiers.
(function(){
 const key='epnews-reading-consent-v1';
 let state=null;
 const allowed=()=>navigator.globalPrivacyControl!==true&&navigator.doNotTrack!=='1'&&localStorage.getItem(key)==='yes';
 function send(){
  if(!state||!allowed())return;
  const {id,slug,source,campaign,seconds,depth}=state;
  fetch('/api/reading-engagement',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,slug,source,campaign,seconds:Math.floor(seconds),depth}),keepalive:true}).catch(()=>{});
 }
 function tick(){
  try{
   if(!allowed()){state=null;return;}
   const body=document.querySelector('#route-view:not([hidden]) .article-body');
   const slug=location.pathname.match(/^\/article\/([a-z0-9-]+)\/?$/)?.[1];
   if(!body||!slug){if(state)send();state=null;return;}
   if(!state||state.slug!==slug||state.body!==body){
    if(state)send();
    const p=new URLSearchParams(location.search),tag=p.get('utm_source'),c=p.get('utm_content')||'';
    if(c.startsWith('diagnostic-')){state=null;return;}
    const source=['facebook','youtube'].includes(tag)?tag:'untagged';
    state={id:crypto.randomUUID(),slug,body,source,campaign:source!=='untagged'&&/^[a-z0-9-]{1,100}$/.test(c)?c:'',seconds:0,depth:0,last:performance.now(),sent:0};
   }
   const now=performance.now(),delta=Math.min(2,(now-state.last)/1000);state.last=now;
   if(document.visibilityState==='visible'&&document.hasFocus()){
    const rect=body.getBoundingClientRect();
    if(rect.top<innerHeight&&rect.bottom>0){
     state.seconds=Math.min(1800,state.seconds+delta);
     state.depth=Math.max(state.depth,Math.min(100,Math.max(0,Math.floor((innerHeight-rect.top)/Math.max(1,rect.height)*100))));
    }
   }
   if(state.seconds-state.sent>=15){state.sent=state.seconds;send();}
  }catch{}
 }
 function init(){
  const host=document.createElement('div');host.style.cssText='font-size:12px;padding:8px;text-align:center';
  const toggle=document.createElement('button');toggle.textContent='Reading engagement privacy settings';toggle.type='button';
  const panel=document.createElement('div');panel.hidden=true;
  const info=document.createElement('p');info.textContent='Optional reading measurement records visible, focused article time and maximum scroll depth, article and tagged campaign. A random ID identifies only this article view, not your browser. No IP or fingerprint is stored in these analytics. You can decline or stop at any time.';
  const yes=document.createElement('button'),no=document.createElement('button');yes.type=no.type='button';yes.textContent='Allow reading measurement';no.textContent='Decline / stop reading measurement';
  yes.disabled=navigator.globalPrivacyControl===true||navigator.doNotTrack==='1';
  yes.onclick=()=>{try{localStorage.setItem(key,'yes');panel.hidden=true;tick();}catch{}};
  no.onclick=()=>{try{localStorage.setItem(key,'no');state=null;panel.hidden=true;}catch{}};
  toggle.onclick=()=>{panel.hidden=!panel.hidden;};panel.append(info,yes,no);host.append(toggle,panel);document.body.append(host);
  if(localStorage.getItem(key)===null&&!yes.disabled)panel.hidden=false;
  setInterval(tick,1000);addEventListener('pagehide',()=>{try{send();}catch{}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){try{send();}catch{}}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
