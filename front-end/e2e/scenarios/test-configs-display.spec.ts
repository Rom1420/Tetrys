import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/core/app.fixture';
import {ConfigListFixture} from "../../src/app/features/pregame/components/config-list/config-list.fixture";
import {generatedModuleName} from "@angular/compiler-cli/src/ngtsc/shims/src/util";

// https://playwright.dev/docs/locators
test.describe('Config display', () => {

  test("difficultés test", async ({page}) =>{
    await page.goto(testUrl+"/pre-game");
    const appComponentFixture = new ConfigListFixture(page);

    const student = await page.getByText("Matice")
    await student.click()


    const debut = await page.getByText("débutant")
    const intermediaire = await page.getByText("intermédiaire")
    const avance = await page.getByText("avancé")
    const perso = await page.getByText("personnalisé")

    expect(debut).toBeVisible()
    expect(intermediaire).toBeVisible()
    expect(avance).toBeVisible()
    expect(perso).toBeVisible()

  })

  test('affichage des configs perso test', async ({ page }) => {
    await page.goto(testUrl+"/pre-game");
    const appComponentFixture = new ConfigListFixture(page);

    const student = await page.getByText("Matice")
    await student.click()
    await page.getByText("personnalisé").click();

    const selector = `.config.ng-star-inserted`;
    const listeConfigs = (await page.$$(selector));
    expect (listeConfigs).toHaveLength(2);

    const config1 = await appComponentFixture.getConfigWithName("config1");
    const config2 = await appComponentFixture.getConfigWithName("config2");

    expect(config1).toBeVisible();
    expect(config2).toBeVisible();
  });

  test('création config perso test', async ({ page }) => {
    await page.goto(testUrl+"/pre-game");
    const appComponentFixture = new ConfigListFixture(page);

    const student = await page.getByText("Matice")
    await student.click()
    await page.getByText("personnalisé").click();

    const selector = `.config.ng-star-inserted`;
    const listeConfigs = (await page.$$(selector));
    expect (listeConfigs).toHaveLength(2);

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
