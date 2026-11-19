'use client';
import { useEffect, useMemo, useRef } from 'react';
import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { accentOf } from './shared';

export const TRACK = ['A1', 'A2', 'B1'];
const REC = { x: 385, y: 215, r: 130 }; // record centre when pulled out
const BANDS = [[100, 127], [74, 98], [50, 72]]; // groove band per track (outer = earliest)
const PIVOT = [530, 45];
const ARM = 215;

// Write an SVG transform attribute straight from a motion value.
function useAttr(mv) {
  const ref = useRef(null);
  useEffect(() => {
    const set = (v) => ref.current?.setAttribute('transform', v);
    set(mv.get());
    return mv.on('change', set);
  }, [mv]);
  return ref;
}

// Angle that drops the needle at radius `target` from the record centre.
function armAngle(target) {
  let best = 0, err = Infinity;
  for (let a = -10; a <= 40; a += 0.25) {
    const t = (a * Math.PI) / 180;
    const nx = PIVOT[0] - ARM * Math.sin(t), ny = PIVOT[1] + ARM * Math.cos(t);
    const e = Math.abs(Math.hypot(nx - REC.x, ny - REC.y) - target);
    if (e < err) { err = e; best = a; }
  }
  return best;
}

export default function Vinyl({ stops, active }) {
  const reduce = useReducedMotion();
  const playing = active >= 0;
  const angles = useMemo(() => BANDS.map(([a, b]) => armAngle((a + b) / 2)), []);
  const accent = playing ? accentOf(stops[active]) : '#F0B544';
  const grooves = useMemo(() => { const g = []; for (let r = 46; r <= 128; r += 2.6) g.push(r); return g; }, []);
  const spring = { type: 'spring', stiffness: 60, damping: 16 };

  // SVG-native rotate(angle cx cy) so the pivots are exact.
  const spin = useMotionValue(0);
  useAnimationFrame((_, dt) => { if (playing && !reduce) spin.set((spin.get() + dt * 0.2) % 360); });
  useEffect(() => { if (!playing) animate(spin, 0, { duration: 0.8 }); }, [playing, spin]);
  const spinT = useTransform(spin, (a) => `rotate(${a} ${REC.x} ${REC.y})`);
  const arm = useSpring(-8, { stiffness: 50, damping: 14 });
  useEffect(() => { arm.set(playing ? angles[active] : -8); }, [playing, active, angles, arm]);
  const armT = useTransform(arm, (a) => `rotate(${a} ${PIVOT[0]} ${PIVOT[1]})`);
  const spinRef = useAttr(spinT);
  const armRef = useAttr(armT);

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <svg viewBox="0 40 545 360" className="h-full w-full overflow-visible" role="img" aria-label="Record sleeve titled Internships Volume 1 with three tracks">
        <defs>
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.12" />
            <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="sleeveClip"><rect x="10" y="85" width="260" height="260" rx="6" /></clipPath>
        </defs>

        {/* record (behind sleeve) */}
        <motion.g initial={false} animate={{ x: playing ? 0 : -150 }} transition={spring}>
          <circle cx={REC.x} cy={REC.y} r={REC.r} fill="#0b0b0f" />
          <g ref={spinRef}>
            {grooves.map((r) => <circle key={r} cx={REC.x} cy={REC.y} r={r} fill="none" stroke="#fff" strokeOpacity={0.06} strokeWidth={0.6} />)}
            {BANDS.map(([a, b], i) => (
              <circle key={i} cx={REC.x} cy={REC.y} r={(a + b) / 2} fill="none" strokeWidth={b - a}
                stroke={accentOf(stops[i])} style={{ transition: 'stroke-opacity .5s' }} strokeOpacity={active === i ? 0.22 : 0} />
            ))}
            {/* label */}
            <circle cx={REC.x} cy={REC.y} r={44} fill={accent} style={{ transition: 'fill .5s' }} />
            <text x={REC.x} y={REC.y - 14} textAnchor="middle" fontSize={8} fontWeight={800} letterSpacing={1.5} fill="#0b0b0f">KRISH KUMAR</text>
            <text x={REC.x} y={REC.y + 24} textAnchor="middle" fontSize={7} fontWeight={600} letterSpacing={1} fill="#0b0b0f" opacity={0.7}>
              {playing ? `${TRACK[active]} · ${stops[active].company.split(' ')[0].toUpperCase()}` : 'VOL. 1'}
            </text>
            <circle cx={REC.x} cy={REC.y} r={3.5} fill="var(--color-night)" />
          </g>
          <circle cx={REC.x} cy={REC.y} r={REC.r} fill="url(#sheen)" />
        </motion.g>

        {/* sleeve */}
        <g>
          <rect x="10" y="85" width="260" height="260" rx="6" fill="#141820" />
          <g clipPath="url(#sleeveClip)">
            <motion.circle cx={95} cy={175} r={85} fill={accentOf(stops[0])} style={{ mixBlendMode: 'screen' }} animate={{ opacity: active === 0 ? 1 : 0.75 }} />
            <motion.circle cx={185} cy={160} r={62} fill={accentOf(stops[1])} style={{ mixBlendMode: 'screen' }} animate={{ opacity: active === 1 ? 1 : 0.75 }} />
            <motion.circle cx={168} cy={250} r={48} fill={accentOf(stops[2])} style={{ mixBlendMode: 'screen' }} animate={{ opacity: active === 2 ? 1 : 0.75 }} />
          </g>
          <text x="28" y="315" fontSize={20} fontWeight={800} fill="#fff" className="font-display" letterSpacing={-0.5}>Internships</text>
          <text x="28" y="333" fontSize={8} fill="#fff" opacity={0.65} letterSpacing={2}>VOL. 1 · 2025 – 2026</text>
          {stops.map((s, i) => (
            <text key={s.company} x="255" y={300 + i * 13}  textAnchor="end" fontSize={8} letterSpacing={0.5}
              fill="#fff" opacity={active === i ? 1 : 0.5} fontWeight={active === i ? 700 : 400} style={{ transition: 'opacity .3s' }}>
              {TRACK[i]} {s.company.split(' ').slice(0, 2).join(' ')}
            </text>
          ))}
          <rect x="10" y="85" width="260" height="260" rx="6" fill="none" stroke="#fff" strokeOpacity={0.08} />
        </g>

        {/* tonearm */}
        <g ref={armRef}>
          <line x1={PIVOT[0]} y1={PIVOT[1]} x2={PIVOT[0]} y2={PIVOT[1] + ARM - 14} stroke="currentColor" className="text-fg" strokeWidth={3} strokeLinecap="round" opacity={0.8} />
          <rect x={PIVOT[0] - 6} y={PIVOT[1] + ARM - 18} width={12} height={20} rx={2} className="fill-current text-fg" />
        </g>
        <circle cx={PIVOT[0]} cy={PIVOT[1]} r={12} className="fill-current text-muted" opacity={0.5} />
        <circle cx={PIVOT[0]} cy={PIVOT[1]} r={5} className="fill-current text-fg" />
      </svg>

      <div className="pointer-events-none absolute left-0 right-0 bottom-0 flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <span>{playing ? `Now playing · ${TRACK[active]}` : 'Side A / B · 3 tracks'}</span>
        <span>{playing ? stops[active].when : 'scroll to play'}</span>
      </div>
    </div>
  );
}
