
import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage.js';
import { CampusInvitePage } from '../../Pages/CampusInvitepage.js';

test('Employee Campus Invite', async ({ page }) => {

    const login = new LoginPage(page);
    const invite = new CampusInvitePage(page);

    await login.login(
        process.env.TEST_EMAIL,
        process.env.TEST_PASSWORD
    );

    await invite.openCampusInvites();

    await invite.createInvite({
        campaignName: 'Employee_Invite_Test',
        userType: 'employee',
        channels: ['whatsapp', 'email'],
        template: 'employee_registration_4',
        fileName: 'employee_onboarding.xlsx'
    });

});
