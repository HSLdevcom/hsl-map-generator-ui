const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1200,
  viewportHeight: 1300,
  numTestsKeptInMemory: 1,
  projectId: "rax4es",
  video: true,
  expose: {
    API_URL: process.env.CYPRESS_API_URL || "http://localhost:4000",
  },
  e2e: {
    specPattern: "cypress/integration/**/*.spec.js",
    supportFile: "cypress/support/index.js",
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    setupNodeEvents(on) {
      // Headless Chromium has no GPU and refuses to fall back to software
      // WebGL, so maplibre's Map constructor throws "Failed to initialize
      // WebGL" and takes the whole test down.
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--enable-unsafe-swiftshader");
        }
        return launchOptions;
      });
    },
  },
});
