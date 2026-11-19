// The four "elements" of the toolkit, in the same order as `skills` in lib/data.
export const ELEMENTS = [
  { kind: 'fire', name: 'Fire', glyph: '△', c1: '#F0B544', c2: '#FF6A3D', line: 'The languages that spark everything.' },
  { kind: 'water', name: 'Water', glyph: '▽', c1: '#5FD0C6', c2: '#7FB8FF', line: 'Interfaces that flow, on phone and web.' },
  { kind: 'air', name: 'Air', glyph: '◇', c1: '#A86BFF', c2: '#E58BFF', line: 'Models and ideas, learned from the data.' },
  { kind: 'earth', name: 'Earth', glyph: '□', c1: '#7FB8FF', c2: '#9AA8BA', line: 'The solid ground: storage and tooling.' },
];

const W = 300, H = 128;

export function ElementArt({ kind, c1, c2 }) {
  if (kind === 'fire') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <g transform="translate(150 128)">
          <path className="el-flame" d="M0 0 C-40 -10 -38 -50 -14 -72 C-16 -50 2 -48 0 -90 C26 -66 44 -34 30 -8 C24 0 10 2 0 0Z" fill={c2} opacity=".55" />
          <path className="el-flame d2" d="M0 0 C-26 -6 -26 -36 -8 -52 C-6 -36 8 -38 6 -64 C22 -44 30 -24 20 -6 C14 0 6 1 0 0Z" fill={c1} opacity=".85" />
          <path className="el-flame d3" d="M0 0 C-12 -4 -12 -20 -2 -30 C0 -20 8 -22 6 -34 C14 -22 14 -10 10 -3 C6 0 3 0 0 0Z" fill="#FFF1C9" />
        </g>
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <circle key={k} className="el-spark" cx={110 + k * 16} cy={110} r={1.6} fill={c1} style={{ animationDelay: `${k * 0.42}s` }} />
        ))}
      </svg>
    );
  }
  if (kind === 'water') {
    const wave = (y, amp) => {
      let d = `M0 ${y}`;
      for (let x = 0; x <= W * 2; x += 50) d += ` Q${x + 25} ${y - amp} ${x + 50} ${y} T${x + 100} ${y}`;
      return d + ` V${H} H0Z`;
    };
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <g className="el-wave d2"><path d={wave(78, 10)} fill={c2} opacity=".25" /></g>
        <g className="el-wave"><path d={wave(92, 8)} fill={c1} opacity=".4" /></g>
        <circle className="el-spark" cx="90" cy="110" r="2.5" fill="none" stroke={c1} />
        <circle className="el-spark" cx="210" cy="115" r="3.5" fill="none" stroke={c1} style={{ animationDelay: '1.2s' }} />
      </svg>
    );
  }
  if (kind === 'air') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g className="el-swirl" style={{ transformOrigin: '150px 70px' }}>
          <path d="M150 70 m-46 0 a46 46 0 1 1 46 46 a32 32 0 1 1 -32 -32 a18 18 0 1 1 18 18" fill="none" stroke={c1} strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
        </g>
        <g className="el-swirl d2" style={{ transformOrigin: '150px 70px' }}>
          <path d="M150 70 m60 0 a60 60 0 0 1 -60 60" fill="none" stroke={c2} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 6" />
          <path d="M150 70 m-60 0 a60 60 0 0 1 60 -60" fill="none" stroke={c2} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 6" />
        </g>
        {[[60, 40], [240, 50], [80, 100], [230, 105]].map(([x, y], k) => (
          <path key={k} className="el-float" d={`M${x} ${y} q12 -8 24 0 t24 0`} fill="none" stroke={c1} strokeWidth="1.2" strokeLinecap="round" opacity=".5" style={{ animationDelay: `${k * 0.7}s` }} />
        ))}
      </svg>
    );
  }
  // earth
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <path d={`M0 96 L60 88 L120 94 L190 84 L250 92 L300 86 V${H} H0Z`} fill={c2} opacity=".2" />
      <path d={`M0 108 L70 102 L140 108 L210 100 L300 106 V${H} H0Z`} fill={c1} opacity=".3" />
      <path d={`M0 118 L80 114 L160 119 L240 113 L300 117 V${H} H0Z`} fill={c1} opacity=".45" />
      {[[110, 52, 14], [160, 40, 20], [205, 58, 11]].map(([x, y, s], k) => (
        <g key={k} className="el-float" style={{ animationDelay: `${k * 0.9}s` }}>
          <path d={`M${x} ${y} l${s} ${-s * 0.4} l${s * 0.6} ${s} l${-s} ${s * 0.6}z`} fill={k === 1 ? c1 : c2} opacity={k === 1 ? 0.8 : 0.5} />
        </g>
      ))}
    </svg>
  );
}
