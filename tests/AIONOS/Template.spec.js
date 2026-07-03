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

    await page.getByRole('button', { name: 'Templates' }).click();
    await page.getByRole('button', { name: 'Whatsapp Templates' }).click();
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Templates List' }).click();
    await page.getByRole('button', { name: 'Create Template' }).click();

    await page.waitForTimeout(3000)

    await page.locator('[name="templateName"]').fill('swatitesting');
    await page.waitForTimeout(1000)
    await page.getByRole('combobox', { name: 'Template Language' }).click();
    await page.getByRole('option', { name: 'English', exact: true }).click();
    await page.waitForTimeout(2000)
    await page.getByLabel('Select Template category').click();
    await page.getByText('Send promotional offers,').click();
    await page.waitForTimeout(1000)
    await page.getByRole('textbox', { name: 'Body Text' }).click();
    await page.getByRole('textbox', { name: 'Body Text' }).fill('Hi \ntest template');
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(5000)


});
