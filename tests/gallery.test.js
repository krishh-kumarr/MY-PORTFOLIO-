import fs from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import { galleries, awardImages, badges, projects } from '@/lib/data';
import AutoCarousel from '@/components/AutoCarousel';

const exists = (src) => fs.existsSync(path.join(process.cwd(), 'public', src));

test('every project has a gallery and every image exists', () => {
  for (const p of projects) {
    expect(galleries[p.slug]?.length).toBeGreaterThan(0);
    for (const im of galleries[p.slug]) { expect(exists(im.src)).toBe(true); expect(im.alt.length).toBeGreaterThan(8); }
  }
  for (const a of Object.values(awardImages)) expect(exists(a.src)).toBe(true);
  for (const b of Object.values(badges)) expect(exists(b)).toBe(true);
});

test('Red Bull photos appear on VibeOut, lab photo on ThreatSense and the SQL optimizer', () => {
  expect(galleries.vibeout.some((i) => i.src.includes('redbull'))).toBe(true);
  expect(galleries.threatsense.some((i) => i.src.includes('lab-coding'))).toBe(true);
  expect(galleries['sql-optimizer'].some((i) => i.src.includes('lab-coding'))).toBe(true);
});

test('PRISM work-let slide is in the SQL optimizer gallery, shown on a laptop', () => {
  const ws = galleries['sql-optimizer'].find((i) => i.src.includes('prism-workslide'));
  expect(ws.frame).toBe('mac');
});

test('project photos play by themselves without captions or controls', () => {
  render(<AutoCarousel items={galleries.parentbud} />);
  expect(screen.queryByRole('button')).toBeNull();
  expect(screen.queryByText(/Krish/)).toBeNull();
});
