
import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        // Update these locators according to the actual page
        this.email = page.locator('input[type="Sarthak_dev_goenka"]');
        this.password = page.locator('input[type="Merismart@123"]');

        this.signInButton = page.getByRole('button', {
            name: /sign in/i
        });
    }

    async open() {
        await this.page.goto(
            'https://dev.digipass.verismart.ai/admin/'
        );
    }

    async login(username, password) {
        await this.email.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
    }

    async verifyLoginPage() {
        await expect(this.email).toBeVisible();
        await expect(this.password).toBeVisible();
        await expect(this.signInButton).toBeVisible();
    }
}
