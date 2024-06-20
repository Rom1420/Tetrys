import { test, expect, Page } from '@playwright/test';
import { GameComponentFixture } from 'src/app/features/game/game-component.fixture';

test.describe('Tests du Mode Débutant', () => {
    let gameComponentFixture: GameComponentFixture;
    let pregameComponentFixture: PregameComponentFixture;
    let studentComponentFixture: StudentComponentFixture;

    test.beforeEach(async ({page}) => {
        gameComponentFixture = new GameComponentFixture(page);
        pregameComponentFixture = new PregameComponentFixture(page);
        studentComponentFixture = new StudentComponentFixture(page);

        await gameComponentFixture.navigateToPregame();
        await studentComponentFixture.selectStudent("1");
        await pregameComponentFixture.selectDifficulty("débutant");
    });

    test("Doit afficher mode 'débutant'", async() => {
        const modeName = await gameComponentFixture.getModeName();
        expect(modeName).toBe("débutant");
    });

    test("Doit afficher le message second chance", async() => {
        await gameComponentFixture.enterWord("mauvaismot");
        const isSecondChanceVisible = await gameComponentFixture.isSecondChanceVisible();
    });
})