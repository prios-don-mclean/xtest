const { remote } = require('webdriverio');
const assert = require('assert');

// LOCAL
// const config = {
//     logLevel: 'error',
//     // path: '/',
//     hostname: 'localhost',
//     port: 4723,
//     capabilities: {
//         platformName: 'Android',
//         deviceName: 'Android Emulator',
//         app: process.cwd() + "/android/app/build/outputs/apk/release/app-release.apk"
//     }
// };

// SAUCELABS
const config = {
    // logLevel: 'error',
    // path: '/wd/hub',
    // hostname: 'ondemand.saucelabs.com:80',
    // port: 4444,
    // services: ['sauce'],
    user: process.env.SAUCELABS_USERNAME, // 'prios-don-mclean',
    key: process.env.SAUCELABS_ACCESS_KEY, // '5917e2c0-4a34-48c4-bd4e-4fc91171d9c0',
    // sauceConnect: true,
    capabilities: {
        // platformName: 'Android',
        deviceName: 'Android Emulator',
        app: 'https://github.com/prios-don-mclean/xtest/raw/master/artifacts/ytest.apk'
        // app: 'sauce-storage:ytest.apk'
    }
};

describe('Test that app loads', function() { 
    // this.timeout(300000);
    let browser = null;
    before(async function() {
        try {
            this.timeout(100000);
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
    after(async () => {
        try {
            await browser.deleteSession();;
        }
        catch(err) {
            console.error(err);
        }
    });

    it('renders app renders top level content view', async () => {
        if (browser.isAndroid) {
            const selector = 'new UiSelector().resourceId("android:id/content")';
            const contentView = await browser.$(`android=${selector}`);
    
            assert.equal(!!contentView, true);
        } else if(browser.isIOS) {
            //TODO: add ios specific tests here
            assert.equal(true, true);
        }
        
    });
                                            
    it('renders app renders testview', async () => {
        // const selector = 'new UiSelector().index(1)';
        // const TestView = await browser.$(`android=${selector}`);
        if (browser.isAndroid) {
            //select by accessibilityLabel (android)
            const testView = await browser.$('~testview');

            const testViewExists = await testView.isExisting();
    
            assert.equal(testViewExists, true);
        }
    
        if (browser.isIOS) {
            assert.equal(browser.isIOS, true);
        }
    });

    it('renders app renders welcomeText', async () => {
        // const selector = 'new UiSelector().index(1)';
        // const TestView = await browser.$(`android=${selector}`);
        if (browser.isAndroid) {
            //select by accessibilityLabel (android)
            const welcomeText = await browser.$('~welcomeText');

            const welcomeTextExists = await welcomeText.isExisting();
    
            assert.equal(welcomeTextExists, true);
        }
    
        if (browser.isIOS) {
            assert.equal(browser.isIOS, true);
        }
    });

    it('change welcomeText', async function() {
        // const selector = 'new UiSelector().index(1)';
        // const TestView = await browser.$(`android=${selector}`);
        if (browser.isAndroid) {
            //select by accessibilityLabel (android)
            const welcomeTextEl = await browser.$('~welcomeText');

            const welcomeText = await welcomeTextEl.getText();
    
            assert.equal(welcomeText, 'Welcome to React Native ON YTEST!');
        }
    
        if (browser.isIOS) {
            assert.equal(browser.isIOS, true);
        }
    });
});