const {expect} = require('@playwright/test');
const {test} = require('../tests/fixtures');
const {LoginPage} = require('../page-objects/LoginPage');
const {DashboardPage} = require('../page-objects/DashboardPage');
const {LeavePage} = require('../page-objects/LeavePage');


test('Successful login redirects user to dashboard',async ({authenticatedPage}) => {
        
    const dashboardPage = new DashboardPage(authenticatedPage);

    await expect(authenticatedPage).toHaveURL('/web/index.php/dashboard/index');
    await expect(dashboardPage.accountDropdown).toBeVisible();  
    await expect(dashboardPage.timeAtWorkWidget).toBeVisible();
    await expect(dashboardPage.myActionWidget).toBeVisible();
    await expect(dashboardPage.quickLaunchWidget).toBeVisible();
    await dashboardPage.interactiveElementsInQuickLaunchWidget.first().waitFor({ state: 'visible' });

    const count = await dashboardPage.interactiveElementsInQuickLaunchWidget.count();
    expect(count).toBeGreaterThan(0);

    await expect(dashboardPage.interactiveElementsInQuickLaunchWidget.first()).toBeEnabled();
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

test('Quick Launch: Assign Leave action navigates to Assign Leave page',async ({authenticatedPage}) => {
        
    const dashboardPage = new DashboardPage(authenticatedPage);
    const leavePage = new LeavePage(authenticatedPage);

    await expect(dashboardPage.quickLaunchWidget).toBeVisible();
    await dashboardPage.interactiveElementsInQuickLaunchWidget.first().waitFor({ state: 'visible' });
    await dashboardPage.quickLaunchWidgetAssignLeaveButton.click();

    await expect(authenticatedPage).toHaveURL(/leave\/assignLeave/);
    await expect(leavePage.leaveBreadcrump).toBeVisible();
    await expect(leavePage.leaveBreadcrump).toHaveText('Leave'); 
});

test('Quick Launch: Assign Leave action navigates to My Leave page',async ({authenticatedPage}) => {
        
    const dashboardPage = new DashboardPage(authenticatedPage);
    const leavePage = new LeavePage(authenticatedPage);

    await expect(dashboardPage.quickLaunchWidget).toBeVisible();
    await dashboardPage.interactiveElementsInQuickLaunchWidget.first().waitFor({ state: 'visible' });
    await dashboardPage.quickLaunchWidgetMyLeaveButton.click();

    await expect(authenticatedPage).toHaveURL(/leave\/viewMyLeaveList/);
    await expect(leavePage.myLeaveList).toBeVisible();
});