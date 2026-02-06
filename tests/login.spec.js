const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../page-objects/LoginPage');
const {DashboardPage} = require('../page-objects/DashboardPage');
const {loginData} = require('../test-data/test-data');

test('Login with valid credentials',async ({page}) => {
    const logindata = loginData;
    for (let i=0; i<logindata.length; i++){
        const item = loginData[i];
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        await loginPage.goto();
        await loginPage.login(item.username, item.password);
        if(item.valid){
            await expect(dashboardPage.accountDropdown).toBeVisible();
            await expect(dashboardPage.dashboardBreadcrump).toHaveText('Dashboard');
            await dashboardPage.logOut();
            await expect(page).toHaveURL('/web/index.php/auth/login');
            await expect(loginPage.loginButton).toBeVisible();
        }
        else{
            await expect(loginPage.errorMessage).toBeVisible();
        }
    }
});



