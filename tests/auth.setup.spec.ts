import {test as setup} from "@playwright/test";

setup("Login Application",async({page})=>
{
    //await page.goto("https://www.saucedemo.com/");
    await page.goto(process.env.BASE_URL!);
    //await page.locator("#user-name").waitFor();
    await page.locator("#user-name").fill(process.env.USERNAME!);
    await page.locator("#password").fill(process.env.PASSWORD!);
    await page.locator("#login-button").click();
    await page.waitForURL("**/inventory.html");
    await page.context().storageState({path:'storageState.json'});

})