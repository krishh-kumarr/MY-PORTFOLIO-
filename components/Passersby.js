/** Line-art people walking past in both directions. Pure CSS animation, no images. */
const PEOPLE = [
  { dir: 1, dur: 22, delay: -2, scale: 1, hair: 'short', bag: true },
  { dir: -1, dur: 26, delay: -9, scale: 0.92, hair: 'long' },
  { dir: 1, dur: 30, delay: -16, scale: 0.86, hair: 'bun', phone: true },
  { dir: -1, dur: 19, delay: -4, scale: 1.04, hair: 'cap' },
  { dir: 1, dur: 25, delay: -12, scale: 0.95, hair: 'long', bag: true },
  { dir: -1, dur: 28, delay: -20, scale: 0.9, hair: 'short', phone: true },
  { dir: 1, dur: 34, delay: -26, scale: 0.82, hair: 'cap' },
  { dir: -1, dur: 23, delay: -14, scale: 0.98, hair: 'bun' },
];

function Person({ hair, bag, phone }) {
  const s = { stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };
  return (
    <svg viewBox="0 0 80 200" className="h-full w-auto overflow-visible" aria-hidden="true">
      <g {...s}>
        <circle cx="40" cy="26" r="15" fill="var(--color-night)" />
        {hair === 'short' && <path d="M26 22 q14 -18 28 0" />}
        {hair === 'long' && <path d="M25 26 q0 -24 15 -16 q15 -8 15 16 v24 M25 26 v22" />}
        {hair === 'bun' && <><path d="M26 22 q14 -16 28 0" /><circle cx="40" cy="7" r="6" /></>}
        {hair === 'cap' && <path d="M24 20 h32 q-2 -14 -16 -14 q-14 0 -16 14 h-8" />}
        <path d="M40 41 v62" />
        <path d="M30 46 h20 l4 56 h-28z" fill="var(--color-night)" />
        <g className="pb-arm-a" style={{ transformOrigin: '40px 48px' }}><path d="M40 48 l-12 46" /></g>
        <g className="pb-arm-b" style={{ transformOrigin: '40px 48px' }}>{phone ? <path d="M40 48 l14 22 l-4 10 M52 76 l6 0" /> : <path d="M40 48 l12 46" />}</g>
        {bag && <path d="M30 50 l-6 30 h12" />}
        <g className="pb-leg-a" style={{ transformOrigin: '40px 102px' }}><path d="M40 102 l-10 88 l-8 2" /></g>
        <g className="pb-leg-b" style={{ transformOrigin: '40px 102px' }}><path d="M40 102 l10 88 l8 2" /></g>
      </g>
    </svg>
  );
}

export default function Passersby() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden text-fg/35">
      {PEOPLE.map((p, i) => (
        <div key={i} className="pb-walker absolute bottom-0 h-[78%]" style={{ '--dir': p.dir, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, height: `${78 * p.scale}%`, zIndex: p.scale > 0.95 ? 3 : 1 }}>
          <div className="pb-bob h-full" style={{ transform: `scaleX(${p.dir})` }}><Person {...p} /></div>
        </div>
      ))}
    </div>
  );
}
