'use client';
import { useEffect, useRef } from 'react';

/**
 * Site-wide backdrop: a quiet halftone dot field.
 * Idle, it breathes with a very slow wave. Near the cursor the dots swell and part like a lens on water,
 * picking up a little warmth. Monochrome otherwise, so it never competes with content.
 */
const GAP = 26;

export default function Ambient() {
  const canvas = useRef(null);
  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext?.('2d');
    if (!ctx) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0, last = 0;
    const m = { x: -9999, y: -9999, tx: -9999, ty: -9999, a: 0, ta: 0 };

    const resize = () => {
      W = innerWidth; H = innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (t) => {
      const light = document.documentElement.dataset.theme === 'light';
      const base = light ? '17,24,39' : '234,240,247';
      ctx.clearRect(0, 0, W, H);
      const R = 190;
      for (let y = GAP / 2; y < H + GAP; y += GAP) {
        for (let x = GAP / 2; x < W + GAP; x += GAP) {
          // slow breathing wave across the page
          const wave = Math.sin(x * 0.006 + y * 0.004 + t * 0.0004) * 0.5 + 0.5;
          let px = x, py = y, r = 0.7 + wave * 0.5, alpha = 0.07 + wave * 0.05, warm = 0;
          const dx = x - m.x, dy = y - m.y, d = Math.hypot(dx, dy);
          if (d < R && m.a > 0.01) {
            const k = (1 - d / R) ** 2 * m.a;
            const push = Math.sin((d / R) * Math.PI) * 14 * m.a;
            px += (dx / (d || 1)) * push; py += (dy / (d || 1)) * push;
            r += k * 2.6; alpha += k * 0.5; warm = k;
          }
          ctx.fillStyle = warm > 0.02 ? `rgba(240,181,68,${Math.min(0.9, alpha)})` : `rgba(${base},${alpha})`;
          ctx.beginPath(); ctx.arc(px, py, r, 0, 6.283); ctx.fill();
        }
      }
    };
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      m.x += (m.tx - m.x) * 0.14; m.y += (m.ty - m.y) * 0.14; m.a += (m.ta - m.a) * 0.08;
      if (now - last < 33) return;
      last = now; draw(now);
    };
    const move = (e) => { m.tx = e.clientX; m.ty = e.clientY; m.ta = 1; if (m.x < -9000) { m.x = m.tx; m.y = m.ty; } };
    const out = () => { m.ta = 0; };
    const onResize = () => { resize(); draw(performance.now()); };
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) raf = requestAnimationFrame(loop); };
    const themeObs = new MutationObserver(() => draw(performance.now()));
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    resize(); draw(0);
    if (!reduce) { raf = requestAnimationFrame(loop); addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerleave', out); }
    addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', vis);
    return () => {
      cancelAnimationFrame(raf); themeObs.disconnect();
      removeEventListener('pointermove', move); document.removeEventListener('pointerleave', out);
      removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', vis);
    };
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvas} className="h-full w-full" />
    </div>
  );
}
