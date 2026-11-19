// First-party audience estimates are opt-in; legacy aggregate counts remain unchanged.
(function(){
 const key='epnews-audience-consent-v2', idKey='epnews-audience-id-v2', sessionKey='epnews-audience-session-v2';
 function allowed(){return navigator.globalPrivacyControl!==true&&navigator.doNotTrack!=='1'&&localStorage.getItem(key)==='yes';}
 function track(kind,slug){
  try{
   if(!allowed())return;
   let id=JSON.parse(localStorage.getItem(idKey)||'null');
   if(!id||Date.now()-id.created>=30*86400000){id={value:crypto.randomUUID(),created:Date.now()};localStorage.setItem(idKey,JSON.stringify(id));}
   let session=sessionStorage.getItem(sessionKey);if(!session){session=crypto.randomUUID();sessionStorage.setItem(sessionKey,session);}
   fetch('/api/audience',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({browser:id.value,session,kind,slug}),keepalive:true}).catch(()=>{});
  }catch{}
 }
 function current(){return location.pathname.match(/^\/article\/([a-z0-9-]+)\/?$/)?.[1]||location.hash.match(/^#article\/([a-z0-9-]+)$/)?.[1]||'home';}
 window.epAudienceTrack=track;
 function init(){
  try{
   const host=document.createElement('div');host.style.cssText='font-size:12px;padding:8px;text-align:center';
   const button=document.createElement('button');button.type='button';button.textContent='Audience analytics privacy settings';
   const panel=document.createElement('div');panel.hidden=true;
   const info=document.createElement('p');info.textContent='Optional audience measurement uses a random browser ID for up to 30 days and a tab session ID. No IP addresses or fingerprints are stored. Optional measurement also records visible active article time and scroll depth using a separate random view ID. Existing aggregate visit counts remain active.';
   const yes=document.createElement('button'),no=document.createElement('button');yes.type=no.type='button';yes.textContent='Allow audience measurement';no.textContent='Decline / stop measurement';
   yes.disabled=navigator.globalPrivacyControl===true||navigator.doNotTrack==='1';
   yes.onclick=()=>{try{localStorage.setItem(key,'yes');track(current()==='home'?'session':'article',current());panel.hidden=true;}catch{}};
   no.onclick=()=>{try{localStorage.setItem(key,'no');localStorage.removeItem(idKey);sessionStorage.removeItem(sessionKey);panel.hidden=true;}catch{}};
   button.onclick=()=>{panel.hidden=!panel.hidden;};panel.append(info,yes,no);host.append(button,panel);document.body.append(host);
   if(localStorage.getItem(key)===null&&!yes.disabled)panel.hidden=false;
   track(current()==='home'?'session':'article',current());
  }catch{}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
