'use client';
import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useSectionMood } from './AvatarProvider';

export default function Section({ id, title, intro, mood, say, children, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  useSectionMood(ref, mood, say);
  const reveal = reduce ? {} : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-15% 0px' }, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } };
  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className={`mx-auto max-w-6xl px-5 py-20 ${className}`}>
      <motion.div {...reveal}>
        <h2 id={`${id}-title`} className="font-display font-extrabold tracking-tight text-4xl sm:text-6xl">{title}</h2>
        {intro && <p className="mt-3 text-lg text-muted max-w-[60ch]">{intro}</p>}
      </motion.div>
      <div className="mt-10">{children}</div>
    </section>
  );
}
