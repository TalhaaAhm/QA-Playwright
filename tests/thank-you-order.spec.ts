import { test, expect } from '@playwright/test';

test('Complete order successfully', async ({ page }) => {

  // 1. Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // 2. Login
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  //   Add product to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  //   Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  //   Proceed to checkout
  await page.locator('[data-test="checkout"]').click();

  //  Enter customer information
  await page.locator('[data-test="firstName"]').fill('Talha');
  await page.locator('[data-test="lastName"]').fill('Ahmad');
  await page.locator('[data-test="postalCode"]').fill('63100');

  //  Continue to order overview
  await page.locator('[data-test="continue"]').click();

  //  Complete the order
  await page.locator('[data-test="finish"]').click();

  //  Verify successful order
  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});