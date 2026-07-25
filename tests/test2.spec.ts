import { test, expect } from '@playwright/test';
import orangehrm from '../test_data/orangeLogin.json';

test('orange hrm login smoke test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page).toHaveTitle(/OrangeHRM/);
  await page.getByRole('textbox', { name: 'Username' }).fill(orangehrm.user);
  await page.getByRole('textbox', { name: 'Password' }).fill(orangehrm.password);
  await page.getByRole('button', { name: 'Login' }).click();
});
