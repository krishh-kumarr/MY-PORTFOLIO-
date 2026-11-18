import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';
import { AvatarProvider } from '@/components/AvatarProvider';
import HashScroll from '@/components/HashScroll';

vi.mock('next/link', () => ({ default: ({ href, children, ...rest }) => <a href={href} {...rest}>{children}</a> }));
vi.mock('next/dynamic', () => ({ default: () => () => null }));
beforeAll(() => { Element.prototype.scrollIntoView = () => {}; });

const renderHome = () => render(<AvatarProvider><Home /></AvatarProvider>);

test('the professional portfolio comes first and the story last', () => {
  const { container } = renderHome();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Krish Kumar');
  const ids = [...container.querySelectorAll('#top, #work, #projects, #contact, #story')].map((e) => e.id);
  expect(ids).toEqual(['top', 'work', 'projects', 'contact', 'story']);
});

test('the story is optional: nothing plays until the visitor presses play', () => {
  const { container } = renderHome();
  expect(container).toHaveTextContent('refused to stop figuring things out');
  expect(container.querySelector('[data-chapter]')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /play the story/i }));
  expect(container.querySelector('[data-chapter="surat"]')).not.toBeNull();
});

test('no friend is named anywhere on the page', () => {
  const { container } = renderHome();
  fireEvent.click(screen.getByRole('button', { name: /play the story/i }));
  for (const name of ['Aditya', 'Aabidha', 'Vinith', 'Swastik']) expect(container.textContent).not.toContain(name);
});

test('nav links to work, projects, contact, the story and the resume', () => {
  renderHome();
  const nav = screen.getByRole('navigation', { name: 'Main' });
  const hrefs = [...nav.querySelectorAll('a')].map((a) => a.getAttribute('href'));
  for (const h of ['/#work', '/#projects', '/#contact', '/#story', '/Krish_Kumar.pdf']) expect(hrefs).toContain(h);
});

test('hero offers the work, the story and the resume', () => {
  renderHome();
  expect(screen.getByRole('link', { name: /see my work/i })).toHaveAttribute('href', '#projects');
  expect(screen.getByRole('link', { name: /watch my story/i })).toHaveAttribute('href', '#story');
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
