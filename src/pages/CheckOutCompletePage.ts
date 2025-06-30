import { Locator, Page } from "@playwright/test";

export class CheckOutCompletePage {
    readonly page: Page;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completeHeader = this.page.locator('[data-test="complete-header"]');
        this.completeText = this.page.locator('[data-test="complete-text"]');
        this.backHomeButton = this.page.locator('[data-test="back-to-products"]');
    }

    async getCompleteHeader(): Promise<string> {
        return await this.completeHeader.textContent() || '';
    }

    async getCompleteText(): Promise<string> {
        return await this.completeText.textContent() || '';
    }

    async goBackToHome(): Promise<void> {
        await this.backHomeButton.click();
    }
}