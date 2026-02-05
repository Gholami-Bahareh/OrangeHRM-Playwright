const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../page-object/LoginPage');

test('Login with valid credentials',async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.usernameInput.fill('Admin');
    await loginPage.passwordInput.fill('admin123');
    await loginPage.loginButton.click();
});

