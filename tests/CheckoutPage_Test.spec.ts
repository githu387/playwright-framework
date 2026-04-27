import {test,Page,expect} from "@playwright/test"
import { LoginPage } from "../Pages/LoginPage"
import { Inventrypage } from "../Pages/InventryPage"
import { cartpage } from "../Pages/CartPage"
import { checkout } from "../Pages/CheckoutPage"
import { testdata } from "../Utils/Testdata"
//import { getconfig } from "../Utils/env"


let Check:checkout;
test.beforeEach("Login Application and select products",async({page})=>
{
    //let login=new LoginPage(page);
    let Invent=new Inventrypage(page);
    let Cart=new cartpage(page);
    Check=new checkout(page);
    //const config=getconfig();
    await page.goto('https://www.saucedemo.com/inventory.html');
    //await page.goto(config.baseURL!);
    //await login.LoginApplication(testdata.Usename,testdata.Password)
    await Invent.AddMultipleProduct();
    await Cart.VerifyBoltTShirtOnCartPage();
    await Cart.OpenCheckOutPage();
})
test("Verify titile of checkout page",async({page})=>
{
    await Check.VerifyTitleofCheckoutPage();
    await expect(Check.checkoutpagetitle).toHaveText("Checkout: Your Information");
    await expect(page).toHaveTitle("Swag Labs")
})
test("Verify cancel button on checkout page",async({page})=>
{
    await Check.VerifyCancelButton()
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
})
test("Validate empty List",async({page})=>
{
    await Check.VerifyContinue();
    await Check.VerifyValidationMassage("Error: First Name is required");
})
test("Verify FirstName validation",async({page})=>
{
    await Check.VerifyFillDetail(undefined,"Jagtap","416410");
    await Check.VerifyContinue();
    await Check.VerifyValidationMassage("Error: First Name is required");
})
test("Verify LastName validation",async({page})=>
{
    await Check.VerifyFillDetail("Dhanaji",undefined,"416410")
    await Check.VerifyContinue();
    await Check.VerifyValidationMassage("Error: Last Name is required");
})
test("Verify Postal code validation",async({page})=>
{
    await Check.VerifyFillDetail("Dhanaji","Jagtap")
    await Check.VerifyContinue();
    await Check.VerifyValidationMassage("Error: Postal Code is required");
})
test("Verify Twitter logo",async({page})=>
{
    await expect(Check.twitlogo).toBeVisible();
    const twitpage=await Check.VerifyTwitterLogoInCheckoutPage();
    await expect(twitpage).toHaveURL("https://x.com/saucelabs");
    await expect(twitpage).toHaveTitle("Sauce Labs (@saucelabs) / X");
})
test("Verify Facebook logo",async ({page})=>
{
    await expect(Check.facelogo).toBeVisible();
    const facepage=await Check.VerifyFaceLogoInCheckoutPage();
    await expect(facepage).toHaveURL("https://www.facebook.com/saucelabs");
    await expect(facepage).toHaveTitle("Sauce Labs | Facebook");
})
test("Verify LiknedIn logo",async({page})=>
{
    await expect(Check.linkedinlogo).toBeVisible();
    const linkedinpage=await Check.VerifyLinkedInLogoInCheckoutPage();
    await expect(linkedinpage).toHaveURL("https://www.linkedin.com/company/sauce-labs/");
    await expect(linkedinpage).toHaveTitle("Sauce Labs | LinkedIn");
})
test("Verify footer text in ckeckout page",async({page})=>
{
    await Check.VerifyFoootertextinCheckOutpage();
    await expect(Check.footertext).toHaveText("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
})
test("Cart count on Checkout Page",async({page})=>
{
    await Check.VerifyCartcountOnCheckoutPage();
    await expect(Check.cartcoutcheckoutpage).toHaveText("1")
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
})
test("Open Overview page",async({page})=>
{
    await Check.VerifyFillDetail("Dhanaji","Jagtap","416410");
    await Check.VerifyContinue();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
})


