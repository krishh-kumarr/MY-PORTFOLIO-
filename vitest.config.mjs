import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  // Next.js lets .js files contain JSX; tell Vite's transformer the same.
  oxc: { lang: 'jsx', include: /\.(js|jsx)$/, exclude: /node_modules/ },
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  test: { globals: true, environment: 'jsdom', setupFiles: ['./tests/setup.js'], include: ['tests/**/*.test.js'] },
});
