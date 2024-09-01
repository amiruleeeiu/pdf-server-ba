const puppeteer = require('puppeteer');
const fs = require('fs');

const generatePDF = async (htmlContent, outputPath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
  await page.emulateMediaType('screen');
  
  await page.pdf({
    path: outputPath,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });
  
  await browser.close();
};

// Export the function for use in the server
module.exports = generatePDF;
