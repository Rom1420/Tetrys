import {E2EComponentFixture} from "../../../../../../e2e/e2e-component.fixture";
import {expect} from "@playwright/test";

export class ConfigListFixture extends E2EComponentFixture{


  getConfigWithName(name:String){
    return this.page.getByText("" +name);
  }

  async goToNewConfig() {
    const button = this.page.getByText("Ajouter configuration")
    await expect(button).toBeVisible()
    await button.click();
  }

  async buildIntermediaireConfig(){
    const name = this.page.getByPlaceholder("Nom de la config")
    await name.fill("configTest")
    const temps = this.page.getByPlaceholder("Temps par caractère")
    await temps.fill("0.6")
    const long = this.page.getByPlaceholder("Longueur max de mot")
    await long.fill("6")

    const erreur = this.page.getByLabel("Droit à l'erreur :")
    await erreur.check();
    const motsSupp = this.page.locator("#onlyWordsListYes")
    await motsSupp.check();
  }
}
