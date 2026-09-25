import { test, expect } from '@playwright/test';
test.use({
    permissions: ['camera']
});     
test('TC_001 - Successful Aadhaar Verification', async ({ page }) => {
    await page.goto('https://dev.digipass.verismart.ai/login');

    await page.getByPlaceholder('Mobile Number')
        .fill('8770850075');
        await page.waitForTimeout(1000)

    await page.getByText('This Number is available on Whatsapp').click();
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Get OTP' }).click();
    await page.waitForTimeout(3000)
    await page.locator('input').first().click();
    await page.keyboard.type('1234');
   
    await page.waitForTimeout(1000)
    await page.getByRole('button').last().click();
    // Profile menu option click
    await page.getByText('Profile').click();
    await page.waitForTimeout(1000)

    await page.mouse.wheel(0, 5000);
    await page.getByText('Start Face Verification').click();
    await page.getByText('Start Verification').click();

    // Yahan manually face capture kar lo
    await page.getByRole('button', { name: 'Proceed Next' })
        .waitFor({ state: 'visible', timeout: 120000 });

    await page.getByRole('button', { name: 'Proceed Next' }).click();
    await expect(page.getByText('Verification Successful'))
        .toBeVisible();
    await page.click('input[placeholder="Enter 12 Digit Aadhaar Number"]'); 
    await page.type('input[placeholder="Enter 12 Digit Aadhaar Number"]', '682605874447');

    const captchaInput = page.locator(
        'input[placeholder="Enter Captcha"]'
    );

    await captchaInput.click();

    await page.waitForFunction(() => {
        const el = document.querySelector(
            'input[placeholder="Enter Captcha"]'
        );

        return el && el.value.trim().length === 6;
    }, { timeout: 120000 });

    await page.getByRole('button', { name: 'Send OTP' }).click();

    // Cursor captcha field me chala jayega
    await page.click('input[placeholder="Enter Captcha"]');


    await page.locator('input[placeholder="Enter Captcha"]').focus();

    await page.waitForFunction(() => {
        const el = document.querySelector(
            'input[placeholder="Enter Captcha"]'
        );
        return el && el.value.trim().length === 6;
    });

    await page.getByRole('button', { name: 'Send OTP' }).click();
    await page.waitForTimeout(50000);

    
});