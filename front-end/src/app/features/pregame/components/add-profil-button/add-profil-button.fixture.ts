import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class AddProfilFixture extends E2EComponentFixture {

    getAddButton() {
        return this.page.getByRole('button', {name:'Créer Profil'});
    }

    clickOnAddButton(){
        return this.getAddButton().click();
    }
}