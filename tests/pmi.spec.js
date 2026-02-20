const {expect} = require('@playwright/test');
const {test} = require('../tests/fixtures');
const {PMIPage} = require('../page-objects/PMIPage');
const {DashboardPage} = require('../page-objects/DashboardPage');


test.only('Add employee',async ({authenticatedPage}) => {
    const dashboardPage = new DashboardPage(authenticatedPage);
    const pmiPage = new PMIPage(authenticatedPage); 

    await dashboardPage.menuePMI.click();
    await expect(authenticatedPage).toHaveURL(/pim\/viewEmployeeList/);
    await expect(pmiPage.employeeInformationHeadline).toBeVisible();
    await pmiPage.addEmployeeButton.click();
    await pmiPage.addEmployeeHeadline.waitFor({ state: 'visible' });
    await expect(pmiPage.addEmployeeHeadline).toHaveText('Add Employee');
    await pmiPage.addNewUser();
    await expect(authenticatedPage).toHaveURL(/pim\/viewPersonalDetails/);
});

test('Add employee with profile photo',async ({authenticatedPage}) => {
    const dashboardPage = new DashboardPage(authenticatedPage);
    const pmiPage = new PMIPage(authenticatedPage); 

    await dashboardPage.menuePMI.click();
    await expect(authenticatedPage).toHaveURL(/pim\/viewEmployeeList/);
    await pmiPage.addEmployeeButton.click();
    await pmiPage.addEmployeeHeadline.waitFor({ state: 'visible' });
    await pmiPage.employeeImageUploadInput.setInputFiles('tests/uploads/profile.png');
    await pmiPage.addNewUser();
});