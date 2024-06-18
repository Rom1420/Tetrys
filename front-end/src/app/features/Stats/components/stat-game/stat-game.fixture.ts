import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class QuestionFormFixture extends E2EComponentFixture {

    getStatsDetailButton(){
        return this.page.locator('css=icon-detail-container').click();
    }

    getScores(){
        return this.page.locator('.score-content');
    }
}