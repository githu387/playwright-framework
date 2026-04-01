
import{test,expect} from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { Inventrypage } from "../Pages/InventryPage";
import { testdata } from "../Utils/Testdata";
import { cartpage } from "../Pages/CartPage";


let Cart:cartpage
test.beforeEach("Login Application and adding product",async({page})=>
{
    let login=new LoginPage(page)
    let Invent=new Inventrypage(page)
    await page.goto(testdata.URL);
    await login.LoginApplication(testdata.Usename,testdata.Password)
    await Invent.AddMultipleProduct();
    //await Invent.cartpage.click()
    Cart=new cartpage(page);

})
test("Verify Cart Page Title",async({page})=>
{
    await Cart.VerifyCartPageTitle();
    await expect(Cart.cartPageTitle).toHaveText("Your Cart");
})
test("Verify QTY text",async({page})=>
{
    await Cart.VerifyQTYText();
    await expect(Cart.qtytext).toHaveText("QTY");
})
test("Verify Description Text",async({page})=>
{
    await Cart.VerifyDescriptionText();
    await expect(Cart.descriptionText).toHaveText("Description");
})
test("Verify Twitter logo",async({page})=>
{
   await expect(Cart.twittterlogo).toBeVisible();
   const TwitterPage=await Cart.VerifyTwitterLogo();
   await expect(TwitterPage).toHaveURL("https://x.com/saucelabs")
})
test("Verify Facebook Logo",async({page})=>
{
    await expect(Cart.facebooklogo).toBeVisible();
    const FacebookPage=await Cart.VerifyFacebookLogo();
    await expect(FacebookPage).toHaveURL("https://www.facebook.com/saucelabs");
})
test("Verify LinkedIn Logo",async({page})=>
{
    await expect(Cart.linkedinlogo).toBeVisible();
    const LinkedinPage=await Cart.VerifyLinkedInLogo();
    await expect(LinkedinPage).toHaveURL("https://www.linkedin.com/company/sauce-labs/");
})
test("Verify Footer Text",async({page})=>
{
    await Cart.VerifyFooterText()
    await expect(Cart.footerText).toHaveText("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
})
test("Remove Products form CartPage",async({page})=>
{
    await Cart.VerifyRemoveProductsfromCartPage();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

})
test("Verify BoltTShirt Cart Page",async({page})=>
{
   await Cart.VerifyBoltTShirtOnCartPage();
   await expect(Cart.allproductname.first()).toHaveText("Sauce Labs Bolt T-Shirt");
   await expect(Cart.allproductprice.first()).toHaveText("$15.99");
   await expect(Cart.allproductinfo.first()).toHaveText("Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.");
   await expect(Cart.cartpagecartcount).toHaveText("1")
})
test("Verify BackPack On Cart page",async({page})=>
{
    await Cart.VerifyBackPackOnCartPage();
    await expect(Cart.allproductname.first()).toHaveText("Sauce Labs Backpack");
    await expect(Cart.allproductinfo.first()).toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
    await expect(Cart.allproductprice.first()).toHaveText("$29.99");
    await expect(Cart.cartpagecartcount).toHaveText("1");
})
test("Verify BikeLight on Cart Page",async({page})=>
{
    await Cart.VerifyBikeLightOnCartPage();
    await expect(Cart.allproductname.first()).toHaveText("Sauce Labs Bike Light");
    await expect(Cart.allproductinfo.first()).toHaveText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.");
    await expect(Cart.allproductprice.first()).toHaveText("$9.99");
    await expect(Cart.cartpagecartcount).toHaveText("1");
})
test("Verify Jacket on Cart page",async({page})=>
{
    await Cart.VerifyJacketOnCartPage();
    await expect(Cart.allproductname.first()).toHaveText("Sauce Labs Fleece Jacket");
    await expect(Cart.allproductinfo.first()).toHaveText("It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.");
    await expect(Cart.allproductprice.first()).toHaveText("$49.99");
    await expect(Cart.cartpagecartcount).toHaveText("1");
})
test("Verify Onesie on Cart Page",async({page})=>
{
    await Cart.VerifyOnesieOnCartPage();
    await expect(Cart.allproductname.first()).toHaveText("Sauce Labs Onesie");
    await expect(Cart.allproductinfo.first()).toHaveText("Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.");
    await expect(Cart.allproductprice.first()).toHaveText("$7.99");
    await expect(Cart.cartpagecartcount).toHaveText("1");
})
test("Verify Red T-Shirt on Cart page",async({page})=>
{
    await Cart.VerifyRedTShirtonCartPage();
    await expect(Cart.allproductname.first()).toHaveText("Test.allTheThings() T-Shirt (Red)");
    await expect(Cart.allproductinfo.first()).toHaveText("This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.");
    await expect(Cart.allproductprice.first()).toHaveText("$15.99");
    await expect(Cart.cartpagecartcount).toHaveText("1");
})
test("Open CheckOut Page",async({page})=>
{
    await Cart.OpenCheckOutPage();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
})

