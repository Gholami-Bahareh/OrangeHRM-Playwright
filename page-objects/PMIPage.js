const {randomString} = require('../utils/helper');

class PMIPage {
    constructor(page) {
        this.page = page;

        //Locators
        this.pmiBreadcrump = page.locator('.oxd-topbar-header-breadcrumb');
        this.addEmployeeButton = page.locator('button[class="oxd-button oxd-button--medium oxd-button--secondary"]');
        this.employeeInformationHeadline = page.getByText('Employee Information');
        this.addEmployeeHeadline = page.locator('.oxd-text.oxd-text--h6.orangehrm-main-title');
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.saveButton = page.locator('button[type= "submit"]');
        this.employeeImageUploadInput = page.locator('input[type="file"]');
        this.employeePersonalDetailsHeadline = page.locator('.oxd-text.oxd-text--h6.orangehrm-main-title').filter({ hasText: 'Personal Details' });
        this.employeeListButton = page.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Employee List' });  
        this.employeeNameInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Name' }).locator('input');
        this.searchButtonInEmployeeList = page.locator('button[type="submit"]');
    }
    //Methods / Functions
    async addNewUser(){
        await this.firstNameInput.fill(randomString(5));
        await this.lastNameInput.fill(randomString(5));

        await this.saveButton.click();
    }

    async searchEmployeeByName(fullName) {
        await this.employeeNameInput.fill(fullName);
        await this.searchButtonInEmployeeList.click();
    }

    async getEmployeeRowByName(fullName) {
        return this.page.locator('.oxd-table-card').filter({ hasText: fullName });
    }

    
    



}

module.exports = { PMIPage };