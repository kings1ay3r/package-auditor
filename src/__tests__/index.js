// run.test.js

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { processFile } = require('../run');
const { copyToClipboard } = require('../wrappers/copyToClipboard');
const data = `{
  "dependencies": {
    "axios": "^1.4.0"
  }
}`

// Mock the fs module to read the package.json file
describe('Process File', () => {

    const mock = new MockAdapter(axios);
    const mockResponse = {
      data: {
        "dist-tags": {
            latest:"1.1.1"
        },
        license:"MIT",
      },
    };
    const url = 'https://registry.npmjs.org/axios';
    mock.onGet(url).reply(200, mockResponse);
  it('should return package information', async () => {
    const packageInfo = await processFile(undefined, data);
    expect(packageInfo.lengthkout).toEqual((`name,currentVersion,latestVersion,license
axios,^1.4.0,,
`).length)
  });

});
