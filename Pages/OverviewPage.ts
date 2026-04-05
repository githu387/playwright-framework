import {Page,Locator} from "@playwright/test"


export class Overview
{
    pagetitle:Locator;
    qtylabel:Locator;
    descriptionlabel:Locator;
    cartcountinoverviewpage:Locator;
    cartlinkOverviewpage:Locator;
    productquantity:Locator;
    productname:Locator;
    productinfo:Locator;
    productprice:Locator;
    summarylabel:Locator;
    valuelabel:Locator;
    subtotal:Locator;
    summarytax:Locator;
    total:Locator;
    cancelbtn:Locator;
    twitlink:Locator;
    facelink:Locator;
    linkedlink:Locator;
    footeroverview:Locator;
    finishbutton:Locator;
    constructor(private page:Page)
    {
        this.pagetitle=page.locator(".title");
        this.qtylabel=page.locator(".cart_quantity_label");
        this.descriptionlabel=page.locator(".cart_desc_label");
        this.cartcountinoverviewpage=page.locator(".shopping_cart_badge");
        this.cartlinkOverviewpage=page.locator(".shopping_cart_link");
        this.productquantity=page.locator(".cart_quantity");
        this.productname=page.locator(".inventory_item_name");
        this.productinfo=page.locator(".inventory_item_desc");
        this.productprice=page.locator(".inventory_item_price");
        this.summarylabel=page.locator(".summary_info_label");
        this.valuelabel=page.locator(".summary_value_label");
        this.subtotal=page.locator(".summary_subtotal_label");
        this.summarytax=page.locator(".summary_tax_label");
        this.total=page.locator(".summary_total_label");
        this.cancelbtn=page.locator("#cancel")
        this.twitlink=page.getByText("Twitter");
        this.facelink=page.getByText("Facebook");
        this.linkedlink=page.getByText("LinkedIn");
        this.footeroverview=page.locator(".footer_copy");
        this.finishbutton=page.locator("#finish");
    }
    async VerifyTitleofpage()
    {
        await this.pagetitle.innerText();
    }
    async VerifyLablesofOverviewPage()
    {
        await this.qtylabel.innerText();
        await this.descriptionlabel.innerText();
    }
    async VerifyCartcountandlinkofonOverviewPage()
    {
        await this.cartcountinoverviewpage.innerText();
        await this.cartlinkOverviewpage.click();
    }
    async VerifyAllInformationofProducts()
    {
        await this.productquantity.innerText();
        await this.productname.innerText();
        await this.productinfo.innerText();
        await this.productprice.innerText();
    }
    async VerifyPaymentInformation()
    {
        await this.summarylabel.nth(0).innerText();
        await this.valuelabel.nth(0).innerText();
    }
    async VerifyShippinfInformation()
    {
        await this.summarylabel.nth(1).innerText();
        await this.valuelabel.nth(1).innerText();
    }
    async VerifyTotalPriceofProduct()
    {
        await this.summarylabel.nth(2).innerText();
        await this.subtotal.innerText();
        await this.summarytax.innerText();
        await this.total.innerText();
    }
    async VerifyCancelbuttonOnOverviewPage()
    {
        await this.cancelbtn.click();
    }
    async VerifyTwitterLink()
    {
        const [twitterpage]=await Promise.all([this.page.context().waitForEvent("page"),this.twitlink.click()]);
        await twitterpage.waitForLoadState();
        return twitterpage;
    }
    async VerifyFacebookLink()
    {
        const [facepage]=await Promise.all([this.page.context().waitForEvent("page"),this.facelink.click()]);
        await facepage.waitForLoadState();
        return facepage;
    }
    async VerifyLinkedInLink()
    {
        const [likedinpage]=await Promise.all([this.page.context().waitForEvent("page"),this.linkedlink.click()]);
        await likedinpage.waitForLoadState();
        return likedinpage;
    }
    async VerifyFooterInOverviewPage()
    {
        await this.footeroverview.innerText();
    }
    async VerifyFinishbutton()
    {
        await this.finishbutton.click();
    }
}