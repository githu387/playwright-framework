import { Locator, Page } from "@playwright/test";
import { testdata } from "../Utils/Testdata";


export class LoginPage
{
    user:Locator;
    pass:Locator;
    loginbtn:Locator;
    constructor(private page:Page)
    {
        this.user=page.locator("#user-name");
        this.pass=page.locator("#password");
        this.loginbtn=page.locator("#login-button");
    }
    async LoginApplication(username:string,password:string)
    {
        //await this.page.goto(testdata.URL)
        await this.user.fill(username);
        await this.pass.fill(password);
        await this.loginbtn.click();
    }
}