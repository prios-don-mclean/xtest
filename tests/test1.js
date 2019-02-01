const { remote } = require('webdriverio');
const assert = require('assert');

const useLocalhostConfig = process.argv.some((arg) => arg === '--localhost');

console.log('use localhost config?: ', useLocalhostConfig);

// LOCAL
const localhostConfig = {
    logLevel: 'error',
    // path: '/',
    hostname: 'localhost',
    port: 4723,
    capabilities: {
        automationName: 'Espresso', //'UiAutomator2',
        platformName: 'Android',
        deviceName: 'Android Emulator',
        app: process.cwd() + "/android/app/build/outputs/apk/release/app-release.apk"
    }
};

// SAUCELABS
const sauceLabsConfig = {    
    user: process.env.SAUCELABS_USERNAME, // prios-don-mclean',
    key: process.env.SAUCELABS_ACCESS_KEY, // '5917e2c0-4a34-48c4-bd4e-4fc91171d9c0',
    // sauceConnect: true, //TODO: look into setting this up for secure connection.
    // services: ['sauce'], //TODO: look into setting this up for secure connection.
    capabilities: {
        // platformName: 'Android',
        deviceName: 'Android Emulator',
        app: 'https://github.com/prios-don-mclean/xtest/raw/master/artifacts/ytest.apk'
        // app: 'sauce-storage:ytest.apk'
    }
};

const config = useLocalhostConfig ? localhostConfig : sauceLabsConfig;

describe('Test that app loads', function() { 
    let browser = null;
    before(async function() {
        this.timeout(50000);
        try {
            browser = await remote(config);
        } catch(err) {
            if(err && err.message) {
                console.log(err.message);
            } else {
                console.log(err);
            }
        }
    });

    //CLOSE SESSION
    after(async function() {
        this.timeout(50000);
        try {
            await browser.deleteSession();;
        }
        catch(err) {
            console.error(err);
        }
    });                                     
    it('renders homeScreenContainer', async function() {
        if (browser.isAndroid) {
            const homeScreenContainer = await browser.$('~homeScreenContainerID');

            await homeScreenContainer.waitForDisplayed(5000);

            const homeScreenContainerDisplayed = await homeScreenContainer.isDisplayed();
    
            assert.equal(homeScreenContainerDisplayed, true);
        }
    
        if (browser.isIOS) {
            assert.equal(browser.isIOS, true);
        }
    });

    it('renders app renders welcomeText', async function() {
        if (browser.isAndroid) {
            const welcomeTextEl = await browser.$('~welcomeTextID');

            await welcomeTextEl.waitForDisplayed(5000);

            const welcomeTextDisplayed = await welcomeTextEl.isDisplayed();
    
            assert.equal(welcomeTextDisplayed, true);
        }
    
        if (browser.isIOS) {
            assert.equal(browser.isIOS, true);
        }
    });

    it('verify Home Screen welcomeText', async function() {
        if (browser.isAndroid) {
            const welcomeTextEl = await browser.$('~welcomeTextID');

            await welcomeTextEl.waitForDisplayed(5000);

            const welcomeText = await welcomeTextEl.getText();
    
            assert.equal(welcomeText, 'YTEST on on Android!');
        }
    
        if (browser.isIOS) {
            assert.equal(browser.isIOS, true);
        }
    });

    it('verify Form Test Screen Button is displayed', async function() {
        if (browser.isAndroid) {
            const formTestScreenButton = await browser.$('~formTestScreenButtonID');

            const formTestScreenButtonDisplayed = await formTestScreenButton.isDisplayed();
    
            assert.equal(formTestScreenButtonDisplayed, true);
        }
    
        if (browser.isIOS) {
            assert.equal(browser.isIOS, true);
        }
    });

    it('navigate to Form Test Screen and back home', async function() {
        this.timeout(50000);
        if (browser.isAndroid) {
            const formTestScreenButton = await browser.$('~formTestScreenButtonID');

            await formTestScreenButton.click();

            const formScreenContainer = await browser.$('~formScreenContainerID');

            await formScreenContainer.waitForDisplayed(5000);

            const formScreenContainerDisplayed = await formScreenContainer.isDisplayed();
    
            assert.equal(formScreenContainerDisplayed, true);

            await browser.back();

            const homeScreenContainer = await browser.$('~homeScreenContainerID');

            const homeScreenContainerDisplayed = await homeScreenContainer.isDisplayed();
    
            assert.equal(homeScreenContainerDisplayed, true);
        }
    
        if (browser.isIOS) {
            assert.equal(browser.isIOS, true);
        }
    });

    it('navigate to Form Test Screen and submit form', async function() {
        this.timeout(50000);
        if (browser.isAndroid) {
            const formTestScreenButton = await browser.$('~formTestScreenButtonID');

            await formTestScreenButton.click();

            const formScreenContainer = await browser.$('~formScreenContainerID');

            await formScreenContainer.waitForDisplayed(5000);

            const formScreenContainerDisplayed = await formScreenContainer.isDisplayed();
    
            assert.equal(formScreenContainerDisplayed, true);

            const firstNameInput = await browser.$('~firstNameInputID');
            const lastNameInput = await browser.$('~lastNameInputID');
            const emailInput = await browser.$('~emailInputID');
            const submitButton = await browser.$('~submitButtonID');

            await firstNameInput.waitForDisplayed(5000);
            await lastNameInput.waitForDisplayed(5000);
            await emailInput.waitForDisplayed(5000);
            await submitButton.waitForDisplayed(5000);

            const firstNameInputDisplayed = await firstNameInput.isDisplayed();
            const lastNameInputDisplayed = await lastNameInput.isDisplayed();
            const emailInputDisplayed = await emailInput.isDisplayed();
            const submitButtonDisplayed = await submitButton.isDisplayed();

            assert.equal(firstNameInputDisplayed, true);
            assert.equal(lastNameInputDisplayed, true);
            assert.equal(emailInputDisplayed, true);
            assert.equal(submitButtonDisplayed, true);

            await firstNameInput.setValue('my first name is very very very long');
            await lastNameInput.setValue('my last name is short');
            await emailInput.setValue('emaillllll@example.org');
            // TODO: select dropdown value
            await submitButton.touchAction('press');
        }
    
        if (browser.isIOS) {
            assert.equal(browser.isIOS, true);
        }
    });
});