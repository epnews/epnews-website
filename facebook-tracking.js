// Standalone Facebook outbound click tracker, independent of news application startup.
// Uses the existing Cloudflare D1 endpoint; no identifiers or cookies.
(function(){
  const valid=new Set(['header','homepage','footer','article']);
  document.addEventListener('click',function(event){
    const link=event.target.closest && event.target.closest('a[data-fb-cta]');
    const placement=link && link.getAttribute('data-fb-cta');
    if(!valid.has(placement))return;
    const body=JSON.stringify({placement});
    try{
      if(navigator.sendBeacon && navigator.sendBeacon('/api/facebook-clicks',body))return;
    }catch(error){console.warn('Facebook beacon failed',error);}
    fetch('/api/facebook-clicks',{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},body,keepalive:true}).catch(error=>console.warn('Facebook tracking failed',error));
  });
})();
