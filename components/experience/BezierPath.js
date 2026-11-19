'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { accentOf } from './shared';

const TRAIL = 260; // px of glowing tail behind the comet

/** One anchor with pen-tool handles. Pops in with a ring burst when the comet arrives. */
function Anchor({ n, color, reached, reduce }) {
  const c = color ?? 'var(--color-muted)';
  const big = color != null;
  const on = reduce || reached;
  return (
    <g>
      {[n.hin, n.hout].filter(Boolean).map(([hx, hy], k) => (
        <motion.g key={k} initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.5, delay: on ? 0.15 : 0 }}>
          <motion.line x1={n.x} y1={n.y} initial={false} animate={{ x2: on ? hx : n.x, y2: on ? hy : n.y }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            stroke={c} strokeWidth={1} strokeOpacity={0.6} />
          <motion.circle r={big ? 4 : 3} fill="var(--color-night)" stroke={c} strokeWidth={1.5} initial={false}
            animate={{ cx: on ? hx : n.x, cy: on ? hy : n.y }} transition={{ type: 'spring', stiffness: 120, damping: 14 }} />
        </motion.g>
      ))}
      {big ? (
        <motion.g initial={false} animate={{ scale: on ? 1 : 0.4, opacity: on ? 1 : 0.35 }} transition={{ type: 'spring', stiffness: 260, damping: 15 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <rect x={n.x - 9} y={n.y - 9} width={18} height={18} fill="var(--color-night)" stroke={c} strokeWidth={2} />
          <rect x={n.x - 3.5} y={n.y - 3.5} width={7} height={7} fill={c} />
        </motion.g>
      ) : (
        <rect x={n.x - 4} y={n.y - 4} width={8} height={8} fill="var(--color-night)" stroke={c} strokeWidth={1.5} />
      )}
      <AnimatePresence>
        {big && reached && !reduce && (
          <motion.circle key="burst" cx={n.x} cy={n.y} fill="none" stroke={c} strokeWidth={2}
            initial={{ r: 8, opacity: 0.9 }} animate={{ r: 70, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: 'easeOut' }} />
        )}
      </AnimatePresence>
    </g>
  );
}

export default function BezierPath({ geo, stops, wrap, reduce }) {
  const path = useRef(null);
  const head = useRef(null);
  const [L, setL] = useState(0);
  const [reached, setReached] = useState(-1);

  useEffect(() => { if (path.current?.getTotalLength) setL(path.current.getTotalLength()); }, [geo]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 70%', 'end 70%'] });
  const prog = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });
  const dash = useTransform(prog, (p) => -(p * L - TRAIL));

  useMotionValueEvent(prog, 'change', (p) => {
    if (!path.current || !L) return;
    const pt = path.current.getPointAtLength(Math.max(0, Math.min(L, p * L)));
    head.current?.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
    // which stops has the comet passed?
    const r = geo.a.reduce((acc, [, y], i) => (pt.y >= y - 4 ? i : acc), -1);
    setReached((was) => (was === r ? was : r));
  });

  const id = 'bz';
  return (
    <svg className="hidden md:block pointer-events-none absolute inset-0" width={geo.W} height={geo.H} viewBox={`0 0 ${geo.W} ${geo.H}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-ink`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={geo.H}>
          {stops.map((s, i) => <stop key={s.company} offset={geo.a[i][1] / geo.H} stopColor={accentOf(s)} />)}
        </linearGradient>
        <radialGradient id={`${id}-head`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset=".35" stopColor="#FFE3A3" stopOpacity=".9" />
          <stop offset="1" stopColor="#F0B544" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* faint guide for the whole route */}
      <path ref={path} d={geo.d} fill="none" stroke="currentColor" className="text-fg" strokeOpacity={0.1} strokeWidth={1} strokeDasharray="3 7" />
      {/* drawn path behind the comet */}
      <motion.path d={geo.d} fill="none" stroke={`url(#${id}-ink)`} strokeWidth={2} strokeLinecap="round" style={{ pathLength: reduce ? 1 : prog }} opacity={0.75} />
      {/* comet trail */}
      {!reduce && L > 0 && (
        <>
          <motion.path d={geo.d} fill="none" stroke={`url(#${id}-ink)`} strokeWidth={10} strokeLinecap="round" opacity={0.35}
            strokeDasharray={`${TRAIL} ${L + TRAIL}`} style={{ strokeDashoffset: dash, filter: 'blur(6px)' }} />
          <motion.path d={geo.d} fill="none" stroke={`url(#${id}-ink)`} strokeWidth={3.5} strokeLinecap="round"
            strokeDasharray={`${TRAIL} ${L + TRAIL}`} style={{ strokeDashoffset: dash }} />
        </>
      )}

      {geo.nodes.map((n, i) => (
        <Anchor key={i} n={n} reduce={reduce} color={n.stop != null ? accentOf(stops[n.stop]) : null}
          reached={n.stop == null ? true : reached >= n.stop} />
      ))}

      {/* comet head */}
      {!reduce && (
        <g ref={head}>
          <circle r={26} fill={`url(#${id}-head)`} opacity={0.6} />
          <circle r={5} fill="#fff" />
        </g>
      )}
    </svg>
  );
}
