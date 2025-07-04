import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckOutCompletePage } from '../src/pages/CheckOutCompletePage';
import { CheckOutOverviewPage } from '../src/pages/CheckOutOverviewPage';
import { CheckOutPage } from '../src/pages/CheckOutPage';
import idata from '../testData/products.json';

for (const product of idata) {
  test(`E2E flow of ordering product: ${product.itemName}`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.usernameInput.click();
  await loginPage.usernameInput.fill('standard_user');
  await loginPage.passwordInput.click();
  await loginPage.passwordInput.fill('secret_sauce');
  await loginPage.loginButton.click();
  const productsPage = new ProductsPage(page);
  await productsPage.selectProduct(product.itemName);
  await expect(productsPage.getProductPrice()).resolves.toEqual(product.itemPrice);
  await productsPage.addToCart();
  await productsPage.goToCart();
  const cartPage = new CartPage(page);
  await expect(cartPage.getCartItemTitle()).resolves.toEqual(product.itemName);
  await expect(cartPage.getCartItemPrice()).resolves.toEqual(product.itemPrice);
  await cartPage.proceedToCheckout();
  const checkOutPage = new CheckOutPage(page);
  await checkOutPage.enterFirstName('Shiladitya');
  await checkOutPage.enterLastName('Bose');
  await checkOutPage.enterPostalCode('700122');
  await checkOutPage.clickContinue();
  const checkOutOverviewPage = new CheckOutOverviewPage(page);
  await expect(checkOutOverviewPage.getItemPrice()).resolves.toEqual(product.itemPrice);
  await expect(checkOutOverviewPage.getPaymentInfoValue()).resolves.toEqual('SauceCard #31337');
  await expect(checkOutOverviewPage.getShippingInfoValue()).resolves.toEqual('Free Pony Express Delivery!');
  await expect(checkOutOverviewPage.getSubtotalLabel()).resolves.toEqual(`Item total: ${product.itemPrice}`);
  //await expect(checkOutOverviewPage.getTaxLabel()).resolves.toEqual('Tax: $2.40');
  //await expect(checkOutOverviewPage.getTotalLabel()).resolves.toEqual('Total: $32.39');
  await checkOutOverviewPage.finishBtn.click();
  const checkOutCompletePage = new CheckOutCompletePage(page);
  await expect(checkOutCompletePage.getCompleteHeader()).resolves.toEqual('Thank you for your order!');
  await expect(checkOutCompletePage.getCompleteText()).resolves.toEqual('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  await checkOutCompletePage.goBackToHome();
  await productsPage.openMenu();
  await productsPage.logout();
  // Ensure the user is logged out by checking if the login page is displayed
  await expect(loginPage.loginButton).toBeVisible();
});
}