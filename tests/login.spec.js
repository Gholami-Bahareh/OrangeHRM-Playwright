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

test('Login with empty credentials',async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(loginPage.usernameErrorMessage).toBeVisible(); 
    await expect(loginPage.passwordErrorMessage).toBeVisible();
});

test('UI element should be visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
});

test.only('Login button should be enabled' , async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginButton).toBeEnabled();
});

test.only('Password field should be masked', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
});



