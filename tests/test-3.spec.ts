import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mgmresorts.com/en.html');
  await page.getByTestId('homepage-booking-module-destination-selector-button').click();
  await page.getByRole('radio', { name: 'Bellagio Las Vegas' }).check();
  await page.getByTestId('homepage-booking-module-guest-selector-button').click();
  await page.getByRole('option', { name: '3' }).click();
  await page.getByTestId('homepage-booking-module-cta').click();
  await page.goto('https://www.mgmresorts.com/book-room/room/?region=las-vegas&resort=44e610ab-c209-4232-8bb4-51f7b9b13a75&checkIn=2025-04-11&checkOut=2025-04-13&guests=3&program=RPCD-v-BAR-d-PROP-v-MV190');
  await page.getByRole('button', { name: 'close button' }).click();
  await page.getByTestId('RoomDetailCardUIComponent:Spa Premier King').getByRole('button', { name: 'book room' }).click();
  await page.goto('https://www.mgmresorts.com/book-room/room/?region=las-vegas&resort=44e610ab-c209-4232-8bb4-51f7b9b13a75&checkIn=2025-04-11&checkOut=2025-04-13&guests=3&program=RPCD-v-BAR-d-PROP-v-MV190');
});