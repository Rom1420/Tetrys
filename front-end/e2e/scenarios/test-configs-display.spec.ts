import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/core/app.fixture';
import {ConfigListFixture} from "../../src/app/features/pregame/components/config-list/config-list.fixture";
import {generatedModuleName} from "@angular/compiler-cli/src/ngtsc/shims/src/util";
import {StudentFixture} from "../../src/app/features/pregame/components/student/student.fixture";

// https://playwright.dev/docs/locators
test.describe('Config display', () => {

  test("difficultés test", async ({page}) =>{
    await page.goto(testUrl+"/pre-game");
    const studentFixture = new StudentFixture(page);

    await studentFixture.selectStudent("Matice")

    const student = page.getByText("Matice")
    await student.click()


    const debut = page.getByText("débutant")
    const intermediaire = page.getByText("intermédiaire")
    const avance = page.getByText("avancé")
    const perso = page.getByText("personnalisé")

    await expect(debut).toBeVisible()
    await expect(intermediaire).toBeVisible()
    await expect(avance).toBeVisible()
    await expect(perso).toBeVisible()

  })

  test('affichage des configs perso test', async ({ page }) => {
    await page.goto(testUrl+"/pre-game");
    const appComponentFixture = new ConfigListFixture(page);
    const studentFixture = new StudentFixture(page);

    await studentFixture.selectStudent("Matice")

    await page.getByText("personnalisé").click();

    const selector = `.config.ng-star-inserted`;
    const listeConfigs = (await page.$$(selector));
    expect (listeConfigs).toHaveLength(2);

    const config1 = appComponentFixture.getConfigWithName("rapide");
    const config2 = appComponentFixture.getConfigWithName("dictée");

    await expect(config1).toBeVisible();
    await expect(config2).toBeVisible();


    await studentFixture.selectStudent("Romain")
    await page.getByText("avancé").hover()
    await page.getByText("personnalisé").click();

    const listeConfigsRomain = (await page.$$(selector));
    expect (listeConfigsRomain).toHaveLength(0);
  });

  test('création config perso test', async ({ page }) => {
    await page.goto(testUrl+"/pre-game");
    const appComponentFixture = new ConfigListFixture(page);
    const studentFixture= new StudentFixture(page)


    await studentFixture.selectStudent("Matice")
    await page.getByText("personnalisé").click();

    await appComponentFixture.goToNewConfig();

    await expect(page.getByPlaceholder("Nom de la config")).toBeVisible()

    await appComponentFixture.buildIntermediaireConfig()

    const buttonJouer = page.getByRole('button', {name:"Jouer"})
    await expect(buttonJouer).not.toBeDisabled()
    await buttonJouer.click()

    const game = page.getByPlaceholder("Tapez les Mots ici")
    await expect(game).toBeVisible()
    await game.fill("cuisine")
  });

  // TO GO FURTHER :
  // Check the PS6-CORRECTION repo : https://github.com/NablaT/ps6-correction-td1-td2-v2/blob/master/front-end/e2e/scenarios/create-quiz.spec.ts
});
