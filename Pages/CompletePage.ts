import {expect, Locator,Page} from "@playwright/test"


export class completepage
{
    title:Locator;
    headertext:Locator;
    headerinfo:Locator;
    cartlink:Locator;
    private homepagebtn:Locator;
    headerimg:Locator;
    twitlogo:Locator;
    facelogo:Locator;
    linkedlogp:Locator;
    footerpage:Locator;
    constructor(private page:Page)
    {
        this.title=page.locator(".title");
        this.headertext=page.locator(".complete-header");
        this.headerinfo=page.locator(".complete-text");
        this.cartlink=page.locator(".shopping_cart_link");
        this.homepagebtn=page.locator(".btn");
        this.headerimg=page.locator(".pony_express");
        this.twitlogo=page.getByText("Twitter");
        this.facelogo=page.getByText("Facebook");
        this.linkedlogp=page.getByText("LinkedIn");
        this.footerpage=page.locator(".footer_copy");
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
    async VerifyTwitterLogo()
    {
        const [newPage]=await Promise.all([this.page.context().waitForEvent("page"),this.twitlogo.click()]);
        await newPage.waitForLoadState();
        await this.twitlogo.isVisible();
        return newPage;
    }
    async VerifyFacebookLogo()
    {
        const [newpage]=await Promise.all([this.page.context().waitForEvent("page"),this.facelogo.click()]);
        await newpage.waitForLoadState();
        await this.facelogo.isVisible();
        return newpage;
    }
    async VerifyLinkedInLogo()
    {
        const [newpage]=await Promise.all([this.page.context().waitForEvent("page"),this.linkedlogp.click()]);
        await newpage.waitForLoadState();
        await this.linkedlogp.isVisible();
        return newpage;
    }

}