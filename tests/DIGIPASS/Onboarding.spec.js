import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://dev.digipass.verismart.ai/admin/');

    await page.getByPlaceholder('Enter your email')
        .fill('Sarthak_dev_goenka');
    await page.getByPlaceholder('Enter your Password')
        .fill('Verismart@123');
        await page.waitForTimeout(1000) 
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForTimeout(1000)

    await page.getByRole('button', { name: 'Prabhat demo premises' }).click();
    await page.getByTestId('MuiDataTableBodyCell-1-4').getByRole('button', { name: 'Select' }).click();
    await page.waitForTimeout(1000)
    await page.mouse.move(5, 300); // x=5 means left edge
    await page.getByRole('button').first().click();
    await page.getByRole('button', { name: 'Invite & Notification' }).click();
    await page.getByRole('button', { name: 'Campus' }).nth(1).click();
    await page.getByRole('button', { name: 'Create Invite & Notification' }).click();
    await page.waitForTimeout(2000)

    const Campaign_name = `Invite_${Date.now()}`;

    await page.getByRole('textbox', { name: 'Campaign Name' }).fill(Campaign_name);
    await page.waitForTimeout(2000)

    await page.getByRole('combobox', { name: 'Select Notification Type' }).click();
    await page.getByRole('option', { name: 'INVITE', exact: true }).click();
    await page.waitForTimeout(1000)

    await page.getByRole('combobox', { name: 'Select User Type' }).click();
    await page.getByRole('option', { name: 'student' }).click();
    await page.waitForTimeout(1000)
    await page.getByRole('combobox', { name: 'Select Channel' }).click();
    await page.getByRole('option', { name: 'email' }).click();
    await page.getByRole('option', { name: 'whatsapp' }).click();
    await page.waitForTimeout(1000)

    await page.locator('.MuiBackdrop-root').click();
    await page.getByRole('combobox', { name: 'Select Document Verification' }).click();
    await page.getByRole('option', { name: 'True' }).click();
    await page.waitForTimeout(1000)

    await page.getByRole('combobox', { name: 'Select Template' }).click();
    await page.getByRole('option', { name: 'student_normal_prod' }).click();
    await page.waitForTimeout(1000)

    await page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-1yxmbwk').first().click();
    await page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-1yxmbwk').first().setInputFiles('1736145260328_student - Sheet1.csv');
    await page.waitForTimeout (2000)
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(4000)
});

    