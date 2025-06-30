import { Locator, Page } from "@playwright/test";

export class CheckOutPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.firstName = this.page.locator('[data-test="firstName"]');
        this.lastName = this.page.locator('[data-test="lastName"]');
        this.postalCode = this.page.locator('[data-test="postalCode"]');
        this.continueBtn = this.page.locator('[data-test="continue"]');
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.firstName.fill(firstName);
    }
    async enterLastName(lastName: string): Promise<void> {
        await this.lastName.fill(lastName);
    }
    async enterPostalCode(postalCode: string): Promise<void> {
        await this.postalCode.fill(postalCode);
    }
    async clickContinue(): Promise<void> {
        await this.continueBtn.click();
    }
}