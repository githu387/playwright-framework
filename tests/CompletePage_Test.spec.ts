import {test,expect,Page} from "@playwright/test"
import { LoginPage } from "../Pages/LoginPage";
import { Inventrypage } from "../Pages/InventryPage";
import { cartpage } from "../Pages/CartPage";
import { checkout } from "../Pages/CheckoutPage";
import { Overview } from "../Pages/OverviewPage";
import { completepage } from "../Pages/CompletePage";
import { testdata } from "../Utils/Testdata";


let com:completepage;
test.beforeEach("Login appplication and add to cart",async({page})=>
{
    let login=new LoginPage(page);
    let Invent=new Inventrypage(page);
    let cart=new cartpage(page);
    let check=new checkout(page);
    let over=new Overview(page);
    com=new completepage(page);

    await page.goto('/');
    await login.LoginApplication(testdata.Usename,testdata.Password);
    await Invent.AddMultipleProduct();
    await cart.VerifyBoltTShirtOnCartPage();
    await cart.OpenCheckOutPage();
    await check.VerifyFillDetail("Dhanaji","Jagtap","416610");
    await check.VerifyContinue();
    await over.VerifyFinishbutton();
})
test("Verify title of completed page",async({page})=>
{
    await com.VerifytitleonCompletePage();
    await expect(com.title).toHaveText("Checkout: Complete!");
    await expect(page).toHaveTitle("Swag Labs");
})
test("Verify Test Headers in Compeletd page",async({page})=>
{
    await com.VerifyHeaderofCompletedPage();
    await expect(com.headertext).toHaveText("Thank you for your order!");
    await expect(com.headerinfo).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    await expect(com.headerimg).toBeVisible();
})
test("Verify CartLink on Completed page",async({page})=>
{
    await com.VerifyCartLink();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
})
test("Verify HomePage on Completed button",async({page})=>
{
    await com.VerifyHomepagebutton();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
})