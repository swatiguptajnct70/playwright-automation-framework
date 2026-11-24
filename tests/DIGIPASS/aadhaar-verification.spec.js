import { test, expect } from '@playwright/test';
import { AadhaarVerificationPage } from '../../Pages/AadhaarVerificationPage.js';

// Face capture is manual: run with --headed and show your face to the camera
test.use({
    permissions: ['camera']
});

test('TC_001 - Successful Aadhaar Verification', async ({ page }) => {

    // Face capture and CAPTCHA are manual (up to 120s each), so the 30s default is too short
    test.setTimeout(5 * 60 * 1000);

    for (const key of ['TEST_MOBILE', 'TEST_OTP', 'TEST_AADHAAR']) {
        expect(process.env[key], `${key} missing in .env`).toBeTruthy();
    }

    const aadhaarPage = new AadhaarVerificationPage(page);

    // Step 1: Open login page
    await aadhaarPage.openLoginPage();

    // Step 2: Login using mobile number + SMS OTP
    await aadhaarPage.loginWithMobile(
        process.env.TEST_MOBILE,
        process.env.TEST_OTP
    );

    // Step 3: Open Profile
    await aadhaarPage.openProfile();

    // Step 4: Start Face Verification
    await aadhaarPage.openFaceVerification();

    // Step 5: Complete Face Verification
    await aadhaarPage.completeFaceVerification();

    // Step 6: Enter Aadhaar, wait for manual CAPTCHA, click Send OTP
    await aadhaarPage.verifyAadhaar(process.env.TEST_AADHAAR);

    // Step 7: OTP is typed manually, page auto-submits; confirm success popup and Verified profile
    await aadhaarPage.completeAadhaarVerification();
});
