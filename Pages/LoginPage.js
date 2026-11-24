
import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        this.email = page.getByRole('textbox', {
            name: 'Enter your email'
        });

        this.password = page.getByRole('textbox', {
            name: 'Enter your password'
        });

        this.loginButton = page.getByRole('button', {
            name: 'Sign in'
        });
    }

    async login(email, password) {
        await this.page.goto(
            'https://dev.digipass.verismart.ai/admin/sign-in?redirect=back'
        );

        console.log('Filling email...');
        await this.email.fill(email);

        console.log('Filling password...');
        await this.password.fill(password);

        console.log('Clicking login...');
        await this.loginButton.click();

        await expect(this.page).not.toHaveURL(/sign-in/, { timeout: 30000 });
    }
}
