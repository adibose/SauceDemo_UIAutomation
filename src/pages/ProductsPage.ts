import { Locator, Page } from "@playwright/test";

export class ProductsPage{

    readonly page: Page;
    readonly inventoryItemTitle: Locator
    readonly inventoryItemPrice: Locator;
    readonly addToCartButton: Locator;
    readonly cartButton: Locator;
    readonly openMenuButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItemTitle = this.page.locator('[data-test="inventory-item-name"]');
        this.inventoryItemPrice = this.page.locator('[data-test="inventory-item-price"]');
        this.addToCartButton = this.page.locator('[data-test="add-to-cart"]');
        this.cartButton = this.page.locator('[data-test="shopping-cart-link"]');
        this.openMenuButton = this.page.getByRole('button', { name: 'Open Menu' });
        this.logoutButton = this.page.locator('[data-test="logout-sidebar-link"]');
    }

    async openMenu(): Promise<void> {
        await this.openMenuButton.click();
    }

    async logout(): Promise<void> {
        await this.logoutButton.click();
    }

    async selectProduct(productName: string): Promise<void> {
        await this.inventoryItemTitle.locator(`text=${productName}`).click();
    }
    async getProductPrice(): Promise<string> {
        return await this.inventoryItemPrice.textContent() || '';
    }
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }
    async goToCart(): Promise<void> {
        await this.cartButton.click();
    }
}
