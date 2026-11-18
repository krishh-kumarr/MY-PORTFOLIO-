import fs from 'node:fs';
import path from 'node:path';
import { render, screen, fireEvent } from '@testing-library/react';
import { galleries, awardImages, badges, projects } from '@/lib/data';
import ProjectGallery, { EFFECTS } from '@/components/ProjectGallery';

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

test('each project opens with its own effect', () => {
  const used = projects.map((p) => EFFECTS[p.slug]);
  expect(new Set(used).size).toBe(projects.length);
});

test('the gallery steps through images and closes with Escape', () => {
  const onClose = vi.fn();
  render(<ProjectGallery project={projects.find((p) => p.slug === 'parentbud')} onClose={onClose} />);
  expect(screen.getByRole('dialog', { name: /parentbud/i })).toBeInTheDocument();
  expect(screen.getByText('1 / 5')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /next image/i }));
  expect(screen.getByText('2 / 5')).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});
