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

  const current = flash ?? base;
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
