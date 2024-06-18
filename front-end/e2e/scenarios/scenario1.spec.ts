import {expect, test} from "@playwright/test";
import {testUrl} from "../e2e.config";
import {AddProfilFixture} from "../../src/app/features/pregame/components/add-profil-button/add-profil-button.fixture";
import {ProfilFormFixture} from "../../src/app/features/pregame/components/popup-add-profil/popup-add-profil.fixture";
import {ConfigListFixture} from "../../src/app/features/pregame/components/config-list/config-list.fixture";
import {StudentFixture} from "../../src/app/features/pregame/components/student/student.fixture";


test.describe('Scénario1', () => {
  test('création student', async ({page}) => {
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
      await inputName.fill("Thomas")
      await profilFormFixture.clickCreateButton();
      expect(page.getByText("Thomas"))
    });

  });

  test('création config perso test', async ({ page }) => {
    await page.goto(testUrl + "/pre-game");
    const appComponentFixture = new ConfigListFixture(page);
    const studentFixture = new StudentFixture(page)

    await studentFixture.selectStudent("Thomas")
    await page.getByText("débutant").click();

    const gameName = page.getByText("Mode débutant")
    await expect(gameName).toBeVisible()

    const game = page.getByPlaceholder("Tapez les Mots ici")
    await expect(game).toBeVisible()
    await game.fill("cuisine")


  });




})
