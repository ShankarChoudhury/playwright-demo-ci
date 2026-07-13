import { test, expect } from '@playwright/test';
import {orangehrm} from "../test_data/orangeLogin.json"

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page).toHaveTitle('OrangeHRM');
  await page.getByRole('textbox', { name: 'Username' }).fill(orangehrm.user)
  await page.getByRole('textbox', { name: 'Password' }).fill(orangehrm.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading')).toContainText('Dashboard');
  await page.screenshot({path:'screenshot/homePage.png'})
  await expect(page.getByLabel('Sidepanel').getByRole('list')).toContainText('Admin');
  await expect(page.getByLabel('Sidepanel').getByRole('list')).toContainText('Leave');
  await expect(page.getByLabel('Sidepanel').getByRole('list')).toContainText('My Info');
  await page.locator('oxd-userdropdown-img').click();
  //await page.getByAltText('profile picture').click();
  //await page.getByAltText('profile picture').screenshot({ path: 'screenshot/profile.png' });
  setTimeout(function(){
    console.log("Waited for 8 secs");
  }, 8000);
  await page.getByRole('menuitem', { name: 'Logout' }).click();

});