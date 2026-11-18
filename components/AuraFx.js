'use client';
import { useEffect, useState } from 'react';

const EMBERS = Array.from({ length: 22 }, (_, i) => ({ left: 8 + ((i * 37) % 84), delay: (i * 0.23) % 2.6, dur: 1.8 + (i % 5) * 0.35, size: 3 + (i % 3) * 2 }));
const LEAVES = Array.from({ length: 12 }, (_, i) => ({ a: i * 30, d: 0.03 * i }));

function bolt() {
  let x = 10 + Math.random() * 80, y = 100;
  const pts = [[x, y]];
  while (y > 5) { y -= 8 + Math.random() * 12; x += (Math.random() - 0.5) * 18; pts.push([x, y]); }
  return pts.map((p) => p.join(',')).join(' ');
}

/**
 * Energy around the avatar, all in CSS/SVG.
 * mode: 'none' | 'gold' (blazing glow, embers, orbiting dark orbs) | 'lightning' (violet glow, crackling bolts).
 * leafKey: change it to play a one-off leaf swirl.
 */
export default function AuraFx({ mode = 'none', leafKey = 0, compact = false }) {
  const [bolts, setBolts] = useState([]);
  useEffect(() => {
    if (mode !== 'lightning') return;
    const tick = () => setBolts([bolt(), bolt(), bolt(), bolt()]);
    tick();
    const t = setInterval(tick, 90);
    return () => clearInterval(t);
  }, [mode]);
  const on = mode !== 'none';
  const violet = mode === 'lightning';
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className={`absolute inset-[6%] rounded-full transition-opacity duration-500 aura-glow ${on ? 'opacity-100' : 'opacity-0'} ${violet ? 'aura-violet' : 'aura-gold'}`} />
      {!compact && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${mode === 'gold' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-[4%] aura-orbit [container-type:size]">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="aura-orb" style={{ transform: `rotate(${i * 60}deg) translateY(-46cqmin) rotate(${-i * 60}deg)` }} />
            ))}
          </div>
        </div>
      )}
      <div className={`absolute inset-0 overflow-hidden [container-type:size] transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`}>
        {EMBERS.slice(0, compact ? 10 : 22).map((e, i) => (
          <span key={i} className={`aura-ember ${violet ? 'bg-[#C9A2FF]' : 'bg-[#FFC65C]'}`} style={{ left: `${e.left}%`, width: e.size, height: e.size, animationDelay: `${e.delay}s`, animationDuration: `${e.dur}s` }} />
        ))}
      </div>
      {violet && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full aura-bolts">
          {bolts.map((p, i) => <polyline key={i} points={p} fill="none" stroke="#EBDDFF" strokeWidth="0.7" strokeLinejoin="round" />)}
        </svg>
      )}
      {leafKey > 0 && (
        <div key={leafKey} className="absolute inset-0">
          {LEAVES.map((l, i) => (
            <svg key={i} viewBox="0 0 20 20" className="aura-leaf" style={{ '--a': `${l.a}deg`, animationDelay: `${l.d}s` }}>
              <path d="M10 1 Q18 10 10 19 Q2 10 10 1Z" fill="#58C77A" stroke="#2F7A48" strokeWidth="1" />
            </svg>
          ))}
        </div>
      )}
    </div>
  );
}
