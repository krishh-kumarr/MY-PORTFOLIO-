'use client';
import { motion, useTransform } from 'motion/react';
import { Layer, SceneSvg, INK } from './Layer';

const lines = ['Samsung PRISM Excellence Award', 'Prize money: ₹80,000', 'Academic Excellence Award', 'Performance-based scholarship'];

function Line({ progress, i, text }) {
  const at = 0.15 + i * 0.18;
  const opacity = useTransform(progress, [at, at + 0.06], [0.2, 1]);
  return <motion.li style={{ opacity }} className="font-display font-bold text-[#FFD58A] text-lg sm:text-2xl lg:text-3xl leading-tight">{text}</motion.li>;
}

function Scoreboard({ progress }) {
  return (
    <div data-scoreboard className="absolute left-1/2 -translate-x-1/2 top-[36dvh] lg:top-[10dvh] w-[min(88vw,640px)] rounded-xl border-[6px] border-[#101820] bg-[#17222D] px-5 py-4 text-center shadow-[0_0_40px_rgba(255,213,138,.15)]">
      <p className="font-display font-semibold text-teal text-sm sm:text-base">Scoreboard</p>
      <ul className="mt-2 space-y-1.5">{lines.map((t, i) => <Line key={t} progress={progress} i={i} text={t} />)}</ul>
    </div>
  );
}

/** A floodlit cricket ground. The scoreboard lights up with the year's wins. */
export default function Ground({ progress }) {
  return (
    <div className="absolute inset-0">
    <SceneSvg defs={
      <radialGradient id="flood" cx=".5" cy="0" r="1"><stop offset="0" stopColor="#FFF6D8" stopOpacity=".55" /><stop offset="1" stopColor="#FFF6D8" stopOpacity="0" /></radialGradient>
    }>
      <rect width="1600" height="900" fill="#0F1B2D" />
      <Layer depth={0.3} progress={progress}>
        {[90, 1450].map((x) => (
          <g key={x}>
            <path d={`M${x} 80 L${x - 120} 700 H${x + 180} Z`} fill="url(#flood)" />
            <rect x={x - 10} y="60" width="80" height="40" fill="#F6FBFD" stroke={INK} strokeWidth="4" />
            <rect x={x + 26} y="100" width="10" height="460" fill="#5E6B78" stroke={INK} strokeWidth="2" />
          </g>
        ))}
        <path d="M0 520 Q800 430 1600 520 V560 H0Z" fill="#26364A" />
        {Array.from({ length: 60 }, (_, i) => <circle key={i} cx={20 + i * 27} cy={505 - Math.sin(i / 9.5) * 48 + (i % 3) * 6} r="7" fill={['#E3A73A', '#7FD6CF', '#F6FBFD', '#A8DDF3'][i % 4]} opacity=".7" />)}
      </Layer>
      <ellipse cx="800" cy="760" rx="1000" ry="250" fill="#3E8E4E" />
      <Layer depth={0.6} progress={progress}>
        <ellipse cx="800" cy="760" rx="760" ry="170" fill="#4FA35E" />
        <rect x="740" y="610" width="120" height="250" fill="#C9B27A" />
      </Layer>
      <Layer depth={0.9} progress={progress}>
        {[0, 1, 2].map((i) => <rect key={i} x={778 + i * 18} y="590" width="8" height="54" fill="#F6FBFD" stroke={INK} strokeWidth="2" />)}
        <path d="M776 590 h44" stroke="#E3A73A" strokeWidth="5" />
      </Layer>
    </SceneSvg>
    <Scoreboard progress={progress} />
    </div>
  );
}
