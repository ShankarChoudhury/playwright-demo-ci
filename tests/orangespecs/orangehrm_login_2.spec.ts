import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Load test data from JSON file
const testDataPath = path.resolve(import.meta.dirname, "../../../testdata/testdata.json");
//const loginData = JSON.parse(fs.readFileSync(testDataPath, "utf8"));
const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';


test.describe('OrangeHRM Login Tests', () => {
  
  test.beforeEach('Navigate to webpage',async ({ page }) => {
   // await page.goto(baseURL);
   // console.log(await page.title());
   // await page.waitForLoadState('domcontentloaded');
    //await page.wait
    console.log("Starting Test: " + test.info().title);
  });


 test('Test2', async ({ page }) => {

  await page.goto(baseURL);
    // Fill username
  
    
    // Verify successful login by checking dashboard elements
    await expect(page.locator('.oxd-topbar-header-breadcrumb h6')).toHaveText('Dashboard');
    
    // Verify user profile dropdown is visible
    await expect(page.locator('//span[text()="Admin"]')).toBeVisible();
    
    // Take screenshot for verification
    await page.screenshot({ path: 'screenshot/successful-login.png' });
  });

});
