class LoginPage {
    constructor(page) {
        this.page = page;

    //Locators
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');

          }

    //Methods / Functions
    async goto(){
        await this.page.goto('/web/index.php/auth/login');
    }

}

module.exports = { LoginPage };