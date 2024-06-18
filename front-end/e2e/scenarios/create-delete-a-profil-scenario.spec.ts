import {test, expect, Page} from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AddProfilFixture } from 'src/app/features/pregame/components/add-profil-button/add-profil-button.fixture';
import { StudentFixture } from 'src/app/features/pregame/components/student/student.fixture';
import { ProfilFormFixture } from 'src/app/features/pregame/components/popup-add-profil/popup-add-profil.fixture';
import { ConfirmDeleteFixture } from 'src/app/features/pregame/components/popup-delete-profil/popup-delete-profil.fixture';



test.describe('Student Feature', () => {
    test('Create a Student successfully', async ({page}) => {
        await page.goto(testUrl);

        //create fixtures
        const addProfilFixture = new AddProfilFixture(page);
        const profilFormFixture = new ProfilFormFixture(page);

        await expect(page).toHaveURL("http://localhost:4200/pre-game");

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
    test('Delete a Student successfully', async ({page}) => {
        await page.goto(testUrl);
        const studentFixture = new StudentFixture(page);
        const confirmDeleteFixture = new ConfirmDeleteFixture(page);
        const studentIndex = await studentFixture.getIndexOfName('Lucas');
        const student = page.locator('student').filter({ hasText: 'Lucas' }).getByTestId('selectButton');
        await studentFixture.clickDelButton(studentIndex);
        await confirmDeleteFixture.clickConfirmButton();
        await expect(student).not.toBeVisible();
    });

});
