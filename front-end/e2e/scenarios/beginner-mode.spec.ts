import { test, expect, Page } from '@playwright/test';
import { GameFixture } from 'src/app/features/game/game.fixture';
import { StudentFixture } from 'src/app/features/pregame/components/student/student.fixture';
import { PregameFixture } from 'src/app/features/pregame/pregame.fixture';


test.describe('Tests du Mode Débutant', () => {
    let gameFixture: GameFixture;
    let pregameFixture: PregameFixture;
    let studentFixture: StudentFixture;



    test.beforeEach(async ({page}) => {
        gameFixture = new GameFixture(page);
        pregameFixture = new PregameFixture(page);
        studentFixture = new StudentFixture(page);

        await gameFixture.navigateToPregame();
        await studentFixture.selectStudent("Romain");
        await pregameFixture.selectDifficulty("débutant");
    });

    test("Doit afficher mode 'débutant'", async() => {
        const modeName = await gameFixture.getModeName();
        expect(modeName).toBe(" Mode débutant ");
    });

    test("Doit afficher le message second chance", async() => {
        await gameFixture.enterWord("mauvaismot");
        const isSecondChanceVisible = await gameFixture.isSecondChanceVisible();
    });
})