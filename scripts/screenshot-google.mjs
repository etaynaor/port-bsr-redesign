import { chromium, devices } from 'playwright';
import fs from 'fs';

const outDir = 'public/refshots/google-test';
await fs.promises.mkdir(outDir, { recursive: true });

// Desktop capture
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('https://www.google.com/', { waitUntil: 'networkidle', timeout: 45000 });
await page.screenshot({ path: `${outDir}/desktop.jpg`, type: 'jpeg', quality: 80, fullPage: true });
await context.close();

// Mobile (iPhone 14) capture
const iphone = devices['iPhone 14'];
const mContext = await browser.newContext({ ...iphone });
const mPage = await mContext.newPage();
await mPage.goto('https://www.google.com/', { waitUntil: 'networkidle', timeout: 45000 });
await mPage.screenshot({ path: `${outDir}/mobile.jpg`, type: 'jpeg', quality: 80, fullPage: false });
await mContext.close();

await browser.close();
console.log(`Saved:\n - ${outDir}/desktop.jpg\n - ${outDir}/mobile.jpg`);

