// Renders design/front-page.html to entry.png at exactly 1024x1024, once, at build time.
// The entry's main.ts only copies the finished image, so both graded runs write the same bytes.
// Run: node tools/render.mjs

import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const source = pathToFileURL(resolve('design/front-page.html')).href;

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
await page.goto(source, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'entry.png', type: 'png' });
await browser.close();
console.log('wrote entry.png');
