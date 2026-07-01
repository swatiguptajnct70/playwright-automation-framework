import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://dev.adn.metawing.ai/');

    await page.getByPlaceholder('Email Address')
        .fill('consumer_agency02@yopmail.com');

    await page.getByPlaceholder('Password')
        .fill('Verismart@123');
    await page.waitForTimeout(2000)
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Add Brand' }).click();
    await page.waitForTimeout(3000)

    await page.getByPlaceholder('Brand Name').fill('Brand may15');
    await page.waitForTimeout(2000)
    await page.getByPlaceholder('About').fill('testing this brand')
    await page.waitForTimeout(2000)

    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(3000)
    await page.click('text=Brand may15');

    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForTimeout(2000)

    await page.getByRole('button', { name: 'Create Audience' }).click();
    await page.waitForTimeout(2000)

    await page.getByPlaceholder('Audience Group Name').fill('Swati Audience may 15');
    await page.waitForTimeout(3000)

    await page.getByLabel('Device Type').click();
    await page.getByRole('option').first().click();
    await page.waitForTimeout(3000)

    await page.getByRole('combobox', { name: 'Language' }).click();

    await page.getByText('English').click();
    await page.getByText('Hindi').click();

    // close dropdown
    await page.locator('body').click();
        await page.waitForTimeout(3000)
        

});
