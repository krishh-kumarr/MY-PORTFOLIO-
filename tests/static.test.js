import { render } from '@testing-library/react';
import { AvatarProvider } from '@/components/AvatarProvider';
import Story from '@/components/story/Story';
import { chapters } from '@/lib/story';

beforeAll(() => {
  window.matchMedia = (q) => ({ matches: q.includes('reduce'), media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
});

test('reduced motion renders the whole story as a still, readable page', () => {
  const { container, getAllByRole } = render(<AvatarProvider><Story /></AvatarProvider>);
  const headings = getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
  for (const c of chapters) expect(headings.some((t) => t.includes(c.title))).toBe(true);
  for (const b of chapters.flatMap((c) => c.beats)) expect(container).toHaveTextContent(b.text);
  expect(container.querySelector('[data-pinned]')).toBeNull();
  expect(container.querySelector('canvas')).toBeNull();
});
