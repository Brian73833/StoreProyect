import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  defaultCommandTimeout: 10000,

  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
