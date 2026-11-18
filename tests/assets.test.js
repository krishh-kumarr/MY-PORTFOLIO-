import fs from 'node:fs';
import path from 'node:path';
import { chapters } from '@/lib/story';

const pub = (src) => path.join(process.cwd(), 'public', src);
const photos = chapters.flatMap((c) => c.beats).filter((b) => b.photo).map((b) => b.photo);

// WebP VP8/VP8L/VP8X header parsing for width/height.
function webpSize(file) {
  const b = fs.readFileSync(file);
  const chunk = b.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (chunk === 'VP8L') { const n = b.readUInt32LE(21); return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1]; }
  return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
}

test.each(photos.map((p) => [p.src, p]))('%s exists, is small and matches its declared size', (src, p) => {
  const file = pub(src);
  expect(fs.existsSync(file)).toBe(true);
  expect(fs.statSync(file).size).toBeLessThan(220 * 1024);
  expect(webpSize(file)).toEqual([p.w, p.h]);
});

test('story images total under 1.2 MB', () => {
  const total = photos.reduce((s, p) => s + fs.statSync(pub(p.src)).size, 0);
  expect(total).toBeLessThan(1.2 * 1024 * 1024);
});

test('class photo is never published', () => {
  expect(fs.existsSync(pub('/photos/dps-tapi-class.webp'))).toBe(false);
});
