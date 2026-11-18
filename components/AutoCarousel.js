'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import DeviceFrame from './DeviceFrame';

/** Plays a project's images by itself in device frames. No controls, no captions. */
export default function AutoCarousel({ items, every = 3800 }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || items.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), every);
    return () => clearInterval(t);
  }, [items.length, every, reduce]);
  const im = items[i];
  return (
    <div aria-label="Project photos" role="img" className="relative grid place-items-center min-h-[min(68dvh,600px)] overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-raised to-night py-10 px-4">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={im.src} className="grid place-items-center w-full"
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.94, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -30, scale: 0.96 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ perspective: 1200 }}>
          <DeviceFrame im={im} />
        </motion.div>
      </AnimatePresence>
      <div aria-hidden="true" className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
        {items.map((x, k) => <span key={x.src} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-6 bg-mustard' : 'w-1.5 bg-line'}`} />)}
      </div>
    </div>
  );
}
