// Simple Playwright script to capture a screenshot of the running app
// Usage: node scripts/screenshot.js [url] [outputPath]

const { chromium } = require('playwright');

async function main() {
  const url = process.argv[2] || 'http://localhost:3000';
  const output = process.argv[3] || 'screenshot.png';

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'networkidle' });

  // Small delay to allow animations/fonts
  await page.waitForTimeout(500);

  await page.screenshot({ path: output, fullPage: true });
  console.log(`Saved screenshot to ${output}`);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

