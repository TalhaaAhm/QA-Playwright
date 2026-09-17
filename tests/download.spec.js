const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const filePath = path.join(__dirname, '..', 'download-page.html');

  await page.goto('file://' + filePath);

  const downloadPromise = page.waitForEvent('download');

  await page.getByText('Download File').click();

  const download = await downloadPromise;

  console.log('File name:', download.suggestedFilename());
  console.log('Download URL:', download.url());

  await download.saveAs(
    path.join(__dirname, '..', 'downloads', download.suggestedFilename())
  );

  console.log('File downloaded successfully!');

  await page.waitForTimeout(3000);

  await browser.close();
})();