const {expect} = require('@playwright/test');
const {test} = require('../tests/fixtures');
const {LoginPage} = require('../page-objects/LoginPage');
const {DashboardPage} = require('../page-objects/DashboardPage');


test.only('Successful login redirects user to dashboard',async ({authenticatedPage}) => {
        
    const dashboardPage = new DashboardPage(authenticatedPage);

    

    await expect(authenticatedPage).toHaveURL('/web/index.php/dashboard/index');
    await expect(dashboardPage.accountDropdown).toBeVisible();  
});

test('Successful logout redirects user to login page', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.accountDropdown).toBeVisible();
    await dashboardPage.logOut();
    await expect(page).toHaveURL('/web/index.php/auth/login');
});