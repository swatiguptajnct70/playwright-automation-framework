import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://smart-exchange.gammasprint.com/sign-in');

    await page.getByPlaceholder('Email Address')
        .fill('consumer.smartexchange@gmail.com');

    await page.getByPlaceholder('Password')
        .fill('Aionos@1234');

    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button',{ name: 'Campaign'}).click();
    await page.waitForTimeout(1000)

    await page.getByRole('button', { name: 'Create Campaign' }).click();
    await page.waitForTimeout(1000)

    await page.getByPlaceholder('Campaign Name').fill("Swati's Campaign")
    await page.waitForTimeout(1000)

    await page.getByRole('button', { name: 'Choose date' }).first().click();
    await page.getByRole('gridcell', { name: '3', exact: true }).click();
    await page.getByRole('button', { name: 'Choose date', exact: true }).click();
    await page.getByRole('gridcell', { name: '3', exact: true }).click();
    await page.locator('body').click();
    await page.waitForTimeout(1000)

    await page.getByRole('combobox', { name: 'Select Audience' }).click();
    await page.waitForTimeout(1000)
    await page.getByRole('option').first().click();
    await page.waitForTimeout(1000)

    await page.getByRole('combobox', { name: 'Select Conversion Type' }).click();
    await page.getByRole('option', { name: 'CPD - Cost per delivery' }).click();
    await page.waitForTimeout(1000)

    await page.getByRole('combobox', { name: 'Select Preferred Channel' }).click();
    await page.getByRole('option', { name: 'Whatsapp' }).click();
    await page.getByRole('combobox', { name: 'Select WhatsApp Agent' }).click();
    await page.waitForTimeout(1000)
    await page.getByRole('option', { name: 'Uat agent nov 7' }).click();
    await page.getByRole('combobox', { name: 'Select WhatsApp Template' }).click();

    await page.getByText('testimagetemp').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(5000)


    
});