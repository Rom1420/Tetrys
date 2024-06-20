import { Page } from '@playwright/test';
import {testUrl} from "../../../../e2e/e2e.config";

export class GameFixture {

  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPregame(){
    await this.page.goto(testUrl);
  }

  async navigateToGame(){
    await this.page.goto(testUrl + "/game");
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
    try {
        await this.page.getByText('Vous avez le droit à une seconde tentative');
        return true;
    } catch (error) {
        return false;
    }
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

  async getCorrectWords() : Promise<string[]>{
    const wordElements = await this.page.$$eval('.blocks-words .block-word-container .word-component p', elements =>
      elements.map(element => element.textContent || '')
    );
    return wordElements;
  }

  async playTetris(): Promise<void>{
    await this.page.keyboard.press('ArrowUp');
    await this.page.keyboard.press('ArrowLeft');
    await this.page.keyboard.press('ArrowRight');
    await this.page.keyboard.press('ArrowDown');
  }

  async isGridEmpty(): Promise<boolean> {
    const allCellsAreNull = await this.page.$$eval('.board .cell', cells =>
      cells.every(cell => cell.classList.contains('block-null'))
    );
    return allCellsAreNull;
  }
}
