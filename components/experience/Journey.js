'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import BezierPath from './BezierPath';
import { accentOf } from './shared';

// A small hand-drawn arrow pointing toward the route.
function Arrow({ flip, color, delay }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 60 30" className={`w-12 h-6 shrink-0 mt-1 ${flip ? '-scale-x-100' : ''}`} aria-hidden="true">
      <motion.path d="M56 6 C40 2, 22 26, 6 20" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 3"
        initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay, duration: 0.6 }} />
      <motion.path d="M12 14 L6 20 L14 23" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: delay + 0.5 }} />
    </svg>
  );
}

function Stop({ job, i, anchorRef }) {
  const reduce = useReducedMotion();
  const accent = accentOf(job);
  const right = i % 2 === 1; // zig-zag
  const num = String(i + 1).padStart(2, '0');
  const fade = (d = 0) => (reduce ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-15% 0px' }, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } });

  const main = (
    <div className={`md:col-span-5 ${right ? 'md:col-start-8 md:text-right' : ''}`}>
      <motion.p {...fade()} className="text-base font-semibold uppercase tracking-[0.2em] text-muted">Stop {num} · {job.place}</motion.p>
      {/* Giant numeral: outline, then fills bottom-up */}
      <div className="relative inline-block leading-[0.8] mt-2 select-none" aria-hidden="true">
        <span className="font-display font-extrabold text-[7rem] sm:text-[10rem] tracking-tighter text-transparent" style={{ WebkitTextStroke: `1.5px ${accent}` }}>{num}</span>
        <motion.span className="absolute inset-0 font-display font-extrabold text-[7rem] sm:text-[10rem] tracking-tighter" style={{ color: accent }}
          initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }} whileInView={{ clipPath: 'inset(0% 0 0 0)' }} viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}>{num}</motion.span>
      </div>
      <motion.h3 {...fade(0.1)} className="mt-4 font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-[0.95]">{job.company}</motion.h3>
      <motion.p {...fade(0.15)} className="mt-3 text-xl sm:text-2xl">
        <span className="font-semibold" style={{ color: accent }}>{job.role}</span>
        <span className="text-muted"> · {job.when}</span>
      </motion.p>
      <motion.p {...fade(0.2)} className={`mt-4 text-xl text-fg/85 max-w-md ${right ? 'md:ml-auto' : ''}`}>{job.summary}</motion.p>
    </div>
  );

  const notes = (
    <ul className={`md:col-span-5 mt-8 md:mt-20 space-y-5 ${right ? 'md:col-start-1 md:row-start-1' : 'md:col-start-8'} relative z-10`}>
      {job.points.map((p, k) => (
        <motion.li key={p} {...fade(0.3 + k * 0.15)} className={`flex items-start gap-2 ${right ? 'md:flex-row-reverse md:text-right' : ''}`}>
          <Arrow flip={right} color={accent} delay={0.4 + k * 0.15} />
          <span className="text-xl leading-relaxed text-fg">{p}</span>
        </motion.li>
      ))}
    </ul>
  );

  return (
    <li ref={anchorRef} className="relative grid md:grid-cols-12 gap-x-6 py-16 md:py-28">
      {main}
      {notes}
      {/* where the route passes through this stop */}
          </li>
  );
}

export default function Journey({ stops }) {
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const anchors = useRef([]);
  const [geo, setGeo] = useState(null);

  useLayoutEffect(() => {
    const measure = () => {
      const box = wrap.current?.getBoundingClientRect();
      if (!box) return;
      const W = box.width, H = box.height;
      const rows = anchors.current.map((el) => el?.getBoundingClientRect());
      if (rows.some((r) => !r)) return;
      const cx = W * 0.5;
      // Pen-tool path: anchors with smooth (collinear) handles, swinging gently through the centre gutter.
      const stopsA = rows.map((r, i) => ({ x: cx + (i % 2 ? -1 : 1) * W * 0.035, y: r.top - box.top + r.height / 2, stop: i }));
      const nodes = [{ x: cx - W * 0.03, y: 0 }, ...stopsA, { x: cx + W * 0.02, y: H }];
      nodes.forEach((n, i) => {
        const prev = nodes[i - 1], next = nodes[i + 1];
        const dyIn = prev ? n.y - prev.y : 0, dyOut = next ? next.y - n.y : 0;
        const lean = (i % 2 ? -1 : 1) * W * 0.07; // handles tilt sideways for the S-curve
        const len = Math.hypot(lean, 1);
        const ux = (lean / Math.max(len, 1e-6)) * 0.32, uy = 0.75;
        n.hin = prev ? [n.x - ux * dyIn * 0.45, n.y - uy * dyIn * 0.45] : null;
        n.hout = next ? [n.x + ux * dyOut * 0.45, n.y + uy * dyOut * 0.45] : null;
      });
      let d = `M${nodes[0].x} ${nodes[0].y}`;
      for (let i = 0; i < nodes.length - 1; i++) {
        const A = nodes[i], B = nodes[i + 1];
        d += ` C${A.hout[0]} ${A.hout[1]} ${B.hin[0]} ${B.hin[1]} ${B.x} ${B.y}`;
      }
      setGeo({ W, H, d, nodes, a: stopsA.map((n) => [n.x, n.y]) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrap} className="relative">
      {geo && <BezierPath geo={geo} stops={stops} wrap={wrap} reduce={reduce} />}
      <ol className="relative">
        {stops.map((job, i) => <Stop key={job.company} job={job} i={i} anchorRef={(el) => (anchors.current[i] = el)} />)}
      </ol>
    </div>
  );
}
