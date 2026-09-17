const { test, expect } = require('@playwright/test');

test('TC01 - Create New Account', async ({ page }) => {

    // Open site
    await page.goto('https://www.automationexercise.com/');
     await page.waitForTimeout(2000);



    //  Home pg
    await expect(page).toHaveTitle(/Automation Exercise/);
 await page.waitForTimeout(2000);

    
    // Click Signup/Login
    await page.getByRole('link', { name: 'Signup / Login' }).click();
     await page.waitForTimeout(2000);

    // Signup pg

    await expect(
        page.getByText('New User Signup!')
    ).toBeVisible();
 await page.waitForTimeout(2000);

    // Enter name

    await page.getByPlaceholder('Name').fill('Talha');
    

    // Enter email
    await page.locator('input[data-qa="signup-email"]')
        .fill('talha' + Date.now() + '@example.com');

 await page.waitForTimeout(2000);

    // Click Signup
    await page.getByRole('button', { name: 'Signup' }).click();

 await page.waitForTimeout(2000);

    
    // Verify account information page
    await expect(
        page.getByText('Enter Account Information')
    ).toBeVisible();
 await page.waitForTimeout(2000);
});