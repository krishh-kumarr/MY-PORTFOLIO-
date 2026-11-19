'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const AvatarContext = createContext(null);
const DEFAULT = { mood: 'confident', say: 'Hi, I’m Krish. I build iOS apps, data pipelines and ML systems.' };

export function AvatarProvider({ children }) {
  const [base, setBase] = useState(DEFAULT);      // set by the section in view
  const [flash, setFlash] = useState(null);       // short-lived reaction (hover, click)
  const timer = useRef();

  const react = useCallback((mood, say, ms = 2600) => {
    clearTimeout(timer.current);
    setFlash({ mood, say });
    if (ms) timer.current = setTimeout(() => setFlash(null), ms);
  }, []);
  const settle = useCallback(() => { clearTimeout(timer.current); setFlash(null); }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  // Idle life: every few seconds, briefly show another expression so all five get used.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cycle = ['thoughtful', 'laughing', 'excited', 'surprised', 'confident'];
    let k = 0;
    const id = setInterval(() => {
      setFlash((f) => {
        if (f && !f.idle) return f; // a real reaction is showing; leave it
        if (f?.idle) return null;   // end the idle flash
        const mood = cycle[k++ % cycle.length];
        return { mood, say: undefined, idle: true };
      });
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const current = flash
    ? { mood: flash.idle && flash.mood === base.mood ? 'laughing' : flash.mood, say: flash.say ?? base.say }
    : base;
  return (
    <AvatarContext.Provider value={{ ...current, setBase, react, settle }}>
      {children}
    </AvatarContext.Provider>
  );
}

export const useAvatar = () => useContext(AvatarContext);

/** Sets the avatar's resting mood and line while a section is on screen. */
export function useSectionMood(ref, mood, say) {
  const { setBase } = useAvatar();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setBase({ mood, say }); }, { rootMargin: '-45% 0px -45% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, mood, say, setBase]);
}
