import { test, expect } from '@playwright/test';

test('Sauce Labs Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('input[data-test="username"]', 'standard_user');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  await page.click('input[data-test="login-button"]');
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});
