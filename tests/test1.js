const { remote } = require('webdriverio');
const assert = require('assert');

const useLocalhostConfig = process.argv.some((arg) => arg === '--localhost');
const platformArg = process.argv.find((arg) => arg === '--ios') ? 'ios' : 'android';

console.log('use localhost config?: ', useLocalhostConfig);
console.log('platformArg: ', platformArg);

const platformSpecificCapabilities = {
    // LOCALHOST
    true: {
        ios: {
            logLevel: 'error',
            hostname: 'localhost',
            port: 4723,
            capabilities: {
                automationName: "XCUITest",
                platformName: 'iOS',
                platformVersion: '11.0',
                app: process.cwd() + "/ios/ytest.zip",
                deviceName: 'iPhone 6',
            }
        },
        android: {
            logLevel: 'error',
            hostname: 'localhost',
            port: 4723,
            capabilities: {
                unicodeKeyboard: true,
                resetKeyboard: true,
                automationName: 'Espresso', //'UiAutomator2',
                platformName: 'Android',
                deviceName: 'Android Emulator',
                app: process.cwd() + "/android/app/build/outputs/apk/release/app-release.apk"
            }
        }
    },

    // SAUCELABS
    false: {
        ios: {    
            user: process.env.SAUCELABS_USERNAME, // 'william89', //process.env.SAUCELABS_USERNAME, // 'prios-don-mclean',
            key: process.env.SAUCELABS_ACCESS_KEY, // '3eaf7023-d5ed-4dee-881f-682d8799382c', //process.env.SAUCELABS_ACCESS_KEY, // '5917e2c0-4a34-48c4-bd4e-4fc91171d9c0',
            // sauceConnect: true, //TODO: look into setting this up for secure connection.
            // services: ['sauce'], //TODO: look into setting this up for secure connection.
            capabilities: {
                automationName: "XCUITest",
                platformName: 'iOS',
                platformVersion: '11.0',
                app: 'sauce-storage:ytest.zip',
                // udid: '08A381BB-4058-458D-A6E6-F878BC2B69BB',
                deviceName: 'iPhone Simulator',
            }
        },
        android: {    
            user: 'william89', //process.env.SAUCELABS_USERNAME, // 'prios-don-mclean',
            key: '3eaf7023-d5ed-4dee-881f-682d8799382c', //process.env.SAUCELABS_ACCESS_KEY, // '5917e2c0-4a34-48c4-bd4e-4fc91171d9c0',
            // sauceConnect: true, //TODO: look into setting this up for secure connection.
            // services: ['sauce'], //TODO: look into setting this up for secure connection.
            capabilities: {
                // platformName: 'Android',
                unicodeKeyboard: true,
                resetKeyboard: true,
                deviceName: 'Android Emulator',
                app: 'sauce-storage:ytest.apk'
            }
        }
    }
};

const config = platformSpecificCapabilities[useLocalhostConfig][platformArg];

describe('Test that app loads', function() {
    let browser = null;
    before(async function() {
        this.timeout(60000);
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
            await browser.deleteSession();
        }
        catch(err) {
            console.error(err);
        }
    });                                     
    it('renders homeScreenContainer', async function() {
        this.timeout(10000);
        const homeScreenContainer = await browser.$('~homeScreenContainerID');

        await homeScreenContainer.waitForDisplayed(5000);

        const homeScreenContainerDisplayed = await homeScreenContainer.isDisplayed();

        assert.equal(homeScreenContainerDisplayed, true);
    });

    it('renders app renders welcomeText', async function() {
        this.timeout(10000);

        const welcomeTextEl = await browser.$('~welcomeTextID');

        await welcomeTextEl.waitForDisplayed(5000);

        const welcomeTextDisplayed = await welcomeTextEl.isDisplayed();

        assert.equal(welcomeTextDisplayed, true);
    });

    it('verify Home Screen welcomeText', async function() {
        this.timeout(10000);

        const welcomeTextEl = await browser.$('~welcomeTextID');

        await welcomeTextEl.waitForDisplayed(5000);

        const welcomeText = await welcomeTextEl.getText();

        if (browser.isAndroid) {
            assert.equal(welcomeText, 'YTEST on Android!');
        }
    
        if (browser.isIOS) {
            assert.equal(welcomeText, 'YTEST on iOS!');
        }
    });

    it('verify Form Test Screen Button is displayed', async function() {
        this.timeout(10000);

        const formTestScreenButton = await browser.$('~formTestScreenButtonID');

        const formTestScreenButtonDisplayed = await formTestScreenButton.isDisplayed();

        assert.equal(formTestScreenButtonDisplayed, true);
    });

    it('navigate to Form Test Screen and back home', async function() {
        this.timeout(50000);

        const formTestScreenButton = await browser.$('~formTestScreenButtonID');

        await formTestScreenButton.click();

        const formScreenContainer = await browser.$('~formScreenContainerID');

        await formScreenContainer.waitForDisplayed(5000);

        const formScreenContainerDisplayed = await formScreenContainer.isDisplayed();

        assert.equal(formScreenContainerDisplayed, true);        

        // Navigate to back to home screen
        if (browser.isAndroid) {
            await browser.back();
        }
        
        if (browser.isIOS) {
            const headerBackButton = await browser.$('~header-back');

            await headerBackButton.waitForDisplayed(5000);

            const headerBackButtonDisplayed = await headerBackButton.isDisplayed();

            assert.equal(headerBackButtonDisplayed, true);

            await headerBackButton.click();
        }

        const homeScreenContainer = await browser.$('~homeScreenContainerID');

        await homeScreenContainer.waitForDisplayed(5000);

        const homeScreenContainerDisplayed = await homeScreenContainer.isDisplayed();

        assert.equal(homeScreenContainerDisplayed, true);
    });

    it('navigate to Form Test Screen and submit form', async function() {
        this.timeout(50000);
        
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
        // // TODO: select dropdown value

        await submitButton.click();

        await browser.pause(2000);
    });
});