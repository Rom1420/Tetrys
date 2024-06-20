import { E2EComponentFixture } from "e2e/e2e-component.fixture";
export class ProfilFormFixture extends E2EComponentFixture {

    getProfilForm() {
        return this.page.waitForSelector('popup-add-profil');
    }
    getInput(id: string){
        const selector = `popup-add-profil input[id="${id}"]`;
        return this.page.waitForSelector(selector);
    }
    getCreateButton(){
        return this.page.getByTestId('submitButton');
    }
    clickCreateButton() {
        return this.getCreateButton().click();
    }
}