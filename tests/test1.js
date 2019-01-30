const { remote } = require('webdriverio');
const assert = require('assert');

const SERVER_PORT = 4723;
const SERVER_URL = 'localhost';
const CAPABILITIES = {
    platformName: 'Android',
    deviceName: 'Android Emulator',
    app: process.cwd() + "/android/app/build/outputs/apk/release/app-release.apk"
};

const config = {
    logLevel: 'error',
    // path: '/',
    hostname: SERVER_URL,
    port: SERVER_PORT,
    capabilities: CAPABILITIES
}

describe('Test that app loads', function() { 
    // this.timeout(300000);
    let browser = null;
    before(async function() {
        try {
            this.timeout(10000);
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
    // after(async () => {
    //     try {
    //         await browser.deleteSession();;
    //     }
    //     catch(err) {
    //         console.error(err);
    //     }
    // });

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
});

// (async () => {
//     const browser = await remote({
//         logLevel: 'error',
//         path: '/',
//         capabilities: {
//             browserName: 'firefox'
//         }
//     });

//     await browser.url('https://webdriver.io');

//     const title = await browser.getTitle();
//     console.log('Title was: ' + title);

//     await browser.deleteSession();
// })().catch((e) => console.error(e));




// const wd = require('wd');
// const assert = require('assert');

// const SERVER_PORT = 4723;
// const SERVER_URL = 'localhost';
// const CAPABILITIES = {
//     platformName: 'Android',
//     deviceName: 'Android Emulator',
//     app: process.cwd() + "/android/app/build/outputs/apk/release/app-release.apk"
// };

// const driver = wd.promiseChainRemote(SERVER_URL, SERVER_PORT);

// describe('Test that app loads', function() { 
//     // this.timeout(300000);  
//     before(async function() {
//         try {
//             this.timeout(10000);
//             await driver.init(CAPABILITIES);
//         } catch(err) {
//             if(err && err.message) {
//                 console.log(err.message);
//             } else {
//                 console.log(err);
//             }
//         }
//     });

//     after(async () => {
//         try {
//             await driver.quit();
//         }
//         catch(err) {
//             console.error(err);
//         }
//     });
                                            
//     it('renders some use case', async (done) => {
//         // our test actions and expectations.

//         // const hasTestViewElement = await driver.hasElementByAccessibilityId('testview');

//         // console.log('hasTestViewElement: ', hasTestViewElement);

//         // assert.equal(hasTestViewElement, true);

//         const x = await driver.elementsByAndroidUIAutomator("testview");

//         console.log('x: ', x);

//         assert.equal(1, 1);

        
//         // expect(await driver.hasElementByAccessibilityId('testview')).toBe(true);
//         // [...]
//     });
// });