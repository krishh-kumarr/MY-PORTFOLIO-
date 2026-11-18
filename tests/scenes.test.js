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
