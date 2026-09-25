import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://smart-exchange.gammasprint.com/sign-in');

    await page.getByPlaceholder('Email Address')
        .fill('consumer.smartexchange@gmail.com');

    await page.getByPlaceholder('Password')
        .fill('Aionos@1234');
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Campaign' }).click();
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Campaign List' }).click();
    await page.getByRole('row', { name: 'Campaign_9878787' }).getByLabel('View Campaign').click();
await page.getByRole('button', { name: 'Lock my Campaign' }).click();
await page.getByRole('button', { name: 'Confirm' }).click();
await page.waitForTimeout(5000)

});