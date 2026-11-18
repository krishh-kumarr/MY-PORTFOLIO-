'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { glowTexture } from './toon';
import { damp } from './rig';

const GOLD = new THREE.Color('#FFB43A');
const VIOLET = new THREE.Color('#A86BFF');
const N = 90;

function jaggedBolt(rand) {
  const pts = [];
  const a = rand() * Math.PI * 2, r = 0.45 + rand() * 0.25;
  let x = Math.cos(a) * r, z = Math.sin(a) * r * 0.6, y = 0.2 + rand() * 0.6;
  for (let i = 0; i < 7; i++) { pts.push(new THREE.Vector3(x, y, z)); x += (rand() - 0.5) * 0.25; z += (rand() - 0.5) * 0.15; y += 0.14 + rand() * 0.12; }
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.1);
}

/**
 * Energy around the character. mode: 'none' | 'gold' (blazing aura, embers, orbiting dark orbs)
 * | 'lightning' (violet aura, crackling bolts). burst: ref holding a timestamp; a leaf swirl plays after it.
 */
export default function Aura({ mode = 'none', burst }) {
  const tex = glowTexture();
  const glow = useRef(), orbs = useRef(), embers = useRef(), bolts = useRef(), leaves = useRef();
  const st = useRef({ gold: 0, violet: 0, t: 0, nextBolt: 0 });
  const seeds = useMemo(() => Array.from({ length: N }, () => [Math.random() * Math.PI * 2, 0.35 + Math.random() * 0.55, Math.random() * 2.2, 0.4 + Math.random() * 0.8]), []);
  const emberGeo = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3)); return g; }, []);
  const emberMat = useMemo(() => new THREE.PointsMaterial({ size: 0.045, map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: GOLD }), [tex]);
  const boltMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#E6D4FF', transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }), []);
  const leafGeo = useMemo(() => { const s = new THREE.Shape(); s.moveTo(0, -0.07); s.quadraticCurveTo(0.05, 0, 0, 0.07); s.quadraticCurveTo(-0.05, 0, 0, -0.07); return new THREE.ShapeGeometry(s); }, []);
  const leafMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#58C77A', side: THREE.DoubleSide, transparent: true }), []);
  const rand = Math.random;

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05), s = st.current;
    s.t += dt;
    s.gold = damp(s.gold, mode === 'gold' ? 1 : 0, 5, dt);
    s.violet = damp(s.violet, mode === 'lightning' ? 1 : 0, 7, dt);
    const total = Math.max(s.gold, s.violet);
    const col = GOLD.clone().lerp(VIOLET, s.violet / (total || 1));

    const pulse = 1 + Math.sin(s.t * 3) * 0.05;
    glow.current.material.opacity = Math.min(1, total * 1.1);
    glow.current.material.color.copy(col);
    glow.current.scale.set(2.8 * pulse, 3.6 * pulse, 1);
    glow.current.visible = total > 0.01;

    orbs.current.rotation.y = s.t * 0.6;
    orbs.current.children.forEach((o, i) => { o.position.y = Math.sin(s.t * 1.4 + i) * 0.06; o.scale.setScalar(s.gold); });
    orbs.current.visible = s.gold > 0.02;

    const pos = emberGeo.attributes.position.array;
    seeds.forEach((sd, i) => {
      sd[2] += dt * sd[3] * (0.6 + total);
      if (sd[2] > 2.3) { sd[2] = 0; sd[0] = rand() * Math.PI * 2; }
      pos[i * 3] = Math.cos(sd[0] + s.t * 0.3) * sd[1];
      pos[i * 3 + 1] = sd[2];
      pos[i * 3 + 2] = Math.sin(sd[0] + s.t * 0.3) * sd[1] * 0.6;
    });
    emberGeo.attributes.position.needsUpdate = true;
    emberMat.opacity = total;
    emberMat.color.copy(col);
    embers.current.visible = total > 0.02;

    bolts.current.visible = s.violet > 0.05;
    if (bolts.current.visible && s.t > s.nextBolt) {
      s.nextBolt = s.t + 0.07 + rand() * 0.06;
      bolts.current.children.forEach((b) => { b.geometry.dispose(); b.geometry = new THREE.TubeGeometry(jaggedBolt(rand), 14, 0.011, 4); });
    }
    boltMat.opacity = s.violet * (0.6 + rand() * 0.4);

    const since = burst?.current ? state.clock.elapsedTime - burst.current : 99;
    leaves.current.visible = since < 1.8;
    if (leaves.current.visible) {
      leaves.current.children.forEach((l, i) => {
        const a = i * 0.9 + since * 4, r = 0.4 + since * 0.5 + (i % 3) * 0.08;
        l.position.set(Math.cos(a) * r, 0.2 + since * 1.1 + (i % 4) * 0.12, Math.sin(a) * r * 0.6);
        l.rotation.set(a, a * 1.3, 0);
      });
      leafMat.opacity = Math.max(0, 1 - since / 1.8);
    }
  });

  return (
    <group>
      <sprite ref={glow} position={[0, 1.15, -0.35]}>
        <spriteMaterial map={tex} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0} />
      </sprite>
      <group ref={orbs} position={[0, 1.25, 0]} rotation={[0.25, 0, 0]}>
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(a) * 0.85, 0, Math.sin(a) * 0.85]}>
              <sprite scale={[0.5, 0.5, 1]}><spriteMaterial map={tex} color={GOLD} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.9} /></sprite>
              <mesh><sphereGeometry args={[0.058, 14, 10]} /><meshToonMaterial color="#2A1A06" emissive="#5A3A08" /></mesh>
            </group>
          );
        })}
      </group>
      <points ref={embers} geometry={emberGeo} material={emberMat} />
      <group ref={bolts}>{Array.from({ length: 4 }, (_, i) => <mesh key={i} material={boltMat} geometry={new THREE.TubeGeometry(jaggedBolt(rand), 14, 0.011, 4)} />)}</group>
      <group ref={leaves}>{Array.from({ length: 14 }, (_, i) => <mesh key={i} geometry={leafGeo} material={leafMat} />)}</group>
    </group>
  );
}
