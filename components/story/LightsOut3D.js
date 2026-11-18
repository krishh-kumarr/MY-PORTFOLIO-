'use client';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import F1Car from '../three/F1Car';
import { toon, glowTexture } from '../three/toon';
const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
import { litCount, LIGHTS_OUT } from './lights';

const ACCEL = 11;          // units/s²
const LAMP_GAP = 7;
const LINES = 70;

function Track() {
  const kerb = useMemo(() => [new THREE.MeshBasicMaterial({ color: '#D94B3D' }), new THREE.MeshBasicMaterial({ color: '#F6FBFD' })], []);
  const kerbGeo = useMemo(() => new THREE.BoxGeometry(0.5, 0.05, 1.4), []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -90]}><planeGeometry args={[8, 220]} /><meshToonMaterial color="#232B36" /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -90]}><planeGeometry args={[120, 220]} /><meshToonMaterial color="#123222" /></mesh>
      {Array.from({ length: 70 }, (_, i) => [-1, 1].map((s) => <mesh key={`${i}${s}`} geometry={kerbGeo} material={kerb[i % 2]} position={[s * 4.2, 0.03, 6 - i * 2.8]} />))}
      {Array.from({ length: 60 }, (_, i) => <mesh key={`c${i}`} position={[0, 0.012, 6 - i * 3.6]}><boxGeometry args={[0.14, 0.01, 1.6]} /><meshBasicMaterial color="#F6FBFD" transparent opacity={0.55} /></mesh>)}
      {/* grid slot */}
      <mesh position={[0, 0.013, -2.4]}><boxGeometry args={[2.2, 0.01, 0.1]} /><meshBasicMaterial color="#F6FBFD" /></mesh>
      {/* pit wall and grandstand silhouettes */}
      <mesh position={[-6, 0.6, -90]}><boxGeometry args={[0.4, 1.2, 220]} /><meshToonMaterial color="#3A4656" /></mesh>
      {Array.from({ length: 10 }, (_, i) => <mesh key={`g${i}`} position={[-14, 2.5, 8 - i * 22]}><boxGeometry args={[6, 5, 18]} /><meshToonMaterial color="#1B2430" /></mesh>)}
    </group>
  );
}

function Lamps() {
  const tex = glowTexture();
  return Array.from({ length: 30 }, (_, i) => (
    <group key={i} position={[5.6, 0, 4 - i * LAMP_GAP]}>
      <mesh position={[0, 2.2, 0]}><cylinderGeometry args={[0.05, 0.07, 4.4, 6]} /><meshToonMaterial color="#4A5566" /></mesh>
      <sprite position={[-0.4, 4.4, 0]} scale={[1.6, 1.6, 1]}><spriteMaterial map={tex} color="#FFE7B0" transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
    </group>
  ));
}

function Gantry({ lights }) {
  return (
    <group position={[0, 0, -5]}>
      <mesh position={[0, 3.4, 0]}><boxGeometry args={[7, 0.32, 0.32]} /><meshToonMaterial color="#2E3B49" /></mesh>
      {[-3.4, 3.4].map((x) => <mesh key={x} position={[x, 1.7, 0]}><boxGeometry args={[0.22, 3.4, 0.22]} /><meshToonMaterial color="#2E3B49" /></mesh>)}
      {Array.from({ length: 5 }, (_, i) => (
        <group key={i} position={[-2 + i, 2.85, 0.1]}>
          <mesh><boxGeometry args={[0.72, 0.95, 0.22]} /><meshToonMaterial color="#10151C" /></mesh>
          {[0.2, -0.2].map((y) => <mesh key={y} position={[0, y, 0.12]} ref={(m) => { if (m) lights.current[i * 2 + (y > 0 ? 0 : 1)] = m; }}><circleGeometry args={[0.15, 18]} /><meshBasicMaterial color="#3A1E1E" /></mesh>)}
          <sprite position={[0, 0, 0.2]} scale={[1.6, 1.6, 1]} ref={(m) => { if (m) lights.current[10 + i] = m; }}><spriteMaterial map={glowTexture()} color="#FF2A1A" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
        </group>
      ))}
    </group>
  );
}

