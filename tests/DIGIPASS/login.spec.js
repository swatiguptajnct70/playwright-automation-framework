test.beforeEach(async ({ page }) => {

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('Console Error:', msg.text());
        }
    });

    page.on('pageerror', error => {
        console.log('Page Error:', error.message);
    });

    page.on('requestfailed', request => {
        console.log('Request Failed:', request.url());
    });

}); import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://uat.digipass.verismart.ai/admin/');

    await page.getByPlaceholder('Enter your email')
        .fill('Sarthak_dev_goenka');
    await page.getByPlaceholder('Enter your Password')
        .fill('Verismart@123');
        await page.waitForTimeout(3000) 
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForTimeout(5000)


});
