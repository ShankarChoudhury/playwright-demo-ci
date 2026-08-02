import { test, expect } from '@playwright/test';

test('Check Rediff links', {
  tag: ['@rediff']
}, async ({ page }) => {
  const expectedLinks = [
    'Home',
    'Payments',
    'Mail',
    'News',
    'Money',
    'BusinessEmail',
    'Gurus',
    'TV',
    'More',
    'News',
    'Business',
    'Cricket',
    'Movies'
  ];

  await page.goto('https://www.rediff.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('load');

  const linkTexts = await page.locator('a').evaluateAll((elements) =>
    elements
      .map((element) => element.textContent?.replace(/\s+/g, ' ').trim() ?? '')
      .filter(Boolean)
  );

  const normalizedTexts = linkTexts.map((text) => text.toLowerCase().replace(/\s+/g, ''));
  const missingLinks: string[] = [];

  for (const expectedLink of expectedLinks) {
    const normalizedExpected = expectedLink.toLowerCase().replace(/\s+/g, '');
    const found = normalizedTexts.some((text) =>
      text.includes(normalizedExpected) || normalizedExpected.includes(text)
    );

    if (!found) {
      console.error(`Missing link on Rediff page: ${expectedLink}`);
      missingLinks.push(expectedLink);
    } else {
      console.log(`Verified link: ${expectedLink}`);
    }
  }

  expect(missingLinks, `Missing links: ${missingLinks.join(', ')}`).toEqual([]);
});
