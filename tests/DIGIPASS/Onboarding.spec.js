import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://uat.digipass.verismart.ai/admin/');

    await page.getByPlaceholder('Enter your email')
        .fill('Sarthak_dev_goenka');
    await page.getByPlaceholder('Enter your Password')
        .fill('Verismart@123');
        await page.waitForTimeout(3000) 
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForTimeout(3000)

    await page.mouse.move(5, 300); // x=5 means left edge
    await page.waitForTimeout(3000)

    // Specific premises select karo
    await page.locator('tr', {
        hasText: 'GD Goenka'
    }).getByRole('button', { name: 'Select' }).click();

    await page.getByText('Invite & Notificatio').click()
    await page.waitForTimeout(3000)
    await page.locator('button[value="campus"]').click();
    await page.waitForTimeout(3000)



});
