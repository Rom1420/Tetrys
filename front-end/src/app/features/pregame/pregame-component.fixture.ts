import { Page } from '@playwright/test';

export class PregameComponentFixture{
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

    async selectDifficulty(difficulty: string){
        await this.page.click(`.difficulty-button-container:has-text("${difficulty}") a`)
    }
}