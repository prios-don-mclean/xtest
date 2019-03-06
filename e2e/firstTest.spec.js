console.log('[firstTest.spec.js]: Running top level script');

describe('Example', () => {
  beforeEach(async () => {
    console.log('[firstTest.spec.js:beforeEach] start');
    await device.reloadReactNative();
    console.log('[firstTest.spec.js:beforeEach] done');
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('AppContainerID'))).toBeVisible();
    // await expect(() => 1).toBe(1);
  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
