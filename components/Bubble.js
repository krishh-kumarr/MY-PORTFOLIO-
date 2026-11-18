'use client';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

/** Speech bubble whose text swaps with a short fade. tail: 'left' | 'right' | 'bottom' */
export default function Bubble({ text, tail = 'left', className = '' }) {
  const reduce = useReducedMotion();
  const tails = {
    left: 'before:-left-[11px] before:top-6 before:border-y-[9px] before:border-r-[11px] before:border-y-transparent before:border-r-line',
    right: 'before:-right-[11px] before:top-6 before:border-y-[9px] before:border-l-[11px] before:border-y-transparent before:border-l-line',
    bottom: 'before:left-8 before:-bottom-[11px] before:border-x-[9px] before:border-t-[11px] before:border-x-transparent before:border-t-line',
  };
  return (
    <div role="status" aria-live="polite" className={`bg-surface sticker rounded-2xl px-4 py-3 before:absolute before:content-[''] before:w-0 before:h-0 ${tails[tail]} ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={text}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="font-medium leading-snug"
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
