import {contact,privacySettings,withdrawal} from '../src/contact.mjs';
import fs from 'node:fs/promises';import {layout} from '../src/components.mjs';import {home} from '../src/home.mjs';import {eventtechnik,decoration} from '../src/catalog.mjs';
await fs.rm('dist',{recursive:true,force:true});await fs.mkdir('dist',{recursive:true});await fs.cp('assets','dist/assets',{recursive:true});
for(const name of ['styles.css','app.js'])await fs.copyFile('src/'+name,'dist/'+name);
await fs.writeFile('dist/index.html',layout('Eventtechnik & Dekoration für deine Feier',home()));
console.log('Statische Website in dist/ erstellt.');

for(const [path,title,content] of [['eventtechnik','Eventtechnik',eventtechnik()],['dekoration','Dekoration',decoration()]]){await fs.mkdir('dist/'+path,{recursive:true});await fs.writeFile('dist/'+path+'/index.html',layout(title,content,'/'+path+'/'));}

for(const [path,title,content] of [['kontakt','Kontakt',contact()],['cookie-einstellungen','Cookie-Einstellungen',privacySettings()],['widerruf','Vertrag widerrufen',withdrawal()]]){await fs.mkdir('dist/'+path,{recursive:true});await fs.writeFile('dist/'+path+'/index.html',layout(title,content,'/'+path+'/'));}
const {legalContent}=await import('./legal.mjs');
for(const path of ['impressum','datenschutz']){await fs.mkdir('dist/'+path,{recursive:true});await fs.writeFile('dist/'+path+'/index.html',layout(path==='impressum'?'Impressum':'Datenschutz',await legalContent(path),'/'+path+'/'));}
