//import { test, expect } from '@playwright/test';
import { test, expect } from '../fixture';


test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page,helloworld }) => {
   await page.goto('https://www.saucedemo.com/');
  console.log('Start Time:> '+helloworld);
  console.log("The Page title is -------->"+await page.title());
  console.log('The project name is ---> '+test.info().project.name);
});

test('SauceLabCartTest', { 
  tag: ['@smoke','@slcart'] 
},async ({ page,newworld }) => {

 
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  //await page.getByRole('button', { name: 'login-button' }).dispatchEvent('click');

  await expect(page.locator('.inventory_list')).toBeVisible();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_list')).toBeVisible();

  const priceText = await page.locator('.inventory_item_price').first().textContent();
  console.log('Price:', priceText);

  await page.locator('#react-burger-menu-btn').click();
  await page.locator('#logout_sidebar_link').click();

  await expect(page.locator('#login-button')).toBeVisible();
  console.log("The Page title is -------->"+await page.title());
});
test('locked User test', { 
  tag: ['@smoke'] 
},async ({ page }) => {

  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});