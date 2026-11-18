'use client';
import { useEffect } from 'react';

/** Project pages always open at the top, not wherever the home page was scrolled. */
export default function ScrollTop() {
  useEffect(() => { window.history.scrollRestoration = 'manual'; window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return null;
}
