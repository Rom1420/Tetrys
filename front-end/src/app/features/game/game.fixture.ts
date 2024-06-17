import { Page } from '@playwright/test';
import { ConfigModel } from './models/config.model';

export class GameFixture {

  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPregame(){
    await this.page.goto("http://localhost:4200");
  }

  async navigateToGame(){
    await this.page.goto("http://localhost:4200/game");
  }

  async getModeName() { 
    return await this.page.locator(".mode-name span").textContent();
  }

  async enterWord(word: string) {
    const input = await this.page.locator('.input-container input');
    await input.fill(word);
  }

  async endGame(){
    await this.page.click('.end-game-button');
  }

  async isSecondChanceVisible() {
    return await this.page.locator('.second-chance').isVisible();
  }
}
