import { test, expect } from '@playwright/test';

test('todo app smoke test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
});
