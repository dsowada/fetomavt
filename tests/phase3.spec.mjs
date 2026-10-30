import {test,expect} from '@playwright/test';
for(const width of [360,390,768,1440])test(`Phase 3: Angebotsseiten ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/eventtechnik/');
 await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('#set-1')).toContainText('Mietpreis auf Anfrage');
 for(const card of ['set-1','set-2','ton','licht','dmx','molton']){await page.locator(`#${card} summary`).click();await expect(page.locator(`#${card} details`)).toHaveAttribute('open','');}
 await expect(page.locator('#set-1 details')).toContainText('2x the box pro Achat 115 Sub');await expect(page.locator('#set-2 details')).toContainText('4x the box pro Achat 115 Sub');
 for(const [i,price] of [[1,'25 €'],[2,'50 €'],[3,'250 €']]){await expect(page.locator(`#zelt-${i}`)).toContainText(price);await expect(page.locator(`#zelt-${i}`)).toContainText('Zuzüglich Fahrtkosten.');}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.goto('/dekoration/');await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('.deco-card')).toHaveCount(11);
 await expect(page.locator('#deko-8')).toContainText('10,00 €');await expect(page.locator('#deko-9')).toContainText('0,50 €');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
