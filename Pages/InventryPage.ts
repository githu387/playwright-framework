import { expect, Locator, Page } from "@playwright/test";

export class Inventrypage
{
    backpack:Locator;
    dropdown:Locator;
    cartcount:Locator;
    backpackText:Locator;
    backpackprize:Locator;
    menu:Locator;
    productbtn:Locator;
    logoutbtn:Locator;
    producttitle:Locator;
    backpackInfo:Locator;
    bikelightname:Locator;
    bikelightinfo:Locator;
    bikelightprice:Locator;
    bikelightaddtocart:Locator;
    allproductsAddtocart:Locator;
    cartpage:Locator;

    constructor(private page:Page)
    {
        this.backpack=page.locator("#add-to-cart-sauce-labs-backpack");
        this.dropdown=page.locator(".product_sort_container")
        this.cartcount=page.locator(".shopping_cart_badge")
        this.backpackText=page.getByText("Sauce Labs Backpack");
        this.backpackprize=page.getByText("$29.99");
        this.backpackInfo=page.getByText("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
        this.menu=page.locator(".bm-burger-button button");
        this.productbtn=page.locator("#about_sidebar_link");
        this.logoutbtn=page.locator("#logout_sidebar_link");
        this.producttitle=page.locator(".title")
        this.bikelightname=page.getByText("Sauce Labs Bike Light");
        this.bikelightinfo=page.getByText("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.");
        this.bikelightprice=page.getByText("$9.99")
        this.bikelightaddtocart=page.locator("#add-to-cart-sauce-labs-bike-light");
        this.allproductsAddtocart=page.locator(".btn");
        this.cartpage=page.locator(".shopping_cart_link");
    }
    async AddtoProduct()
    {
        await this.dropdown.selectOption("lohi");
        await this.backpack.click();
        await this.cartcount.innerText();
        await this.backpackText.innerText();
        let text=await this.backpackprize.innerText();
        console.log("BackPack Prize: ",text)
        await this.backpackInfo.innerText()
        
    }
    async VerifyAboutPage()
    {
        await this.menu.click();
        await this.productbtn.click()
    }
    async VerifyLogout()
    {
        await this.menu.click()
        await this.logoutbtn.isVisible();
        await expect(this.logoutbtn).toBeEnabled();
        await expect(this.logoutbtn).toBeVisible();
        await this.logoutbtn.click();
    }
    async VerifyBikeLightProduct()
    {
       await this.dropdown.selectOption("hilo")
       await this.bikelightname.innerText();
       await this.bikelightinfo.innerText();
       await this.bikelightprice.innerText();
       await this.bikelightaddtocart.click();
       await this.cartcount.innerText();
    }
    async AddMultipleProduct()
    {
        let allcounts=await this.allproductsAddtocart.count()
        for(let i=0;i<allcounts;i++)
        {
            await this.allproductsAddtocart.nth(i).click();
        }
        await this.cartcount.innerText()
        await this.cartpage.click();
    }

}