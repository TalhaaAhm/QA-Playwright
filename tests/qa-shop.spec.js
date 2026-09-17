const { test, expect } = require('@playwright/test');

test.describe('QPJI-3: Automate QA Shop Login', () => {

  // TC01 - valid login
  test('QPJI-3 - TC01 Valid login', async ({ page }) => {
    await page.goto('https://shop.qaautomationlabs.com/');
    await page.waitForTimeout(2000)

    await expect(
      page.getByRole('heading', { name: /Welcome back/ })
    ).toBeVisible();

    await page.getByRole('textbox', { name: 'Email' }).fill('demo@demo.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('demo');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/shop\.php/);
    console.log('Current URL:', page.url());
  });

  // TC02 - invalid login
 test('QPJI-3 - TC02 Invalid login shows error message', async ({ page }) => { await page.goto('https://shop.qaautomationlabs.com/'); await page.getByRole('textbox', { name: 'Email' }).fill('wrong@demo.com'); await page.getByRole('textbox', { name: 'Password' }).fill('wrongpass'); await page.getByRole('button', { name: 'Login' }).click(); // INTENTIONALLY WRONG ASSERTION await expect( page.getByText(/THIS-WILL-FAIL/i) ).toBeVisible();
  });

  // TC03 - empty fields validation (Checks that user stays on the login page / URL doesn't change)
  test('QPJI-3 - TC03 Empty username and password validation', async ({ page }) => {
    await page.goto('https://shop.qaautomationlabs.com/');
    await page.waitForTimeout(2000)

    // Click login without filling credentials
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that we are still on the home/login page and did not navigate to shop.php
    await expect(page).not.toHaveURL(/shop\.php/);
    
    // Also verify the Welcome back heading is still visible (meaning we didn't log in successfully)
    await expect(
      page.getByRole('heading', { name: /Welcome back/ })
    ).toBeVisible();
    await page.waitForTimeout(2000)
  });

});