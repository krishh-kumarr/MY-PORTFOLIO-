// Visual check of the hero (rest, hover, click) and the story after pressing play.
// Usage: node scripts/check.mjs <url> <outDir> [chapter@progress,...]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const [url, out, shots = ''] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal', '--enable-gpu'] });
for (const [name, vp] of [['desktop', { width: 1360, height: 860 }], ['phone', { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]]) {
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.log(`${name} pageerror:`, e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.log(`${name} console:`, m.text().slice(0, 200)); });
  await page.setViewport(vp);
  await page.goto(url, { waitUntil: 'networkidle0' });
  await wait(2500);
  await page.screenshot({ path: `${out}/${name}-hero.png` });
  if (name === 'desktop') {
    const b = await page.$('button[aria-label="Poke the avatar"]');
    const box = await b.boundingBox();
    await page.mouse.move(200, 120); await wait(700);
    await page.screenshot({ path: `${out}/${name}-look.png` });
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await wait(1200);
    await page.screenshot({ path: `${out}/${name}-hover.png` });
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2); await wait(500);
    await page.screenshot({ path: `${out}/${name}-click.png` });
  }
  console.log(`${name}: overflow ${await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)}px`);
  if (shots) {
    await page.evaluate(() => document.getElementById('story').scrollIntoView({ behavior: 'instant' }));
    await wait(400);
    const play = await page.$('button ::-p-text(Play the story)');
    await play.click(); await wait(1500);
    for (const s of shots.split(',')) {
      const [id, at] = s.split('@');
      // Approach the target gradually so scroll-linked motion settles like a real visitor.
      for (const k of [0.85, 0.95, 1]) {
        await page.evaluate((id, at, k) => { const el = document.getElementById(id); const top = el.getBoundingClientRect().top + scrollY; scrollTo({ top: top + Number(at) * k * (el.offsetHeight - innerHeight), behavior: 'instant' }); }, id, at, k);
        await wait(250);
      }
      await wait(Number(process.env.SETTLE ?? 900));
      await page.screenshot({ path: `${out}/${name}-${s.replace(/[.@]/g, '_')}.png` });
    }
  }
  await page.close();
}
await browser.close();
