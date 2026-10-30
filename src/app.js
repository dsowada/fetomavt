document.documentElement.classList.add('js-ready');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(restore=false){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.querySelector('.menu-symbol').textContent='☰';if(restore)toggle.focus();}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);toggle.querySelector('.menu-symbol').textContent=open?'×':'☰';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
matchMedia('(min-width: 901px)').addEventListener('change',()=>closeMenu());
const panel=document.querySelector('#cookie-panel');let previousFocus;
function openCookies(){previousFocus=document.activeElement;panel.hidden=false;panel.scrollIntoView({block:'center'});panel.querySelector('button').focus({preventScroll:true});}
document.querySelectorAll('[data-cookie-open]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openCookies();}));
document.querySelectorAll('[data-cookie-save]').forEach(el=>el.addEventListener('click',()=>{try{localStorage.setItem('fetoma-privacy',JSON.stringify({choice:el.dataset.cookieSave,date:new Date().toISOString(),version:1}));}catch{}panel.hidden=true;previousFocus?.focus({preventScroll:true});document.querySelector('#privacy-status')?.replaceChildren(document.createTextNode('Deine Auswahl wurde gespeichert. Es werden keine optionalen Inhalte geladen.'));}));
document.querySelector('[data-cookie-close]')?.addEventListener('click',()=>{panel.hidden=true;previousFocus?.focus({preventScroll:true});});
const form=document.querySelector('#inquiry-form');
if(form){document.querySelector('#prepare-message').disabled=false;form.addEventListener('submit',e=>{
 e.preventDefault();const data=new FormData(form);const value=name=>String(data.get(name)||'').trim()||'noch offen';
 const offer=String(data.get('offer')||'');const date=String(data.get('date')||'');const displayDate=date?date.split('-').reverse().join('.'):'noch offen';
 const text=`Hallo FeToMa, ich möchte ${offer?'„'+offer+'“':'Eventtechnik oder Dekoration'} unverbindlich anfragen.\n\nDatum: ${displayDate}\nOrt: ${value('location')}\nAnlass: ${value('occasion')}\nGästezahl: ${value('guests')}\n\nMeine Wünsche: ${value('wishes')}`;
 const preview=document.querySelector('#message-preview');document.querySelector('#prepared-text').value=text;document.querySelector('#prepared-link').href='https://wa.me/491719108314?text='+encodeURIComponent(text);preview.hidden=false;preview.scrollIntoView({block:'center'});document.querySelector('#prepared-text').focus({preventScroll:true});
});}
