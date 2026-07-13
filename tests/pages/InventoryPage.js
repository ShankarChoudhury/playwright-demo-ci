// pages/InventoryPage.js
// Page Object for the inventory page of Sauce Demo

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.bikeLightTitle = 'text=Sauce Labs Bike Light';
    this.bikeLightPrice = '//div[text()="Sauce Labs Bike Light"]/../../following-sibling::div/div';
    this.sauceLabBackPack = '//div[text()="Sauce Labs Backpack"]/../../following-sibling::div//button';
    this.cartButton = '#shopping_cart_container';
    this.cartAmount = '//div[@class="inventory_item_price"]';
    this.clearCartButton = '//button[text()="Remove"]';
  }

  async isBikeLightVisible() {
    // Check if the Sauce Labs Bike Light text is visible
    return await this.page.isVisible(this.bikeLightTitle);
   
  }

  async getBikeLightPrice() {
    // Get the price of Sauce Labs Bike Light
    await (this.page.locator(this.bikeLightPrice).screenshot({ path: 'screenshot/SL_Light_bike_price_element.png' }));
    await this.page.screenshot({ path: 'screenshot/SL_all_items.png', fullPage: true });
    return await this.page.textContent(this.bikeLightPrice);
  }

  async addSauceLabBackPackToCart() {
    // Click the "Add to Cart" button for Sauce Labs Backpack
    await this.page.click(this.sauceLabBackPack);
    //click Cart button
    await this.page.click(this.cartButton);

  }

  async getcartPrice() {
    // Get the price of Sauce Labs Bike Light
    return await this.page.textContent(this.cartAmount);
  }

    async clearCart() {
    // Get the price of Sauce Labs Bike Light
    await this.page.click(this.clearCartButton);
  }
}

module.exports = { InventoryPage };
