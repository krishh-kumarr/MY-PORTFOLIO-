'use client';
import { useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import Beat from './Beat';
import Traveler from './Traveler';
import { useAvatar } from '../AvatarProvider';

const START = 0.14; // title card plays before the first beat
const moodFor = (kind, fallback) => ({ low: 'thoughtful', next: 'confident', win: 'excited' }[kind] ?? fallback);

/** Where beat i lives on the chapter's 0→1 progress. */
export function beatWindow(i, n) {
  const w = (1 - START) / n;
  return [START + i * w, START + (i + 1) * w];
}

function BeatSlot({ beat, i, n, progress, sectionRef }) {
  const [s, e] = beatWindow(i, n);
  const f = (e - s) * 0.18;
  const last = i === n - 1;
  const opacity = useTransform(progress, last ? [s, s + f] : [s, s + f, e - f, e], last ? [0, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, [s, s + f], [40, 0]);
  // Keyboard users: focusing a link inside a beat scrolls the story to that beat.
  const onFocusCapture = () => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((s + e) / 2) * (el.offsetHeight - window.innerHeight) });
  };
  return (
    <motion.li style={{ opacity, y }} onFocusCapture={onFocusCapture} className="absolute inset-x-0 top-0 lg:top-1/2 lg:-translate-y-1/2">
      <Beat beat={beat} />
    </motion.li>
  );
}

/** A chapter of the story: a sticky stage the visitor scrolls through like a film scene. */
export default function Chapter({ chapter, Scene }) {
  const ref = useRef(null);
  const { mood, setBase } = useAvatar();
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const titleOpacity = useTransform(progress, [0, 0.03, START - 0.03, START], [1, 1, 1, 0]);
  // Cut from and to black at each end of the chapter, like a film edit.
  const black = useTransform(progress, [0, 0.025, 0.975, 1], [1, 0, 0, 1]);
  const titleScale = useTransform(progress, [0, START], [1, 1.08]);
  const lastBeat = useRef(-2);
  const n = chapter.beats.length;

  useMotionValueEvent(progress, 'change', (p) => {
    if (p <= 0 || p >= 1) return;
    const idx = p < START ? -1 : Math.min(n - 1, Math.floor((p - START) / ((1 - START) / n)));
    if (idx === lastBeat.current) return;
    lastBeat.current = idx;
    const beat = chapter.beats[idx];
    setBase({ mood: beat ? moodFor(beat.kind, chapter.mood) : chapter.mood, say: chapter.line });
  });

  return (
    <section ref={ref} id={chapter.id} aria-labelledby={`${chapter.id}-title`} data-chapter={chapter.id} style={{ height: `${(n + 1.6) * 100}svh` }} className="relative">
      <div data-pinned className="sticky top-0 h-dvh overflow-hidden">
        <div className="absolute inset-0"><Scene progress={progress} /></div>

        <motion.div style={{ opacity: titleOpacity, scale: titleScale }} className="absolute z-30 inset-x-0 top-[9dvh] flex justify-center px-6 text-center pointer-events-none">
          <div className="bg-night/65 backdrop-blur-md border border-line rounded-[28px] px-8 py-7 max-w-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]">
            <h2 id={`${chapter.id}-title`} className="font-display font-extrabold tracking-tight">
              <span className="block text-lg sm:text-xl text-muted font-semibold">Chapter {chapter.number}</span>
              <span className="block text-5xl sm:text-7xl leading-[0.95] mt-1">{chapter.title}</span>
            </h2>
            <p className="mt-3 text-lg sm:text-xl">{chapter.line}</p>
            <p className="mt-2 text-muted font-medium">{chapter.years}</p>
          </div>
        </motion.div>

        <div aria-hidden="true" className="absolute inset-0 pointer-events-none story-vignette" />
        <Traveler travel={chapter.travel} progress={progress} mood={mood} />

        <ol className="absolute z-30 left-4 right-4 top-[8dvh] lg:top-0 lg:h-full lg:left-auto lg:right-[6vw] lg:w-[400px]">
          {chapter.beats.map((beat, i) => (
            <BeatSlot key={i} beat={beat} i={i} n={n} progress={progress} sectionRef={ref} />
          ))}
        </ol>

        <motion.div aria-hidden="true" style={{ opacity: black }} className="absolute inset-0 bg-black pointer-events-none z-40" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[5dvh] bg-black z-40" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[5dvh] bg-black z-40" />
      </div>
    </section>
  );
}
