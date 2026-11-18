'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { AvatarFace } from '../Avatar';
import AuraFx from '../AuraFx';

const STEP = 0.06;   // fraction of screen width per stride
const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));

/**
 * Krish's full-body art travelling across a chapter. Faces the way the visitor scrolls,
 * steps in time with distance covered, stands facing the camera when the scroll stops.
 * travel: 'walk' | 'run' | 'ninja' | 'drive' (drive: appears for the final tower shot only).
 */
export default function Traveler({ travel = 'walk', progress, mood = 'confident' }) {
  const x = useMotionValue('0%'), y = useMotionValue(0), rot = useMotionValue(0), sy = useMotionValue(1), op = useMotionValue(1);
  const st = useRef({ x: null, prev: null, phase: 0, speed: 0, dir: 1 });
  const [view, setView] = useState('front');   // 'front' | 'right' | 'left'
  const ninja = travel === 'ninja';
  const run = travel === 'run' || ninja;

  useAnimationFrame((_, ms) => {
    const dt = Math.min(ms / 1000, 0.05), s = st.current;
    const p = progress.get();
    const drive = travel === 'drive';
    const t = drive ? Math.max(0, Math.min(1, (p - 0.74) / 0.14)) : p;
    const target = 4 + t * 40; // % of stage width
    if (s.x === null) { s.x = target; s.prev = target; }
    s.x = damp(s.x, target, 7, dt);
    const dx = s.x - s.prev; s.prev = s.x;
    s.phase += (Math.abs(dx) / 100 / STEP) * Math.PI * 2;
    s.speed = damp(s.speed, Math.abs(dx) / dt, 8, dt);
    const moving = s.speed > 0.6;
    if (Math.abs(dx) > 0.001) s.dir = Math.sign(dx);
    const next = moving ? (s.dir > 0 ? 'right' : 'left') : 'front';
    if (next !== view) setView(next);

    const bobAmp = ninja ? 14 : run ? 10 : 6;
    const step = Math.abs(Math.sin(s.phase));
    const lean = moving ? (ninja ? 12 : run ? 6 : 2) * s.dir : 0;
    const hopY = ninja && moving ? Math.max(0, Math.sin(s.phase * 0.5)) * 46 : 0;
    x.set(`${s.x}%`);
    y.set(-(moving ? step * bobAmp : Math.sin(performance.now() / 700) * 2) - hopY);
    rot.set(lean + (moving ? Math.sin(s.phase) * 1.5 : 0));
    sy.set(moving ? 1 - (1 - step) * 0.025 : 1);
    op.set(drive ? (p > 0.74 ? 1 : 0) : 1);
  });

  const side = view !== 'front';
  return (
    <motion.div style={{ left: x, opacity: op }} className="absolute bottom-[6dvh] h-[min(56dvh,560px)] lg:h-[min(64dvh,640px)] aspect-[254/898] pointer-events-none" aria-hidden="true">
      <motion.div style={{ y, rotate: rot, scaleY: sy }} className="relative h-full w-full origin-bottom">
        <div className="absolute -inset-x-[60%] inset-y-[-6%]"><AuraFx mode={mood === 'excited' ? 'gold' : 'none'} compact /></div>
        {ninja && view !== 'front' && <div className={`absolute top-[20%] h-[40%] w-[140%] speed-lines ${view === 'right' ? 'right-[70%]' : 'left-[70%] -scale-x-100'}`} />}
        <Image src="/avatar/body-front.webp" alt="" width={254} height={898} sizes="200px" className={`absolute inset-0 h-full w-auto mx-auto transition-opacity duration-150 ${side ? 'opacity-0' : 'opacity-100'}`} priority={false} />
        <div className={`absolute inset-0 transition-opacity duration-150 ${side ? 'opacity-100' : 'opacity-0'} ${view === 'left' ? '-scale-x-100' : ''}`}>
          <Image src="/avatar/body-side.webp" alt="" width={181} height={896} sizes="160px" className="absolute inset-0 h-full w-auto mx-auto" />
          {ninja && (
            <svg viewBox="0 0 181 896" className="absolute inset-0 h-full w-auto mx-auto overflow-visible">
              <path d="M52 66 Q105 52 150 62 L152 76 Q105 66 54 80Z" fill="#1E2430" />
              <rect x="118" y="58" width="26" height="15" rx="3" fill="#BFC8D2" stroke="#15212B" strokeWidth="2" />
              <text x="131" y="70" textAnchor="middle" fontSize="12" fontWeight="900" fill="#15212B">K</text>
              <path className="band-tail" d="M56 72 q-30 6 -58 28 q26 -12 56 -18z" fill="#1E2430" />
            </svg>
          )}
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div key={mood} initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            className="absolute -top-[13%] left-1/2 -translate-x-1/2 size-[clamp(64px,9dvh,92px)] rounded-full bg-sky border-2 border-line overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,.5)]">
            <AvatarFace mood={mood} sizes="92px" className="absolute inset-x-1 -bottom-1 aspect-[640/700]" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[160%] h-4 rounded-[50%] bg-black/45 blur-[3px]" />
    </motion.div>
  );
}
