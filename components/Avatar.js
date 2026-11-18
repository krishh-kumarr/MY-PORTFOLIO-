'use client';
import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { expressions } from '@/lib/data';

const SIZES = { confident: [640, 692], laughing: [640, 782], thoughtful: [640, 704], surprised: [640, 790], excited: [640, 828] };

/** Stack of expression images that crossfade; heads are aligned by the cut-out step. */
export function AvatarFace({ mood, sizes, priority = false, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {expressions.map((e) => {
        const [w, h] = SIZES[e];
        return (
          <Image
            key={e}
            src={`/avatar/${e}.webp`}
            alt=""
            width={w}
            height={h}
            sizes={sizes}
            priority={priority && e === 'confident'}
            className="absolute inset-x-0 bottom-0 w-full h-auto transition-opacity duration-300 ease-out"
            style={{ opacity: mood === e ? 1 : 0 }}
            draggable={false}
          />
        );
      })}
    </div>
  );
}

/** Tilts toward the pointer within a few degrees; floats gently. */
export function useTilt(max = 6) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sy = useSpring(ry, { stiffness: 120, damping: 14 });
  const onPointerMove = (ev) => {
    if (reduce || ev.pointerType === 'touch') return;
    const r = ev.currentTarget.getBoundingClientRect();
    const px = (ev.clientX - r.left) / r.width - 0.5, py = (ev.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2); rx.set(-py * max);
  };
  const onPointerLeave = () => { rx.set(0); ry.set(0); };
  return { style: { rotateX: sx, rotateY: sy }, onPointerMove, onPointerLeave, reduce };
}

export const MotionDiv = motion.div;
