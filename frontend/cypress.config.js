const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    ],
    setupNodeEvents (on, config) {
      // implement node event listeners here
    },
  },

  component: {
    specPattern: 'cypress/components/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
