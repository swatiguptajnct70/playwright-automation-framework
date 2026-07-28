 import { test, expect } from '@playwright/test';
 
 test('Login Test', async ({ page }) => {
 
     // ================= Contributor 1 =================
 
     await page.goto('https://smart-exchange.gammasprint.com/sign-in');
 
     await page.getByPlaceholder('Email Address')
         .fill('service.manage@gtech.digital');
 
     await page.getByPlaceholder('Password')
         .fill('service.manage');
     await page.waitForTimeout(1000);
 
     await page.getByRole('button', { name: 'Log In' }).click();
     await page.waitForTimeout(1000);
     await page.locator('tbody tr').first().locator('button').click();
     
     await page.getByRole('button', { name: 'Accept' }).click();
     await page.getByRole('button', { name: 'Accept' }).click();
     await page.waitForTimeout(2000)
 });