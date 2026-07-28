import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://smart-exchange.gammasprint.com/');

    await page.getByPlaceholder('Email Address')
        .fill('test_login_123477@yopmail.com');

    await page.getByPlaceholder('Password')
        .fill('test_login_123477');
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Campaign' }).click();
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Campaign List' }).click();
    await page.locator('tbody tr').first().locator('button').click();
    await page.getByRole('button', { name: 'Ready My Campaign' }).click();
    await page.waitForTimeout(2000)
});