import { Locator,Page,expect } from "@playwright/test";


export class checkout
{
    checkoutpagetitle:Locator;
    cancelbtn:Locator;
    continuebtn:Locator;
    errormsg:Locator;
    errorbtn:Locator;
    Fname:Locator;
    LName:Locator;
    Postalcode:Locator;
    twitlogo:Locator;
    facelogo:Locator;
    constructor(private page:Page)
    {
        this.checkoutpagetitle=page.locator(".title");
        this.cancelbtn=page.locator("#cancel");
        this.continuebtn=page.locator("#continue")
        this.errormsg=page.locator("[data-test='error']");
        this.errorbtn=page.locator(".error-button")
        this.Fname=page.locator("#first-name");
        this.LName=page.locator("#last-name");
        this.Postalcode=page.locator("#postal-code");
        this.twitlogo=page.getByText("Twitter");
        this.facelogo=page.getByText("Facebook");
    }
    async VerifyTitleofCheckoutPage()
    {
        await this.checkoutpagetitle.innerText()
    }
    async VerifyCancelButton()
    {
        await this.cancelbtn.click();
    }
    async VerifyFillDetail(fname?:string,lname?:string,code?:string)
    {
        if(fname)
        {
            await this.Fname.fill(fname); 
        }
        if(lname)
        {
            await this.LName.fill(lname);
        }
        if(code)
        {
            await this.Postalcode.fill(code);
        }
    }
    async VerifyContinue()
    {
        await this.continuebtn.click();
    }
    async VerifyValidationMassage(errormsgtext:string)
    {
       await expect(this.errormsg).toHaveText(errormsgtext)
    }
    async VerifyTwitterLogoInCheckoutPage()
    {
        const [newpage]=await Promise.all([this.page.context().waitForEvent("page"),this.twitlogo.click()]);
        await newpage.waitForLoadState();
        await this.twitlogo.isVisible();
        return newpage;
    }
    async VerifyFaceLogoInCheckoutPage()
    {
        const [facepage]=await Promise.all([this.page.context().waitForEvent("page"),this.facelogo.click()]);
        await facepage.waitForLoadState();
        await this.facelogo.isVisible();
        return facepage;
    }


}

