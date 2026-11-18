'use client';
import { motion, useTransform } from 'motion/react';
import { Layer, SceneSvg, INK } from './Layer';

const roofs = [[-40, 520], [180, 470], [380, 540], [560, 450], [780, 510], [990, 460], [1190, 530], [1400, 480], [1620, 520]];

function Note({ progress, at, x, y, rot }) {
  const opacity = useTransform(progress, [at, at + 0.03], [0, 1]);
  return (
    <motion.g style={{ opacity }} transform={`rotate(${rot} ${x} ${y})`}>
      <rect x={x - 70} y={y - 46} width="140" height="92" rx="6" fill="#F6FBFD" stroke={INK} strokeWidth="3" />
      <path d={`M${x - 50} ${y - 22}h100M${x - 50} ${y - 6}h70`} stroke="#9DB2C4" strokeWidth="5" />
      <g transform={`rotate(-14 ${x} ${y + 18})`}>
        <rect x={x - 58} y={y + 4} width="116" height="30" rx="4" fill="none" stroke="#D94B3D" strokeWidth="4" />
        <text x={x} y={y + 27} textAnchor="middle" fontSize="20" fontWeight="800" fill="#D94B3D" fontFamily="var(--font-bricolage), sans-serif">REJECTED</text>
      </g>
    </motion.g>
  );
}

/** Night rooftops: the grind. Training posts, a lit window, and App Store rejections piling up. */
export default function Rooftops({ progress }) {
  return (
    <SceneSvg defs={
      <linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0A1424" /><stop offset="1" stopColor="#1C2E4A" /></linearGradient>
    }>
      <rect width="1600" height="900" fill="url(#night)" />
      <circle cx="1300" cy="150" r="56" fill="#F3EBD2" /><circle cx="1322" cy="138" r="50" fill="#0F1B2D" opacity=".35" />
      {Array.from({ length: 40 }, (_, i) => <circle key={i} className="twinkle" style={{ animationDelay: `${(i % 7) * 0.4}s` }} cx={(i * 397) % 1600} cy={(i * 131) % 380} r={i % 5 ? 1.8 : 3} fill="#F6FBFD" />)}
      <Layer depth={0.2} progress={progress}>
        {roofs.map(([x, y], i) => <rect key={i} x={x} y={y - 120} width="190" height="700" fill="#16243A" />)}
      </Layer>
      <Layer depth={0.45} progress={progress}>
        {roofs.map(([x, y], i) => (
          <g key={i}>
            <rect x={x + 10} y={y} width="200" height="500" fill="#22385A" stroke={INK} strokeWidth="4" />
            <rect x={x + 10} y={y - 14} width="200" height="16" fill="#2E4870" stroke={INK} strokeWidth="4" />
            {i % 2 === 0 && <g><rect x={x + 140} y={y - 70} width="50" height="56" rx="8" fill="#3A5680" stroke={INK} strokeWidth="3" /><rect x={x + 150} y={y - 14} width="8" height="14" fill={INK} /><rect x={x + 172} y={y - 14} width="8" height="14" fill={INK} /></g>}
            {[0, 1].map((r) => <rect key={r} x={x + 40 + r * 90} y={y + 50} width="44" height="56" fill={(i + r) % 3 === 0 ? '#FFD58A' : '#14223A'} stroke={INK} strokeWidth="3" />)}
          </g>
        ))}
        <rect x="805" y="560" width="120" height="78" fill="#FFD58A" stroke={INK} strokeWidth="4" />
        <path d="M830 625 h70 l10 10 h-90z" fill={INK} /><rect x="840" y="590" width="50" height="34" fill="#2E4870" />
      </Layer>
      <Layer depth={0.7} progress={progress}>
        {[420, 470, 520].map((x, i) => <rect key={x} x={x} y={560 - i * 18} width="22" height={130 + i * 18} rx="4" fill="#8A6B4E" stroke={INK} strokeWidth="4" />)}
        <path d="M1050 470 v170" stroke={INK} strokeWidth="6" />
        <path className="flutter" d="M1053 474 q60 -10 120 8 q-55 18 -120 22z" fill="#E3A73A" stroke={INK} strokeWidth="3" />
      </Layer>
      <Layer depth={1} progress={progress} drift={90}>
        <Note progress={progress} at={0.27} x={760} y={300} rot={-8} />
        <Note progress={progress} at={0.31} x={830} y={330} rot={6} />
        <Note progress={progress} at={0.35} x={740} y={362} rot={-3} />
      </Layer>
    </SceneSvg>
  );
}
