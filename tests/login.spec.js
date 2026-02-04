const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../page-object/LoginPage');

test('Login with valid credentials',async ({page}) => {
    const loginPage = new LoginPage(page);
});

