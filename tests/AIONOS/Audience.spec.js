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

    //Field 1
    await page.getByRole('textbox', { name: 'Min Age' }).click();
    await page.getByRole('textbox', { name: 'Min Age' }).fill('10');
    await page.getByRole('textbox', { name: 'Max Age' }).click();
    await page.getByRole('textbox', { name: 'Max Age' }).fill('30');

    //field 2
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Socio Economic Status').click();
async function selectFirstOptions(page, count) {
    const options = page.locator('li[role="option"]');

    for (let i = 0; i < count; i++) {
        await options.nth(i).click();
    }
}
    await page.locator('input[role="combobox"]').click();
        await selectFirstOptions(page, 5); // First 5 select
        



});