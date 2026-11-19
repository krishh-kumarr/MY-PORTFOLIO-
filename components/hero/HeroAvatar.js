'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import KrishMascot from '../KrishMascot';
import AuraFx from '../AuraFx';

/**
 * Krish's own avatar art in a 3D-tilting card: it turns toward the cursor anywhere on the page,
 * breathes, swaps expressions, and powers up on hover (gold) and click (lightning + leaves).
 */
export default function HeroAvatar({ mood, aura, leafKey, hop, onHover, onPoke }) {
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const [size, setSize] = useState(360);
  useEffect(() => {
    const el = wrap.current;
    const fit = () => setSize(Math.round(Math.min(el.clientWidth * 0.86, el.clientHeight * 0.85, 480)));
    fit();
    const ro = new ResizeObserver(fit); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, (v) => v * -9), { stiffness: 90, damping: 14 });
  const ry = useSpring(useTransform(mx, (v) => v * 13), { stiffness: 90, damping: 14 });
  const px = useSpring(useTransform(mx, (v) => v * 14), { stiffness: 70, damping: 16 });
  const py = useSpring(useTransform(my, (v) => v * 10), { stiffness: 70, damping: 16 });
  const bx = useTransform(px, (v) => -v * 0.6), by = useTransform(py, (v) => -v * 0.6);

  useEffect(() => {
    if (reduce) return;
    const move = (e) => {
      const r = wrap.current.getBoundingClientRect();
      mx.set(Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2))));
    };
    // Phones have no cursor: drift gently instead.
    let raf;
    const drift = () => { const t = performance.now() / 1000; mx.set(Math.sin(t * 0.6) * 0.45); my.set(Math.sin(t * 0.43) * 0.25); raf = requestAnimationFrame(drift); };
    if (matchMedia('(hover: none)').matches) drift(); else window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, [reduce, mx, my]);

  return (
    <div ref={wrap} className="absolute inset-0" style={{ perspective: 1100 }}>
      <motion.div style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="absolute inset-0">
        {/* back layer: card and pattern */}
        <motion.div style={reduce ? undefined : { x: bx, y: by, translateZ: -40 }} className="absolute inset-[7%] rounded-[44px] hero-card border border-line overflow-hidden">
          <div className="absolute inset-0 hero-card-pattern" />
        </motion.div>
        <div className="absolute inset-0" style={{ transform: 'translateZ(10px)' }}><AuraFx mode={aura} leafKey={leafKey} /></div>
        {/* front layer: the avatar */}
        <motion.div
          onPointerEnter={() => onHover(true)}
          onPointerLeave={() => onHover(false)}
          onFocus={() => onHover(true)}
          onBlur={() => onHover(false)}
          onClick={onPoke}
          animate={hop ? { y: [0, -26, 0] } : { y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={reduce ? undefined : { x: px, y: py, translateZ: 60 }}
          className="absolute inset-x-[6%] bottom-[7%] top-[8%] grid place-items-end justify-center"
        >
          <div className="hero-breathe drop-shadow-[0_24px_30px_rgba(0,0,0,.55)]">
            <KrishMascot size={size} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
