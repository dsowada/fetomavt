import fs from 'node:fs/promises';import {load} from 'cheerio';
export async function legalContent(page){
 const $=load(await fs.readFile(`reference/${page}.html`,'utf8'));
 const inner=$('section [data-testid="static-text-element"] .Rjf5Z>div').map((i,e)=>$(e).html()).get().join('\n');
 const fragment=load(inner,null,false);
 fragment('[data-cfemail]').each((i,e)=>{const hex=fragment(e).attr('data-cfemail');const key=parseInt(hex.slice(0,2),16);const mail=hex.slice(2).match(/../g).map(x=>String.fromCharCode(parseInt(x,16)^key)).join('');fragment(e).text(mail).attr('href','mailto:'+mail);});
 fragment('h1,h2,h3').each((i,e)=>{if(!fragment(e).text().trim())fragment(e).remove();});
 fragment('*').each((i,e)=>{for(const attr of Object.keys(e.attribs||{})){if(!['href','id','target','rel'].includes(attr))fragment(e).removeAttr(attr);}});
 if(page==='datenschutz'){
  const links=fragment('a[href^="#"]').map((i,e)=>({id:fragment(e).attr('href').slice(1),label:fragment(e).text().trim()})).get();
  for(const {id,label} of links){const h=fragment('h2,h3').filter((i,e)=>fragment(e).text().trim()===label).first();h.attr('id',id);}
 }
 let html=fragment.html();
 if(page==='impressum'){const props=JSON.parse(await fs.readFile('reference/jimdo-props.json','utf8'));html+=`<p>Bildnachweis: ${props.imageAttributions.join(', ')}</p>`;}
 return `<article class="container legal-content">${html}</article>`;
}
