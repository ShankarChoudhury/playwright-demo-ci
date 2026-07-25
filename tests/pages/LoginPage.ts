import { expect, type Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private readonly usernameInput: string;
  private readonly passwordInput: string;
  private readonly loginButton: string;
  private readonly menuButton: string;
  private readonly logoutLink: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = 'input[data-test="username"]';
    this.passwordInput = 'input[data-test="password"]';
    this.loginButton = 'input[data-test="login-button"]';
    this.menuButton = '#react-burger-menu-btn';
    this.logoutLink = '#logout_sidebar_link';
  }

  async navigateToApp(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await expect(this.page.locator(this.usernameInput)).toHaveValue(username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async logout() {
    await this.page.click(this.menuButton);
    await this.page.click(this.logoutLink);
  }
}
