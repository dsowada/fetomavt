import {test,expect} from '@playwright/test';import fs from 'node:fs/promises';import {load} from 'cheerio';
for(const path of ['impressum','datenschutz'])test(`Rechtstext unverändert: ${path}`,async({page})=>{
 const original=load(await fs.readFile(`reference/${path}.html`,'utf8'));original('[data-cfemail]').each((i,e)=>{const hex=original(e).attr('data-cfemail');const key=parseInt(hex.slice(0,2),16);original(e).text(hex.slice(2).match(/../g).map(x=>String.fromCharCode(parseInt(x,16)^key)).join(''));});
 const normalize=text=>text.replace(/\s/g,'');const source=normalize(original('section').text());await page.goto('/'+path+'/');const result=normalize(await page.locator('.legal-content').textContent());expect(path==='impressum'?result.slice(0,source.length):result).toBe(source);
});
test('Hauptkontakte und Touchflächen sind mindestens 44 × 44 Pixel',async({page})=>{
 await page.setViewportSize({width:360,height:800});for(const path of ['/','/eventtechnik/','/dekoration/','/kontakt/']){await page.goto(path);for(const el of await page.locator('.button,.menu-toggle,summary,.mobile-contact>a').all()){if(!await el.isVisible())continue;const rect=await el.boundingBox();expect(rect.width).toBeGreaterThanOrEqual(44);expect(rect.height).toBeGreaterThanOrEqual(44);}}
});
