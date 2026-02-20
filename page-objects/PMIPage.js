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
    }

    //Methods / Functions
    async addNewUser(){
        await this.firstNameInput.fill(randomString(5));
        await this.lastNameInput.fill(randomString(5));

        await this.saveButton.click();
    }

    
    



}

module.exports = { PMIPage };