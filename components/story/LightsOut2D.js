'use client';
import { useState } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'motion/react';
import { litCount, LIGHTS_OUT } from './lights';
import { INK } from './scenes/Layer';

/** 2D lights-out: start gantry over a night track, speed lines when the lights go out. */
export default function LightsOut2D({ progress }) {
  const [lit, setLit] = useState(() => litCount(progress.get()));
  useMotionValueEvent(progress, 'change', (p) => setLit(litCount(p)));
  const speed = useTransform(progress, [LIGHTS_OUT, LIGHTS_OUT + 0.05], [0, 1]);
  return (
    <div data-testid="lightsout-2d" className="absolute inset-0">
      <svg aria-hidden="true" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 w-full h-full">
        <rect width="1600" height="900" fill="#0F1B2D" />
        <path d="M640 430 L960 430 L1700 900 H-100Z" fill="#26313E" />
        <path d="M790 430 v470" stroke="#F6FBFD" strokeWidth="8" strokeDasharray="40 40" opacity=".5" />
        {Array.from({ length: 14 }, (_, i) => <rect key={i} x={i % 2 ? 610 - i * 50 : 960 + i * 50} y={440 + i * 32} width="40" height="14" fill={i % 4 < 2 ? '#D94B3D' : '#F6FBFD'} opacity=".8" />)}
        <rect x="560" y="150" width="480" height="24" fill="#2E3B49" stroke={INK} strokeWidth="4" />
        <rect x="560" y="174" width="14" height="260" fill="#2E3B49" /><rect x="1026" y="174" width="14" height="260" fill="#2E3B49" />
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i} data-light data-on={i < lit ? 'true' : 'false'}>
            <rect x={588 + i * 88} y="180" width="70" height="120" rx="10" fill="#151C24" stroke={INK} strokeWidth="4" />
            <circle cx={623 + i * 88} cy="214" r="22" fill={i < lit ? '#FF2A1A' : '#3A1E1E'} />
            <circle cx={623 + i * 88} cy="266" r="22" fill={i < lit ? '#FF2A1A' : '#3A1E1E'} />
          </g>
        ))}
        <motion.g style={{ opacity: speed }}>
          {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${800 + Math.cos(i) * 120} ${470 + Math.sin(i * 2) * 40} L${800 + Math.cos(i) * 900} ${520 + Math.sin(i * 2) * 400}`} stroke="#F6FBFD" strokeWidth="3" opacity=".35" />)}
        </motion.g>
      </svg>
    </div>
  );
}
