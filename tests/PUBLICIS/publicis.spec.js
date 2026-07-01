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

    await page.goto('https://connectedid.growthosin.ai/sign-in');

    await page.getByPlaceholder('Email Address')
        .fill('swati.gupta01@yopmail.com');

    await page.getByPlaceholder('Password')
        .fill('Verismart@123');
    await page.waitForTimeout(2000)
    await page.getByRole('button', {name:'Log In'}).click();        
    await page.waitForTimeout(3000)
    
    await page.getByRole('button', { name: 'Add New Brand' }).click();
    await page.waitForTimeout(3000)

    await page.getByPlaceholder('Brand Name').fill('Brand may15');
    await page.waitForTimeout(2000)
    await page.getByPlaceholder('About brand').fill('testing this brand')
    await page.waitForTimeout(2000)

    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(3000)
    await page.click('text=Select brand to continue');
    await page.getByText('Brand_may15').click();
    await page.waitForTimeout(3000)


});
