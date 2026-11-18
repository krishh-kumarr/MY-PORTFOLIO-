'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, X, ArrowUpRight } from 'lucide-react';
import { galleries } from '@/lib/data';

/** Each project opens with its own motion, matched to what it is. */
export const EFFECTS = { 'sql-optimizer': 'query', parentbud: 'swipe', vibeout: 'pulse', threatsense: 'scan' };

const variants = {
  // Rows sliding in like query results
  query: { initial: (d) => ({ x: d * 80, opacity: 0, clipPath: 'inset(0 0 100% 0)' }), animate: { x: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)' }, exit: (d) => ({ x: -d * 80, opacity: 0 }) },
  // Phone-style card swipe with a tilt
  swipe: { initial: (d) => ({ x: d * 340, rotate: d * 8, opacity: 0 }), animate: { x: 0, rotate: 0, opacity: 1 }, exit: (d) => ({ x: -d * 340, rotate: -d * 8, opacity: 0 }) },
  // Heartbeat: pops in with a beat
  pulse: { initial: { scale: 0.7, opacity: 0 }, animate: { scale: [0.7, 1.06, 0.98, 1], opacity: 1 }, exit: { scale: 1.1, opacity: 0 } },
  // Scanner line reveal
  scan: { initial: { clipPath: 'inset(0 100% 0 0)', filter: 'hue-rotate(90deg) saturate(2)' }, animate: { clipPath: 'inset(0 0% 0 0)', filter: 'hue-rotate(0deg) saturate(1)' }, exit: { opacity: 0 } },
};

export default function ProjectGallery({ project, onClose }) {
  const items = galleries[project.slug] ?? [];
  const [[i, dir], set] = useState([0, 1]);
  const reduce = useReducedMotion();
  const effect = EFFECTS[project.slug];
  const go = (d) => set(([n]) => [(n + d + items.length) % items.length, d]);

  useEffect(() => {
    const key = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', key);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = prev; };
  }, [onClose]);

  const im = items[i];
  const v = variants[effect];
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={`${project.name} gallery`} className="fixed inset-0 z-[90] bg-night/92 backdrop-blur-md grid grid-rows-[auto_1fr_auto] p-4 sm:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="mr-auto">
          <p className="text-muted text-sm font-medium">{project.year}</p>
          <h3 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight">{project.name}</h3>
        </div>
        <Link href={`/projects/${project.slug}`} className="hidden sm:inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 font-semibold hover:border-mustard">Full story <ArrowUpRight size={16} /></Link>
        <button type="button" onClick={onClose} aria-label="Close gallery" className="grid place-items-center size-11 rounded-full border border-line hover:border-mustard cursor-pointer"><X size={18} /></button>
      </div>

      <div className="relative min-h-0 my-4 grid place-items-center" onClick={(e) => e.stopPropagation()}>
        {effect === 'scan' && !reduce && <motion.div key={`scan-${i}`} aria-hidden="true" className="absolute inset-y-0 w-1 bg-teal shadow-[0_0_24px_6px_rgb(95_208_198/.6)] z-10" initial={{ left: '0%' }} animate={{ left: '100%', opacity: [1, 1, 0] }} transition={{ duration: 0.9, ease: 'easeInOut' }} />}
        <AnimatePresence custom={dir} mode="popLayout" initial={!reduce}>
          <motion.figure key={im.src} custom={dir} variants={reduce ? undefined : v} initial="initial" animate="animate" exit="exit"
            transition={{ duration: effect === 'pulse' ? 0.6 : 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-h-full max-w-full flex flex-col items-center">
            <Image src={im.src} alt={im.alt} width={im.w} height={im.h} sizes="(min-width: 1024px) 70vw, 95vw" className="max-h-[66dvh] w-auto max-w-full rounded-2xl border border-line object-contain shadow-2xl" />
            <figcaption className="mt-3 text-center text-muted max-w-[60ch]">{im.alt}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" disabled={items.length < 2} className="grid place-items-center size-11 rounded-full border border-line hover:border-mustard disabled:opacity-30 cursor-pointer"><ChevronLeft /></button>
        <span className="tabular-nums font-semibold min-w-14 text-center">{i + 1} / {items.length}</span>
        <button type="button" onClick={() => go(1)} aria-label="Next image" disabled={items.length < 2} className="grid place-items-center size-11 rounded-full border border-line hover:border-mustard disabled:opacity-30 cursor-pointer"><ChevronRight /></button>
      </div>
    </motion.div>
  );
}
