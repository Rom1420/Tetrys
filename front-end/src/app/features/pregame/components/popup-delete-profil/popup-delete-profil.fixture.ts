import { E2EComponentFixture } from "e2e/e2e-component.fixture";
export class ConfirmDeleteFixture extends E2EComponentFixture {

    getConfirmDelete(){
        return this.page.waitForSelector('popup-delete-profil');
    }
    getConfirmButton(){
        return this.page.getByTestId('validateButton');
    }
    getCancelButton(){
        return this.page.getByRole('button', {name: "&&#10006;"});
    }
    clickConfirmButton(){
        return this.getConfirmButton().click();
    }
    clickCancelButton(){
        return this.getCancelButton().click();
    }
}