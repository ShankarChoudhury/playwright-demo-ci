import { test, expect } from '@playwright/test';

test.describe('LFG Smoke tests',()=>{

  const baseURL = 'https://www.lincolnfinancial.com/public/individuals';

test.beforeEach('Prerequisite test',async({page})=>{

await page.goto(baseURL);

})


test('Test Header ', async ({ page }) => {
  
  await expect(page.locator('h1')).toContainText('Built for Growth, Designed for Life');
});



});

