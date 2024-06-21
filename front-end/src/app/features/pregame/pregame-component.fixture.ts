import { Page } from '@playwright/test';
import {testUrl} from "../../../../e2e/e2e.config";

export class PregameComponentFixture{
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToPregame(){
        await this.page.goto(testUrl + "/pre-game");
    }

    async navigateToGame(){
        await this.page.goto(testUrl + "/game");
    }

    async selectDifficulty(difficulty: string){
        await this.page.click(`.difficulty-button-container:has-text("${difficulty}") a`)
    }
}
