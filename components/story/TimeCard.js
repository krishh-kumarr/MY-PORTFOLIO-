'use client';
import { motion } from 'motion/react';

const shapes = {
  kites: (c) => <path d="M0 -16 L12 0 L0 18 L-12 0Z" fill={c} />,
  arrows: (c) => <path d="M-14 -6 H4 V-14 L16 0 L4 14 V6 H-14Z" fill={c} />,
  stars: (c) => <path d="M0 -16 L4.7 -5 16 -5 7 2 10 14 0 7 -10 14 -7 2 -16 -5 -4.7 -5Z" fill={c} />,
  moons: (c) => <path d="M6 -14 A14 14 0 1 0 6 14 A10 10 0 1 1 6 -14Z" fill={c} />,
  flags: (c) => <g fill={c}><rect x="-14" y="-14" width="10" height="10" /><rect x="4" y="-14" width="10" height="10" /><rect x="-4" y="-4" width="10" height="10" /><rect x="-14" y="6" width="10" height="10" /><rect x="4" y="6" width="10" height="10" /></g>,
};

/** A bold scene card between chapters: patterned backdrop, chunky wobbling text, zooms through. */
export default function TimeCard({ card }) {
  const words = card.text.split(' ');
  return (
    <motion.div
      className="absolute inset-0 grid place-items-center overflow-hidden"
      style={{ background: card.bg }}
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ scale: 1.6, opacity: 0, rotate: 4 }}
      transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
    >
      <motion.svg aria-hidden="true" className="absolute inset-[-10%] w-[120%] h-[120%]" animate={{ x: [0, -40], y: [0, -24] }} transition={{ duration: 3, ease: 'linear' }}>
        <defs>
          <pattern id={`tc-${card.motif}`} width="90" height="90" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
            <rect width="90" height="90" fill="none" />
            <g transform="translate(22 22)" opacity=".28">{shapes[card.motif](card.fg)}</g>
            <g transform="translate(67 67) rotate(30)" opacity=".18">{shapes[card.motif](card.fg)}</g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#tc-${card.motif})`} />
      </motion.svg>
      <h3 aria-label={card.text} className="relative px-6 text-center font-display font-extrabold leading-[0.9] tracking-tight text-[clamp(3.4rem,15vw,9rem)] -rotate-3" style={{ color: card.fg, textShadow: `5px 6px 0 ${card.bg === '#F0B544' ? '#9A5A10' : 'rgba(0,0,0,.35)'}` }}>
        {words.map((w, i) => (
          <motion.span key={i} className="inline-block mx-[0.12em]"
            initial={{ y: 60, opacity: 0, rotate: i % 2 ? 8 : -8 }}
            animate={{ y: [60, -10, 0], opacity: 1, rotate: [i % 2 ? 8 : -8, i % 2 ? -3 : 3, 0] }}
            transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: 'easeOut' }}>
            {w}
          </motion.span>
        )).flatMap((el, i) => (i ? [' ', el] : [el]))}
      </h3>
    </motion.div>
  );
}
