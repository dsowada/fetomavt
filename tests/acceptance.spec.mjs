import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const paths=['/','/eventtechnik/','/dekoration/','/kontakt/','/impressum/','/datenschutz/','/cookie-einstellungen/','/widerruf/'];
for(const width of [360,390,768,1440])for(const path of paths)test(`Abnahme ${width}px ${path}`,async({page})=>{
 await page.setViewportSize({width,height:900});const errors=[];const external=[];page.on('pageerror',err=>errors.push(err.message));page.on('request',req=>{if(!req.url().startsWith('http://127.0.0.1:4173'))external.push(req.url());});
 const response=await page.goto(path);expect(response.status()).toBe(200);await expect(page.locator('h1')).toHaveCount(1);
 // Open the gallery before testing images that intentionally lazy-load inside it.
 if(path==='/')await page.locator('.gallery-details summary').click();
 // Visit every image so native lazy loading is exercised rather than bypassed.
 for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await expect(img).toHaveJSProperty('complete',true);expect(await img.evaluate(el=>el.naturalWidth)).toBeGreaterThan(0);await expect(img).toHaveAttribute('width',/\d+/);await expect(img).toHaveAttribute('height',/\d+/);}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const violations=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations;
 expect(violations.map(v=>({id:v.id,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
 await expect(page.locator('footer a[href="/impressum/"]')).toBeVisible();await expect(page.locator('footer a[href="/datenschutz/"]')).toBeVisible();
 if(width<640){await page.locator('footer a[href="/widerruf/"]').scrollIntoViewIfNeeded();await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));const legal=await page.locator('footer a[href="/widerruf/"]').boundingBox();const bar=await page.locator('.mobile-contact').boundingBox();expect(legal.y+legal.height).toBeLessThanOrEqual(bar.y);}
 expect(errors).toEqual([]);expect(external).toEqual([]);
});
test('Alle internen Seiten und Sprungziele sind erreichbar',async({page,request})=>{
 const seen=new Set();for(const path of paths){await page.goto(path);for(const href of await page.locator('a[href^="/"],a[href^="#"]').evaluateAll(els=>els.map(el=>el.getAttribute('href')))){const url=new URL(href,'http://127.0.0.1:4173'+path);const key=url.pathname+url.hash;if(seen.has(key))continue;seen.add(key);const response=await request.get(url.pathname);expect(response.status(),url.pathname).toBe(200);if(url.hash){await page.goto(url.pathname);expect(await page.locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`).count(),key).toBe(1);}}}
});
test('Alle Angebotsanfragen haben die bestätigte Nummer und vier Planungsfelder',async({page})=>{
 for(const path of ['/','/eventtechnik/','/dekoration/']){await page.goto(path);const hrefs=await page.locator('a[href^="https://wa.me/"]').evaluateAll(els=>els.map(x=>x.href));for(const href of hrefs){const url=new URL(href);expect(url.pathname).toBe('/491719108314');const text=url.searchParams.get('text');for(const field of ['Datum:','Ort:','Anlass:','Gästezahl:'])expect(text).toContain(field);}}
});
test('Tastatur: Sprunglink, Menü, Fokus und aufklappbare Details',async({page})=>{
 await page.setViewportSize({width:390,height:900});await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Zum Inhalt springen'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();await page.getByRole('button',{name:'Menü'}).focus();await page.keyboard.press('Enter');await page.keyboard.press('Tab');await expect(page.getByRole('navigation',{name:'Hauptnavigation'}).getByRole('link',{name:'Startseite',exact:true})).toBeFocused();await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Menü'})).toBeFocused();
 await page.goto('/eventtechnik/');await page.locator('#set-1 summary').focus();await page.keyboard.press('Enter');await expect(page.locator('#set-1 details')).toHaveAttribute('open','');expect(await page.locator('#set-1 summary').evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe('none');
});
test('Ohne JavaScript bleiben Navigation und Kontakt bedienbar',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:360,height:900}});const page=await context.newPage();await page.goto('http://127.0.0.1:4173/kontakt/');await expect(page.getByRole('navigation',{name:'Hauptnavigation'})).toBeVisible();await expect(page.getByRole('link',{name:'Kontakt per WhatsApp'})).toBeVisible();await expect(page.locator('#prepare-message')).toBeDisabled();await context.close();
});
