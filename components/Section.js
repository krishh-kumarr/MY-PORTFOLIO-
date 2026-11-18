'use client';
import { useRef } from 'react';
import { useSectionMood } from './AvatarProvider';

export default function Section({ id, title, intro, mood, say, children, className = '' }) {
  const ref = useRef(null);
  useSectionMood(ref, mood, say);
  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className={`mx-auto max-w-6xl px-5 py-20 ${className}`}>
      <h2 id={`${id}-title`} className="font-display font-extrabold tracking-tight text-4xl sm:text-5xl">{title}</h2>
      {intro && <p className="mt-3 text-lg text-muted max-w-[60ch]">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}
