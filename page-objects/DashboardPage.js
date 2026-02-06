class DashboardPage {
    constructor(page) {
        this.page = page;

        //Locators
        this.accountDropdown = page.locator('.oxd-userdropdown-tab');
        this.logoutLink = page.locator('a[href="/web/index.php/auth/logout"]');
        this.dashboardBreadcrump = page.locator('.oxd-topbar-header-breadcrumb');

        
        

    }
    //Methods / Functions
    async logOut(){
        await this.accountDropdown.click();
        await this.logoutLink.click();
    }

    async goto(){
        await this.page.goto('/');
    }   

};

module.exports = { DashboardPage };