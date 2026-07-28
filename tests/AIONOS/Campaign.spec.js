import { test, expect } from '@playwright/test';

test('Login Test', async ({ page }) => {

    await page.goto('https://smart-exchange.gammasprint.com/');

    await page.getByPlaceholder('Email Address')
        .fill('test27072026_1@yopmail.com');

    await page.getByPlaceholder('Password')
        .fill('test27072026_1');
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Log In' }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: 'Campaign' }).click();
    await page.waitForTimeout(500)

    await page.getByRole('button', { name: 'Create Campaign' }).click();
    await page.waitForTimeout(500)

    const campaignName = `Campaign_${Date.now()}`;

    await page.locator('input[name="campaign_name.value"]').fill(campaignName);
    await page.waitForTimeout(500)

    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const ampm = (hours >= 12 ? 'PM' : 'AM').toUpperCase();
    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, '0');

    const startDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    console.log(startDate);
    await page.locator('input[name="start_duration.value"]').fill(startDate);


    const end = new Date();
    end.setDate(end.getDate() + 7);

    const endDay = String(end.getDate()).padStart(2, '0');
    const endMonth = String(end.getMonth() + 1).padStart(2, '0');
    const endYear = end.getFullYear();

    let endHours = end.getHours();
    const endMinutes = String(end.getMinutes()).padStart(2, '0');

    const endAmpm = endHours >= 12 ? 'PM' : 'AM';
    endHours = endHours % 12 || 12;
    endHours = String(endHours).padStart(2, '0');

    const endDate = `${endDay}/${endMonth}/${endYear} ${endHours}:${endMinutes} ${endAmpm}`;

    await page.locator('input[name="end_duration.value"]').fill(endDate);

    await page.locator('body').click();
    await page.waitForTimeout(500)

    await page.getByRole('combobox', { name: 'Select Audience' }).click();
    await page.waitForTimeout(500)
    await page.getByRole('option').first().click();
    await page.waitForTimeout(500)

    await page.getByRole('combobox', { name: 'Select Conversion Type' }).click();
    await page.getByRole('option', { name: 'CPD - Cost per delivery' }).click();
    await page.waitForTimeout(500)

    await page.getByRole('combobox', { name: 'Select Preferred Channel' }).click();
    await page.getByRole('option', { name: 'Whatsapp' }).click();
    await page.getByRole('combobox', { name: 'Select WhatsApp Agent' }).click();
    await page.waitForTimeout(500)
    await page.getByRole('option').first().click();
    await page.getByRole('combobox', { name: 'Select WhatsApp Template' }).click();

    await page.getByRole('option').first().click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForTimeout(2000)

    await page.getByRole('button', { name: 'Lock my Campaign' }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.waitForTimeout(5000)




});