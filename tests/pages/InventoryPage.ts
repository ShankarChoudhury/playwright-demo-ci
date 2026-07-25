import type { Page } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private readonly bikeLightTitle: string;
  private readonly bikeLightPrice: string;
  private readonly sauceLabBackPack: string;
  private readonly cartButton: string;
  private readonly cartAmount: string;
  private readonly clearCartButton: string;

  constructor(page: Page) {
    this.page = page;
    this.bikeLightTitle = 'text=Sauce Labs Bike Light';
    this.bikeLightPrice = '//div[text()="Sauce Labs Bike Light"]/../../following-sibling::div/div';
    this.sauceLabBackPack = '//div[text()="Sauce Labs Backpack"]/../../following-sibling::div//button';
    this.cartButton = '#shopping_cart_container';
    this.cartAmount = '//div[@class="inventory_item_price"]';
    this.clearCartButton = '//button[text()="Remove"]';
  }

  async isBikeLightVisible() {
    return await this.page.isVisible(this.bikeLightTitle);
  }

  async getBikeLightPrice() {
    await this.page.locator(this.bikeLightPrice).screenshot({ path: 'screenshot/SL_Light_bike_price_element.png' });
    await this.page.screenshot({ path: 'screenshot/SL_all_items.png', fullPage: true });
    return await this.page.textContent(this.bikeLightPrice);
  }

  async addSauceLabBackPackToCart() {
    await this.page.click(this.sauceLabBackPack);
    await this.page.click(this.cartButton);
  }

  async getcartPrice() {
    return await this.page.textContent(this.cartAmount);
  }

  async clearCart() {
    await this.page.click(this.clearCartButton);
  }
}
