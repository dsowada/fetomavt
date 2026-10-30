// Local development QA only: no external site is opened and no message is sent.
import {chromium} from '@playwright/test';import fs from 'node:fs/promises';
await fs.mkdir('docs/screenshots',{recursive:true});const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
for(const width of [360,390,768,1440]){
 const page=await browser.newPage({viewport:{width,height:width<640?800:1000},deviceScaleFactor:1,locale:'de-DE'});
 for(const [route,label] of [['/','startseite'],['/eventtechnik/','eventtechnik'],['/dekoration/','dekoration'],['/kontakt/','kontakt']]){
  await page.goto('http://127.0.0.1:4173'+route);await page.locator('.brand img').evaluate(el=>el.decode());
  if(route==='/'){await page.locator('.hero-image').evaluate(el=>el.decode());await page.screenshot({path:`docs/screenshots/${label}-${width}.png`});}
  // Scroll through the page to load images in their natural loading order.
  for(const img of await page.locator('main img:visible').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());}
  await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0);});
  await page.screenshot({path:`docs/screenshots/${label}-${width}-gesamt.png`,fullPage:true,style:'.skip-link:not(:focus){opacity:0}'});
  // Isolated component crops hide viewport-fixed controls; full viewport shots retain them.
  const detail=route==='/'?'#blowup .highlight-grid':route==='/eventtechnik/'?'.tent-grid':route==='/dekoration/'?'.deco-card:first-child':'.inquiry-builder';
  await page.locator(detail).screenshot({path:`docs/screenshots/${label}-${width}-detail.png`,style:'.skip-link,.mobile-contact{opacity:0}'});
 }
 if(width===390){await page.goto('http://127.0.0.1:4173/');await page.getByRole('button',{name:'Menü'}).click();await page.screenshot({path:'docs/screenshots/menue-390.png'});await page.locator('footer [data-cookie-open]').click();await page.screenshot({path:'docs/screenshots/cookie-390.png'});}
 await page.close();
}
await browser.close();console.log('Ansichten für 360, 390, 768 und 1440 px in docs/screenshots/ gespeichert.');
