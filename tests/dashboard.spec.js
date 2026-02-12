const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../page-objects/LoginPage');
const {DashboardPage} = require('../page-objects/DashboardPage');


test('Successful login redirects user to dashboard',async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    const dashboardPage = new DashboardPage(page);
    await expect(page).toHaveURL('/web/index.php/dashboard/index');
    await expect(dashboardPage.accountDropdown).toBeVisible();  
});

test.only('Successful logout redirects user to login page', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.accountDropdown).toBeVisible();
    await dashboardPage.logOut();
    await expect(page).toHaveURL('/web/index.php/auth/login');
});