// Default deny. Enable only after documented jurisdiction review and publisher approval.
export function automaticReading(request,env){
 const cf=request.cf||{};
 const region=cf.country==='US'&&cf.regionCode?'US-'+cf.regionCode:cf.country;
 const approved=(env.EP_READING_OPTOUT_REGIONS||'').split(',').map(x=>x.trim());
 return env.EP_READING_OPTOUT_ENABLED==='true'&&Boolean(region)&&approved.includes(region)&&request.headers.get('Sec-GPC')!=='1'&&request.headers.get('DNT')!=='1';
}
export function onRequestGet({request,env}){
 return new Response(JSON.stringify({automaticReading:automaticReading(request,env)}),{headers:{'Content-Type':'application/json','Cache-Control':'private, no-store','Vary':'Sec-GPC, DNT'}});
}
