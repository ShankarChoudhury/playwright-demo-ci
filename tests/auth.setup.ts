import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(import.meta.dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  console.log(await page.title());
  await page.fill('input[name="username"]', 'Admin');
    
    // Fill password
  await page.fill('input[name="password"]', 'admin123');
    
    // Click login button
  await page.click('button[type="submit"]');
    
    // Wait for navigation to dashboard
  await page.waitForURL('**/dashboard/index');
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});