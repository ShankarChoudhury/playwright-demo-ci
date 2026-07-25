import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('Sauce Labs login, verify product, and logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.login('standard_user', 'secret_sauce');
  const isBikeLightVisible = await inventoryPage.isBikeLightVisible();
  expect(isBikeLightVisible).toBeTruthy();

  const priceOut = await inventoryPage.getBikeLightPrice();
  console.log('Sauce Labs Bike Light price:', priceOut);

  await inventoryPage.addSauceLabBackPackToCart();
  const cartPrice = await inventoryPage.getcartPrice();
  console.log('Cart_Price:', cartPrice);
  await inventoryPage.clearCart();

  await loginPage.logout();
});
