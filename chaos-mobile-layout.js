/* Mobile-only layout enhancement; preserves original data, selectors, IDs and needle. */
(()=>{'use strict';function init(){if(!window.matchMedia('(max-width:700px)').matches)return;const root=document.getElementById('chaos-dashboard');if(!root||root.dataset.mobileOrganized==='true')return;root.dataset.mobileOrganized='true';
const wrap=(node,title)=>{if(!node||node.closest('.chaos-mobile-drawer'))return;const d=document.createElement('details');d.className='chaos-mobile-drawer';const s=document.createElement('summary');s.textContent=title;d.append(s);node.parentNode.insertBefore(d,node);d.append(node);};
const gate=root.querySelector('#gate-alsi-operator-evidence');
const recent=root.querySelector('.chaos-recent');if(gate&&recent)recent.append(gate);
wrap(recent,'LATEST INVESTIGATION UPDATES');
const comparison=root.querySelector('#soi-unga-restricted-comparison');wrap(comparison,'DIPLOMATIC VOTING COMPARISON · DETAILS');
/* Mobile jump navigation opens nested evidence drawers before scrolling; no data or meter mutations. */
const nav=document.createElement('nav');nav.className='chaos-mobile-quick-nav';nav.setAttribute('aria-label','Investigation quick navigation');
const targets=[['Meter','#chaos-meter'],['Indicators','#chaos-year-comparison'],['Compare spheres','.chaos-compare'],['Evidence','#chaos-indicator-cards']];
for(const [label,selector] of targets){const target=root.querySelector(selector);if(!target)continue;const button=document.createElement('button');button.type='button';button.textContent=label;button.addEventListener('click',()=>{let ancestor=target.parentElement;while(ancestor&&ancestor!==root){if(ancestor.tagName==='DETAILS')ancestor.open=true;ancestor=ancestor.parentElement;}target.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});nav.append(button);}
if(nav.children.length){const heading=root.querySelector('h2');if(heading)heading.insertAdjacentElement('afterend',nav);else root.prepend(nav);}
const intro=root.querySelector(':scope > p');if(intro)intro.classList.add('chaos-mobile-intro');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init()})();
