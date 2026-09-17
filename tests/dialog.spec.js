const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless:  true });
  const page = await browser.newPage();

  page.on('dialog', async dialog => {
    console.log('Dialog type:', dialog.type());
    console.log('Dialog message:', dialog.message());

    await new Promise(resolve => setTimeout(resolve, 5000));

    await dialog.accept();
  });

  await page.evaluate(() => alert('Hello Talha'));

  await page.waitForTimeout(2000);

  await browser.close();
})();