import{test,expect} from "@playwright/test"
import { LoginPage } from "../Pages/LoginPage"
import { Inventrypage } from "../Pages/InventryPage"
import { testdata } from "../Utils/Testdata";



let Invent:Inventrypage;
test.beforeEach("Login Application",async({page})=>
{
    //login:LoginPage;
    const login=new LoginPage(page)
     await page.goto('/')
     await login.LoginApplication(testdata.Usename,testdata.Password);
     Invent=new Inventrypage(page)
    
})
test("Verify Add BackPack product",async({page})=>
{
     /*const login=new LoginPage(page)
     await page.goto(testdata.URL)*/
     //await login.LoginApplication(testdata.Usename,testdata.Password);
     const Invent=new Inventrypage(page)
     await Invent.AddtoProduct()
     await expect(Invent.cartcount).toHaveText("1");
     await expect(Invent.backpackText).toHaveText("Sauce Labs Backpack");
     await expect(Invent.backpackprize).toHaveText("$29.99");
     await expect(Invent.producttitle).toHaveText("Products")
     expect(Invent.backpackInfo).toHaveText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");

})
test("Verify About page",async({page})=>
{
    await Invent.VerifyAboutPage()
    await expect(page).toHaveURL("https://saucelabs.com/");
    await expect(page).toHaveTitle("Sauce Labs: Cross Browser Testing, Selenium Testing & Mobile Testing");
  
})
test("Verify Logout button",async({page})=>
{
  
   await expect(Invent.menu).toBeVisible();
   await expect(Invent.menu).toBeEnabled();
   await expect(Invent.logoutbtn).toBeVisible();
   await expect(Invent.logoutbtn).toBeEnabled();
   await Invent.VerifyLogout();
   await expect(page).toHaveURL("https://www.saucedemo.com/");
})
test("Verify Bikelight product",async({page})=>
{
    await expect(Invent.bikelightname).toHaveText("Sauce Labs Bike Light");
    await expect(Invent.bikelightinfo).toHaveText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.");
    await expect(Invent.bikelightprice).toHaveText("$9.99");
    await Invent.VerifyBikeLightProduct();
    await expect(Invent.cartcount).toHaveText("1");

})
test("Verify multiple product added to cart",async({page})=>
{
    await Invent.AddMultipleProduct();
    await expect(Invent.cartcount).toHaveText("6")
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
})