'use client';
import { useEffect } from 'react';

/**
 * Deep links like /#projects: the story's tall chapters (and the reduced-motion swap) change
 * the layout after first paint, so re-scroll to the target once layout settles.
 */
export default function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 30);
    return () => clearTimeout(t);
  }, []);
  return null;
}
