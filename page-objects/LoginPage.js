class LoginPage {
    constructor(page) {
        this.page = page;

    //Locators
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.oxd-alert.oxd-alert--error');
        this.usernameErrorMessage = page.locator('input[name="username"] >> xpath=ancestor::div[contains(@class,"oxd-input-group")]//span[contains(@class,"oxd-input-field-error-message")]');
        this.passwordErrorMessage = page.locator('input[name="password"] >> xpath=ancestor::div[contains(@class,"oxd-input-group")]//span[contains(@class,"oxd-input-field-error-message")]');
        this.forgotPasswordLink = page.locator('.oxd-text.oxd-text--p.orangehrm-login-forgot-header');

          }

    //Methods / Functions
    async goto(){
        await this.page.goto('/web/index.php/auth/login');
    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}

module.exports = { LoginPage };