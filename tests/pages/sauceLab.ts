import type { Page } from '@playwright/test';

export class SauceLabPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[data-test="username"]', username);
    await this.page.fill('input[data-test="password"]', password);
    await this.page.click('input[data-test="login-button"]');
  }

  async addItemsToCart(itemNames: string[]) {
    for (const itemName of itemNames) {
      const itemCard = this.page.locator('.inventory_item').filter({ hasText: itemName });
      await itemCard.getByRole('button', { name: /add to cart/i }).click();
    }
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async proceedToCheckout() {
    await this.page.click('button[data-test="checkout"]');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    await this.page.fill('input[data-test="firstName"]', firstName);
    await this.page.fill('input[data-test="lastName"]', lastName);
    await this.page.fill('input[data-test="postalCode"]', zipCode);
  }

  async continueCheckout() {
    await this.page.click('input[data-test="continue"]');
  }

  async getItemPricesInCheckoutOverview(): Promise<number[]> {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map((priceText) => Number.parseFloat(priceText.replace('$', '').trim()));
  }

  async getItemTotalAmount(): Promise<number> {
    const text = await this.page.locator('.summary_subtotal_label').textContent();
    return Number.parseFloat((text ?? '').replace(/[^0-9.]/g, ''));
  }

  async getCheckoutSummaryInfo() {
    const paymentInformation = (await this.page.locator('.summary_info').locator('.summary_value_label').nth(0).textContent())?.trim() ?? '';
    const shippingInformation = (await this.page.locator('.summary_info').locator('.summary_value_label').nth(1).textContent())?.trim() ?? '';
    const totalAmount = (await this.page.locator('.summary_total_label').textContent())?.trim() ?? '';
    return { paymentInformation, shippingInformation, totalAmount };
  }

  async finishCheckout() {
    await this.page.click('button[data-test="finish"]');
  }

  async logout() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.click('#logout_sidebar_link');
  }
}
