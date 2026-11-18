'use client';
import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import LightsOut2D from './LightsOut2D';
import { canRun3D, readEnv } from '@/lib/capability';

class Fallback extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const load3D = () => import('./LightsOut3D');

/**
 * Lights-out stage. Shows the 2D version first; swaps in the 3D scene only when the
 * chapter is near and the device can handle it. Any 3D failure falls back to 2D.
 */
export default function LightsOut({ progress, env = readEnv, load = load3D }) {
  const ref = useRef(null);
  const [Scene3D, setScene3D] = useState(null);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (canRun3D(env())) setScene3D(() => lazy(load));
    }, { rootMargin: '100% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [env, load]);

  const flat = <LightsOut2D progress={progress} />;
  return (
    <div ref={ref} className="absolute inset-0">
      {Scene3D && !lost ? (
        <Fallback fallback={flat}>
          <Suspense fallback={flat}><Scene3D progress={progress} onContextLost={() => setLost(true)} /></Suspense>
        </Fallback>
      ) : flat}
    </div>
  );
}
