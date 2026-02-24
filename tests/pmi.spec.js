const {expect} = require('@playwright/test');
const {test} = require('../tests/fixtures');
const {PMIPage} = require('../page-objects/PMIPage');
const {DashboardPage} = require('../page-objects/DashboardPage');
const {randomString} = require('../utils/helper');


test('Add employee',async ({authenticatedPage}) => {
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

test.only('Add employee/+assertion',async ({authenticatedPage}) => {
    const dashboardPage = new DashboardPage(authenticatedPage);
    const pmiPage = new PMIPage(authenticatedPage); 

    await dashboardPage.menuePMI.click();
 
    await pmiPage.addEmployeeButton.click();
    await pmiPage.addEmployeeHeadline.waitFor({ state: 'visible' });
   
    const firstName = randomString(5);
    await pmiPage.firstNameInput.fill(firstName);
    const lastName = randomString(5);
    await pmiPage.lastNameInput.fill(lastName);
    await pmiPage.saveButton.click();
    await pmiPage.employeePersonalDetailsHeadline.waitFor({ state: 'visible' });
    await expect(authenticatedPage).toHaveURL(/pim\/viewPersonalDetails/);
    await pmiPage.employeeListButton.click();
    await expect(authenticatedPage).toHaveURL(/viewEmployeeList/);
    const employeeFullName = `${firstName}  ${lastName}`;
    await pmiPage.searchEmployeeByName(employeeFullName);
    const searchedEmployee = await pmiPage.getEmployeeRowByName(employeeFullName);
    await expect(searchedEmployee).toBeVisible();

});