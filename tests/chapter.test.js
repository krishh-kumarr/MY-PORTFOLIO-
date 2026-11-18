import { render, screen } from '@testing-library/react';
import { AvatarProvider } from '@/components/AvatarProvider';
import Chapter from '@/components/story/Chapter';
import { chapters } from '@/lib/story';

const grind = chapters.find((c) => c.id === 'grind');
const Scene = () => <svg data-testid="scene" />;
const renderGrind = () => render(<AvatarProvider><Chapter chapter={grind} Scene={Scene} /></AvatarProvider>);

test('shows the chapter number and title as a level-2 heading', () => {
  renderGrind();
  const h = screen.getByRole('heading', { level: 2 });
  expect(h).toHaveTextContent('Chapter 4');
  expect(h).toHaveTextContent('The grind');
});

test('renders every beat, marking lows', () => {
  const { container } = renderGrind();
  for (const b of grind.beats) expect(container).toHaveTextContent(b.text);
  expect(container.querySelectorAll('[data-kind="low"]').length).toBe(grind.beats.filter((b) => b.kind === 'low').length);
});

test('photos reserve their space with width and height', () => {
  const { container } = renderGrind();
  const imgs = [...container.querySelectorAll('img[src^="/photos/"]')];
  expect(imgs.length).toBeGreaterThan(0);
  for (const img of imgs) { expect(img).toHaveAttribute('width'); expect(img).toHaveAttribute('height'); }
});

test('renders the scene and a sticky stage', () => {
  const { container } = renderGrind();
  expect(screen.getByTestId('scene')).toBeInTheDocument();
  expect(container.querySelector('[data-pinned]')).not.toBeNull();
});

test('chapter scroll length uses stable small-viewport units so phone address bars do not jolt the film', () => {
  const { container } = renderGrind();
  const h = container.querySelector('[data-chapter]').style.height;
  expect(h).toMatch(/svh$/);
});
