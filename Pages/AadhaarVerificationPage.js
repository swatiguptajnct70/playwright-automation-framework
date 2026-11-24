
import { expect } from '@playwright/test';

export class AadhaarVerificationPage {

    constructor(page) {
        this.page = page;

        // Login locators
        this.mobileNumber = page.getByPlaceholder('Mobile Number');

        this.whatsappCheckbox = page.getByRole('checkbox', {
            name: 'This Number is available on Whatsapp'
        });

        this.getOtpButton = page.getByRole('button', {
            name: 'Get OTP'
        });

        // OTP screen has 4 single-digit boxes; the first one takes focus
        this.otpInput = page.locator('input[type="tel"]').first();

        // Profile locators
        this.profileOption = page.getByText('Profile');

        // Face verification locators
        this.startFaceVerification = page.getByText('Start Face Verification');
        this.startVerification = page.getByText('Start Verification');
        this.proceedNextButton = page.getByRole('button', {
            name: 'Proceed Next'
        });
        this.verificationSuccessful = page.getByText('Verification Successful');

        // Aadhaar verification locators
        this.aadhaarNumber = page.getByPlaceholder(
            'Enter 12 Digit Aadhaar Number'
        );

        this.captchaInput = page.getByPlaceholder('Enter Captcha');

        this.sendOtpButton = page.getByRole('button', {
            name: 'Send OTP'
        });

        // Aadhaar OTP screen: heading "Enter OTP", 6 single-digit boxes, "Verify Aadhaar" button
        this.aadhaarOtpHeading = page.getByRole('heading', { name: 'Enter OTP' });
        this.aadhaarOtpInput = page.locator('input[type="tel"]').first();
        this.verifyAadhaarButton = page.getByRole('button', { name: 'Verify Aadhaar' });

        // After the 6th OTP digit the page auto-submits and shows a success popup
        this.aadhaarSuccessMessage = page.getByText('Verification Successful');
        this.nextStepButton = page.getByRole('button', { name: 'Next Step' });
        this.verifiedBadge = page.getByText('Verified', { exact: true });
    }

    // Open login page
    async openLoginPage() {
        await this.page.goto('https://dev.digipass.verismart.ai/login');
    }

    // Login using SMS OTP
    async loginWithMobile(mobileNumber, otp) {

        await this.mobileNumber.fill(mobileNumber);

        // Uncheck WhatsApp to use SMS OTP (it is checked by default)
        await this.whatsappCheckbox.uncheck();

        // Click Get OTP
        await this.getOtpButton.click();

        // Wait for OTP input
        await this.page.getByRole('heading', { name: 'Enter OTP' }).waitFor();
        await this.otpInput.waitFor({
            state: 'visible'
        });
        await this.page.waitForTimeout(1000); // let OTP boxes finish mounting

        // OTP boxes need real key presses, fill() does not work on them
        await this.otpInput.click();
        await this.page.keyboard.type(otp, { delay: 150 });

        // No verify button: the app submits automatically after the 4th digit
        await expect(this.page).not.toHaveURL(/login/, { timeout: 15000 });
    }

    // Open Profile
    async openProfile() {
        // Profile is inside the account menu (last icon button in the header)
        await this.page.locator('header button').last().click();
        await this.profileOption.click();
    }

    // Start face verification
    async openFaceVerification() {

        await this.page.mouse.wheel(0, 5000);

        await this.startFaceVerification.click();

        await this.startVerification.click();
    }

    // Complete manual face verification
    async completeFaceVerification() {

        await this.proceedNextButton.waitFor({
            state: 'visible',
            timeout: 120000
        });

        await this.proceedNextButton.click();

        await expect(this.verificationSuccessful).toBeVisible({
            timeout: 30000
        });
    }

    // Enter Aadhaar number
    async enterAadhaarNumber(aadhaarNumber) {
        await this.aadhaarNumber.scrollIntoViewIfNeeded();
        await this.aadhaarNumber.click();

        // Field needs real key presses (fill() doesn't trigger its input handler)
        await this.aadhaarNumber.pressSequentially(aadhaarNumber, { delay: 80 });

        // Field masks the number once typed (XXXXXXXX4447), so only check the last 4 digits
        await expect(this.aadhaarNumber).toHaveValue(
            new RegExp(aadhaarNumber.slice(-4) + '$')
        );
    }

    // Wait for CAPTCHA (typed manually by the tester)
    async waitForCaptchaEntry() {

        await this.captchaInput.waitFor({
            state: 'visible'
        });

        // The page can hand focus back to the Aadhaar field while the CAPTCHA
        // loads, so keep moving the cursor to CAPTCHA until the tester types.
        const deadline = Date.now() + 120000;

        while (Date.now() < deadline) {

            const state = await this.captchaInput.evaluate(el => ({
                length: el.value.trim().length,
                focused: document.activeElement === el
            }));

            if (state.length >= 6) {
                return;
            }

            if (state.length === 0 && !state.focused) {
                await this.captchaInput.scrollIntoViewIfNeeded();
                await this.captchaInput.click();
                await this.captchaInput.focus();
            }

            await this.page.waitForTimeout(300);
        }

        throw new Error('CAPTCHA was not entered within 120 seconds');
    }

    // Send Aadhaar OTP
    async sendAadhaarOtp() {
        await this.sendOtpButton.click();
    }

    // Put the cursor in the Aadhaar OTP field, wait for the 6 digits, then click Verify Aadhaar
    async waitForAadhaarOtpEntry() {

        await this.aadhaarOtpHeading.waitFor({ timeout: 30000 });
        await this.aadhaarOtpInput.waitFor({ state: 'visible' });

        const boxes = this.page.locator('input[type="tel"]');
        const deadline = Date.now() + 120000;

        while (Date.now() < deadline) {

            const filled = await boxes.evaluateAll(
                els => els.filter(el => el.value.trim().length > 0).length
            );

            // All 6 digits typed
            if (filled >= 6) {
                break;
            }

            // Nothing typed yet: keep the cursor in the first OTP box
            if (filled === 0) {
                const focused = await this.aadhaarOtpInput.evaluate(
                    el => document.activeElement === el
                );

                if (!focused) {
                    await this.aadhaarOtpInput.click();
                    await this.aadhaarOtpInput.focus();
                }
            }

            await this.page.waitForTimeout(300);
        }

        if (Date.now() >= deadline) {
            throw new Error('Aadhaar OTP was not entered within 120 seconds');
        }

        // Click Verify Aadhaar right away. If the page already auto-submitted
        // the button is gone ("Please wait..."), so just carry on.
        await this.verifyAadhaarButton
            .click({ timeout: 3000 })
            .catch(() => {});
    }

    // After the OTP is typed manually: popup -> Next Step -> profile shows Verified
    async completeAadhaarVerification() {

        await expect(this.aadhaarSuccessMessage).toBeVisible({
            timeout: 120000
        });

        await this.nextStepButton.click();

        await expect(this.page).toHaveURL(/\/profile/);
        await expect(this.verifiedBadge).toBeVisible();
    }

    // Complete Aadhaar verification flow
    async verifyAadhaar(aadhaarNumber) {

        await this.enterAadhaarNumber(aadhaarNumber);

        await this.waitForCaptchaEntry();

        await this.sendAadhaarOtp();

        await this.waitForAadhaarOtpEntry();
    }
}
