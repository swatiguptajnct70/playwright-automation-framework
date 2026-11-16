
import { test, expect } from '@playwright/test';

test('Sanity - Create Campus Invite & Notification', async ({ page }) => {

    // 1. Navigate to Login Page
    await page.goto('https://dev.digipass.verismart.ai/admin/sign-in?redirect=back');

    // 2. Login
    await page.getByRole('textbox', { name: 'Enter your email' })
        .fill(process.env.TEST_EMAIL || 'Sarthak_dev_goenka');

    await page.getByRole('textbox', { name: 'Enter your password' })
        .fill(process.env.TEST_PASSWORD || 'Merismart@123');

    await page.getByRole('button', { name: 'Sign in' }).click();

    // 3. Verify Successful Login
    await expect(page).not.toHaveURL(/sign-in/);

    // 4. Navigate to Campus Invites
    await page.getByRole('button', { name: 'Keep sidebar open' }).click();

    await page.getByRole('button', { name: 'Communication +' }).click();

    await page.getByRole('button', { name: 'Invites & alerts' }).click();

    await page.getByRole('button', { name: 'Campus invites' }).click();

    // 5. Open Create Invite
    await page.getByRole('button', {
        name: 'Create Invite & Notification'
    }).click();

    // 6. Enter Campaign Name
    await page.getByRole('textbox', { name: 'Campaign Name' })
        .fill('Invite_test');

    // 7. Select Notification Type
    await page.getByRole('combobox', {
        name: 'Select Notification Type'
    }).click();

    await page.getByRole('option', {
        name: 'INVITE',
        exact: true
    }).click();

    // 8. Select User Type
    await page.getByRole('combobox', {
        name: 'Select User Type'
    }).click();

    await page.getByRole('option', {
        name: 'student',
        exact: true
    }).click();

    // 9. Select Channels
    const channelDropdown = page.getByRole('combobox', {
        name: 'Select Channel'
    });

    await channelDropdown.click();

    await page.getByRole('option', {
        name: 'whatsapp',
        exact: true
    }).click();

    await page.getByRole('option', {
        name: 'email',
        exact: true
    }).click();

    // Close dropdown using Escape
    await page.keyboard.press('Escape');

    // 10. Select Document Verification
    await page.getByRole('combobox', {
        name: 'Select Document Verification'
    }).click();

    await page.getByRole('option', {
        name: 'True',
        exact: true
    }).click();

    // 11. Select Template
    await page.getByRole('combobox', {
        name: 'Select Template'
    }).click();

    await page.getByRole('option', {
        name: 'student_normal_prod',
        exact: true
    }).click();

    // 12. Select Individual Invite Option
    await page.getByRole('button', {
        name: /Send Individual Invite/
    }).click();

    // 13. Upload Excel File
    const path = require('path');

    const filePath = path.resolve(
        process.cwd(),
        'test-data',
        '1770640467642_student_normal (39).xlsx'
    );

    await page.locator('input[type="file"]').setInputFiles(filePath);

    await page.waitForTimeout(4000)

    // 14. Submit
    await page.getByRole('button', {
        name: 'Submit',
        exact: true
    }).click();
 await page.waitForTimeout(4000)
    // 15. Verify Submission
    // Replace this assertion with the actual success message
    // or expected result displayed by the application.

});