'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { ELEMENTS } from './elements';

/**
 * Every skill as a physical tag. Grab, throw and stack them.
 * Tapping an element card (or a legend chip here) makes that element's tags leap and glow.
 * Physics is matter-js, loaded only when the sandbox scrolls into view.
 */
export default function SkillSandbox({ groups, focus, onFocus }) {
  const box = useRef(null);
  const tags = useRef([]);
  const api = useRef(null);
  const reduce = useReducedMotion();
  const seen = useInView(box, { once: true, margin: '0px 0px -20% 0px' });
  const [ready, setReady] = useState(false);
  const items = useMemo(() => groups.flatMap((g, gi) => g.items.map((name) => ({ name, gi }))), [groups]);

  useEffect(() => {
    if (!seen || reduce) return;
    let alive = true, raf = 0, cleanup = () => {};
    import('matter-js').then(({ default: M }) => {
      if (!alive || !box.current) return;
      const { Engine, Bodies, Body, Composite, Constraint, Vector } = M;
      const engine = Engine.create({ gravity: { y: 1 } });
      const el = box.current;
      let W = el.clientWidth, H = el.clientHeight;
      const T = 60;
      const walls = () => [
        Bodies.rectangle(W / 2, H + T / 2, W * 2, T, { isStatic: true }),
        Bodies.rectangle(-T / 2, H / 2, T, H * 4, { isStatic: true }),
        Bodies.rectangle(W + T / 2, H / 2, T, H * 4, { isStatic: true }),
      ];
      let wallSet = walls();
      Composite.add(engine.world, wallSet);

      const bodies = items.map((it, i) => {
        const node = tags.current[i];
        const w = node.offsetWidth, h = node.offsetHeight;
        const b = Bodies.rectangle(40 + Math.random() * (W - 80), -60 - i * 28, w, h, {
          chamfer: { radius: h / 2 - 1 }, restitution: 0.35, friction: 0.25, frictionAir: 0.012, density: 0.0016,
          angle: (Math.random() - 0.5) * 0.6,
        });
        b.plugin = { node, w, h, gi: it.gi };
        return b;
      });
      // stagger the drop
      bodies.forEach((b, i) => setTimeout(() => alive && Composite.add(engine.world, b), i * 70));

      // pointer drag via a soft constraint
      let drag = null;
      const local = (e) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
      const down = (e) => {
        const i = tags.current.indexOf(e.target.closest('[data-tag]'));
        if (i < 0) return;
        e.preventDefault();
        const b = bodies[i], p = local(e);
        const offset = Vector.rotate(Vector.sub(p, b.position), -b.angle);
        drag = Constraint.create({ pointA: p, bodyB: b, pointB: offset, stiffness: 0.12, damping: 0.08, length: 0 });
        Composite.add(engine.world, drag);
        el.setPointerCapture(e.pointerId);
        b.plugin.node.dataset.held = '1';
      };
      const move = (e) => { if (drag) drag.pointA = local(e); };
      const up = () => { if (!drag) return; delete drag.bodyB.plugin.node.dataset.held; Composite.remove(engine.world, drag); drag = null; };
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);

      const ro = new ResizeObserver(() => {
        W = el.clientWidth; H = el.clientHeight;
        Composite.remove(engine.world, wallSet); wallSet = walls(); Composite.add(engine.world, wallSet);
        bodies.forEach((b) => { if (b.position.x > W - 20) Body.setPosition(b, { x: W - 40, y: b.position.y }); });
      });
      ro.observe(el);

      let last = performance.now();
      const tick = (now) => {
        const dt = Math.min(32, now - last); last = now;
        Engine.update(engine, dt);
        for (const b of bodies) {
          const { node, w, h } = b.plugin;
          node.style.transform = `translate(${b.position.x - w / 2}px, ${b.position.y - h / 2}px) rotate(${b.angle}rad)`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      api.current = {
        summon(gi) {
          bodies.forEach((b) => {
            if (b.plugin.gi !== gi) return;
            Body.setVelocity(b, { x: (Math.random() - 0.5) * 8, y: -14 - Math.random() * 6 });
            Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.3);
          });
        },
        shake() {
          bodies.forEach((b) => Body.setVelocity(b, { x: (Math.random() - 0.5) * 22, y: -10 - Math.random() * 12 }));
        },
      };
      setReady(true);
      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect();
        el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        Engine.clear(engine); api.current = null;
      };
    });
    return () => { alive = false; cleanup(); };
  }, [seen, reduce, items]);

  useEffect(() => { if (focus != null) api.current?.summon(focus); }, [focus]);

  const still = reduce; // reduced motion: tags laid out as a static cloud

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display font-bold text-2xl mr-auto">The sandbox</h3>
        {ELEMENTS.map((el, i) => (
          <button key={el.kind} type="button" onClick={() => { onFocus(i); api.current?.summon(i); }}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors cursor-pointer"
            style={{ borderColor: focus === i ? el.c1 : 'var(--color-line)', color: focus === i ? el.c1 : undefined }}>
            <span className="size-2 rounded-full" style={{ background: el.c1 }} /> {el.name}
          </button>
        ))}
        <button type="button" onClick={() => api.current?.shake()} disabled={!ready}
          className="rounded-full bg-mustard px-4 py-1.5 text-sm font-bold cursor-pointer disabled:opacity-50">Shake it</button>
      </div>
      <p className="mt-2 text-muted">Grab a skill and throw it. Everything here is something I’ve shipped with.</p>

      <div ref={box} data-no-ripple
        className={`relative mt-5 h-[560px] sm:h-[340px] rounded-3xl brut brut-static bg-surface overflow-hidden grain-local select-none ${still ? 'p-6' : ''}`}
        style={{ backgroundImage: 'radial-gradient(color-mix(in srgb, var(--color-fg) 8%, transparent) 1px, transparent 1px)', backgroundSize: '22px 22px' }}>
        <ul className={still ? 'flex flex-wrap gap-2' : ''}>
          {items.map((it, i) => {
            const el = ELEMENTS[it.gi % ELEMENTS.length];
            const lit = focus === it.gi;
            return (
              <li key={it.name} ref={(n) => (tags.current[i] = n)} data-tag
                className={`${still ? '' : 'absolute left-0 top-0 will-change-transform touch-none cursor-grab active:cursor-grabbing'} inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm sm:text-base sm:px-4 sm:py-2 font-display font-semibold transition-[box-shadow,background-color,border-color] duration-500 data-[held]:scale-105`}
                style={{
                  transform: still ? undefined : 'translate(-999px,-999px)',
                  borderColor: lit ? el.c1 : `color-mix(in srgb, ${el.c1} 40%, var(--color-line))`,
                  background: lit ? `color-mix(in srgb, ${el.c1} 26%, var(--color-surface))` : 'var(--color-surface)',
                  boxShadow: lit ? `0 0 28px -4px ${el.c1}` : '0 6px 16px -10px rgb(0 0 0 / .6)',
                }}>
                <span className="text-xs" style={{ color: el.c1 }}>{el.glyph}</span>
                {it.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
