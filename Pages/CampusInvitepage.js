
import path from 'node:path';

export class CampusInvitePage {
    constructor(page) {
        this.page = page;
    }

    async openCampusInvites() {
        await this.page.getByRole('button', {
            name: 'Keep sidebar open'
        }).click();

        await this.page.getByRole('button', {
            name: 'Communication +'
        }).click();

        await this.page.getByRole('button', {
            name: 'Invites & alerts'
        }).click();

        await this.page.getByRole('button', {
            name: 'Campus invites'
        }).click();
    }

    async selectDropdown(fieldName, optionName) {
        await this.page.getByRole('combobox', {
            name: fieldName
        }).click();

        await this.page.getByRole('option', {
            name: optionName,
            exact: true
        }).click();
    }

    async createInvite(data) {

        // Open Create Invite
        await this.page.getByRole('button', {
            name: 'Create Invite & Notification'
        }).click();

        // Campaign Name
        await this.page.getByRole('textbox', {
            name: 'Campaign Name'
        }).fill(data.campaignName);

        // Notification Type
        await this.selectDropdown(
            'Select Notification Type', 'INVITE'
        );

        // User Type
        await this.selectDropdown(
            'Select User Type', data.userType
        );

        // Select Channels
        const channelDropdown = this.page.getByRole('combobox', {
            name: 'Select Channel'
        });

        await channelDropdown.click();

        for (const channel of data.channels) {
            await this.page.getByRole('option', {
                name: channel,
                exact: true
            }).click();
        }

        await this.page.keyboard.press('Escape');

        // Document Verification (only shown for some user types, e.g. not for employee)
        const docVerification = this.page.getByRole('combobox', {
            name: 'Select Document Verification'
        });

        if (await docVerification.isVisible()) {
            await this.selectDropdown(
                'Select Document Verification', 'True'
            );
        }

        // Template
        await this.selectDropdown(
            'Select Template', data.template
        );

        // Individual Invite
        await this.page.getByRole('button', {
            name: /Send Individual Invite/
        }).click();

        // Excel Upload
        const filePath = path.resolve(
            process.cwd(),
            'test-data',
            data.fileName
        );

        await this.page.locator('input[type="file"]')
            .setInputFiles(filePath);

        // Submit

        await this.page.getByRole('button', {
            name: 'Submit',
            exact: true
        }).click();
        await this.page.waitForTimeout(2000);
    }
}
