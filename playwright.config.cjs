module.exports = {
  testDir: "tests",
  testMatch: ["wrapper-runtime.test.ts", "consumer-runtime.test.ts"],
  webServer: {
    command: "bunx vite --host 127.0.0.1 --port 5179",
    url: "http://127.0.0.1:5179/tests/fixtures/wrapper-app.html",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://127.0.0.1:5179",
    browserName: "chromium",
  },
};
