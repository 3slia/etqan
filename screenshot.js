const puppeteer = require('puppeteer');
(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ 
      headless: 'new', 
      args: ['--no-sandbox'],
      executablePath: 'C:\\\\Users\\\\Administrator\\\\.cache\\\\puppeteer\\\\chrome\\\\win64-150.0.7871.24\\\\chrome-win64\\\\chrome.exe'
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 3500 });
    console.log('Navigating...');
    await page.goto('https://www.abdelmaseeh.com/', { waitUntil: 'networkidle2', timeout: 60000 });
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'public/assets/images/volt-preview.png', fullPage: true });
    await browser.close();
    console.log('Screenshot saved successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
