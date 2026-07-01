import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://smart-exchange.gammasprint.com/sign-in');

    await page.getByPlaceholder('Email Address')
        .fill('consumer.smartexchange@gmail.com');

    await page.getByPlaceholder('Password')
        .fill('Aionos@1234');

    await page.waitForTimeout(2000)
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForTimeout(5000);

    await page.getByRole('button', { name: 'Create Audience' }).click();
    await page.waitForTimeout(2000)

    await page.getByPlaceholder('Enter audience name').fill('Swati Audience1');
    await page.waitForTimeout(3000)

});