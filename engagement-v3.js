// Opt-in article engagement; no browser identifier is sent to this endpoint.
(function(){
 let state=null,last=performance.now(),activity=last;
 const allowed=()=>{try{return localStorage.getItem('epnews-audience-consent-v2')==='yes'&&navigator.globalPrivacyControl!==true&&navigator.doNotTrack!=='1';}catch{return false;}};
 function send(s){if(!s||!allowed())return;const body=JSON.stringify({view:s.id,slug:s.slug,seconds:Math.min(1800,Math.floor(s.ms/1000)),depth:s.depth});fetch('/api/engagement',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true}).catch(()=>{});}
 function current(){return location.pathname.match(/^\/article\/([a-z0-9-]+)\/?$/)?.[1]||location.hash.match(/^#article\/([a-z0-9-]+)$/)?.[1]||null;}
 function tick(){
  const now=performance.now(),delta=Math.min(2000,Math.max(0,now-last));last=now;
  if(!allowed()){state=null;return;}
  const slug=current(),body=document.querySelector('#route-view:not([hidden]) .article-body');
  if(!slug||!body){if(state)send(state);state=null;return;}
  if(!state||state.slug!==slug||state.body!==body){if(state)send(state);state={id:crypto.randomUUID(),slug,body,ms:0,depth:0,sent:now};activity=now;send(state);}
  if(document.visibilityState==='visible'&&document.hasFocus()){
   const rect=body.getBoundingClientRect();
   if(rect.bottom>0&&rect.top<innerHeight){
    if(now-activity<=30000)state.ms=Math.min(1800000,state.ms+delta);
    if(rect.height>0)state.depth=Math.max(state.depth,Math.max(0,Math.min(100,Math.floor((innerHeight-rect.top)/rect.height*100))));
   }
  }
  if(now-state.sent>=15000){send(state);state.sent=now;}
 }
 for(const name of ['scroll','pointerdown','keydown','touchstart'])window.addEventListener(name,()=>{activity=performance.now();},{passive:true});
 document.addEventListener('visibilitychange',()=>{last=performance.now();if(document.hidden)send(state);else activity=last;});
 window.addEventListener('pagehide',()=>send(state));
 setInterval(()=>{try{tick();}catch{}},1000);
})();
