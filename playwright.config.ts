import { defineConfig, devices } from '@playwright/test';
import * as dotenv from "dotenv"; //updated by dhanaji


dotenv.config({
  path:`.env.${process.env.ENV || "qa"}`,
  override:true,
 }) //updated by dhanaji


  //path:`.env.${process.env.ENV || "qa"}`

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
//const storageFile = `storageState.${process.env.ENV || "qa"}.json`; //modified by dhanaji
export default defineConfig({
  testDir: './tests',
  use:{
    baseURL:process.env.BASE_URL,
    storageState:'storageState.json',
    headless: true,
    trace: 'on-first-retry',
  },                                   //modified by dhanaji
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 4,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 //use: {
    //baseURL:process.env.BASE_URL, //updated bu dhanaji
    //headless:true,    //updated by dhanaji
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: 'on-first-retry',   //modified by dhanaji
 // },   //modified by dhanaji
  

  /* Configure projects for major browsers */
  projects: [
    {
      name:'setup', // modified by dhanaji
      testMatch: /.*auth\.setup\.spec\.ts/,   //modified by dhanaji
    },
    {
      name: 'chromium',
      testIgnore: /.*auth\.setup\.spec\.ts/,
      use: { ...devices['Desktop Chrome'],
        storageState:'storageState.json',  //modified by dhanaji
       },
       dependencies:['setup'], //modified by dhanaji
    },
/*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
