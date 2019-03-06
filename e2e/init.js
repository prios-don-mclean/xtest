const detox = require('detox');
const config = require('../package.json').detox;
const adapter = require('detox/runners/jest/adapter');

jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);

console.log('[init.js]: Running top level script');

beforeAll(async () => {
  console.log('[beforeAll] config: ', config);

  try {
    await detox.init(config);
  } catch (error) {
    console.error('[detox:init] failed with error:', error);
  }

  console.log('[beforeAll] finished initialization');
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
