'use client';
import { motion, useTransform } from 'motion/react';
import { AvatarFace } from '../Avatar';

/** Original side-view race car with Krish's number. */
export function Car({ className = '' }) {
  return (
    <svg viewBox="0 0 320 110" className={className} aria-hidden="true">
      <path d="M8 70h40l30-22h120l36 14h70v18H8z" fill="#E3A73A" stroke="#15212B" strokeWidth="4" strokeLinejoin="round" />
      <path d="M2 58h30v12H2zM286 50h30v26h-30z" fill="#15212B" />
      <rect x="120" y="54" width="44" height="22" rx="4" fill="#F6FBFD" stroke="#15212B" strokeWidth="3" />
      <text x="142" y="71" textAnchor="middle" fontFamily="var(--font-bricolage), sans-serif" fontWeight="800" fontSize="18" fill="#15212B">27</text>
      {[64, 258].map((cx) => (
        <g key={cx} className="wheel" style={{ transformOrigin: `${cx}px 84px` }}>
          <circle cx={cx} cy="84" r="22" fill="#15212B" />
          <circle cx={cx} cy="84" r="9" fill="#A8DDF3" />
          <path d={`M${cx - 18} 84h36M${cx} 66v36`} stroke="#475866" strokeWidth="3" />
        </g>
      ))}
    </svg>
  );
}

/** The avatar travelling across a chapter: walking, running or driving. */
export default function Traveler({ travel = 'walk', progress, mood = 'confident' }) {
  const left = useTransform(progress, [0, 1], ['4%', '46%']);
  if (travel === 'drive') {
    return (
      <motion.div style={{ left }} className="absolute bottom-[9dvh] w-[min(62vw,420px)] travel-drive" aria-hidden="true">
        <div className="absolute left-[34%] -top-[58%] w-[34%]">
          <AvatarFace mood={mood} sizes="160px" className="aspect-[640/700]" />
        </div>
        <Car className="relative w-full h-auto" />
      </motion.div>
    );
  }
  return (
    <motion.div style={{ left }} className={`absolute -bottom-[3dvh] w-[min(52vw,320px)] travel-${travel}`} aria-hidden="true">
      <div className="traveler-body">
        <AvatarFace mood={mood} sizes="(min-width: 1024px) 300px, 46vw" className="aspect-[640/700]" />
      </div>
      
    </motion.div>
  );
}
