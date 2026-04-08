import {Locator,Page} from "@playwright/test"


export class completepage
{
    title:Locator;
    headertext:Locator;
    headerinfo:Locator;
    cartlink:Locator;
    private homepagebtn:Locator;
    headerimg:Locator;
    constructor(private page:Page)
    {
        this.title=page.locator(".title");
        this.headertext=page.locator(".complete-header");
        this.headerinfo=page.locator(".complete-text");
        this.cartlink=page.locator(".shopping_cart_link");
        this.homepagebtn=page.locator(".btn");
        this.headerimg=page.locator(".pony_express")
    }
    async VerifytitleonCompletePage()
    {
        await this.title.innerText();
    }
    async VerifyHeaderofCompletedPage()
    {
        await this.headertext.innerText();
        await this.headerinfo.innerText();
        await this.headerimg.isVisible();
    }
    async VerifyCartLink()
    {
        await this.cartlink.click();
    }
    async VerifyHomepagebutton()
    {
        await this.homepagebtn.click();
    }

}