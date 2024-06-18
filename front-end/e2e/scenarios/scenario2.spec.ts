import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/core/app.fixture';
import {ConfigListFixture} from "../../src/app/features/pregame/components/config-list/config-list.fixture";
import {AddProfilFixture} from "../../src/app/features/pregame/components/add-profil-button/add-profil-button.fixture";
import {StudentFixture} from "../../src/app/features/pregame/components/student/student.fixture";
import {ProfilFormFixture} from "../../src/app/features/pregame/components/popup-add-profil/popup-add-profil.fixture";
import {ConfirmDeleteFixture} from "../../src/app/features/pregame/components/popup-delete-profil/popup-delete-profil.fixture";
import { GameFixture } from 'src/app/features/game/game.fixture';

// https://playwright.dev/docs/locators
test.describe('Scénario 2', () => {
  test('pre-game test', async ({ page }) => {
    await page.goto(testUrl+"/pre-game");
    //create fixtures
    const addProfilFixture = new AddProfilFixture(page);
    const profilFormFixture = new ProfilFormFixture(page);

    await test.step(`Open Create Student Form`, async () =>{
      await addProfilFixture.clickOnAddButton();
      const profilForm = await profilFormFixture.getProfilForm();
      const isVisible = await profilForm.isVisible();
      expect(isVisible).toBeTruthy();
    });

    await test.step(`Create student`, async () => {
      const inputName = await profilFormFixture.getInput('name');
      await inputName.fill("Lucas")
      await profilFormFixture.clickCreateButton();
      expect(page.getByText("Lucas"))
    });

  });


  test('création config perso test', async ({ page }) => {
    await page.goto(testUrl+"/pre-game");
    const appComponentFixture = new ConfigListFixture(page);
    const studentFixture= new StudentFixture(page)

    await studentFixture.selectStudent("Lucas")
    await page.getByText("personnalisé").click();

    const selector = `.config.ng-star-inserted`;
    const listeConfigs = (await page.$$(selector));
    expect (listeConfigs).toHaveLength(0);


    await appComponentFixture.goToNewConfig();

    await expect(page.getByPlaceholder("Nom de la config")).toBeVisible()

    await appComponentFixture.buildIntermediaireConfig()

    await page.getByPlaceholder('Entrez vos nouveaux mots ici').fill("La dictée est l'opération par laquelle une personne lit à haute voix un texte cohérent selon un rythme qui permet à des auditeurs de le copier par écrit. ")

    const buttonJouer = page.getByRole('button', {name:"Jouer"})
    await expect(buttonJouer).not.toBeDisabled()
    await buttonJouer.click()

    const gameName = page.getByText("Mode configTest")
    await expect(gameName).toBeVisible()

    const game = page.getByPlaceholder("Tapez les Mots ici")
    await expect(game).toBeVisible()
    await game.fill("cuisine")
  });

  test("Ecriture d'un mot correct et partie de Tetris", async ({page}) => {
    await page.goto(testUrl+"/game")

    const gameFixture = new GameFixture(page);

    const correctWords = await gameFixture.getCorrectWords();

    console.log('Mots corrects trouvés:', correctWords);
    expect(correctWords.length).toBeGreaterThan(0);

    await gameFixture.enterWord(correctWords[0]);

    let newCorrectWords;
    do {
      await gameFixture.playTetris();
      newCorrectWords = await gameFixture.getCorrectWords();
    } while (correctWords.toString() === newCorrectWords.toString());

    const gridIsEmpty = await gameFixture.isGridEmpty();
    expect(gridIsEmpty).toBe(false);
    expect(correctWords.toString() === newCorrectWords.toString()).toBe(false);
});

  test('Delete a Student successfully', async ({page}) => {
    await page.goto(testUrl+"/pre-game");
    const studentFixture = new StudentFixture(page);
    const confirmDeleteFixture = new ConfirmDeleteFixture(page);
    const studentIndex = await studentFixture.getIndexOfName('Lucas');
    const student = page.locator('student').filter({ hasText: 'Lucas' }).getByTestId('selectButton');
    await studentFixture.clickDelButton(studentIndex);
    await confirmDeleteFixture.clickConfirmButton();
    await expect(student).not.toBeVisible();
  });

  

});
