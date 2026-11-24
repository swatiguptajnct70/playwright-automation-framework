import { test } from '@playwright/test';

import { LoginPage } from '../../Pages/LoginPage.js';
import { CampusInvitePage } from '../../Pages/CampusInvitepage.js';

test('Student Campus Invite', async ({ page }) => {

    const login = new LoginPage(page);
    const invite = new CampusInvitePage(page);

    await login.login(
        process.env.TEST_EMAIL,
        process.env.TEST_PASSWORD
    );

    await invite.openCampusInvites();

    await invite.createInvite({
        campaignName: 'Student_Invite_Test',
        userType: 'student',
        channels: ['whatsapp', 'email'],
        template: 'student_normal_prod',
        fileName: 'student_normal.xlsx'
    });
});