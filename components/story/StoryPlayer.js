'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { Pause, Play, SkipForward, SkipBack, X, RotateCcw } from 'lucide-react';
import Chapter from './Chapter';
import TimeCard from './TimeCard';
import { scenes } from './scenes';
import { chapters, cards } from '@/lib/story';

export const CARD_SECONDS = 2.6;
const BEAT_SECONDS = 7;
/** How long a chapter plays: its title, then every beat with time to read it. */
export const chapterSeconds = (c) => 3 + c.beats.length * BEAT_SECONDS;

/**
 * The story as a film that plays by itself: time card → chapter → time card → …
 * Controls: pause/play (Space), next chapter (→), close (Esc).
 */
export default function StoryPlayer({ onClose, onProjects, inline = false }) {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState('card'); // 'card' | 'play' | 'end'
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const SPEEDS = [0.75, 1, 1.5, 2];
  const progress = useMotionValue(0);
  const cardT = useRef(0);
  const bar = useRef(null);

  const wrap = useRef(null);
  const [inView, setInView] = useState(!inline);
  useEffect(() => {
    if (!inline) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, [inline]);

  const goTo = useCallback((n) => {
    if (n >= chapters.length) { if (inline) n = 0; else { setPhase('end'); return; } }
    setI(n); setPhase('card'); cardT.current = 0; progress.set(0);
  }, [progress, inline]);

  useAnimationFrame((_, ms) => {
    if (paused || !inView) return;
    const dt = (Math.min(ms, 50) / 1000) * speed;
    if (phase === 'card') {
      cardT.current += dt;
      if (cardT.current >= CARD_SECONDS) setPhase('play');
    } else if (phase === 'play') {
      const p = Math.min(1, progress.get() + dt / chapterSeconds(chapters[i]));
      progress.set(p);
      if (p >= 1) goTo(i + 1);
    }
    if (bar.current) {
      const total = chapters.reduce((s, c) => s + CARD_SECONDS + chapterSeconds(c), 0);
      const done = chapters.slice(0, i).reduce((s, c) => s + CARD_SECONDS + chapterSeconds(c), 0) + (phase === 'card' ? cardT.current : CARD_SECONDS + progress.get() * chapterSeconds(chapters[i]));
      bar.current.style.transform = `scaleX(${phase === 'end' ? 1 : done / total})`;
    }
  });

  useEffect(() => {
    if (inline) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === ' ') { e.preventDefault(); setPaused((p) => !p); }
      else if (e.key === 'ArrowRight') goTo(i + 1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose, goTo, i, inline]);

  const c = chapters[i];
  return (
    <div ref={wrap} {...(inline ? { role: 'region' } : { role: 'dialog', 'aria-modal': 'true' })} aria-label="Krish’s story" className={inline ? 'relative isolate z-0 h-[62svh] sm:h-[min(78dvh,720px)] overflow-hidden bg-night text-fg' : 'fixed inset-0 z-[70] bg-night text-fg'}>
      <AnimatePresence mode="sync">
        {phase === 'play' && (
          <motion.div key={`ch-${c.id}`} className="absolute inset-0" initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}>
            <Chapter chapter={c} Scene={scenes[c.scene]} progress={progress} />
          </motion.div>
        )}
        {phase === 'card' && <TimeCard key={`card-${i}`} card={cards[i]} />}
        {phase === 'end' && (
          <motion.div key="end" className="absolute inset-0 grid place-items-center text-center px-6 bg-night" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div>
              <p className="text-teal font-semibold">The end, for now</p>
              <h3 className="mt-2 font-display font-extrabold text-5xl sm:text-7xl leading-[0.92] max-w-[14ch] mx-auto">Still figuring it out. That’s the point.</h3>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => goTo(0)} className="sticker sticker-hover rounded-full bg-surface px-6 py-3 font-semibold inline-flex items-center gap-2 cursor-pointer"><RotateCcw size={18} aria-hidden="true" /> Watch again</button>
                <button type="button" onClick={onProjects ?? onClose} className="sticker sticker-hover rounded-full bg-mustard px-6 py-3 font-semibold cursor-pointer">See my projects</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-[80] h-1 bg-white/10"><div ref={bar} className="h-full origin-left bg-mustard" style={{ transform: 'scaleX(0)' }} /></div>
      {inline && (
        <div className="absolute right-3 bottom-5 z-[85] flex items-center gap-2 rounded-full bg-black/55 p-1.5 backdrop-blur-md ring-1 ring-white/15 shadow-[0_8px_24px_rgba(0,0,0,.45)]">
          <button type="button" onClick={() => goTo(Math.max(0, i - 1))} aria-label="Previous chapter" className="grid place-items-center size-10 rounded-full bg-white/10 border border-white/25 text-white hover:bg-mustard hover:text-[#16110A] hover:border-mustard transition-colors cursor-pointer text-white"><SkipBack size={16} /></button>
          <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play' : 'Pause'} className="grid place-items-center size-10 rounded-full bg-white/10 border border-white/25 text-white hover:bg-mustard hover:text-[#16110A] hover:border-mustard transition-colors cursor-pointer text-white">{paused ? <Play size={16} /> : <Pause size={16} />}</button>
          <button type="button" onClick={() => goTo(i + 1)} aria-label="Next chapter" className="grid place-items-center size-10 rounded-full bg-white/10 border border-white/25 text-white hover:bg-mustard hover:text-[#16110A] hover:border-mustard transition-colors cursor-pointer text-white"><SkipForward size={16} /></button>
          <button type="button" onClick={() => setSpeed((v) => SPEEDS[(SPEEDS.indexOf(v) + 1) % SPEEDS.length])} aria-label={`Playback speed ${speed}x`} className="h-10 min-w-14 px-3 rounded-full bg-white/10 border border-white/25 text-white hover:bg-mustard hover:text-[#16110A] hover:border-mustard transition-colors cursor-pointer text-white font-semibold tabular-nums text-sm">{speed}×</button>
        </div>
      )}
      {!inline && <div className="absolute right-3 top-3 z-[85] flex gap-2">
        {phase !== 'end' && (
          <>
            <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play' : 'Pause'} className="grid place-items-center size-11 rounded-full bg-white/10 border border-white/25 text-white hover:bg-mustard hover:text-[#16110A] hover:border-mustard transition-colors cursor-pointer">{paused ? <Play size={18} /> : <Pause size={18} />}</button>
            <button type="button" onClick={() => goTo(i + 1)} aria-label="Next chapter" className="grid place-items-center size-11 rounded-full bg-white/10 border border-white/25 text-white hover:bg-mustard hover:text-[#16110A] hover:border-mustard transition-colors cursor-pointer"><SkipForward size={18} /></button>
          </>
        )}
        <button type="button" onClick={onClose} aria-label="Close the story" className="grid place-items-center size-11 rounded-full bg-white/10 border border-white/25 text-white hover:bg-mustard hover:text-[#16110A] hover:border-mustard transition-colors cursor-pointer"><X size={18} /></button>
      </div>}
    </div>
  );
}
