import {test,expect} from '@playwright/test';
for(const width of [360,390,768,1440])test(`Phase 1: Einstieg und Navigation ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');await expect(page.locator('h1')).toHaveText('Eventtechnik & Dekoration für deine Feier');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const cta=page.locator('.hero-actions .primary');const box=await cta.boundingBox();expect(box.y+box.height).toBeLessThan(820);
 if(width<=900){const menu=page.getByRole('button',{name:'Menü'});await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');await expect(page.getByRole('navigation',{name:'Hauptnavigation'})).toBeVisible();await page.keyboard.press('Escape');await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false');}
 await expect(page.locator('.hero-image')).toHaveJSProperty('complete',true);
 await page.screenshot({path:`test-results/phase1-${width}.png`,fullPage:true});
});
