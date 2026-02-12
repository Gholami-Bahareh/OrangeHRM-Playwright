const {test} = require('@playwright/test');
const {LoginPage} = require('../page-objects/LoginPage');
test('authenticate',async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    
    await page.waitForURL('/web/index.php/dashboard/index');

    console.log('Dashboard URL:', page.url());

    await page.context().storageState({
        path: '.auth/auth.json'
    });
});

