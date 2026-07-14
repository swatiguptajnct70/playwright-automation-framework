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

    await page.getByRole('button', { name: 'Templates' }).click();
    await page.getByRole('button', { name: 'Whatsapp Templates' }).click();
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Templates List' }).click();
    await page.getByRole('button', { name: 'Create Template' }).click();

    await page.waitForTimeout(1000)

    const templateName = `template_${Date.now()}`;

    await page.locator('[name="templateName"]').fill(templateName);
    await page.getByRole('combobox', { name: 'Template Language' }).click();
    await page.getByRole('option', { name: 'English', exact: true }).click();
    await page.getByLabel('Select Template category').click();
    await page.getByText('Send promotional offers,').click();
    await page.waitForTimeout(2000)
    await page.getByRole('button', { name: 'None' }).first().click();
    await page.waitForTimeout(2000)
    await page.getByRole('menuitem', { name: 'Image There will be image' }).click();
    await page.waitForTimeout(2000)
    await page.getByRole('textbox', { name: 'Body Text' }).click();
    await page.waitForTimeout(2000)
    await page.getByRole('textbox', { name: 'Body Text' }).click();
    await page.getByRole('textbox', { name: 'Body Text' }).fill('Hi \ntest template');
    await page.waitForTimeout(2000)

    await page.getByRole('button', { name: 'None' }).click();
    await page.getByRole('menuitem', { name: 'Quick Reply This will be' }).click();
    await page.waitForTimeout(2000)
    await page.getByPlaceholder('Button Text').click();
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Button Text').fill('Reply');
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Button Text').press('Tab');
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Button Payload').fill('www.google.com');
    await page.waitForTimeout(1000)
    const path = require('path');

    const filePath = path.join(__dirname, '../../test.data/image.jpeg');

    const fileChooserPromise = page.waitForEvent('filechooser');

    await page.getByRole('button', { name: /upload/i }).click();

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    console.log("Status:", response.status());
    console.log("Response:", await response.text())

});
