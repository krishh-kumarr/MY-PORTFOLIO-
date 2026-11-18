// Measures bytes transferred on first load (top of page) and whether the 3D chunk loaded.
import puppeteer from 'puppeteer-core';
const url = process.argv[2];
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
for (const [name, vp] of [['desktop', { width: 1360, height: 860 }], ['phone', { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }]]) {
  const ctx = await browser.createBrowserContext(); // fresh cache per device
  const page = await ctx.newPage();
  await page.setViewport(vp);
  const cdp = await page.createCDPSession();
  await cdp.send('Network.enable');
  let bytes = 0; const urls = new Map();
  cdp.on('Network.responseReceived', (e) => urls.set(e.requestId, e.response.url));
  cdp.on('Network.loadingFinished', (e) => { bytes += e.encodedDataLength; });
  await page.goto(url, { waitUntil: 'networkidle0' });
  const first = bytes;
  const got3D = async () => (await Promise.all([...urls.values()].filter((u) => u.includes('/_next/static/chunks/')).map((u) => fetch(u).then((r) => r.text()).then((t) => t.includes('WebGLRenderer'))))).some(Boolean);
  const before = await got3D();
  await page.evaluate(() => document.getElementById('lightsout').scrollIntoView({ behavior: 'instant' }));
  await new Promise((r) => setTimeout(r, 2500));
  console.log(`${name}: first load ${(first / 1024).toFixed(0)} KB, 3D before scrolling: ${before}, 3D after reaching chapter 5: ${await got3D()}, total ${(bytes / 1024).toFixed(0)} KB`);
  await ctx.close();
}
await browser.close();
