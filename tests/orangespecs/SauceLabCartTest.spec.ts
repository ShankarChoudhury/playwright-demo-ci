import { test, expect } from '@playwright/test';

test('SauceLabCartTest', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page.locator('.inventory_list')).toBeVisible();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_list')).toBeVisible();

  const priceText = await page.locator('.inventory_item_price').first().textContent();
  console.log('Price:', priceText);

  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();

  await expect(page.locator('#login-button')).toBeVisible();
});
