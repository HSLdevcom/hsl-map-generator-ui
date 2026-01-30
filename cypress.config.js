const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1200,
  viewportHeight: 1300,
  numTestsKeptInMemory: 1,
  projectId: "rax4es",
  video: true,
  e2e: {
    specPattern: "cypress/integration/**/*.spec.js",
    supportFile: "cypress/support/index.js",
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    env: {
      apiUrl: process.env.CYPRESS_API_URL || "http://localhost:4000",
    },
  },
});
