import { Locator, Page } from "@playwright/test";

export class CheckOutOverviewPage {
    readonly page: Page;
    readonly itemPrice: Locator;
    readonly paymentInfoValue: Locator;
    readonly shippingInfoValue: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishBtn: Locator;

  

    constructor(page: Page) {
        this.page = page;
        this.itemPrice = this.page.locator('[data-test="inventory-item-price"]');
        this.paymentInfoValue = this.page.locator('[data-test="payment-info-value"]');
        this.shippingInfoValue = this.page.locator('[data-test="shipping-info-value"]');
        this.subtotalLabel = this.page.locator('[data-test="subtotal-label"]');
        this.taxLabel = this.page.locator('[data-test="tax-label"]');
        this.totalLabel = this.page.locator('[data-test="total-label"]');
        this.finishBtn = this.page.locator('[data-test="finish"]');
    }

    async getItemPrice(): Promise<string> {
        return await this.itemPrice.textContent() || '';
    }
    async getPaymentInfoValue(): Promise<string> {
        return await this.paymentInfoValue.textContent() || '';
    }
    async getShippingInfoValue(): Promise<string> {
        return await this.shippingInfoValue.textContent() || '';
    }
    async getSubtotalLabel(): Promise<string> {
        return await this.subtotalLabel.textContent() || '';
    }
    async getTaxLabel(): Promise<string> {
        return await this.taxLabel.textContent() || '';
    }
    async getTotalLabel(): Promise<string> {
        return await this.totalLabel.textContent() || '';
    }
}