import { Locator, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartItemTitle: Locator;
    readonly cartItemPrice: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItemTitle = this.page.locator('[data-test="inventory-item-name"]');
        this.cartItemPrice = this.page.locator('[data-test="inventory-item-price"]');
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
        this.continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
    }

    async getCartItemTitle(): Promise<string> {
        return await this.cartItemTitle.textContent() || '';
    }

    async getCartItemPrice(): Promise<string> {
        return await this.cartItemPrice.textContent() || '';
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }
}   