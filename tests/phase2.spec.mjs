import {test,expect} from '@playwright/test';
for(const width of [360,390,768,1440])test(`Phase 2: Startseitenstruktur ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');
 await expect(page.locator('main>section')).toHaveCount(7);await expect(page.locator('h1')).toHaveCount(1);
 await expect(page.locator('.category-card')).toHaveCount(4);await expect(page.locator('.offer-card')).toHaveCount(2);
 await expect(page.locator('#blowup')).toContainText('250 €');await expect(page.locator('#blowup')).toContainText('Pro weiteren km 0,30 €');
 await page.getByText('Was wird für das Zelt benötigt?').click();await expect(page.locator('#blowup details')).toHaveAttribute('open','');
 await page.getByText('Weitere Originalaufnahmen ansehen').click();await expect(page.locator('.extra-gallery')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.locator('footer').scrollIntoViewIfNeeded();await page.screenshot({path:`test-results/phase2-${width}.png`,fullPage:true});
});
