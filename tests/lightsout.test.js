import { render, screen, act } from '@testing-library/react';
import { motionValue } from 'motion/react';
import { litCount, LIGHTS_OUT } from '@/components/story/lights';
import LightsOut from '@/components/story/LightsOut';
import Tower from '@/components/story/scenes/Tower';

const capable = () => ({ webgl2: true, deviceMemory: 8, cores: 8, reducedMotion: false, saveData: false });
const weak = () => ({ ...capable(), webgl2: false });

// Make the "near the viewport" observer fire immediately.
function nearObserver() {
  window.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe() { this.cb([{ isIntersecting: true }]); }
    disconnect() {}
  };
}

test('lights come on one by one, then all go out', () => {
  expect(litCount(0)).toBe(0);
  expect(litCount(0.12)).toBe(1);
  expect(litCount(0.6)).toBe(5);
  expect(litCount(LIGHTS_OUT - 0.001)).toBe(5);
  expect(litCount(LIGHTS_OUT)).toBe(0);
  expect(litCount(1)).toBe(0);
});

test('weak device gets the 2D version with five lights', () => {
  nearObserver();
  const { container } = render(<LightsOut progress={motionValue(0.6)} env={weak} />);
  expect(screen.getByTestId('lightsout-2d')).toBeInTheDocument();
  expect(container.querySelectorAll('[data-light]').length).toBe(5);
});

test('if the 3D scene fails to load, the 2D version appears', async () => {
  nearObserver();
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  await act(async () => {
    render(<LightsOut progress={motionValue(0.6)} env={capable} load={() => Promise.reject(new Error('chunk failed'))} />);
  });
  expect(await screen.findByTestId('lightsout-2d')).toBeInTheDocument();
  expect(document.querySelector('canvas')).toBeNull();
  spy.mockRestore();
});

test('tower shows the emblem', () => {
  const { container } = render(<Tower progress={motionValue(1)} />);
  expect(container.querySelector('[data-emblem]')).not.toBeNull();
});
