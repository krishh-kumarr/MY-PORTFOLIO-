import '@testing-library/jest-dom/vitest';

// next/image needs the Next runtime; in unit tests render a plain <img> with the same attributes.
import { vi } from 'vitest';
import React from 'react';
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, priority, fill, sizes, ...rest }) =>
    React.createElement('img', { src, alt, width, height, ...rest }),
}));

// jsdom lacks these browser APIs used by Motion and our components.
if (!window.matchMedia) {
  window.matchMedia = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
}
if (!window.IntersectionObserver) {
  window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
}
if (!window.ResizeObserver) {
  window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
}
