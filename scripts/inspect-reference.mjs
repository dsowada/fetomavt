import {load} from 'cheerio';
import fs from 'node:fs/promises';
const paths=['','eventtechnik','dekoration','kontakt','impressum','datenschutz','widerruf'];
await Promise.all(paths.map(async p=>{
 const file=`reference/${p||'home'}.html`;
 if(p) {const r=await fetch(`https://r.jina.ai/https://www.fetoma-vt.de/${p}/`,{headers:{'X-Return-Format':'html'}}); await fs.writeFile(file,await r.text());}
 const html=await fs.readFile(file,'utf8');const $=load(html);
 const data={page:p||'home',images:$('img').map((i,x)=>$(x).attr()).get(),links:$('a').map((i,x)=>({text:$(x).text(),href:$(x).attr('href')})).get(),css:$('link[rel=stylesheet]').map((i,x)=>$(x).attr('href')).get()};
 await fs.writeFile(`reference/${p||'home'}.json`,JSON.stringify(data,null,2));
 console.log(JSON.stringify(data));
}));
