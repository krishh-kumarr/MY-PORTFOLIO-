'use client';
import { useReducer, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Character from '../three/Character';
import Aura from '../three/Aura';
import { damp, poseForTravel, storyFrame } from '../three/rig';
import { useAvatar } from '../AvatarProvider';

const STRIDE = 1.35; // world units per full gait cycle, so feet don't slide

function Traveller({ chapters, root }) {
  const { mood } = useAvatar();
  const who = useRef(), stride = useRef(0), look = useRef({ x: 0, y: 0 });
  const st = useRef({ x: -2, prevX: null, speed: 0, face: 1, y: 0, show: 0, pose: 'idle', ninja: false, aura: 'none', t: 0 });

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05), s = st.current;
    s.t += dt;
    const els = [...root.current.querySelectorAll('[data-chapter]')];
    const fr = storyFrame(els.map((e) => { const r = e.getBoundingClientRect(); return { top: r.top, height: r.height }; }), window.innerHeight);
    const ch = fr && chapters[fr.index];
    const halfW = Math.tan((15 * Math.PI) / 180) * 9 * state.viewport.aspect;
    const phone = state.size.width < 1024;

    // Chapter 5 is the 3D race; the character returns for the final tower shot.
    let visible = !!ch && fr.progress > 0.02 && fr.progress < 0.995;
    if (ch?.travel === 'drive') visible = visible && fr.progress > 0.74;
    s.show = damp(s.show, visible ? 1 : 0, 8, dt);
    who.current.visible = s.show > 0.02;
    who.current.scale.setScalar((phone ? 0.62 : 0.85) * (0.6 + 0.4 * s.show));
    if (!ch) return;

    const from = phone ? -0.6 : -0.85, to = phone ? 0.5 : -0.35;
    const p = ch.travel === 'drive' ? Math.min(1, (fr.progress - 0.74) / 0.12) : fr.progress;
    const targetX = (from + (to - from) * p) * halfW;
    if (s.prevX === null) { s.prevX = targetX; s.x = targetX; }
    s.x = damp(s.x, targetX, 6, dt);
    const dx = s.x - s.prevX; s.prevX = s.x;
    stride.current += (Math.abs(dx) / STRIDE) * Math.PI * 2;
    s.speed = damp(s.speed, Math.abs(dx) / dt, 6, dt);

    const ninja = ch.id === 'grind';
    const moving = s.speed > 0.15;
    s.pose = moving ? (ninja ? 'ninja' : poseForTravel(ch.travel === 'drive' ? 'walk' : ch.travel)) : 'idle';
    if (dx !== 0) s.face = Math.sign(dx);
    const facing = moving ? s.face * 1.15 : 0.35;
    who.current.rotation.y = damp(who.current.rotation.y, facing, 8, dt);
    // Rooftop leaps while ninja-running.
    s.y = damp(s.y, ninja && moving ? Math.max(0, Math.sin(stride.current * 0.5)) * 0.45 : 0, 12, dt);
    who.current.position.set(s.x, s.y, 0);
    s.ninja = ninja;
    s.aura = mood === 'excited' ? 'gold' : 'none';
  });

  return (
    <group ref={who}>
      <CharacterBridge st={st} stride={stride} look={look} mood={mood} />
    </group>
  );
}

/** Re-reads pose/headband/aura from the frame state without re-rendering the canvas tree each frame. */
function CharacterBridge({ st, stride, look, mood }) {
  const ref = useRef({ pose: 'idle', ninja: false, aura: 'none' });
  const [, force] = useReducerTick();
  useFrame(() => {
    const s = st.current, r = ref.current;
    if (s.pose !== r.pose || s.ninja !== r.ninja || s.aura !== r.aura) { r.pose = s.pose; r.ninja = s.ninja; r.aura = s.aura; force(); }
  });
  const r = ref.current;
  return (
    <>
      <Character pose={r.pose} mood={mood} look={look} stride={stride} headband={r.ninja} />
      <Aura mode={r.aura} />
    </>
  );
}

const useReducerTick = () => useReducer((x) => x + 1, 0);

/** One transparent canvas over the whole story, pinned to the viewport, carrying the travelling 3D avatar. */
export default function StoryCharacter({ chapters, root }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      <div className="sticky top-0 h-dvh">
        <Canvas dpr={[1, 1.5]} camera={{ fov: 30, position: [0, 1.9, 9] }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} onCreated={({ camera }) => camera.lookAt(0, 1.9, 0)}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 5, 5]} intensity={1.6} />
          <directionalLight position={[-4, 3, -3]} intensity={0.9} color="#7FD6CF" />
          <Traveller chapters={chapters} root={root} />
        </Canvas>
      </div>
    </div>
  );
}
