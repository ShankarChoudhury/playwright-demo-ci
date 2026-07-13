// saucelabs_login.spec.js
// Playwright test for Sauce Demo login, product verification, and logout using Page Object Model

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
//require('@dotenvx/dotenvx').config();

console.log(`HELLO: ${process.env.USER_NAME}`);


/**
 * Test Steps:
 * 1. Open https://www.saucedemo.com/
 * 2. Login with username "standard_user" and password "secret_sauce"
 * 3. Verify the text "Sauce Labs Bike Light" is displayed, store the price in a variable price_out
 * 4. Log out of the webpage
 */
test.beforeEach(async ({ page }) => {
 await page.goto('/');
});
test('Sauce Labs login, verify product, and logout', async ({ page }) => {
  // Step 1: Open Sauce Demo login page
  const loginPage = new LoginPage(page);
 // await page.goto('/');
  //await loginPage.navigateToApp(process.env.BASE_URL);

  // Step 2: Login with credentials
 // await loginPage.login('standard_user', 'secret_sauce');
 // await loginPage.login(process.env.USER_NAME, process.env.PASSWORD);

  // Step 3: Verify product and store price
  const inventoryPage = new InventoryPage(page);
  const isBikeLightVisible = await inventoryPage.isBikeLightVisible();
  expect(isBikeLightVisible).toBeTruthy();
  const price_out = await inventoryPage.getBikeLightPrice();
  console.log('Sauce Labs Bike Light price:', price_out);

  // Step 4: Log out
  await loginPage.logout();
});

/**
 * Documentation:
 * This test uses Playwright's Page Object Model for maintainability and readability.
 * - LoginPage: Handles login and logout actions.
 * - InventoryPage: Handles product verification and price extraction.
 * The test logs in, verifies the product, stores the price, and logs out.
 */
