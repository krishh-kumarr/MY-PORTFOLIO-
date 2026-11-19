'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import KrishMascot from './KrishMascot';
import Bubble from './Bubble';
import { useAvatar } from './AvatarProvider';

/** Small avatar in the corner that follows you once the hero is off screen. */
export default function Peek({ watch = 'top', always = false, hideOver }) {
  const { mood, say, react, settle } = useAvatar();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(always);
  const [quiet, setQuiet] = useState(false);
  const [over, setOver] = useState(false);

  // Stay out of the way while a story chapter is on screen; its own avatar is already there.
  useEffect(() => {
    if (!hideOver) return;
    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target));
      setOver(seen.size > 0);
    });
    document.querySelectorAll(hideOver).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [hideOver]);

  useEffect(() => {
    if (always) return;
    const el = document.getElementById(watch);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [watch, always]);

  useEffect(() => setQuiet(false), [say]);

  return (
    <AnimatePresence>
      {show && !over && (
        <motion.aside
          aria-label="Avatar guide"
          initial={reduce ? false : { y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: 140, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 flex items-end gap-3 pointer-events-none"
        >
          {!quiet && (
            <div className="relative pointer-events-auto hidden sm:block max-w-[260px] mb-6">
              <Bubble text={say} tail="right" className="relative text-sm pr-8" />
              <button type="button" onClick={() => setQuiet(true)} aria-label="Hide message" className="absolute top-2 right-2 p-1 rounded-full hover:bg-sky-soft"><X size={14} /></button>
            </div>
          )}
          <div
            onClick={() => { setQuiet(false); react('surprised', 'Hey! I’m just here to help.', 1600); }}
            onPointerEnter={() => react('laughing', say, 0)}
            onPointerLeave={settle}
            className="pointer-events-auto relative rounded-full bg-sky sticker overflow-hidden grid place-items-center size-16 sm:size-24"
          >
            <KrishMascot size={96} className="scale-[.66] sm:scale-100" />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
