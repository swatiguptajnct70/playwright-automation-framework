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
    
})

    