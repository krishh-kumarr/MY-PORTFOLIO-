import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle, { nextTheme, THEME_SCRIPT } from '@/components/ThemeToggle';

test('theme alternates between dark and light', () => {
  expect(nextTheme('dark')).toBe('light');
  expect(nextTheme('light')).toBe('dark');
});

test('toggle switches the page theme and remembers it', () => {
  document.documentElement.dataset.theme = 'dark';
  render(<ThemeToggle />);
  const btn = screen.getByRole('button', { name: /switch to light mode/i });
  fireEvent.click(btn);
  expect(document.documentElement.dataset.theme).toBe('light');
  expect(localStorage.getItem('theme')).toBe('light');
  expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
});

test('the no-flash script picks a saved theme, else the system setting', () => {
  expect(THEME_SCRIPT).toContain('localStorage');
  expect(THEME_SCRIPT).toContain('prefers-color-scheme: light');
});
