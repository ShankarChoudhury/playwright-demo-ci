// pages/LoginPage.js
// Page Object for the login page of Sauce Demo
import { expect, test } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[data-test="username"]';
    this.passwordInput = 'input[data-test="password"]';
    this.loginButton = 'input[data-test="login-button"]';
    this.menuButton = '#react-burger-menu-btn';
    this.logoutLink = '#logout_sidebar_link';
  }

  async navigateToApp(url) {
    // Navigate to the Sauce Demo login page
    await this.page.goto(url);
  }

  async login(username, password) {
    // Fill in username and password, then click login
    await this.page.fill(this.usernameInput, username);
    await (expect(this.page.locator(this.usernameInput)).toHaveValue(username));
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async logout() {
    // Open menu and click logout
    await this.page.click(this.menuButton);
    await this.page.click(this.logoutLink);
  }
}

module.exports = { LoginPage };