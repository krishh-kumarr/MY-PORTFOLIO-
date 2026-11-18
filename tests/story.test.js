import { chapters, lowsFollowedByNext } from '@/lib/story';

test('five chapters in order', () => {
  expect(chapters.map((c) => c.id)).toEqual(['surat', 'lost', 'crew', 'grind', 'lightsout']);
  expect(chapters.map((c) => c.number)).toEqual([1, 2, 3, 4, 5]);
});

test('every low is followed by what Krish did next', () => {
  expect(lowsFollowedByNext(chapters)).toEqual([]);
});

test('lowsFollowedByNext flags a low with no next beat', () => {
  const bad = [{ id: 'x', beats: [{ kind: 'low', text: 'a' }, { kind: 'win', text: 'b' }] }];
  expect(lowsFollowedByNext(bad)).toEqual(['x']);
});

test('facts match the documents', () => {
  const text = JSON.stringify(chapters);
  expect(text).toContain('10/10');
  expect(text).toContain('₹80,000');
  expect(text).toContain('Mar – Aug 2025');
  expect(text).toContain('Infosys');
  expect(text).not.toMatch(/dps-tapi-class/);
});

test('every photo has alt text and dimensions', () => {
  for (const b of chapters.flatMap((c) => c.beats)) {
    if (!b.photo) continue;
    expect(b.photo.alt.length).toBeGreaterThan(10);
    expect(b.photo.w).toBeGreaterThan(0);
    expect(b.photo.h).toBeGreaterThan(0);
  }
});
