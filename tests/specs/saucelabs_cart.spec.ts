import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('Sauce Labs cart flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addSauceLabBackPackToCart();
  const cartPrice = await inventoryPage.getcartPrice();
  console.log('Cart_Price:', cartPrice);
  await inventoryPage.clearCart();
  await loginPage.logout();
  expect(page.url()).toContain('saucedemo.com');
});
