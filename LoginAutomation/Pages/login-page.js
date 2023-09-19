export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInputField = page.locator('input[id="username"]');
        this.passwordInputField = page.locator('input[id="password"]');
        this.submitButton = page.locator('button[id="submit"]');
        this.logOutButton = page.getByText('Log out');
        this.errorMessage = page.locator('div[id="error"]');
    }

    async isUsernameInputFieldVisible() {
        const usernameInputField = this.usernameInputField;
        return await usernameInputField.isVisible();
    }

    async isPasswordInputFieldVisible() {
        const passwordInputField = this.passwordInputField;
        return await passwordInputField.isVisible();
    }

    async isSubmitButtonVisible() {
        const submitButton = this.submitButton;
        return await submitButton.isVisible();
    }

    async fillUsername(username) {
        const usernameInputField = this.usernameInputField;
        await usernameInputField.fill(username);
    }

    async fillPassword(password) {
        const passwordInputField = this.passwordInputField;
        await passwordInputField.fill(password);
    }

    async logIn(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
    }

    async clickSubmitLoginButton() {
        const submitButton = this.submitButton;
        await submitButton.click();
    }

    async isLogOutButtonVisible() {
        const logOutButton = this.logOutButton;
        return await logOutButton.isVisible();
    }

    async isErrorMessageVisible() {
        const errorMessage = this.errorMessage;
        return await errorMessage.isVisible();
    }

    async errorMessageText() {
        const errorMessage = this.errorMessage;
        return await errorMessage.textContent();
    }
}