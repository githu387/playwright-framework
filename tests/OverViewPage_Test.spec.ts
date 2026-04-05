import { Page,expect,test } from "@playwright/test";
import { Overview } from "../Pages/OverviewPage";
import { LoginPage } from "../Pages/LoginPage";
import { Inventrypage } from "../Pages/InventryPage";
import { cartpage } from "../Pages/CartPage";
import { checkout } from "../Pages/CheckoutPage";
import { testdata } from "../Utils/Testdata";

let over:Overview;
test.beforeEach("Login application and redirect to overview page",async({page})=>
{
    let login=new LoginPage(page)
    let invent=new Inventrypage(page)
    let cart=new cartpage(page)
    let check=new checkout(page)
    over=new Overview(page);
    await page.goto(testdata.URL);
    await login.LoginApplication(testdata.Usename,testdata.Password);
    await invent.AddMultipleProduct();
    await cart.VerifyBoltTShirtOnCartPage();
    await cart.OpenCheckOutPage();
    await check.VerifyFillDetail("Dhanaji","Jagtap","416410");
    await check.VerifyContinue();
})

test("Verify title of overview page",async({page})=>
{
    await over.VerifyTitleofpage();
    await expect(over.pagetitle).toHaveText("Checkout: Overview");
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
})
test("Verify labels on overview page",async({page})=>
{
    await over.VerifyLablesofOverviewPage();
    await expect(over.qtylabel).toHaveText("QTY");
    await expect(over.descriptionlabel).toHaveText("Description");

})
test("Verify cartcount and cartlink on overview page",async({page})=>
{
    await over.VerifyCartcountandlinkofonOverviewPage();
    await expect(over.cartcountinoverviewpage).toHaveText("1");
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
})
test("Verify all information product in overview page",async({page})=>
{
    await over.VerifyAllInformationofProducts();
    await expect(over.productquantity).toHaveText("1");
    await expect(over.productname).toHaveText("Sauce Labs Bolt T-Shirt");
    await expect(over.productinfo).toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.");
    await expect(over.productprice).toHaveText("$15.99");
    await over.productname.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=1");
})
test("Verify Payment Information",async({page})=>
{
    await over.VerifyPaymentInformation();
    await expect(over.summarylabel.first()).toHaveText("Payment Information:");
    await expect(over.valuelabel.first()).toHaveText("SauceCard #31337");
})
test("Verify Shipping Information",async({page})=>
{
    await over.VerifyShippinfInformation();
    await expect(over.summarylabel.nth(1)).toHaveText("Shipping Information:");
    await expect(over.valuelabel.nth(1)).toHaveText("Free Pony Express Delivery!");
})
test("Verify Total Price of Product",async({page})=>
{
    await over.VerifyTotalPriceofProduct();
    await expect(over.summarylabel.nth(2)).toHaveText("Price Total");
    await expect(over.subtotal).toHaveText("Item total: $15.99");
    await expect(over.summarytax).toHaveText("Tax: $1.28");
    await expect(over.total).toHaveText("Total: $17.27")
})
test("Verify Cancel button on Overview Page",async({page})=>
{
    await over.VerifyCancelbuttonOnOverviewPage();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
})
test("Verify Twitter on Overview Page",async({page})=>
{
    await expect(over.twitlink).toBeVisible();
    const twitterpage=await over.VerifyTwitterLink();
    await expect(twitterpage).toHaveURL("https://x.com/saucelabs");
    await expect(twitterpage).toHaveTitle("Sauce Labs (@saucelabs) / X");
})
test("Verify Facebook on Overview page",async({page})=>
{
    await expect(over.facelink).toBeVisible();
    const facebookpage=await over.VerifyFacebookLink();
    await expect(facebookpage).toHaveURL("https://www.facebook.com/saucelabs");
    await expect(facebookpage).toHaveTitle("Sauce Labs | Facebook");
})
test("Verify LinkedIn on Overview Page",async({page})=>
{
    await expect(over.facelink).toBeVisible();
    const linkedpage=await over.VerifyLinkedInLink();
    await expect(linkedpage).toHaveURL("https://www.linkedin.com/company/sauce-labs/");
    expect(linkedpage).toHaveTitle("Sauce Labs | LinkedIn");
})
test("Verify footer in Overview Page",async({page})=>
{
    await over.VerifyFooterInOverviewPage();
    await expect(over.footeroverview).toHaveText("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
})
test("Verify finish button",async({page})=>
{
    await over.VerifyFinishbutton();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
})