function Race({ progress }) {
  const { camera, clock, size } = useThree();
  const car = useRef(), wheels = useRef([]), lights = useRef([]), streaks = useRef(), smoke = useRef();
  const st = useRef({ launch: null, z: 0, v: 0, camZ: 6, fov: 48, shake: 0 });
  const streakData = useMemo(() => Array.from({ length: LINES }, () => [(Math.random() < 0.5 ? -1 : 1) * (4.6 + Math.random() * 6), 0.3 + Math.random() * 3.2, -Math.random() * 60]), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const streakMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#E8F2FF', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }), []);
  const smokeMat = useMemo(() => new THREE.SpriteMaterial({ map: glowTexture(), color: '#B9C3CF', transparent: true, opacity: 0, depthWrite: false }), []);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05), s = st.current, t = clock.elapsedTime;
    const p = progress.get();
    const n = litCount(p);
    for (let i = 0; i < 5; i++) {
      const on = i < n;
      lights.current[i * 2]?.material.color.set(on ? '#FF2A1A' : '#3A1E1E');
      lights.current[i * 2 + 1]?.material.color.set(on ? '#FF2A1A' : '#3A1E1E');
      if (lights.current[10 + i]) lights.current[10 + i].material.opacity = on ? 0.9 : 0;
    }
    // Lights out starts a timed launch; scrolling back before it resets the grid.
    if (p >= LIGHTS_OUT && s.launch === null) s.launch = t;
    if (p < LIGHTS_OUT - 0.02 && s.launch !== null) { s.launch = null; s.z = 0; s.v = 0; s.camZ = 6; }
    const tau = s.launch === null ? 0 : t - s.launch;
    const TOP = 42, tTop = TOP / ACCEL;
    s.v = s.launch === null ? 0 : Math.min(TOP, ACCEL * tau);
    s.z = -0.5 * ACCEL * Math.min(tau, tTop) ** 2 - Math.max(0, tau - tTop) * TOP;

    car.current.position.z = s.z;
    car.current.position.y = s.launch === null ? Math.sin(t * 55) * 0.004 : 0; // engine idle shiver
    car.current.rotation.x = s.launch !== null && tau < 0.6 ? -0.02 * Math.sin((tau / 0.6) * Math.PI) : 0; // squat on launch
    wheels.current.forEach((w) => { if (w) w.rotation.x -= (s.v * dt) / 0.33; });

    // Chase camera: lags behind as the car pulls away, FOV kicks out, a little shake.
    const portrait = size.width < size.height;
    const back = portrait ? 8.5 : 6;
    // Camera stays on the car's tail, dropping back a little more as speed builds.
    s.camZ = damp(s.camZ, s.z + back + Math.min(3.5, s.v * 0.09), 9, dt);
    s.fov = damp(s.fov, s.launch === null ? (portrait ? 58 : 46) : (portrait ? 70 : 64), 3, dt);
    s.shake = damp(s.shake, Math.min(1, s.v / 30), 4, dt);
    const sx = (Math.random() - 0.5) * 0.05 * s.shake, sy = (Math.random() - 0.5) * 0.03 * s.shake;
    const side = s.launch === null ? (portrait ? 1.2 : 3.2) : damp(camera.position.x, 0.6, 2, dt);
    camera.position.set(side + sx, (portrait ? 2.1 : 1.7) + sy, s.camZ);
    camera.fov = s.fov; camera.updateProjectionMatrix();
    camera.lookAt(0, 0.7, s.z - 6);

    // Speed streaks around the camera, only once moving.
    streakMat.opacity = damp(streakMat.opacity, s.v > 8 ? 0.55 : 0, 5, dt);
    streakData.forEach((d, i) => {
      if (d[2] > s.camZ + 2) d[2] -= 60;
      if (d[2] < s.camZ - 58) d[2] += 60;
      dummy.position.set(d[0], d[1], d[2]);
      dummy.scale.set(1, 1, 1 + s.v * 0.12);
      dummy.updateMatrix();
      streaks.current.setMatrixAt(i, dummy.matrix);
    });
    streaks.current.instanceMatrix.needsUpdate = true;

    // Tyre smoke at launch.
    const puff = s.launch !== null && tau < 1.4 ? tau / 1.4 : 1;
    smokeMat.opacity = s.launch !== null && tau < 1.4 ? 0.55 * (1 - puff) : 0;
    smoke.current.children.forEach((sp, i) => { sp.position.set((i % 2 ? 1 : -1) * (0.85 + puff * 0.6), 0.3 + puff * 0.6, 1.4 + puff * 2.2 + i * 0.1); sp.scale.setScalar(0.8 + puff * 2.4); });
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 10, 6]} intensity={1.5} />
      <directionalLight position={[-5, 4, 8]} intensity={0.8} color="#7FD6CF" />
      <Track />
      <Lamps />
      <Gantry lights={lights} />
      <F1Car ref={car} wheels={wheels} />
      <group ref={smoke}>{Array.from({ length: 6 }, (_, i) => <sprite key={i} material={smokeMat} />)}</group>
      <instancedMesh ref={streaks} args={[null, null, LINES]} material={streakMat}><boxGeometry args={[0.025, 0.025, 1.6]} /></instancedMesh>
    </>
  );
}

/** The one real 3D moment: five red lights, then the car launches. */
export default function LightsOut3D({ progress, onContextLost }) {
  const wrap = useRef(null);
  const visible = useRef(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ fov: 48, position: [3.2, 1.7, 6] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onContextLost?.(); })}
      >
        <color attach="background" args={['#0B1220']} />
        <fog attach="fog" args={['#0B1220', 18, 75]} />
        <Race progress={progress} />
      </Canvas>
    </div>
  );
}
