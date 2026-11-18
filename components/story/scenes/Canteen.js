'use client';
import { Layer, SceneSvg, INK } from './Layer';

/** The canteen where the crew came together, with their illustration framed on the wall. */
export default function Canteen({ progress }) {
  return (
    <SceneSvg>
      <rect width="1600" height="900" fill="#5B4636" />
      <Layer depth={0.15} progress={progress} drift={80}>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={60 + i * 420} y="140" width="300" height="250" rx="6" fill="#33507A" stroke={INK} strokeWidth="5" />
            <path d={`M${210 + i * 420} 140 V390 M${60 + i * 420} 265 H${360 + i * 420}`} stroke={INK} strokeWidth="4" />
            <circle cx={120 + i * 420} cy="190" r="4" fill="#FFD58A" /><circle cx={300 + i * 420} cy="230" r="3" fill="#FFD58A" />
          </g>
        ))}
      </Layer>
      {[260, 800, 1340].map((x) => (
        <g key={x}>
          <rect x={x - 110} y="40" width="220" height="16" rx="8" fill="#FFF3D6" stroke={INK} strokeWidth="3" />
          <path d={`M${x - 160} 56 L${x - 260} 420 H${x + 260} L${x + 160} 56Z`} fill="#FFE7A8" opacity=".12" />
        </g>
      ))}
      <Layer depth={0.3} progress={progress} drift={90}>
        <rect x="520" y="290" width="560" height="420" rx="10" fill="#8A6B4E" stroke={INK} strokeWidth="6" />
        <image href="/art/crew-selfie.webp" x="536" y="306" width="528" height="388" preserveAspectRatio="xMidYMid slice" />
      </Layer>
      <rect y="700" width="1600" height="200" fill="#3E3029" />
      <Layer depth={0.6} progress={progress}>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={-60 + i * 400} y="690" width="280" height="22" rx="6" fill="#C98E54" stroke={INK} strokeWidth="4" />
            <rect x={-40 + i * 400} y="712" width="14" height="110" fill={INK} /><rect x={180 + i * 400} y="712" width="14" height="110" fill={INK} />
          </g>
        ))}
      </Layer>
      <Layer depth={1} progress={progress}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <path d={`M${40 + i * 300} 760 h110 v-90 h-110z`} fill="#4CB860" stroke={INK} strokeWidth="5" />
            <rect x={40 + i * 300} y="760" width="110" height="20" fill="#3E9C50" stroke={INK} strokeWidth="5" />
            <path d={`M${52 + i * 300} 780 v110 M${138 + i * 300} 780 v110`} stroke={INK} strokeWidth="8" />
          </g>
        ))}
      </Layer>
    </SceneSvg>
  );
}
