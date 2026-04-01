import {expect, Locator,Page} from "@playwright/test";
import { it } from "node:test";

export class cartpage
{
    qtytext:Locator;
    twittterlogo:Locator;
    cartPageTitle:Locator;
    descriptionText:Locator;
    facebooklogo:Locator;
    linkedinlogo:Locator;
    footerText:Locator;
    removeproducts:Locator;
    continueshopping:Locator;
    allproductname:Locator;
    allcartitem:Locator;
    allproductprice:Locator;
    allproductinfo:Locator;
    checkoutpage:Locator;
    cartpagecartcount:Locator;
    constructor(private page:Page)
    {
        this.qtytext=page.locator(".cart_quantity_label");
        this.twittterlogo=page.getByText("Twitter");
        this.cartPageTitle=page.locator(".title");
        this.descriptionText=page.locator(".cart_desc_label")
        this.facebooklogo=page.getByText("Facebook");
        this.linkedinlogo=page.getByText("LinkedIn");
        this.footerText=page.locator(".footer_copy");
        this.removeproducts=page.locator("[id*='rem']");
        this.continueshopping=page.locator("#continue-shopping");
        this.allproductname=page.locator(".inventory_item_name")
        this.allcartitem=page.locator(".cart_item")
        this.allproductprice=page.locator(".inventory_item_price")
        this.allproductinfo=page.locator(".inventory_item_desc")
        this.checkoutpage=page.locator("#checkout")
        this.cartpagecartcount=page.locator(".shopping_cart_badge")
    }
    async VerifyCartPageTitle()
    {
        await this.cartPageTitle.innerText()
    }
    async VerifyQTYText()
    {
        await this.qtytext.innerText();
    }
    async VerifyDescriptionText()
    {
        await this.descriptionText.innerText();
    }
    async VerifyTwitterLogo()
    {
        const [newPage]=await Promise.all([this.page.context().waitForEvent("page"),this.twittterlogo.click()]);
        await newPage.waitForLoadState();
        await this.twittterlogo.isVisible();
        //await this.twittterlogo.click();
        return newPage;
    }
    async VerifyFacebookLogo()
    {
        const[newPage]=await Promise.all([this.page.context().waitForEvent("page"),this.facebooklogo.click()])
        await newPage.waitForLoadState();
        await this.facebooklogo.isVisible();
        //await this.facebooklogo.click()
        return newPage;
    }
    async VerifyLinkedInLogo()
    {
        const[newPage]=await Promise.all([this.page.context().waitForEvent("page"),this.linkedinlogo.click()])
        await newPage.waitForLoadState();
        await this.linkedinlogo.isVisible()
        //await this.linkedinlogo.click()
        return newPage;

    }
    async VerifyFooterText()
    {
        await this.footerText.innerText();
    }
    async VerifyRemoveProductsfromCartPage()
    {
        const products=await this.removeproducts.all();
        for(let i=0;i<products.length;i++)
        {
           await this.removeproducts.nth(i).click();
           break;
        }
        await this.continueshopping.click();
    }
    async VerifyBoltTShirtOnCartPage()
    {
        let counts=await this.allcartitem.count();
        for(let i=0;i<counts;i++)
        {
            const item=this.allcartitem.nth(i);
            const name=await item.locator(this.allproductname).innerText();
            //console.log(name);
            if(!name.includes("Sauce Labs Bolt T-Shirt"))
            {
                await item.locator(this.removeproducts).click();
                i--;
                counts--;
            }
        }
    }
    async VerifyBackPackOnCartPage()
    {
        let count=await this.allcartitem.count();
        for(let i=0;i<count;i++)
        {
            let item=this.allcartitem.nth(i);
            let name=await item.locator(this.allproductname).innerText();
            if(!name.includes("Sauce Labs Backpack"))
            {
                await item.locator(this.removeproducts).click();
                i--;
                count--;
            }

        }
    }
    async VerifyBikeLightOnCartPage() 
    {
        let counts = await this.allcartitem.count();
        for (let i = 0; i < counts; i++) {
            let items = this.allcartitem.nth(i);
            let name = await items.locator(this.allproductname).innerText();
            if (!name.includes("Sauce Labs Bike Light")) {
                await items.locator(this.removeproducts).click();
                i--;
                counts--;
            }
        }
    }
    async VerifyJacketOnCartPage()
    {
        let counts=await this.allcartitem.count();
        for(let i=0;i<counts;i++)
        {
            let items=this.allcartitem.nth(i);
            let name=await items.locator(this.allproductname).innerText();
            if(!name.includes("Sauce Labs Fleece Jacket"))
            {
                await items.locator(this.removeproducts).click();
                i--;
                counts--;
            }
        }
    }
    async VerifyOnesieOnCartPage()
    {
        let counts=await this.allcartitem.count()
        for(let i=0;i<counts;i++)
        {
            let items=this.allcartitem.nth(i);
            let name=await items.locator(this.allproductname).innerText();
            if(!name.includes("Sauce Labs Onesie"))
            {
                await items.locator(this.removeproducts).click();
                i--;
                counts--;
            }

        }
    }
    async VerifyRedTShirtonCartPage()
    {
        let count=await this.allcartitem.count();
        for(let i=0;i<count;i++)
        {
            let item=this.allcartitem.nth(i);
            let name=await item.locator(this.allproductname).innerText()
            if(!name.includes("Test.allTheThings() T-Shirt (Red)"))
            {
                await item.locator(this.removeproducts).click();
                i--;
                count--;
            }
        }
    }
    async OpenCheckOutPage() 
    {
        await this.checkoutpage.click();
    }
}