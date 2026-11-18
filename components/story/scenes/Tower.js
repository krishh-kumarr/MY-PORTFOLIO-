'use client';
import { motion, useTransform } from 'motion/react';
import { Layer, SceneSvg, INK } from './Layer';

/** The last stop: a hero tower at dawn, its emblem lighting up. */
export default function Tower({ progress }) {
  const glow = useTransform(progress, [0.75, 0.9], [0.15, 1]);
  return (
    <SceneSvg defs={
      <linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7FA7D9" /><stop offset=".6" stopColor="#F2C48D" /><stop offset="1" stopColor="#FBEBC8" /></linearGradient>
    }>
      <rect width="1600" height="900" fill="url(#dawn)" />
      <Layer depth={0.15} progress={progress} drift={60}>
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={i * 140 - 20} y={520 - (i * 53) % 160} width="120" height="400" fill="#9C93B5" opacity=".6" />)}
      </Layer>
      <Layer depth={0.3} progress={progress} drift={50}>
        <rect x="740" y="190" width="120" height="720" fill="#3B4A63" stroke={INK} strokeWidth="6" />
        <path d="M740 190 L800 110 L860 190Z" fill="#3B4A63" stroke={INK} strokeWidth="6" />
        {Array.from({ length: 10 }, (_, r) => <rect key={r} x="770" y={330 + r * 52} width="60" height="22" fill="#FFD58A" opacity={r % 3 ? 0.85 : 0.35} />)}
        <motion.g data-emblem style={{ opacity: glow }}>
          <circle cx="800" cy="250" r="64" fill="#FFD58A" opacity=".35" />
          <path d="M760 210 h80 v34 q0 40 -40 56 q-40 -16 -40 -56z" fill="#E3A73A" stroke={INK} strokeWidth="5" />
          <text x="800" y="266" textAnchor="middle" fontSize="48" fontWeight="800" fontFamily="var(--font-bricolage), sans-serif" fill={INK}>K</text>
        </motion.g>
      </Layer>
      <Layer depth={0.6} progress={progress}>
        {Array.from({ length: 9 }, (_, i) => <rect key={i} x={i * 210 - 60} y={640 - (i % 3) * 50} width="170" height="300" fill="#4A5874" stroke={INK} strokeWidth="4" />)}
      </Layer>
      <rect y="820" width="1600" height="80" fill="#26313E" />
    </SceneSvg>
  );
}
