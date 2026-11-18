'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Character from '../three/Character';
import Aura from '../three/Aura';
import { glowTexture } from '../three/toon';
import { damp } from '../three/rig';

function Stage({ look, mood, pose, aura, burst, clickAt }) {
  const who = useRef(), ring = useRef();
  const st = useRef({ turn: 0, hop: 0 });
  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05), s = st.current;
    s.turn = damp(s.turn, (look.current.x ?? 0) * 0.18, 4, dt);
    who.current.rotation.y = s.turn;
    // A little hop when clicked.
    const since = clickAt.current ? state.clock.elapsedTime - clickAt.current : 9;
    who.current.position.y = since < 0.45 ? Math.sin((since / 0.45) * Math.PI) * 0.18 : 0;
    ring.current.rotation.z += dt * 0.25;
    ring.current.material.opacity = aura === 'none' ? 0.35 : 0.8;
    ring.current.material.color.set(aura === 'lightning' ? '#A86BFF' : '#F0B544');
  });
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 4]} intensity={1.7} />
      <directionalLight position={[-3, 2.5, -3]} intensity={1.1} color="#7FD6CF" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}><circleGeometry args={[1.25, 48]} /><meshBasicMaterial color="#000" transparent opacity={0.45} /></mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}><ringGeometry args={[1.15, 1.2, 64, 1, 0, Math.PI * 1.6]} /><meshBasicMaterial transparent opacity={0.4} color="#F0B544" /></mesh>
      <sprite position={[0, 0.02, 0]} scale={[3.2, 0.7, 1]}><spriteMaterial map={glowTexture()} color="#F0B544" transparent opacity={0.18} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
      <group ref={who}>
        <Character pose={pose} mood={mood} look={look} />
        <Aura mode={aura} burst={burst} />
      </group>
    </>
  );
}

/**
 * The hero's live avatar. Head and eyes follow the cursor anywhere on the page;
 * hover charges a gold aura, click switches to lightning with a leaf swirl.
 */
export default function HeroStage3D({ mood, aura, pose, onHover, onPoke }) {
  const wrap = useRef(null);
  const look = useRef({ x: 0, y: 0 });
  const burst = useRef(0), clickAt = useRef(0), clock = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let touching = false;
    const move = (e) => {
      if (e.pointerType === 'touch') touching = true;
      const r = wrap.current.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height * 0.3;
      look.current.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      look.current.y = Math.max(-1, Math.min(1, -(e.clientY - cy) / (window.innerHeight / 2)));
    };
    // No cursor on phones: glance around gently instead.
    const idle = setInterval(() => { if (touching || matchMedia('(hover: none)').matches) { const t = Date.now() / 1000; look.current.x = Math.sin(t * 0.5) * 0.5; look.current.y = Math.sin(t * 0.37) * 0.2; } }, 50);
    window.addEventListener('pointermove', move, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current);
    return () => { window.removeEventListener('pointermove', move); clearInterval(idle); io.disconnect(); };
  }, []);

  const poke = () => { const t = clock.current?.elapsedTime ?? 0; burst.current = t; clickAt.current = t; onPoke?.(); };

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ fov: 30, position: [0, 1.25, 6.4] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ camera, clock: c }) => { camera.lookAt(0, 1.3, 0); clock.current = c; }}
      >
        <Stage look={look} mood={mood} pose={pose} aura={aura} burst={burst} clickAt={clickAt} />
      </Canvas>
      <button
        type="button"
        aria-label="Poke the avatar"
        onPointerEnter={() => onHover?.(true)}
        onPointerLeave={() => onHover?.(false)}
        onFocus={() => onHover?.(true)}
        onBlur={() => onHover?.(false)}
        onClick={poke}
        className="absolute left-1/2 top-[8%] bottom-[6%] w-[46%] -translate-x-1/2 rounded-[40%] cursor-pointer focus-visible:outline-offset-4"
      />
    </div>
  );
}
