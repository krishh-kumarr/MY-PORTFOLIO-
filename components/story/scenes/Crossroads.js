'use client';
import { Layer, SceneSvg, INK } from './Layer';

const signs = [['Web?', -22, 330], ['ML?', 16, 395], ['iOS?', -8, 460], ['Data?', 24, 525], ['Which way?', -14, 590]];

/** First year: a misty campus crossroads with signposts pointing everywhere. */
export default function Crossroads({ progress }) {
  return (
    <SceneSvg defs={
      <linearGradient id="cross-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3A4A64" /><stop offset="1" stopColor="#8C9DB4" />
      </linearGradient>
    }>
      <rect width="1600" height="900" fill="url(#cross-sky)" />
      <Layer depth={0.2} progress={progress}>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} opacity=".55">
            <rect x={80 + i * 360} y={330 - (i % 2) * 60} width="240" height={300 + (i % 2) * 60} fill="#53647E" />
            {Array.from({ length: 4 }, (_, r) => <rect key={r} x={100 + i * 360} y={360 - (i % 2) * 60 + r * 62} width="200" height="26" fill="#6A7C96" />)}
          </g>
        ))}
      </Layer>
      <rect y="640" width="1600" height="260" fill="#4E5E4A" />
      <path d="M560 900 L760 640 H840 L1040 900Z" fill="#7D776C" />
      <path d="M0 760 Q800 660 1600 760 V820 Q800 720 0 820Z" fill="#7D776C" />
      <Layer depth={0.45} progress={progress} drift={80}>
        <rect x="788" y="300" width="24" height="380" fill="#8A6B4E" stroke={INK} strokeWidth="4" />
        {signs.map(([label, rot, y], i) => {
          const left = i % 2 === 0;
          return (
            <g key={label} transform={`rotate(${rot} 800 ${y})`}>
              <path d={left ? `M800 ${y - 26} H610 l-30 26 30 26 H800Z` : `M800 ${y - 26} H990 l30 26 -30 26 H800Z`} fill="#F6FBFD" stroke={INK} strokeWidth="4" />
              <text x={left ? 700 : 900} y={y + 9} textAnchor="middle" fontSize="28" fontWeight="700" fontFamily="var(--font-bricolage), sans-serif" fill={INK}>{label}</text>
            </g>
          );
        })}
      </Layer>
      <Layer depth={0.9} progress={progress} drift={220}>
        {[0, 1, 2].map((i) => <ellipse key={i} className="fog" style={{ animationDelay: `${i * 2}s` }} cx={300 + i * 600} cy={700 + i * 30} rx="520" ry="70" fill="#C9D3E0" opacity=".35" />)}
      </Layer>
      <Layer depth={1.3} progress={progress} drift={60}>
        {[[220, 230], [1330, 190], [1460, 420], [140, 470]].map(([x, y], i) => (
          <text key={i} className="float-q" style={{ animationDelay: `${i * 0.8}s` }} x={x} y={y} fontSize="84" fontWeight="800" fontFamily="var(--font-bricolage), sans-serif" fill="#F6FBFD" opacity=".14">?</text>
        ))}
      </Layer>
    </SceneSvg>
  );
}
