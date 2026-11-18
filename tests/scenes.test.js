import { render } from '@testing-library/react';
import { motionValue } from 'motion/react';
import Surat from '@/components/story/scenes/Surat';
import Crossroads from '@/components/story/scenes/Crossroads';
import Canteen from '@/components/story/scenes/Canteen';

describe.each([['Surat', Surat], ['Crossroads', Crossroads], ['Canteen', Canteen]])('%s scene', (_, Scene) => {
  test('is decorative SVG with at least three depth layers', () => {
    const { container } = render(<Scene progress={motionValue(0.3)} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('[data-depth]').length).toBeGreaterThanOrEqual(3);
  });
});

test('Canteen frames the crew illustration', () => {
  const { container } = render(<Canteen progress={motionValue(0)} />);
  expect(container.querySelector('image[href="/art/crew-canteen.webp"]')).not.toBeNull();
});

import Rooftops from '@/components/story/scenes/Rooftops';
import Ground from '@/components/story/scenes/Ground';
import Grind from '@/components/story/scenes/Grind';

describe.each([['Rooftops', Rooftops], ['Ground', Ground]])('%s scene', (_, Scene) => {
  test('is decorative SVG with at least three depth layers', () => {
    const { container } = render(<Scene progress={motionValue(0.5)} />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('[data-depth]').length).toBeGreaterThanOrEqual(3);
  });
});

test('Ground scoreboard lists the real chapter 4 wins', () => {
  const { container } = render(<Ground progress={motionValue(1)} />);
  const board = container.querySelector('[data-scoreboard]');
  expect(board).toHaveTextContent('Samsung PRISM Excellence Award');
  expect(board).toHaveTextContent('₹80,000');
  expect(board).toHaveTextContent('Academic Excellence Award');
});

test('Grind shows rooftops early and the ground at the end', () => {
  const { container } = render(<Grind progress={motionValue(0)} />);
  expect(container.querySelector('[data-scene="rooftops"]')).not.toBeNull();
  expect(container.querySelector('[data-scene="ground"]')).not.toBeNull();
});
