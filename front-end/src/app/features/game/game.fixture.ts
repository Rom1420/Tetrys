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
    await input.type(word);
  }

  async endGame(){
    await this.page.click('.end-game-button');
  }

  async isSecondChanceVisible() {
    return await this.page.locator('.second-chance').isVisible();
  }

  async getChronoValue() {
    const chronoText = await this.page.locator('.chrono-container').textContent();
    if(chronoText){
      return parseInt(chronoText.trim(), 10);
    }
    return 0;
  }

  async waitForChronoToBeZero(timeout: number = 100000) {
    const startTime = Date.now();
    while (true) {
        const chronoValue = await this.getChronoValue();
        if (chronoValue === 0) {
            return;
        }
        
        if (Date.now() - startTime > timeout) {
            throw new Error('Le chronomètre n\'a pas atteint zéro dans le délai imparti');
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}
}
