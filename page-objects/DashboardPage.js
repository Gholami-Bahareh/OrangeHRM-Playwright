class DashboardPage {
    constructor(page) {
        this.page = page;

        //Locators
        this.accountDropdown = page.locator('.oxd-userdropdown-tab');
        this.logoutLink = page.locator('a[href="/web/index.php/auth/logout"]');
        this.dashboardBreadcrump = page.locator('.oxd-topbar-header-breadcrumb');
        this.timeAtWorkWidget = page.getByText('Time at Work'); 
        this.myActionWidget = page.getByText('My Actions'); 
        this.quickLaunchWidget = page.locator('.orangehrm-dashboard-widget').filter({ hasText: 'Quick Launch' }).first();
        this.interactiveElementsInQuickLaunchWidget = this.quickLaunchWidget.locator('button');  


    }   

    //Methods / Functions
    async logOut(){
        await this.accountDropdown.click();
        await this.logoutLink.click();
    }

    async goto(){
        await this.page.goto('/');
    }   

    async isAt(){
        await expect(this.dashboardBreadcrump).toHaveText('Dashboard');
    }

};

module.exports = { DashboardPage };