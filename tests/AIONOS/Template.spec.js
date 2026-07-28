import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://smart-exchange.gammasprint.com/sign-in');

    await page.getByPlaceholder('Email Address')
        .fill('test27072026_1@yopmail.com');

    await page.getByPlaceholder('Password')
        .fill('test27072026_1');

    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Templates' }).click();
    await page.getByRole('button', { name: 'Whatsapp Templates' }).click();
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Templates List' }).click();
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Create Template' }).click();

    await page.waitForTimeout(500)

    const templateName = `template_${Date.now()}`;

    await page.locator('[name="templateName"]').fill(templateName);
    await page.waitForTimeout(1000)
    await page.getByRole('combobox', { name: 'Template Language' }).click();
    await page.getByRole('option', { name: 'English', exact: true }).click();
    await page.waitForTimeout(1000)
    await page.getByLabel('Select Template category').click();
    await page.getByText('Send promotional offers,').click();
    await page.waitForTimeout(1000)
    await page.getByRole('textbox', { name: 'Body Text' }).click();
    await page.getByRole('textbox', { name: 'Body Text' }).fill("Hello,\nThis template is for testing purpose please ignore.\n\nBest regards,\nthanks");
    await page.waitForTimeout(1000)
    const [response] = await Promise.all([
        page.waitForResponse(res =>
            res.url().includes('/template') &&
            res.request().method() === 'POST'
        ),

        page.getByRole('button', { name: 'Submit' }).click()
    ]);
await page.waitForTimeout(5000)
    console.log("Status:", response.status());
    console.log("Response:", await response.text());

});
