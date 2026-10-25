import { test, expect } from '@playwright/test';
import { SauceLabPage } from '../pages/sauceLab';

test('SauceLab POM checkout flow',{ tag: ['@e2e'] }, async ({ page }) => {
  const sauceLab = new SauceLabPage(page);
  await sauceLab.open();
  await sauceLab.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);
  await sauceLab.addItemsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Onesie']);
  await sauceLab.goToCart();
  await sauceLab.proceedToCheckout();
  await sauceLab.fillCheckoutInfo('Test', 'SwagLabs', '70010');
  await sauceLab.continueCheckout();
  const itemTotal = await sauceLab.getItemTotalAmount();
  const individualPrices = await sauceLab.getItemPricesInCheckoutOverview();
  const expectedTotal = individualPrices.reduce((sum, price) => sum + price, 0);
  expect(itemTotal).toBeCloseTo(expectedTotal, 2);
  const checkoutSummary = await sauceLab.getCheckoutSummaryInfo();
  console.log('Payment Information:', checkoutSummary.paymentInformation);
  console.log('Shipping Information:', checkoutSummary.shippingInformation);
  console.log('Total amount:', checkoutSummary.totalAmount);
  await sauceLab.finishCheckout();
  await expect(page.locator('.complete-header')).toHaveText(/Thank you for your order!/);
  await sauceLab.logout();
  await expect(page.locator('#login-button')).toBeVisible();
});
