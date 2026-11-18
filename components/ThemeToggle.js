'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const nextTheme = (t) => (t === 'light' ? 'dark' : 'light');

/** Runs before paint so the page never flashes the wrong theme. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

/** Sun/moon switch. Uses a circular reveal from the button where the browser supports view transitions. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => setTheme(document.documentElement.dataset.theme || 'dark'), []);

  const toggle = (e) => {
    const t = nextTheme(theme);
    const apply = () => { document.documentElement.dataset.theme = t; try { localStorage.setItem('theme', t); } catch {} setTheme(t); };
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) return apply();
    const r = e.currentTarget.getBoundingClientRect();
    document.documentElement.style.setProperty('--vt-x', `${r.left + r.width / 2}px`);
    document.documentElement.style.setProperty('--vt-y', `${r.top + r.height / 2}px`);
    document.startViewTransition(apply);
  };

  const light = theme === 'light';
  return (
    <button type="button" onClick={toggle} aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      className="relative grid place-items-center size-10 rounded-full border border-line bg-surface hover:border-mustard transition-colors cursor-pointer overflow-hidden">
      <Sun size={18} aria-hidden="true" className={`absolute transition-all duration-500 ${light ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
      <Moon size={18} aria-hidden="true" className={`absolute transition-all duration-500 ${light ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
    </button>
  );
}
