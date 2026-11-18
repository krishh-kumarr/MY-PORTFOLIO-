'use client';
import { useEffect } from 'react';

/**
 * One pointer listener for the whole page. Cards with .spot get --mx/--my (cursor position) for a glow;
 * cards with .tilt also get --rx/--ry for a small 3D tilt. Updates once per frame.
 */
export default function Pointer() {
  useEffect(() => {
    if (matchMedia('(hover: none)').matches) return;
    let raf = 0, last = null, active = null;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reset = (el) => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); };
    const frame = () => {
      raf = 0;
      const e = last; if (!e) return;
      const el = e.target.closest?.('.spot, .tilt');
      if (active && active !== el && active.classList.contains('tilt')) reset(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty('--mx', `${x}px`); el.style.setProperty('--my', `${y}px`);
      if (!reduce && el.classList.contains('tilt')) {
        el.style.setProperty('--ry', `${((x / r.width) - 0.5) * 8}deg`);
        el.style.setProperty('--rx', `${(0.5 - (y / r.height)) * 6}deg`);
      }
    };
    const move = (e) => { last = e; if (!raf) raf = requestAnimationFrame(frame); };
    const leave = () => { if (active?.classList.contains('tilt')) reset(active); active = null; };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
