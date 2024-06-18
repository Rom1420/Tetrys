import { Page } from '@playwright/test';
import { ConfigModel } from './models/config.model';

export class GameComponentFixture {

  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPregame(){
    await this.page.goto("https://localhost:4200/pregame");
  }

  async navigateToGame(){
    await this.page.goto("https://localhost:4200/game");
  }

  async getModeName() {
    await this.page.locator(".mode-name span").textContent();
  }

  async enterWord(word: string) {
    const input = await this.page.locator('.input-container input');
    await input.fill(word);
  }

  async endGame(){
    await this.page.click('.end-game-button');
  }

  async setConfig(mode: string) {
   
  }

  async isSecondChanceVisible() {
      return await this.page.locator('.second-chance').isVisible();
  }
}
