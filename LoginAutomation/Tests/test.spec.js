import {test, expect} from '@playwright/test';
import { LoginPage } from '../Pages/login-page';
test.beforeEach(async ({page}) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
})

test.describe('Check elements visibility', () => {

    test('Verify "Username" input field visibility', async ({page}) => {
        const loginPage = new LoginPage(page);
        const usernameInputFieldIsVisible = await loginPage.isUsernameInputFieldVisible();

        expect(usernameInputFieldIsVisible).toBe(true);
    })

    test('Verify "Password" input field visibility', async ({page}) => {
        const loginPage = new LoginPage(page);
        const passwordInputFieldIsVisible = await loginPage.isPasswordInputFieldVisible();

        expect(passwordInputFieldIsVisible).toBe(true);
    })

    test('Verify "Submit" button visibility', async ({page}) => {
        const loginPage = new LoginPage(page);
        const sumbitButtonIsVisible = await loginPage.isSubmitButtonVisible();

        expect(sumbitButtonIsVisible).toBe(true);
    })
})

test.describe('Test "Log in" functionality', () => {
    const validCredentials = ['student', 'Password123'];
    const invalidUsername = 'incorrectUser';
    const invalidPassword = 'incorrectPassword';
    const successfullyLoggedInURL = 'https://practicetestautomation.com/logged-in-successfully/';
    const expectedInvalidUsernameErrorMessageText = 'Your username is invalid!';
    const expectedInvalidPasswordErrorMessageText = 'Your password is invalid!';

    test('Test log in functionality with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.logIn(validCredentials[0], validCredentials[1]);
        await loginPage.clickSubmitLoginButton();

        await expect(page).toHaveURL(successfullyLoggedInURL);

        const logOutButtonIsVisible = await loginPage.isLogOutButtonVisible();
        expect(logOutButtonIsVisible).toBe(true);
    })

    test('Test log in functionality with invalid username', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.logIn(invalidUsername, validCredentials[1]);
        await loginPage.clickSubmitLoginButton();

        const errorMessageIsVisible = await loginPage.isErrorMessageVisible();
        expect(errorMessageIsVisible).toBe(true);

        const actualInvalidUsernameErrorMessageText = await loginPage.errorMessageText();
        expect(actualInvalidUsernameErrorMessageText).toBe(expectedInvalidUsernameErrorMessageText);
    })

    test('Test log in functionality with invalid password', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.logIn(validCredentials[0], invalidPassword);
        await loginPage.clickSubmitLoginButton();
        
        const errorMessageIsVisible = await loginPage.isErrorMessageVisible();
        expect(errorMessageIsVisible).toBe(true);

        const actualInvalidPasswordErrorMessageText = await loginPage.errorMessageText();
        expect(actualInvalidPasswordErrorMessageText).toBe(expectedInvalidPasswordErrorMessageText);
    })

    test('Test log in functionality by sumbitting empty log in form', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.clickSubmitLoginButton();
        
        const errorMessageIsVisible = await loginPage.isErrorMessageVisible();
        expect(errorMessageIsVisible).toBe(true);

        const actualInvalidUsernameErrorMessageText = await loginPage.errorMessageText();
        expect(actualInvalidUsernameErrorMessageText).toBe(expectedInvalidUsernameErrorMessageText);
    })
})