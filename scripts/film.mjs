// Plays the story film and screenshots it at moments: "chapterIndex@seconds" (seconds after that chapter's card starts).
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const [url, out, plan] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal'] });
for (const [name, vp] of [['desktop', { width: 1360, height: 860 }], ['phone', { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]]) {
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.log(`${name} pageerror:`, e.message));
  await page.setViewport(vp);
  await page.goto(url, { waitUntil: 'networkidle0' });
  let chapter = 0;
  await page.evaluate(() => document.getElementById('story').scrollIntoView({ behavior: 'instant' }));
  await wait(300);
  await (await page.$('button ::-p-text(Play the story)')).click();
  let t0 = Date.now();
  for (const shot of plan.split(',')) {
    const [c, sec] = shot.split('@').map(Number);
    while (chapter < c) { await page.keyboard.press('ArrowRight'); chapter++; t0 = Date.now(); await wait(50); }
    const left = sec * 1000 - (Date.now() - t0);
    if (left > 0) await wait(left);
    await page.screenshot({ path: `${out}/${name}-${c}_${String(sec).replace('.', '_')}.png` });
  }
  await page.close();
}
await browser.close();
