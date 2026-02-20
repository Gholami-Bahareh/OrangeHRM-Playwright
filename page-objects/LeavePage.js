class LeavePage {
    constructor(page) {
        this.page = page;

        //Locators
        this.leaveBreadcrump = page.locator('.oxd-topbar-header-breadcrumb');
        this.myLeaveList = page.getByText('My Leave List');
       
    }


    //Methods / Functions



}

module.exports = { LeavePage };