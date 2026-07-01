import { test, expect } from '@playwright/test';

test('TC_001 - Successful Aadhaar Verification', async ({ page }) => {
    await page.goto('https://uat.digipass.verismart.ai/login');

    await page.getByPlaceholder('Mobile Number')
        .fill('8770850075');
        await page.waitForTimeout(3000)

    await page.getByText('This Number is available on Whatsapp').click();
    await page.waitForTimeout(3000)
    await page.getByRole('button', { name: 'Get OTP' })
        .click();
        await page.waitForTimeout(3000)
    await page.locator('input').first().click();
    await page.keyboard.type('1234');
    await expect(page.locator('.success-message'))
        .toHaveText(/verification successful/i);
        await page.waitForTimeout(3000)

        
});