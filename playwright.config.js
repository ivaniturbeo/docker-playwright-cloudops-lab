module.exports = {
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost',
    browserName: 'chromium',
  },

};