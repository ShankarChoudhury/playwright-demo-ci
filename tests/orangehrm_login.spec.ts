import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Load test data from JSON file
const testDataPath = path.resolve(__dirname, "../../../testdata/testdata.json");
//const loginData = JSON.parse(fs.readFileSync(testDataPath, "utf8"));
const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';


test.describe('OrangeHRM Login Tests', () => {
  
  test.beforeEach('Navigate to webpage',async ({ page }) => {
    await page.goto(baseURL);
    console.log(await page.title());
    await page.waitForLoadState('domcontentloaded');
    //await page.wait
  });

  test('Dummy Test',()=>{


  });

  test('Should login successfully with valid credentials', async ({ page }) => {
    // Fill username
    await page.fill('input[name="username"]', 'Admin');
    
    // Fill password
    await page.fill('input[name="password"]', 'admin123');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard/index');
    
    // Verify successful login by checking dashboard elements
    await expect(page.locator('.oxd-topbar-header-breadcrumb h6')).toHaveText('Dashboard');
    
    // Verify user profile dropdown is visible
    await expect(page.locator('.oxd-userdropdown-name')).toBeVisible();
    
    // Take screenshot for verification
    await page.screenshot({ path: 'screenshot/successful-login.png' });
  });

  test('Should display error message with invalid credentials', async ({ page }) => {
    // Fill invalid username
    await page.fill('input[name="username"]', 'invaliduser');
    
    // Fill invalid password
    await page.fill('input[name="password"]', 'invalidpass');

    setTimeout(() => {
        console.log("Waited for 2 seconds.");
    }, 2000);
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Wait for error message to appear
    await page.waitForSelector('.oxd-alert-content-text', { timeout: 8000 });
    
    // Verify error message is displayed
    await expect(page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');
    
    // Verify we're still on login page
    await expect(page).toHaveURL(/.*auth\/login/);
    
    // Take screenshot for verification
    await page.screenshot({ path: 'screenshot/invalid-login.png' });
  });

  test('Should validate required username field', async ({ page }) => {
    // Leave username empty and fill password
    await page.fill('input[name="password"]', 'admin123');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Verify required field validation message
    await expect(page.locator('.oxd-input-group .oxd-text--span').first()).toHaveText('Required');
    
    // Verify we're still on login page
    await expect(page).toHaveURL(/.*auth\/login/);
  });

  test('Should verify login page elements are present', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/OrangeHRM/);
    
    // Verify login form elements

    await page.getByRole('textbox',{name:'name'}).fill('Samsunger').then(()=>{

       expect(page.locator('input[name="username"]')).toHaveValue('Samsunger');
    })
    await page.screenshot({ path: 'screenshot/login-page_editText.png' });
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Verify login button text
    await expect(page.locator('button[type="submit"]')).toHaveText(' Login ');
    
    // Verify OrangeHRM logo/branding
    await expect(page.locator('.orangehrm-login-branding')).toBeVisible();

    // Take screenshot of login page
    await page.screenshot({ path: 'screenshot/login-page.png' });
  });
});
