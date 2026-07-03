import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://smart-exchange.gammasprint.com/sign-in');

    await page.getByPlaceholder('Email Address')
        .fill('consumer.smartexchange@gmail.com');

    await page.getByPlaceholder('Password')
        .fill('Aionos@1234');

    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForTimeout(2000);

    await page.getByRole('button',{name:'Channel Settings'}).click();
    await page.getByRole('button', { name: 'Add New Account' }).click();


    await page.getByRole('combobox', { name: 'Select Channel' }).click();
    await page.getByRole('option', { name: 'Whatsapp' }).click();
    await page.waitForTimeout(1000)

    await page.locator('[name="agent_name"]').fill('Swati_Automate');

    await page.locator('[name="wa_number"]').fill('919999999999');

    await page.locator('[name="wabaid"]').fill('123456789');

    await page.locator('[name="phone_number_id"]').fill('123456789');

    await page.locator('[name="tier"]').fill('999'); 

    await page.locator('[name="wa_access_token"]').fill('9045803495ioruoieuroeiureiwoie')

    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(5000)


    //Update Agent Creation\\

    await page.locator('[type=button]').click();
    await page.locator('#mui-103').fill('2309');
    await page.getByRole('button', { name: 'Submit' }).click();
});
