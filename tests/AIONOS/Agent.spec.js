import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://dev.aionos.metawing.ai/sign-in');

    await page.getByPlaceholder('Email Address')
        .fill('consumer_aionos_brand@yopmail.com');

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

    await page.locator('[name="agent_name"]').fill('Swati_UAT_');

    await page.locator('[name="wa_number"]').fill('6281519227412');

    await page.locator('[name="wabaid"]').fill('102510056141722');

    await page.locator('[name="phone_number_id"]').fill('128566400160220');

    await page.locator('[name="tier"]').fill('999'); 

    await page.locator('[name="wa_access_token"]').fill('EAAL797DrOE4BO4WmhJvaJ7Y1yW3tNIDGZAERggTKyW36xKc4MmfKQCopZBgTCdcCSqb6sztduDGFuerMiJjrr6ZCAaczZCGimS7Hp2iUxG0zxAA715ASZAGy5DkWwGfeWMEL5dwKvCN2VFcbFhmLbzVmKzUenQXhTeEmQ3P7ZCZBrLiGw5VteaxuVYXQHupdl28')

    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(5000)


    //Update Agent Creation\\

    await page.locator('[type=button]').click();
    await page.locator('#mui-103').fill('2309');
    await page.getByRole('button', { name: 'Submit' }).click();
});
