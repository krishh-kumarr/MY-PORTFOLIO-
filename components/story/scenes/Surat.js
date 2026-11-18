'use client';
import { Layer, SceneSvg, INK } from './Layer';

const towers = [[60, 330], [190, 270], [300, 360], [430, 300], [560, 380], [700, 250], [820, 340], [960, 290], [1090, 370], [1220, 280], [1350, 350], [1480, 300], [1620, 330], [1760, 280]];

/** Dusk over Surat: skyline, the Tapi river with its bridge, and kites in the sky. */
export default function Surat({ progress }) {
  return (
    <SceneSvg defs={
      <linearGradient id="surat-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7FA7D9" /><stop offset=".55" stopColor="#F2B880" /><stop offset="1" stopColor="#F7D9A8" />
      </linearGradient>
    }>
      <rect width="1600" height="900" fill="url(#surat-sky)" />
      <circle cx="1180" cy="430" r="90" fill="#FFD58A" opacity=".9" />
      <Layer depth={0.15} progress={progress}>
        {towers.map(([x, h], i) => <rect key={i} x={x} y={560 - h} width="110" height={h} fill="#8C7FA8" opacity=".55" />)}
      </Layer>
      <Layer depth={0.35} progress={progress}>
        {towers.map(([x, h], i) => (
          <g key={i}>
            <rect x={x + 40} y={600 - h * 0.7} width="96" height={h * 0.7} fill="#5E5A7E" stroke={INK} strokeWidth="3" />
            {[0, 1, 2].map((r) => <rect key={r} x={x + 56 + (r % 2) * 36} y={620 - h * 0.7 + r * 46} width="18" height="22" fill="#FFD58A" opacity={(i + r) % 3 ? 0.9 : 0.25} />)}
          </g>
        ))}
      </Layer>
      <rect y="600" width="1600" height="300" fill="#4B7FA6" />
      <Layer depth={0.5} progress={progress}>
        <path d="M-100 640 H1900" stroke={INK} strokeWidth="10" />
        {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${-100 + i * 170} 640 q85 70 170 0`} fill="none" stroke={INK} strokeWidth="6" />)}
        {Array.from({ length: 13 }, (_, i) => <rect key={i} x={-104 + i * 170} y="600" width="8" height="40" fill={INK} />)}
      </Layer>
      <Layer depth={0.8} progress={progress}>
        {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M${(i * 137) % 1900 - 100} ${720 + (i % 4) * 38} h${60 + (i % 3) * 30}`} stroke="#A8DDF3" strokeWidth="4" strokeLinecap="round" opacity=".7" />)}
      </Layer>
      <Layer depth={1.2} progress={progress} drift={60}>
        {[[260, 170, '#E3A73A'], [520, 110, '#7FD6CF'], [1420, 150, '#F6FBFD']].map(([x, y, c], i) => (
          <g key={i} className="kite" style={{ animationDelay: `${i * 0.7}s` }}>
            <path d={`M${x} ${y - 40} L${x + 32} ${y} L${x} ${y + 44} L${x - 32} ${y}Z`} fill={c} stroke={INK} strokeWidth="3" />
            <path d={`M${x} ${y + 44} q-30 120 40 260`} fill="none" stroke={INK} strokeWidth="1.5" opacity=".6" />
          </g>
        ))}
      </Layer>
    </SceneSvg>
  );
}
