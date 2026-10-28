// Independent Facebook outbound tracker. Sends a keepalive POST and exposes
// the last response for the on-site diagnostic. No user identifiers are stored.
(function(){
  const valid=new Set(['header','homepage','footer','article']);
  document.addEventListener('click',function(event){
    const link=event.target.closest && event.target.closest('a[data-fb-cta]');
    const placement=link && link.getAttribute('data-fb-cta');
    if(!valid.has(placement))return;
    const body=JSON.stringify({placement});
    window.epNewsLastFacebookTracking = fetch('/api/facebook-clicks',{
      method:'POST',
      headers:{'Content-Type':'text/plain;charset=UTF-8'},
      body,
      keepalive:true,
      cache:'no-store'
    }).then(async response=>({status:response.status,body:await response.text()}))
      .catch(error=>({status:'network error',body:String(error)}));
  });
})();
