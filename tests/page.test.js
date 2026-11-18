import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { AvatarProvider } from '@/components/AvatarProvider';
import HashScroll from '@/components/HashScroll';

vi.mock('next/link', () => ({ default: ({ href, children, ...rest }) => <a href={href} {...rest}>{children}</a> }));

test('home: intro, story, then projects and contact, in order', () => {
  const { container } = render(<AvatarProvider><Home /></AvatarProvider>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Krish Kumar');
  expect(container).toHaveTextContent('refused to stop figuring things out');
  const ids = [...container.querySelectorAll('#top, #story, #projects, #contact')].map((e) => e.id);
  expect(ids).toEqual(['top', 'story', 'projects', 'contact']);
  expect(container.querySelector('#story [data-chapter="surat"]')).not.toBeNull();
});

test('nav links to the story, projects, contact and resume', () => {
  render(<AvatarProvider><Home /></AvatarProvider>);
  const nav = screen.getByRole('navigation', { name: 'Main' });
  const hrefs = [...nav.querySelectorAll('a')].map((a) => a.getAttribute('href'));
  for (const h of ['/#story', '/#projects', '/#contact', '/Krish_Kumar.pdf']) expect(hrefs).toContain(h);
});

test('intro offers a way to skip straight to the projects', () => {
  render(<AvatarProvider><Home /></AvatarProvider>);
  expect(screen.getByRole('link', { name: /skip to projects/i })).toHaveAttribute('href', '#projects');
});

test('landing on a #hash scrolls to that section once the page has laid out', async () => {
  document.body.innerHTML = '<div id="projects"></div>';
  const el = document.getElementById('projects');
  el.scrollIntoView = vi.fn();
  window.history.replaceState(null, '', '#projects');
  render(<HashScroll />);
  await new Promise((r) => setTimeout(r, 50));
  expect(el.scrollIntoView).toHaveBeenCalled();
  window.history.replaceState(null, '', '#');
});
