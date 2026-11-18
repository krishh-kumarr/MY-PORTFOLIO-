// Screenshots a page at desktop (1360x860) and phone (390x844) sizes at several scroll positions.
// Usage: node scripts/shoot.mjs <url> <outDir> [scrollFractions comma list] [--reduced]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const [url, out = '/tmp/shots', fracArg = '0,0.1,0.2,0.3', ...flags] = process.argv.slice(2);
const fracs = fracArg.split(',');
const reduced = flags.includes('--reduced');
fs.mkdirSync(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
for (const [name, vp] of [['desktop', { width: 1360, height: 860 }], ['phone', { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]]) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  if (reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(url, { waitUntil: 'networkidle0' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${name}: horizontal overflow ${overflow}px`);
  for (const f of fracs) {
    await page.evaluate((t) => {
      // "chapterId@0.5" scrolls to 50% through that chapter; a bare number is a fraction of the page.
      const [id, at] = String(t).split('@');
      const el = at !== undefined && document.getElementById(id);
      if (el) { const top = el.getBoundingClientRect().top + scrollY; scrollTo({ top: top + Number(at) * (el.offsetHeight - innerHeight), behavior: "instant" }); }
      else scrollTo({ top: Number(t) * (document.documentElement.scrollHeight - innerHeight), behavior: "instant" });
    }, f);
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: `${out}/${name}-${String(f).replace(/[.@]/g, '_')}.png` });
  }
  await page.close();
}
await browser.close();
