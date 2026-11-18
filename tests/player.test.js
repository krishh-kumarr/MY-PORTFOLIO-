import { render, screen, act, fireEvent } from '@testing-library/react';
import { AvatarProvider } from '@/components/AvatarProvider';
import StoryPlayer, { chapterSeconds, CARD_SECONDS } from '@/components/story/StoryPlayer';
import { cards } from '@/lib/story';
import { chapters } from '@/lib/story';

test('every chapter gets a time card, and the cards use real years', () => {
  expect(cards.length).toBe(chapters.length);
  expect(cards.map((c) => c.text)).toEqual(['Meanwhile, in Surat…', '2023. First year…', 'One year later…', 'Another year later…', 'And now…']);
});

test('chapters play long enough to read every beat', () => {
  for (const c of chapters) expect(chapterSeconds(c)).toBeGreaterThanOrEqual(3 + c.beats.length * 4);
  expect(CARD_SECONDS).toBeGreaterThanOrEqual(2);
});

test('the player opens on the first time card, plays by itself, and can be paused and closed', async () => {
  vi.useFakeTimers();
  const onClose = vi.fn();
  render(<AvatarProvider><StoryPlayer onClose={onClose} /></AvatarProvider>);
  expect(screen.getByRole('dialog', { name: /story/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Meanwhile, in Surat…' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /pause/i }));
  expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
  vi.useRealTimers();
});

test('skip jumps to the next chapter card', () => {
  render(<AvatarProvider><StoryPlayer onClose={() => {}} /></AvatarProvider>);
  fireEvent.click(screen.getByRole('button', { name: /next chapter/i }));
  expect(screen.getByRole('heading', { name: '2023. First year…' })).toBeInTheDocument();
});
