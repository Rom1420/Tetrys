import { test, expect, Page } from '@playwright/test';
import { GameComponentFixture } from 'src/app/features/game/game-component.fixture';

test.describe('GameComponent', () => {

    let gameComponentFixture : GameComponentFixture;

    test.beforeEach(async ({ page }) => {
        gameComponentFixture = new GameComponentFixture(page);
        await gameComponentFixture.navigateToGame();
    });

    test('Affichage du mode correctement', async ({ page }) => {
        const modeName = await gameComponentFixture.getModeName();
        expect(modeName).toMatch(/Mode (débutant|intermediaire|avancé|perso)/); // pour le moment perso ne doit aps marché faudrait récucpérer la config actuelle 
    });

    test("Ecrire dans l'input", async ({ page }) => {
        const input = await page.locator('.input-container input');
        await input.fill('example');
        const value = await input.inputValue();
        expect(value).toBe('example');
    });

    test("Affichage du message de 'Deuxième chance' dans le mode débutant", async ({ page }) => {
        const modeName = await gameComponentFixture.getModeName();
        if (modeName !== 'Mode débutant') {
            test.skip("On skip le test car pas en mode débutant");
        }

        await gameComponent.setConfig('débutant'); // Set to beginner mode
    
        await gameComponent.enterWord('wrongword');
        await page.fill('.input-container input', 'wrongword');
        const secondChance = await page.locator('.second-chance');
        expect(await secondChance.isVisible()).toBeTruthy();
    });  

     test('should display second chance message in beginner mode', async () => {
     // Trigger second chance condition
    
    const modeName = await gameComponent.getModeName();
    expect(modeName).toBe('Mode débutant'); // Verify the mode is débutant

    const isSecondChanceVisible = await gameComponent.isSecondChanceVisible();
    expect(isSecondChanceVisible).toBeTruthy();
  });
});