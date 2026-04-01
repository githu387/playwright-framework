import {test,Page,expect } from "@playwright/test";
import { testdata } from "../Utils/Testdata";
import { LoginPage } from "../Pages/LoginPage";


let login:LoginPage
test("Login SwagLab Application",async({page})=>
{
   login=new LoginPage(page)
   await page.goto(testdata.URL);
   await expect(page).toHaveURL(testdata.URL)
   await expect(page).toHaveTitle("Swag Labs");
   //await login.LoginApplication(testdata.Usename,testdata.Password)
   await login.user.fill(testdata.Usename)
   await login.pass.fill(testdata.Password)
   await expect(login.user).toHaveValue(testdata.Usename);
   await expect(login.pass).toHaveValue(testdata.Password);
   await login.loginbtn.click()
   await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

})