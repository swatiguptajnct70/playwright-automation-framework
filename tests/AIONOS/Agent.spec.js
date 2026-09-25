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

    const agent_name = `Agent_${Date.now()}`;

    await page.locator('[name="agent_name"]').fill(agent_name);

    await page.locator('[name="wa_number"]').fill('6281519227412');

    await page.locator('[name="wabaid"]').fill('102510056141722');

    await page.locator('[name="phone_number_id"]').fill('128566400160220');

    await page.locator('[name="tier"]').fill('999'); 

    await page.locator('[name="wa_access_token"]').fill('EAAL797DrOE4BO4WmhJvaJ7Y1yW3tNIDGZAERggTKyW36xKc4MmfKQCopZBgTCdcCSqb6sztduDGFuerMiJjrr6ZCAaczZCGimS7Hp2iUxG0zxAA715ASZAGy5DkWwGfeWMEL5dwKvCN2VFcbFhmLbzVmKzUenQXhTeEmQ3P7ZCZBrLiGw5VteaxuVYXQHupdl28')
    await page.waitForTimeout(2000)
    const [response] = await Promise.all([
    page.waitForResponse(res =>
        res.url().includes('/v1/cpass/bot/save-agent') &&
        res.request().method() === 'POST'
    ),

    page.locator('button[type="submit"]').click()
]);

console.log("Status Code:", response.status());

try {
    const responseBody = await response.json();
    console.log("Response Body:", JSON.stringify(responseBody, null, 2));
} catch {
    console.log("Response Body:", await response.text());
}

});
